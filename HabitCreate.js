import './CommonStyles.js'
import * as Simply from './node_modules/simply.js/simply.js'
import './Habit.js'

class HabitCreate extends Simply.Component{

    static get template(){
        return `
            <s-common-styles></s-common-styles>
            <style>
                :host{ display:block; width:100%; }
                .inner-wrapper{display:flex; }
                input{flex: 1;}
                button{
                    background: 0;
                    border: 0;
                    outline: none;
                    padding: 10px 20px;
                    background-color: #333;
                    border-top-right-radius: 20px;
                    border-bottom-right-radius: 20px;
                    color: #fff;
                    text-transform: uppercase;
                    font-size: 14px;
                    letter-spacing: 1px;
                    font-family: "Roboto Slab";
                    cursor:pointer;
                }
                button:active{
                    background-color: #999;
                }
            </style>
            <div class="inner-wrapper ShadowBox">
                <input #habit-name type="text" placeholder="Habit name...">
                <button (click)="this.onSave()">Add</button>
            </div>
            
        `
    }   

    connectedCallback(){
        this.render()
    }

    onSave(){

        const habitName = this.$.habitName.value;
        const habit = {name: habitName, checked: false};

        this.$.habitName.value = '';
        const e = new Event('created')
        e.data = habit;
        this.dispatchEvent(e)
    }
}

HabitCreate.compile()
customElements.define('s-habit-create', HabitCreate)