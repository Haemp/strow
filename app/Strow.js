import Simply from './../node_modules/simply.js/simply.js';
import './../node_modules/howler/dist/howler.js';

// load in webcomponents
import './habit-tank/BallTank.js';
import './habit-ui/HabitDetails.js';
import './ui/Card.js';
import './habit-ui/CreateHabit.js';
import './LoadingScreen.js';
import './onboarding/OnBoarding.js';

import HabitModel from './HabitModel.js';
import HabitHelper from './HabitHelper.js';

class Strow extends Simply.Component{

    static get template(){
        return `
            <style>
                @import url('./assets/common-styles.css');
                @import url('./assets/strow.css');
            </style>
            <s-onboarding #onboarding 
                          (complete)="this.onOnboardingComplete()"></s-onboarding>
            <s-loading-screen #loadingScreen></s-loading-screen>
            <s-create-habit #createHabit 
                            (created)="this.onCreateHabit($evt.detail)" 
                            (cancel)="this.onCancelCreate($evt)"></s-create-habit>
            <f-card #selectedHabit 
                    hidden 
                    simple 
                    class="{{ this.HabitHelper.getColorNameForType(this.selectedHabit.type) }}">
                <s-habit-details slot="content" 
                                {habit}="{this.selectedHabit}" 
                                (updated)="this.onHabitUpdated($evt.detail)"
                                (removed)="this.onHabitRemoved($evt.detail)"
                                (ticked)="this.onHabitTicked($evt.detail)">
                </s-habit-details>
            </f-card>
            
            <s-ball-tank #ballTank 
                         (habitselected)="this.onHabitSelected($evt.detail)" 
                         (promptcreate)="this.onPromptCreate($evt.detail)"
                         (habitdeselected)="this.onHabitDeSelected($evt.detail)">
            </s-ball-tank>
        `;
    }


    static get props(){
        return ['habits', 'selectedHabit'];
    }
    
    constructor(){
        super();

        this.habits = [];

        this.HabitHelper = HabitHelper;
        this._loadSounds();
    }

    async connectedCallback(){

        
        this.HabitModel = HabitModel;
        await HabitModel.loadHabits();
        
        this.$.ballTank.setHabits(HabitModel.habits);
        this.$.createHabit.type = undefined;
        setTimeout(_ => {
            this.$.loadingScreen.hide();
        }, 500)
        
        // @inspect
        if(!localStorage.getItem('strive.hasBeenOnboarded')){
            this._onboardingActive = true;
            this.$.onboarding.start()
            this.$.onboarding.setSlide(1)
        }
    }

    
    _resetOnboarding(){
        localStorage.setItem('strive.hasBeenOnboarded', false);
    }
    
    
    onOnboardingComplete(){
        localStorage.setItem('strive.hasBeenOnboarded', true);
    }

    onPromptCreate(ball){
        this.$.createHabit.open();
        
        this._createdBall = ball;
        this._createdSound.play()
    }

    onHabitTicked(habit){
        this._tickedSound.play();
        habit.ticks++;
        habit.activeTicks++;
        HabitModel._save();
        this.$.ballTank.setTickForHabit(habit);

        if(this._onboardingActive){
            this.$.onboarding.setSlide(4);
            this.$.selectedHabit.close();
        }
    }



    async onHabitRemoved(habit){
        this.$.ballTank.removeHabit(habit)
        this.$.selectedHabit.close();
        this._removedSound.play()
        await HabitModel.remove(habit);
    }

    onHabitUpdated(habit){
        HabitModel._save();   
    }

    onCancelCreate(){
        this.$.ballTank.cancelCreation();
        this._createdBall = null;
    }

    onCreateHabit(habitName){
        
        const habit = HabitModel.addHabit(habitName);
        this.$.ballTank.associateHabitToCreatedBall(habit);
       
        this.render();
        this._createdBall = null;
        this.$.createHabit.close();

        if(this._onboardingActive){
            this.$.onboarding.setSlide(2);
        }
    }

    onHabitSelected(habit){
        
        // we dont select a habit if in the process
        // of adding one
        if(this._createdBall){
            return; 
        }
        
        this._selectSound.play();
        
        
        this.selectedHabit = habit;
        console.log(this.selectedHabit);
        window.selectedHabit = habit;
        if(this.selectedHabit)
            this.$.selectedHabit.open();

        if(this._onboardingActive){
            this.$.onboarding.setSlide(3);
        }
    }

    async onHabitDeSelected(){
        
        await this.$.selectedHabit.close();
        this.selectedHabit = null;
    }

    _loadSounds(){
        this._tickedSound = new Howl({
            src: ['./assets/blip1.wav'],
            volume: 0.1
        })
        this._selectSound = new Howl({
            src: ['./assets/selection1.wav'],
            volume: 0.4
        })

        this._createdSound = new Howl({
            src: ['./assets/created2.wav'],
            volume: 0.4
        })

        this._removedSound = new Howl({
            src: ['./assets/delete2.flac'],
            volume: 1
        })

        // this._backgroundSounds = new Howl({
        //   src: ['background1.wav'],
        //   volume: 0.2,
        //   loop: true
        // });
        //this._backgroundSounds.play()
    }
}

Strow.define('s-strow');