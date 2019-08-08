import './../node_modules/simply.js/simply.min.js';

export default class HabitDetails extends Simply.Component{
    static get template(){
        return `
            <style>
                @import url('./assets/common-styles.css');
                @import url('./habit-ui/habit-details.css');
            </style>

            <div class="{{ this.isEditable ? 'editable layout-container' : 'layout-container' }}">
                <div class="name-layout-wrapper">
                    <button if="!this.isEditable" 
                        class="btn edit"
                        (click)="this.onEdit()">
                        <i class="fa fa-pencil"></i>
                    </button>
                    <button if="this.isEditable" 
                            class="btn"
                            (click)="this.onCancelEdit()">
                        <i class="fa fa-ban"></i>
                    </button>
                    <div if="!this.isEditable" class="name">{{ this.habit.name }}</div>
                    <input type="text" #nameInput class="name" if="this.isEditable" {value}="{this.habit.name}">
                </div>

                <div class="input-layout-wrapper">
                    
                    <div class="right-bar">

                        <button if="this.isEditable" 
                                class="btn remove" 
                                (click)="this.onRemove()">
                            Remove
                        </button>

                        <button if="this.isEditable" 
                                class="btn save" 
                                (click)="this.onSave()">
                            Save
                        </button>


                        <button if="this.habit.isTickable && !this.isEditable" 
                                (click)="this.onTick()" 
                                class="btn ticker">
                            <i class="fa fa-check"></i>
                        </button>

                        <button class="btn streak" if="!this.habit.isTickable && !this.isEditable" class="streak">
                            <span>{{ this.habit.activeTicks }}</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    static get props(){
        return ['isEditable']
    }

    get habit(){
        return this._habit;
    }

    set habit(habit){
        this._habit = habit;
        this.isEditable = false;
        this.render();
    }

    connectedCallback(){

        this.isEditable = false;
    }

    onEdit(){
        
        this.isEditable = true;
    }

    onSave(){

        this.isEditable = false;
        this.habit.name = this.$.nameInput.value;
        this.render();

        
        this.dispatchEvent(new CustomEvent('updated', {detail: this.habit}));
    }

    onCancelEdit(){
        this.classList.toggle('editable', false);
        this.isEditable = false;
    }

    onRemove(){
        this.dispatchEvent(new CustomEvent('removed', {detail: this.habit}));
    }

    onTick(){
        this.habit.lastTicked = Date.now();
        this.habit.isTickable = false;
        this.habit.isDecaying = false;
        this.dispatchEvent(new CustomEvent('ticked', {detail: this.habit}))
        this.render();
    }
    
}

HabitDetails.define('s-habit-details');