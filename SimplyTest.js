import Simply from './node_modules/simply.js/simply.js';

console.log(Simply)
const render = Simply.compileTemplate(`
    <div if="this.potato" id="potato" (click)="console.log('Potato clicked')">
        potato
    </div>
    <div if="!this.potato" id="no-potato" >
        no potato
    </div>
`)




document.body.potato = true;
render(document.body)
render(document.body)