import Simply from './node_modules/simply.js/simply.js';
import './HabitList.js';
import './HabitCreate.js';
import HabitModel from './HabitModel.js';
import './CommonStyles.js';
import './Basement.js';
import LoginModel from './LoginModel.js';
import './Login.js';
import './ViewStack.js';
import './LoadingScreen.js';

class Strive extends Simply.Component{

    static get template (){
        return `
            <s-common-styles></s-common-styles>
            <style>
                
                @import url(./strive.css);
                .inner-wrapper{
                    max-width: 300px;
                    margin: 0 auto;
                }

            </style>
            <div>
                <s-loading-screen #loading-screen></s-loading-screen>
                <div if="this._finishedLoading">
                    <s-basement #basement>
                        <ul slot="content">
                            <li (click)="this.onLogin()">Login</li>
                            <li (click)="this.onNavigateHabits()">Create</li>
                        </ul>
                    </s-basement>
                    <s-basement-toggle (click)="this.toggleBasement($event)"></s-basement-toggle>
                    <div class="inner-wrapper">
                        <s-view-stack default-tab="list" 
                                      #view 
                                      (selected)="this.onViewSelected($evt)">
                            <s-habit-list slot="tabs" 
                                          tab-id="list" 
                                          {habits}="{this.habits}"
                                          (habitdelete)="this.onHabitDeleted($event)" 
                                          #habit-list>
                            </s-habit-list>    
                            <s-habit-create slot="tabs" 
                                            tab-id="create" 
                                            (created)="this.onHabitCreated($event)">
                            </habit-create>
                            <s-login slot="tabs" tab-id="login" #login></s-login>
                        </s-view-stack>
                    </div>
                </div>
            </div>
        `;
    }

    static get props(){
        return ['_finishedLoading', 'habits']
    }

    async connectedCallback(){
        this.render()
        this.habits = HabitModel.getHabits();
        await LoginModel.init();

        this._finishedLoading = true;
        this.$.loadingScreen.hide();
    }

    onViewSelected({data}){
        if(data === 'login'){
            this.$.login.open();
        }
    }

    toggleBasement(event){
        event.stopImmediatePropagation();
        this.$.basement.toggle()
    }

    onLogin(){
        this.$.basement.toggle();
        this.$.view.selectTab('login')
    }

    onHabitDeleted(event){
        console.log('Delete')
        HabitModel.deleteHabit(event.data)
        this.$.habitList.setHabits(HabitModel.getHabits())
    }

    onNavigateHabits(){
        this.$.basement.toggle();
        this.$.view.selectTab('create');
    }

    onHabitCreated(event){
        HabitModel.addHabit(event.data);
        console.log('Added habit', event.data)

        // now we refresh the habitlist
        this.$.habitList.setHabits(HabitModel.getHabits())
    }

    click(){
        console.log('clack')
    }
}

Strive.compile();
customElements.define('s-strive', Strive)