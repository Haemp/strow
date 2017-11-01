import './CommonStyles.js'
import './Checkbox.js'
import * as Simply from './node_modules/simply.js/simply.js'
import './Habit.js'
import HabitModel from './HabitModel.js'

class HabitList extends Simply.Component{

    static get template(){
        return `
            <s-common-styles></s-common-styles>
            <style>
                :host{
                    max-width: 300px;
                    display:block
                }
                li{
                    margin-bottom: 5px;
                }
                input[type="checkbox"]{
                    border-left: 1px solid black;
                    padding: 10px;
                }
                ul{
                    
                }
            </style>
            <ul>
                <li class="habit" 
                    (click)="this.selectHabit(habit)" 
                    class="{habit === this._selectedHabit ? 'habit selected': 'habit'}" 
                    each="habit in this._habits">
                    <s-habit {data}="{habit}"></s-habit>
                </li>
            </ul>
        `
    }   

    static get props(){
        return ['_habits']
    }

    set habits(habits){
        this._habits = habits;
    }

    selectHabit(habit){

        if(this._selectedHabit === habit){
            this._selectedHabit = null;
        }else{
            this._selectedHabit = habit;    
        }
        this.render()
    }

    setHabits(habits){
        this._habits = habits;
        this.render();
    }

    connectedCallback(){
        this.render()
    }
}

HabitList.compile()
customElements.define('s-habit-list', HabitList)