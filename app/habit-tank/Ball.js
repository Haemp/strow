import Matter from './../../node_modules/matter-js/build/matter-dev.js';
import MatterAttractors from './../../node_modules/matter-attractors/build/matter-attractors.js';
import HabitHelper from '../HabitHelper.js';
Matter.use(MatterAttractors);



export default class Ball{

    constructor(world, x, y, color, isDecaying){
        this._bodies = [];
        this._world = world;
        this._constraints = [];
        this.tickRadius = 5;
        let circleRadius = 20;
        this.circleRadius = circleRadius
        this._color = color;
        let bodyColor = color;
        if(isDecaying){
            bodyColor = 'gray';
        }

        let scaling = 0.2;
        this.circle = Matter.Bodies.circle(
            x, y-50, 5, 
            {
                restitution: 1,
                friction: 0,
                frictionStatic: 0,
                frictionAir: 0,
                density: 0.05,
                render: {
                    sprite: {
                        texture: './assets/'+bodyColor+'-sprite-r20.png',
                        yScale: scaling,
                        xScale: scaling,
                    }
                },

                plugin: {
                  attractors: [
                      (bodyA, bodyB) => {
                        if(this._bodies.includes(bodyB)){
                            return {
                              x: (bodyA.position.x - bodyB.position.x) * 1e-6,
                              y: (bodyA.position.y - bodyB.position.y) * 1e-6,
                            };    
                        }
                      }
                  ]
                }
            }
        );
        Matter.World.add(this._world, this.circle);
        
        // scale it up for an inflated effect
        var cancel = setInterval(_ => {
            if(this.circle.circleRadius >= this.circleRadius){
                clearInterval(cancel)
                this.circle.render.sprite.xScale = 1;
                this.circle.render.sprite.yScale = 1;
                // a gentle push after its finished inflating
                Matter.Body.applyForce(
                    this.circle, 
                    {
                        x:x, 
                        y:y
                    }, 
                    {
                        x: (Math.random() * 0.1)-0.05, 
                        y: (Math.random() * 0.1)-0.05, 
                    }
                );
            }else{
                Matter.Body.scale(this.circle, 1.05, 1.05)
                this.circle.render.sprite.xScale += .025;
                this.circle.render.sprite.yScale += .025;
            }
        }, 10)

        this.circle.ball = this;
        this._bodies.push(this.circle);
    }

    remove(){
        this._constraints.forEach(constraint => {
            Matter.Composite.remove(this._world, constraint);
        })
        
        const intervalId = setInterval(_ => {
                
            if(this.circle.circleRadius < 3){
                clearInterval(intervalId)

                this._bodies.forEach(body => {
                    Matter.Composite.remove(this._world, body);
                })
            }else{
                Matter.Body.scale(this.circle, 0.90, 0.90);
                this.circle.render.sprite.xScale -= .05;
                this.circle.render.sprite.yScale -= .05;
            }
        }, 16)
        
    }

    setSprite(color, blink){
        this.circle.render.sprite.texture = `./assets/${color}-sprite-r20${blink ? '-blink' : ''}.png`;
    }

    stopDecay(){
        this.setSprite(this._color);
    }

    setBlink(speed){

        // remove old blinking interval
        if(this._blinkIntervalId)
            this.stopBlink();

        // a decaying habit wont blink
        if(this.isDecaying) 
            return;

        this._blinkState = !this._blinkState;
        this._blinkIntervalId = setInterval(_ => {
            if(this._blinkState){
                this.setSprite(this._color, true)
            }else{
                this.setSprite(this._color, false)
            }

            this._blinkState = !this._blinkState;
        }, 1000 * speed)
    }

    stopBlink(){
        clearInterval(this._blinkIntervalId);
    }

    setTick(){
        // create a new red circle
        const orbit = this.circleRadius * 3;
        const tickCircle = Matter.Bodies.circle(
            this.circle.position.x + (orbit * 2 * Math.random()) - orbit, 
            this.circle.position.y + (orbit * 2 * Math.random()) - orbit, 
            this.tickRadius, 
            {
                restitution: 1,
                friction: 0,
                frictionStatic: 0,
                frictionAir: 0,
                density: 0.001,
                render: {
                    fillStyle: HabitHelper.getColorHex(this._color)
                }
            }
        );
        tickCircle.ball = this;

        this._bodies.push(tickCircle);

        Matter.World.add(this._world, [tickCircle]);
    }
}