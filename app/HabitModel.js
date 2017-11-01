import TimeModel from './models/TimeModel.js';

class HabitModel{

    constructor(){
        this.loadHabits();
    }

    loadHabits(){
        return new Promise((res, rej) => {
            const habits = localStorage.getItem('strive.habits')
            if(habits){
                try{
                    this.habits = JSON.parse(habits) 
                    this.processIsTickable(this.habits);
                    res();
                }catch(err){
                    console.error(err);
                    this.habits = [];
                    res()
                }
            }else{
                this.habits = [];
                res();
            }
        })
    } 

    /** 
     * Check the habits last ticked timing and see
     * if we should enable the habit to be ticked or not
     */
    processIsTickable(){
        this.habits.forEach(habit => {
            const daysSinceTicked = TimeModel.daysSince(habit.lastTicked);
            
            habit.isTickable = daysSinceTicked > 1;
            habit.isDecaying = daysSinceTicked > 2;
            
            if(daysSinceTicked > 1 && daysSinceTicked < 2){
                habit.timeLeftToTick = 1 - daysSinceTicked;
            }

            // calculate active ticks
            if(habit.isDecaying){
                const adjustedTicks = Math.round(habit.ticks - (daysSinceTicked - 1))
                habit.activeTicks = adjustedTicks < 0 ? 0 : adjustedTicks;    
            }
        })
    }

    getTypesLeft(){
        const existingTypes = this.habits.map(habit => habit.type);
        const availableTypes = [];
        for(let i = 8; i > 0; i--){
            if(!existingTypes.includes(i)){
                availableTypes.push(i);
            }
        }
        return availableTypes;
    }

    addHabit(name){

        const typesAvailable = this.getTypesLeft();
        const habit = {
            name,
            ticks: 0,
            activeTicks: 0,
            lastTicked: Date.now() - 24 * 60 * 60 * 1000, // set as last ticked yesterday to make it active now
            isDecaying: false,
            isTickable: true,
            timeLeftToTick: 1,
            id: Date.now(),
            type: typesAvailable[Math.floor(Math.random() * typesAvailable.length)]
        }
        this.habits.push(habit);
        this._save();
        return habit;
    }

    getHabits(){
        return this.habits;
    }

    remove(habit){
        return new Promise((res, rej) => {
            this.habits = this.habits.filter(listHabit => habit !== listHabit)
            this._save();    
            res();
        })
    }

    removeHabit(targetHabit){
        this.habits.forEach((key, habit) => {
            if(targetHabit === habit)
                this.habits.splice(1, key)
        })
    }

    _save(){
        localStorage.setItem('strive.habits', JSON.stringify(this.habits))
    }
}

const habitModel = new HabitModel();
export default habitModel
