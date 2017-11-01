import Matter from './../../node_modules/matter-js/build/matter-dev.js';

export default class TankWalls{
    
    constructor(world){
        this.width = window.innerWidth;
        this.height = window.innerHeight;


        let groundThickness = 100;
        var ground = Matter.Bodies.rectangle(
            window.innerWidth/2, 
            window.innerHeight+(groundThickness/2), 
            window.innerWidth + groundThickness, // extend the walls beyon the screen to catch diagonal throws 
            groundThickness, 
            { 
                restitution: 1,
                isStatic: true
            }
        );

        var roof = Matter.Bodies.rectangle(
            window.innerWidth/2, 
            -(groundThickness/2), 
            window.innerWidth + groundThickness, 
            groundThickness, 
            { 
                restitution: 1,
                isStatic: true
            }
        );

        var leftWall = Matter.Bodies.rectangle(
            -(groundThickness/2), 
            window.innerHeight/2,
            groundThickness, 
            window.innerHeight, 
            { 
                restitution: 1,
                isStatic: true
            }
        );

        var rightWall = Matter.Bodies.rectangle(
            window.innerWidth+(groundThickness/2), 
            window.innerHeight/2,
            groundThickness, 
            window.innerHeight, 
            { 
                restitution: 1,
                isStatic: true
            }
        );

        // add all of the bodies to the world
        Matter.World.add(world, [ 
            ground, 
            roof,
            leftWall,
            rightWall
        ]);
    }
}