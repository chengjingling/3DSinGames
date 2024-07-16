/*
Extra features implemented:
1. Added a disco ball
- Applied ambient material only to the disco ball
- Applied 1x ambient light and 3x point lights to the disco ball
2. Added 2 sliders that can adjust the height of the cubes and the speed of the sine wave
*/

var distance;
var confLocs = [];
var confTheta = [];
var heightSlider;
var speedSlider;

function setup() {
    createCanvas(900, 800, WEBGL);
    
    for (var i = 0; i < 200; i++) {
        // push random locations into confLocs array
        confLocs.push(createVector(random(-500, 501), random(-800, 1), random(-500, 501)));
        
        // push random angles into confTheta array
        confTheta.push(random(361));
    }
    
    // slider to adjust height of cubes
    heightSlider = createSlider(300, 700, 300, 100);
    heightSlider.position(720, 40);
    heightSlider.style("width", "140px");
    
    // slider to adjust speed of sine wave
    speedSlider = createSlider(1, 20, 1, 0);
    speedSlider.position(720, 90);
    speedSlider.style("width", "140px");
}

function draw() {
    background(125);
    angleMode(DEGREES);
    
    // make camera fly around structure
    var xLoc = cos(frameCount / 2) * height * 1.5;
    var yLoc = -1000;
    var zLoc = sin(frameCount / 2) * height * 1.5;
    camera(xLoc, yLoc, zLoc);
    
    // set material, stroke, stroke weight
    normalMaterial();
    stroke(0);
    strokeWeight(2);
    
    // create a grid of boxes
    for (var x = -400; x < 400; x += 50) {
        for (var z = -400; z < 400; z += 50) {            
            // calculate distance of box from centre of coordinate system
            distance = dist(0, 0, x, z);
            
            // calculate length to use as height of box
            length = map(sin(distance + frameCount * speedSlider.value()), -1, 1, 100, heightSlider.value());
            
            // draw box
            push();
            translate(x, 0, z);  
            box(50, length, 50);
            pop();
        }
    }
    
    // draw confetti
    confetti();
    
    // draw disco ball
    discoBall();
    
    // text for heightSlider
    var span = createSpan("Adjust height of cubes:");
    span.position(720, 15);
    
    // text for speedSlider
    var span = createSpan("Adjust speed of sine wave:");
    span.position(720, 65);
}

function confetti() {
    for (var i = 0; i < confLocs.length; i++) {
        // create confetti
        push();
        translate(confLocs[i]);
        rotateX(confTheta[i]);
        noStroke();
        plane(15);
        pop();
        
        // make confetti fall downwards
        confLocs[i].y += 1;
        
        // make confetti rotate
        confTheta[i] += 10;
        
        if (confLocs[i].y > 0) {
            confLocs[i].y = -800;
        }
    }
}

function discoBall() {
    push();
    
    // position of disco ball
    translate(0, -600, 0);
    
    // make disco ball white to reflect all colours
    ambientMaterial(255);
    
    // apply grey ambient light on disco ball
    ambientLight(125);
    
    // apply multiple colours of point light in random directions and at different speeds
    pointLight(255, 0, 0, cos(frameCount / 2) * height * 1.5, -500, sin(frameCount / 2) * height * 1.5);
    pointLight(0, 255, 0, cos(frameCount * 2) * height * 1.5, 0, sin(frameCount) * height * 1.5);
    pointLight(0, 0, 255, -cos(frameCount * 2) * height, 0, sin(frameCount) * height);
    
    // create disco ball
    sphere(80);
    line(0, -200, 0, 0, 0, 0);
    
    pop();
}