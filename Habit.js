import './node_modules/simply.js/simply.min.js'
import {Checkbox} from './Checkbox.js'

class Habit extends Simply.Component{
    static get template(){
        return `
            <style>
                @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
                @import url('./habit.css')
            </style>
            <div class="{this.isSelected ? 'container selected' : 'container'}">
                <header (click)="this.onClick($evt)" if="!this.isEditable">
                    <i class="material-icons" (click)="this.onEditHabit()" if="this.isSelected">mode_edit</i>
                    <div title="{this.habit.name}" class="name">{{ this.habit.name }}</div>
                    <s-checkbox {checked}="{this.habit.checked}" (change)="this.habit.checked = $el.checked"></s-checkbox>
                </header>
                
                <header if="this.isEditable">
                    <i class="material-icons" (click)="this.editHabit()">check_circle</i>
                    <input type="text" title="{this.habit.name}" (keydown)="this.habit.name = $el.value" {value}="{this.habit.name}" class="name">
                </header>
                
                <div class="drawer" if="this.isSelected">
                    <div class="description">
                        {{ this.habit.description }}
                    </div>
                    <button (click)="this.onDelete()">Delete</button>
                </div>
            </div>
        `;
    } 
   
    static get props(){
        return [
            'isEditable',
            'isSelected',
            'habit'
        ]   
    }

    onEditHabit(){
        this.isEditable = true;
    }

    editHabit(){
        const editHabit = new Event('habitedit', {bubbles: true, composed:true});
        editHabit.data = this.habit;
        this.dispatchEvent(editHabit)
        this.isEditable = false;
    }
    
    toggleSelected(){
        this.isSelected = !this.isSelected
    }

    onClick($evt){
        if(!($evt.target instanceof Checkbox))
            this.toggleSelected()
    }

    onDelete(){
        const deleteEvent = new Event('habitdelete', {bubbles: true, composed:true});
        deleteEvent.data = this._habit
        this.dispatchEvent(deleteEvent)        
    }

    set data(habit){
        this.habit = habit;
        this.render();       
    }
    
    connectedCallback(){
        this.render()
    }
}

Habit.define('s-habit')