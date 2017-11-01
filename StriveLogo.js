class StriveLogo extends HTMLElement{

    constructor(){
        super();
        this.$ = this.attachShadow({mode: 'open'});
        this.$.innerHTML = `
            <style>
                 @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
                 @import url('logo.css');
            </style>
            <span class="logo-text">Strive.</span>
        `;
    }
}

customElements.define('s-strive-logo', StriveLogo)