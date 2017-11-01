import Simply from './../node_modules/simply.js/simply.js';

export default class CreateAnimation extends Simply.Component{

    static get template(){
        return `
            <canvas #canvas></canvas>
        `
    }

    constructor(){
        super();
        // detect when we're about to start creating 
        this._addPressListeners();

        // when we've detected - we show an element under the mouse
        // that shows the user we're about to create a habit
        
    }
    
    _addPressListeners(){
        document.addEventListener('mousemove', e => {

        })
    }
}

CreateAnimation.define('s-create-animation')