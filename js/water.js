{\rtf1\ansi\ansicpg1252\cocoartf1671\cocoasubrtf600
{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww28600\viewh15320\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 class Droplet \{\
  //creates droplet\
  constructor(xval, yval) \{\
    //creates x,y, and diameter properties of droplet\
    this.x = xval;\
    this.y = yval;\
    this.diameter = 10;\
    this.speed = 1\
    this.falling = true;\
    this.count=0;\
    this.bottom =height-17;\
  \}\
\
  run() \{\
    this.checkIfFalling();\
    this.fall();\
    this.display();\
  \}\
\
  fall() \{\
    if (this.falling) \{\
      this.y += 2;\
    \}\
    this.move();\
  \}\
  \
  checkIfFalling()\{\
    if(this.y>this.bottom)\{\
      this.count++;\
    \}\
    if(this.count>0)\{\
      this.falling=false;\
    \}\
  \}\
  move()\{\
    this.x += random(-this.speed, this.speed);\
  \}\
\
  display() \{\
    stroke(0,150,220);\
    circle(this.x, this.y, this.diameter);\
  \}\
  \
\
\}\
\
\
//creates system of droplets\
\
class DropSystem\{\
  constructor()\{\
    this.dropsystem = [];\
    this.length =0;\
  \}\
  \
  addNewDrop(drop)\{\
    this.dropsystem[this.length] = drop;\
    this.length++;\
  \}\
  greatestY()\{\
    \
  \}\
  \
  runDrops()\{\
    for (let j = 0; j < this.length; j++) \{\
      this.dropsystem[j].run();\
    \}\
  \}\
  \
  \
\}\
\
let system = new DropSystem();\
\
function setup() \{\
  createCanvas(windowWidth, windowHeight);\
\}\
\
\
function draw() \{\
  background('white');\
  //creates new background on every draw to create falling\
  \
  //creates bottom 'floor' of structure\
  push()\
  stroke("green");\
  strokeWeight(15);\
  line(0,height, width, height);\
  pop()\
\
  system.runDrops();\
  \
  for(let i=0;i<width;i++)\{\
    let size\
  \}\
  \
  \
  \
\
  \
  \
\
  //when the mouse is pressed is calls the function to create a droplet\
  if (mouseIsPressed === true) \{\
      system.addNewDrop(new Droplet(random(mouseX - 20, mouseX + 20), random(mouseY - 20, mouseY + 20)) ); //droplet is created anywhere 20 pixels around the circle\
    //changes drops position and displays \
    \
  \}\
  \
  \
\
 \
\}\
\
\
\
\
\
}