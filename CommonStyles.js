class CommonStyles extends HTMLElement{

    constructor(){
        super();
        this.$shadyDom = true;
    }
    connectedCallback(){
        this.innerHTML = `
            <style>
                @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
                @import url('./common-styles.css')
            </style>
        `;
    }
}

customElements.define('s-common-styles', CommonStyles)
