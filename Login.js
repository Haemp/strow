import './node_modules/simply.js/simply.min.js'
import LoginModel from  './LoginModel.js'
import './StriveLogo.js';

class Login extends Simply.Component{
    
    static get props(){
        return ['user']
    }

    static get template(){
        return `
            <style>
                @import url('common-styles.css');
                @import url('login.css');
            </style>
            <section>
                <s-strive-logo></s-strive-logo>
                <button class="close" (click)="this.onClose()">X</button>
                
                <div class="Para-1" if="this.user">
                    You're logged in as {{ this.user.displayName }}
                </div>
                <div if="!this.user">
                    <button class="Btn-login" (click)="this.signIn()">Log In with Google</button>
                </div>
                
            </section>
        `;
    }

    async connectedCallback(){
        this.user = await LoginModel.init();
        this.render();
        window.login = this;
    }

    onClose(){
        this.close();
    }

    close(){
        this.classList.toggle('open', false);
        this.dispatchEvent(new Event(Login.CLOSE))
    }

    open(){
        this.classList.toggle('open', true);
    }

    signIn(){
        LoginModel.signInWithGoogle();
    }
}

Login.CLOSE = 'CLOSE';
Login.define('s-login');

