class LoadingScreen extends HTMLElement{

    constructor(){
        super();
        this.$ = this.attachShadow({mode: 'open'});
        
        this.$.innerHTML = `
            <style>
                :host{
                    transition: opacity 1s ease-in;
                    background-color: #333;
                    position:absolute;
                    bottom: 0;
                    top: 0;
                    left: 0;
                    right: 0;
                    background-color: #36324f;
                    display:flex;
                    align-items: center;
                    justify-content: center;
                }
                :host(.hidden){
                    display:none;
                }
                :host(.hide){
                    opacity:0;
                }
            </style>
            <img src="./assets/strow-logo.png">
        `;
    }

    hide(){
        this.classList.toggle('hide', true)
        setTimeout(_ => {
            this.classList.toggle('hidden', true);
        }, 1000)
    }
    show(){
        this.classList.toggle('hidden', false)    
        setTimeout(_ => {
            this.classList.toggle('hide', false);
        })
    }
}

customElements.define('s-loading-screen', LoadingScreen)