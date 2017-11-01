import Matter from './../../node_modules/matter-js/build/matter-dev.js';
import TankWalls from './TankWalls.js';
import Ball from './Ball.js';
import HabitHelper from './../HabitHelper.js';

export default class BallTank extends HTMLElement{

    constructor(){
        super();
        
        this.habitsAndBallsMap = new Map();
        this.$ =  this.attachShadow({mode:'open'});
        this._element = document.createElement('div');
        this.$.appendChild(this._element)
        this._balls = [];
    }

    setHabits(habits){
        this._habits = habits;
        this._renderHabits()
    }

    associateHabitToCreatedBall(habit){
        this.habitsAndBallsMap.set(habit, this._habitLessBall);
        this.habitsAndBallsMap.set(this._habitLessBall, habit);
        this._habitLessBall.saved = true;

        
        this._habitLessBall._color = HabitHelper.getColorNameForType(habit.type)
        this._habitLessBall.setSprite(this._habitLessBall._color);

        if(habit.isTickable){
            this._habitLessBall.setBlink(habit.timeLeftToTick);
        }
        this._habitLessBall = null;

    }

    removeHabit(habit){
        const ball = this.habitsAndBallsMap.get(habit);

        this.habitsAndBallsMap.delete(ball);
        this.habitsAndBallsMap.delete(habit);

        ball.remove();
    }

    cancelCreation(){
        this._habitLessBall.remove();
        this._habitLessBall = null;
    }

    _renderHabits(){
        this._habits.forEach(habit  => {

            // add ball at random position within the tank
            const ball = this._addBall(
                this._transform(
                    [0, this._tankWalls.width],
                    this._tankWalls.width * Math.random(),
                    [50, this._tankWalls.width -50]
                ),
                this._transform(
                    [0, this._tankWalls.height],
                    this._tankWalls.height * Math.random(),
                    [50, this._tankWalls.height -50]
                ),
                {
                    mute: true, 
                    color: HabitHelper.getColorNameForType(habit.type),
                    isDecaying: habit.isDecaying
                }
            )
            ball.saved = true;
            this.habitsAndBallsMap.set(habit, ball);
            this.habitsAndBallsMap.set(ball, habit);

            if(habit.isTickable){
                ball.setBlink(habit.timeLeftToTick)
            }

            for(let i = 0; i < habit.activeTicks; i++){
                ball.setTick();
            }
        })
    }

    _transform(range, part, newRange){
        return ((part - range[0]) * (newRange[1] - newRange[0])) / (range[1] - range[0]) + newRange[0]
    }

    connectedCallback(){

        this._setupWorld();
        this._setupSelectionBehavior()
    }

    getBalls(){
        return this._ballAdder._balls;
    }

    setTickForHabit(habit){
        const ball = this.habitsAndBallsMap.get(habit)
        ball.stopDecay()
        ball.stopBlink();
        ball.setTick()
    }

    _deselectHabit(){
        this.selectedHabit = null;
        this.dispatchEvent(new CustomEvent(BallTank.HABIT_DESELECTED));
    }

    _selectHabit(habit){
        this.dispatchEvent(new CustomEvent(BallTank.HABIT_SELECTED, {detail: habit}));
        this.selectedHabit = habit;  
    }

    _setupWorld(){
        this._engine = Matter.Engine.create();

        // removing gravity
        this._engine.world.gravity.scale = 0;
        
        // this prevents balls from sticking to the walls at too slow
        // speeds
        Matter.Resolver._restingThresh = 0; 
        // create a renderer
        this._render = Matter.Render.create({
            element: this._element,
            engine: this._engine,
            options: {
                width: window.innerWidth,
                height: window.innerHeight,
                wireframes: false,
                background: '#1b1b33'
            }
        });

        // setup mouse interaction
        this._mouseConstraint = Matter.MouseConstraint.create(
            this._engine, 
            {element: this._element}
        );

        this._tankWalls = new TankWalls(this._engine.world);

        Matter.World.add(this._engine.world, this._mouseConstraint);
        Matter.Engine.run(this._engine);
        Matter.Render.run(this._render);
    }

    _onBallCreated(ball){

        this.dispatchEvent(new Event(BallTank.HABIT_DESELECTED))

        // this is where the ball goes until we 
        // have some parent habit for it
        this._habitLessBall = ball; 

        this.dispatchEvent(new CustomEvent(BallTank.PROMPT_CREATE,{detail: ball}));   
    }

    _setupSelectionBehavior(){
        let startDrag = false;
        let selectedBall = null;
        const longpressTime = 1000;
        let couldBeLongpress = false;
        const circleDiameter = 15;
        let dragOnGoing = false;

        Matter.Events.on(this._mouseConstraint, 'mousedown', e => {            
            
            if(dragOnGoing) return;
            
            couldBeLongpress = true;
            setTimeout(_ => {
                if(couldBeLongpress){
                    if(!this._habitLessBall){
                        const {x,y} = e.mouse.position;
                        this._addBall(x,y);    
                    }

                    couldBeLongpress = false;
                } 
            }, longpressTime);
        })
    
        Matter.Events.on(this._mouseConstraint, 'mousemove', e => {
            
        })

        Matter.Events.on(this._mouseConstraint, 'startdrag', e => {
            dragOnGoing = true;
            couldBeLongpress = false;
            startDrag = true;
            selectedBall = e.body.ball;
        })

        Matter.Events.on(this._mouseConstraint, 'mouseup', _ => {
            dragOnGoing = false;
            couldBeLongpress = false;
            if(startDrag){

                // This is protecting for the case
                // where the user tries to select a ball 
                // that is not yet saved
                if(selectedBall.saved){
                    this._selectHabit(this.habitsAndBallsMap.get(selectedBall))
                }
            }else{
                this._deselectHabit();
            }
            selectedBall = null;
            startDrag = false;
        })
    }

    _addBall(x, y, opts){
        opts = opts || {};
        const ball = new Ball(this._engine.world, x, y, opts.color || 'gray', opts.isDecaying);
        this._balls.push(ball)
        if(!opts.mute)
            this._onBallCreated(ball);

        return ball;
    }

}

BallTank.HABIT_SELECTED = 'habitselected';
BallTank.PROMPT_CREATE = 'promptcreate';
BallTank.HABIT_DESELECTED = 'habitdeselected';
customElements.define('s-ball-tank', BallTank);