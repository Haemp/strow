import Simply from './../../node_modules/simply.js/simply.js';

/** 
 * @attributes
 * <f-card hidden click-dismiss="Boolean"></f-card>
 */ 
class Card extends Simply.Component{

    static get template(){
        return `
            <style>
                @import url(./ui/card.css)
            </style>
            <header if="this.title">{{ this.title }}</header>
            <div class="body">
                <slot name="content"></slot>
            </div>
            <footer #btnContainer>
                <slot name="buttons"></slot>
            </footer>
        `;
    }

    static get props(){
        return ['title'];
    }

    close(){
        return new Promise((res) => {
            document.removeEventListener('click', this._dismissHandler);
            document.removeEventListener('touchend', this._dismissHandler);
            const animation = this.animate([
                {
                    transform: 'scale3d(1,1,1) translateX(0) translateY(0)',
                    opacity: 1
                },
                {
                    transform: 'scale3d(0,0,0) translateX(-100%) translateY(-100%)',
                    opacity: 0
                },
            ], {
                duration: 400,
                easing: 'ease-out',
                fill: "forwards"
            })

            animation.onfinish = e => {
                console.log('finished')
                this.style.display = 'none';
                res();
            }
            this._isOpen =  false;

            this.dispatchEvent(new CustomEvent('closed'))

        })
    }

    open(){
        this.style.display = 'block';
        this.animate([
            {
                transform: 'scale3d(0,0,0) translateX(-100%) translateY(-100%)',
                opacity: 0,
            },
            {
                transform: 'scale(1.05) translateX(0) translateY(0)',
                opacity: 1,
                offset: 0.7
            },
            {
                transform: 'scale(0.95) translateX(0) translateY(0)',
                opacity: 1
            },
            {
                transform: 'scale3d(1,1,1) translateX(0) translateY(0)',
                opacity: 1
            },
        ], {
            duration: 650,
            easing: 'ease-out',
            fill: "forwards"
        });

        if(this._clickDismiss){
           this._setupClickDismiss();
        }

        this._isOpen = true;
        this.render()
    }


    _setupClickDismiss(){

        let preventAutoDismiss = true;
        const self = this;

        setTimeout(_ => {
            preventAutoDismiss = false;
        }, 2000)
        
        this._dismissHandler = function(event){

            if(preventAutoDismiss) return;
            
            if(!event.path.includes(self)){
                self.close();
                self.dispatchEvent(new CustomEvent('dismissed'))
                document.removeEventListener('click', self._dismissHandler);    
                document.removeEventListener('touchend', self._dismissHandler);
            }
        }

        document.addEventListener('click', this._dismissHandler);
        document.addEventListener('touchend', this._dismissHandler);
    }

    connectedCallback(){
        window.component = this;
        this.title = this.getAttribute('title') || false;

        // check how many buttons we have
        const slot = this.shadow.querySelector('slot[name="buttons"]');
        slot.addEventListener('slotchange', e => {
            if(slot.assignedNodes().length === 1){
                this.$.btnContainer.classList.toggle('single-button', true);
            }    
        }, {once: true})
        

        if(this.getAttribute('hidden') !== null){
            this.style.display = 'none';
            this._isOpen = false;
        }else{
            this._isOpen = true;
        }

        this._clickDismiss = this.getAttribute('click-dismiss') === 'true';

        if(this._clickDismiss && this._isOpen){
            this._setupClickDismiss();
        }
    }
}



Card.define('f-card');