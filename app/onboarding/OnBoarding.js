import Simply from './../../node_modules/simply.js/simply.js';
import ViewStack from '../ui/ViewStack.js';

class OnBoarding extends Simply.Component{

    static get template(){
        return `
            <style>
                @import url('./../assets/common-styles.css');
                :host{
                    pointer-events: none;
                    display:block;
                    position: absolute;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    right: 0;
                    padding-top: 30px;
                }
                :host(.pointer){
                    pointer-events:all;
                }
                p{
                    font-family: "Muli";
                    font-size: 24px;
                    color: #ab9fd7;
                    width: 70%;
                }
                .bg{
                    pointer-events: none;
                }
                .wrapper{
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    text-align:center;  
                    justify-content: center;
                    align-items: center;
                }
                em{
                    font-style: normal;
                    color: #ed74ae;
                    padding: 0 5px;
                }
                .anywhere{
                    position: absolute;
                    margin-left: -149px;
                    margin-top: -66px;
                }
                .way-to-go{
                    position:relative;
                }
                .forced{
                    position:absolute;
                    top: -60px;
                    left: 150px;
                }
                .touch-it{
                    margin-top: 110px;
                    margin-left: 200px;
                }
                .dot-wrapper{
                    position:relative;
                    margin: 100px auto;
                    text-align: center;
                }
                .dot{
                    display:inline-block;
                    background-color: #e386b5;
                    border-radius: 20px;
                    width: 30px;
                    height: 30px;
                }
                .center{
                    text-align:center;
                }
                .btn{
                    padding: 18px 40px; 
                    font-size: 15px;
                }
                .button-wrapper{
                    position: absolute;
                    bottom: 30px;
                    width: 100%;
                    text-align: center;
                }
            </style>
            <s-view-stack #viewStack default-tab="1">
                <div class="slide" slot="tabs" 
                     tab-id="1">
                    <div class="wrapper">
                        <p class="bg">Hey there, this is <em>Stow</em> the minimal habit tracker</p>
                        <p class="bg">To create a habit press and <em>hold</em> anywhere on the screen</p>
                    </div>
                    
                    <div class="dot-wrapper">
                        <img class="anywhere" src="/assets/anywhere-suggestion.png">
                        <div class="dot"></div>
                    </div>
                </div>

                <div slot="tabs" tab-id="2">
                    <div class="wrapper">
                        <p class="bg" style="margin-top: 50px">
                            <span class="way-to-go">Way to go! <img class="bg forced" src="/assets/forced-enthusiasm.png"></span>
                        </p>
                        <p class="bg">Now try <em>selecting</em> your habit</p>
                    </div>
                </div>

                <div slot="tabs" tab-id="3">
                    <div class="wrapper">
                        <p class="bg">See that <em>checkmark</em>? That means your habit is <em>ready</em> to be checked.</p>
                        <img class="bg touch-it" src="/assets/touch-it.png">    
                    </div>
                </div>
                <div slot="tabs" 
                     tab-id="4">
                    <div class="wrapper">
                        <p class="bg">See that small blip? Your habit is <em>growing</em>.</p>
                        <p class="bg">If you don't keep up your <em>daily</em> habits the blips will fade away one by one.</p>
                        <img class="bg" src="/assets/lonely.png">    
                    </div>
                    <div class="button-wrapper">
                        <button class="btn pink" (click)="this.setSlide(5)">Oh right - gotcha</button>
                    </div>
                </div>
                <div slot="tabs" tab-id="5">
                    <div class="wrapper">
                        <p class="bg">Thats it! You’re now a certified <em>Strow</em> expert.</p>
                        <img class="bg" src="/assets/have-fun.png">    
                    </div>
                    <div class="button-wrapper">
                        <button class="btn pink" (click)="this.end()">Cheers!</button>
                    </div>
                </div>
            </s-view-stack>
        `;
    }

    constructor(){
        super();
        
    }

    connectedCallback(){
        this.style.display = 'none';
    }

    start(){
        // fade in bla bla bla
        this.style.display = '';
    }

    setSlide(slide){
        this.$.viewStack.selectTab(slide+'')
        if(slide > 3){
            this.classList.toggle('pointer', true);
        }
    }

    end(){
        this.style.display = 'none';
        this.dispatchEvent(new CustomEvent('complete'));
    }
}



OnBoarding.define('s-onboarding')