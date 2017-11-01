import './StriveLogo.js';

class LoadingScreen extends HTMLElement{

    constructor(){
        super();
        this.$ = this.attachShadow({mode: 'open'});
        
        this.$.innerHTML = `
            <style>
                :host{
                    transition: opacity 0.6s ease-in;
                    background-color: #333;
                    position:absolute;
                    bottom: 0;
                    top: 0;
                    left: 0;
                    right: 0;
                    background-image: radial-gradient(circle at center, #484848, #232323);
                    display:flex;
                    align-items: center;
                    justify-content: center;
                }
                :host(.hidden){
                    opacity:0;
                }
            </style>
            <s-strive-logo></s-strive-logo>
        `;
    }

    hide(){
        setTimeout(_ => {
            this.classList.toggle('hidden', true)    
        }, 1500)
    }
    show(){
        this.classList.toggle('hidden', false)
    }
}

customElements.define('s-loading-screen', LoadingScreen)