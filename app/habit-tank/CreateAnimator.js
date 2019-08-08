import './../node_modules/matter-js/build/matter-dev.js';

const smallBodySize = 4;

export default class CreateAnimator{
    constructor(world, downPoint){
        this._boundingRectWidth = 200;
        this._smallBodies = [];
        this._fingerOffset = 50;
        this._world = world;
        this._downPoint = downPoint;
        
        this._boundingRect = {
            x: downPoint.x - this._boundingRectWidth/2,
            y: downPoint.y - this._boundingRectWidth/2,
            width: this._boundingRectWidth,
            height: this._boundingRectWidth,
        };
        
        // Create a static point at the downpoint
        this.gravityPoint = Matter.Bodies.circle(
            downPoint.x, 
            downPoint.y - this._fingerOffset, 
            2,
            { 
                isStatic: true,
                plugin: {
                  attractors: [
                      (bodyA, bodyB) => {
                        if(this._smallBodies.includes(bodyB)){
                            return {
                              x: (bodyA.position.x - bodyB.position.x) * 1.8e-6,
                              y: (bodyA.position.y - bodyB.position.y) * 1.8e-6,
                            };    
                        }
                      }
                  ]
                }
            },
        );

        Matter.World.add(this._world, this.gravityPoint);

        // Create a loop over 2 seconds of small bodies being created
        // and attracted to the static point
        this._intervalId = setInterval(_ => {
            if(this._isRemoved)
                return clearInterval(this._intervalId);

            this._createSmallBody()
            if(this._smallBodies.length > 10){
                clearInterval(this._intervalId);
            }
        }, 100)
    }

    _createSmallBody(){
        const randomX = Math.random() * this._boundingRect.width + this._boundingRect.x;
        const randomY = Math.random() * this._boundingRect.width + this._boundingRect.y;


        const smallBody = Matter.Bodies.circle(
            randomX < 20 ? randomX + 20 : randomX, 
            randomY < 20 ? randomY + 20 : randomY,
            smallBodySize,
            {
                render:{
                    fillStyle: '#d8d9d8'
                }
            }
        );

        this._smallBodies.push(smallBody);
        Matter.World.add(this._world, [smallBody]);
    }

    remove(){
        this._isRemoved = true;
        Matter.Composite.remove(this._world, this.gravityPoint);

        this._smallBodies.forEach(body => {
            this.animateOut(body)
        })
    }

    animateOut(body){
        const intervalId = setInterval(_ => {
                
            if(body.circleRadius < 1){
                clearInterval(intervalId);
                Matter.Composite.remove(this._world, body);
            }else{
                Matter.Body.scale(body, 0.90, 0.90);
            }
        }, 16)
    }
}