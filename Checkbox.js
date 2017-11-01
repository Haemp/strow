export class Checkbox extends HTMLElement{

    constructor(){
        super();
        this.$ = this.attachShadow({mode: 'open'});
        this.$.innerHTML = `
            <style>
                :host{ 
                    font-size: 30px;
                    cursor:pointer;
                    line-height: 1;
                    display:block;
                }
                div:hover{
                    
                }
            </style>
            <div class="checkbox"></div>
        `
        /** @expose */
        this._checkbox = this.$.querySelector('.checkbox')
    }

    connectedCallback(){
        this.addEventListener('click', _ => {
            this._toggleState()
        })

        this._render()
    }

    set checked(value){
        this._checked = value
        this._render();
    }

    get checked(){
        return this._checked;
    }

    _toggleState(){
        this.checked = !this.checked;
        this.dispatchEvent(new Event('change'))
        this._animate()
    }

    _animate(){
        const animationTime = 250
        this._checkbox.animate({
            transform: ['rotate(0deg)', 'rotate(-720deg)'],
            filter: ['blur(0px)', 'blur(3px)']
        }, {duration: animationTime, easing: 'ease-out'})

        setTimeout(_ => {
            this._render();
        }, animationTime/2)
    }

    _render(){
        if(!this.checked){
            this._checkbox.innerText = '☐'
        }else{
            this._checkbox.innerText = '✓'
        }
    }

}

customElements.define('s-checkbox', Checkbox)