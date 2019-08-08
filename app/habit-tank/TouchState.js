import './../node_modules/matter-js/build/matter-dev.js';
import EventEmitter from './../EventEmitter.js';

const STATE_NO_ACTION = 'No Action';
const STATE_TOUCH_START = 'Touch Start';
const STATE_BODY_TOUCH = 'Body Touch';
const STATE_SELECT = 'Select';
const STATE_FLING = 'Fling';
const STATE_FLOOR_TOUCH = 'Floor Touch';
const STATE_LONGPRESS = 'Longpress';
const STATE_FINISHED = 'Finished';

const LONG_PRESS_TIME = 1500;

// the min distance a user can drag 
// before its not counted as a longpress
const MAX_LONGPRESS_TRAVEL = 50;

// the min distance a user can drag 
// before its not counted as a select
const MAX_SELECT_TRAVEL = 50; 



export default class TouchState extends EventEmitter{

    constructor(mouseConstraint){
        super();
        this.transitions = new Map();
        this._state = STATE_NO_ACTION
        
        
        this._setupTransitionEvents();

        this._downPoint = {};
        this._travelPoint = {};
        let travelDistance = null;
        let clearTimeoutId = 0;
        

        // If we hear a startdrag it means that the click
        // was on top of a body. This means we can discard this action
        // as a longpress.
        // startdrag triggers BEFORE mousedown
        Matter.Events.on(mouseConstraint, 'startdrag', e => {
            
            if(this.state === STATE_FLOOR_TOUCH)
                return;

            this.state = STATE_BODY_TOUCH;
            this._selectedBody = e.body;
        })

        // We get this event in both the body touch and the floor
        // touch case 
        Matter.Events.on(mouseConstraint, 'mousedown', e => {

            this._downPoint = {
                x: e.mouse.position.x, 
                y: e.mouse.position.y
            };

            // if we're already in a state of body touch
            // we just ignore this event
            if(this.state !== STATE_BODY_TOUCH){
                this.state = STATE_FLOOR_TOUCH;

                this._clearTimeoutId = setTimeout(_ => {

                    // If the user touches the floor and drags the finger
                    // we don't want to count it as a longpress - most likely
                    // it was an attempted fling
                    if(this.getDistance(this._downPoint, this._travelPoint) < MAX_LONGPRESS_TRAVEL){
                        this.state = STATE_LONGPRESS;
                    }else{
                        this.state = STATE_NO_ACTION;
                    }


                    
                }, LONG_PRESS_TIME)
            }
        })

        // Next if we hear a mouse move we need to register
        // the delta for the last mousemove
        Matter.Events.on(mouseConstraint, 'mousemove', e => {

            // just register the last mouse position
            // to be evaluated for fling or select
            this._travelPoint = e.mouse.position;

            // if we travel too far in the longpress we immediately 
            // cancel the longpress
            if(this.state === STATE_FLOOR_TOUCH && this.getDistance(this._downPoint, this._travelPoint) > MAX_LONGPRESS_TRAVEL){
                this._clearTimeout(this._clearTimeoutId);

                this.state = STATE_NO_ACTION;
            }
        });

        Matter.Events.on(mouseConstraint, 'mouseup', e => {
            
            // timeout is always cleared on mouse up
            // this works even if there where none set
            if(this._clearTimeoutId){
                this._clearTimeout(clearTimeoutId);
                this.state = STATE_NO_ACTION;    
            }

            if(this.state === STATE_BODY_TOUCH){
                if(this.getDistance(this._downPoint, this._travelPoint) > MAX_SELECT_TRAVEL){
                    this.state = STATE_FLING;
                }else{
                    this.state = STATE_SELECT;
                }
            }
        });
    }

    _clearTimeout(){
        clearTimeout(this._clearTimeoutId)
        this._clearTimeoutId = 0;
    }

    _setupTransitionEvents(){
        
        this.transitions.set(STATE_NO_ACTION + STATE_BODY_TOUCH, _ => {
            
        })

        // this is when we know the touch was not a select
        // but before we know if it's a full longpress 
        this.transitions.set(STATE_NO_ACTION + STATE_FLOOR_TOUCH, _ => {
            this.dispatchEvent(new CustomEvent('longpressstart', {detail: this._downPoint}));
        })

        // the user lifts his finger before we have a full
        // longpress
        this.transitions.set(STATE_FLOOR_TOUCH + STATE_NO_ACTION, _ => {
            this.dispatchEvent(new CustomEvent('longpresscancel'));
        })

        // user longpresses fully
        this.transitions.set(STATE_FLOOR_TOUCH + STATE_LONGPRESS, _ => {
            this.dispatchEvent(new CustomEvent('longpressend', {detail: this._downPoint}));
            this.state = STATE_NO_ACTION;
        })

        this.transitions.set(STATE_LONGPRESS + STATE_NO_ACTION, _ => {
        })

        this.transitions.set(STATE_BODY_TOUCH + STATE_SELECT, _ => {
            this.dispatchEvent(new CustomEvent('select', {detail: this._selectedBody.ball}));
            this.state = STATE_NO_ACTION;
            this._selectedBody = null;
        })

        this.transitions.set(STATE_BODY_TOUCH + STATE_FLING, _ => {
            this.dispatchEvent(new CustomEvent('fling'));
            this.state = STATE_NO_ACTION;
            this._selectedBody = null;
        })

        this.transitions.set(STATE_FLING + STATE_NO_ACTION, _ => {
            
        })

        this.transitions.set(STATE_SELECT + STATE_NO_ACTION, _ => {
            
        })
    }

    set state(newState){
        const oldState = this._state;
        this._state = newState;
        
        const transitionHandler = this.transitions.get(oldState+newState);
        if(transitionHandler)
            transitionHandler.call();
    }

    get state(){
        return this._state;
    }

    getDistance(pointA, pointB){

        const deltaPosition = {
            deltaX: pointA.x - pointB.x,
            deltaY: pointA.y - pointB.y
        };

        // good old highschool geometry finally put to good use!
        return Math.sqrt(
            Math.pow(deltaPosition.deltaX, 2) + Math.pow(deltaPosition.deltaY, 2)
        );
    }
}