import Ball from './Ball.js';

export default class FluidAddCtrl{
    constructor(world, render){
        this._render = render; 
        this._world = world;
        this._longPressTime = 3000;
        this._setup()
        this._balls = [];
    }

    _setup(){

        const longpressTime = 1000;
        let longpressStarted = false;
        const circleDiameter = 15;
        
        const isTouchEnabled = !!window.ontouchstart;
        const startEvent = isTouchEnabled ? 'touchstart' : 'mousedown';
        const endEvent = isTouchEnabled ? 'touchend' : 'mouseup';
        
        this._render.canvas.addEventListener(startEvent, e => {
            longpressStarted = true
            setTimeout(_ => {
                if(longpressStarted){
                    const {clientX,clientY} = isTouchEnabled ? e.changedTouches[0] : e;
                    this._addBall(clientX, clientY);
                } 
            }, longpressTime) 
        })

        this._render.canvas.addEventListener(endEvent, e => {
            longpressStarted = false;
        });

    }

    onBallCreated(){}
}