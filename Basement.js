import './CommonStyles.js'
class Basement extends HTMLElement{
    
    constructor(){
        super();
        this.$ = this.attachShadow({mode: 'open'})
        this.$.innerHTML = ` 
            <style>
                @import url('./basement.css')
            </style>
            <slot name="content"></slot>
        `;

        this.onClickWhenShown = (e) => {
            if(!this.isChildOfBasement(e)){
                document.removeEventListener('click', this.onClickWhenShown)
                this.toggle();
            }
        }
    }  

    toggle(){
        this.show = !this.show;
        var self = this;

        if(this.show){

            // handle outside clicks to close
            document.addEventListener('click', this.onClickWhenShown)    
        }else{
            document.removeEventListener('click', this.onClickWhenShown)
        }
        
        this.render()
    }

    isChildOfBasement(event){
        return event.path.find(element => element === this)
    }

    render(){
        if(this.show){
            this.classList.add('show')
            this.classList.remove('hide')
        }else{
            this.classList.add('hide')
            this.classList.remove('show')
        }
    }

}


class BasementToggle extends HTMLElement{

    constructor(){
        super();
        this.$ = this.attachShadow({mode: 'open'})
        this.$.innerHTML = `
            <style>
                @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
                :host{
                    border-radius: 20px;
                    background-color: #333;
                    display: inline-block;
                    color: #fff;
                    padding: 6px;
                    cursor:pointer;
                    user-select: none;
                }
                i.material-icons{ font-size: 28px; }
                :host(:active){
                    background-color: #999;
                }
            </style>
            <i class="material-icons">list</i>
        `
    }
}

customElements.define('s-basement-toggle', BasementToggle)
customElements.define('s-basement', Basement)