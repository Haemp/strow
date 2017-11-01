import Simply from './../../node_modules/simply.js/simply.js';
import './../ui/Card.js';
import HabitHelper from '../HabitHelper.js'

class CreateHabit extends Simply.Component{


    static get template(){
        return `
            <style>
                @import url('/assets/common-styles.css');
                @import url('./habit-ui/create-habit.css');
            </style>
            <f-card #popup 
                    hidden
                    class="{{ this._color }}"
                    (dismissed)="this.onCancelCreate($evt)"
                    click-dismiss="true">
                <div slot="content">
                    <input #createHabit type="text" placeholder="Name...">
                </div>
                <button slot="buttons" 
                        (click)="this.onCreateHabit($evt)">Create Habit</button>
            </f-card>
        `;
    }

    set type(type){
        
       this._type = type;
       this._color = HabitHelper.getColorNameForType(type);
       this.setAttribute('type', this._color);
       this.render();
    }

    get type(){
        return this._type;
    }

    open(){
        this.$.popup.open()
    }

    close(){
        this.$.popup.close()
    }
    
    onCreateHabit(){
        const habitName = this.$.createHabit.value;
        this.dispatchEvent(new CustomEvent('created', {detail: habitName}));
        this.$.createHabit.value = '';
    }

    onCancelCreate(){
        this.dispatchEvent(new CustomEvent('cancel'));
    }
}

CreateHabit.define('s-create-habit');