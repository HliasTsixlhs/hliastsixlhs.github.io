

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1
  const yDist = y2 - y1

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
  // canvas.width=document.getElementsByClassName('intro-wrapper').getBoundingClientRect().width 
  // canvas.height=document.getElementsByClassName('intro-wrapper').getBoundingClientRect().height
  // canvas.width = innerWidth
  // canvas.height = innerHeight
  // canvas.width=document.getElementsByClassName('greeting-wrapper').getBoundingClientRect().width 
  // canvas.height=document.getElementsByClassName('greeting-wrapper').offsetHeight

    let elem1 = document.querySelector('div').getBoundingClientRect();
    canvas.height= elem1.height;
    let elem2 =  document.querySelector('section').getBoundingClientRect();
    canvas.width = elem2.width;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']


// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
   // canvas.width = innerWidth
  // canvas.height = innerHeight

    let elem1 = document.querySelector('div').getBoundingClientRect();
    canvas.height= elem1.height;
    let elem2 =  document.querySelector('section').getBoundingClientRect();
    canvas.width = elem2.width;



  init()
})

// Objects
class Particle {
  constructor(x, y, radius, color) {
    this.startx = x
    this.starty = y
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.radians = Math.random() * Math.PI * 2;
    this.velocity = 0.03;
    this.distanceFromCenterx = randomIntFromRange(25,75)
    this.distanceFromCentery = randomIntFromRange(25,75)
  }

  draw(lastPoint) {
    c.beginPath()
    // c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    // c.fillStyle = this.color
    c.strokeStyle = this.color;
    c.lineWidth = this.radius;
    c.moveTo(lastPoint.x,lastPoint.y);
    c.lineTo(this.x,this.y);
    c.stroke();
    c.closePath()
  }

  update() {
    const lastPoint = {x: this.x,y:this.y} 
    this.radians += this.velocity
    this.x = this.startx + Math.cos(this.radians) * this.distanceFromCenterx
    this.y = this.starty + Math.sin(this.radians) * this.distanceFromCenterx
    // console.log(Math.cos(this.radians) * 100)
    this.draw(lastPoint)
  }
}

// Implementation
let particles
function init() {
  const radius = (Math.random() * 2) + 1; 
  particles = []

  for (let i = 0; i < 125; i++) {
     particles.push(new Particle(canvas.width/2,canvas.height/2,radius,randomColor(colors)))
  }
}
// --mainColor:#eaeaea; white
//   --mainColor:#15202B; blue
//   --mainColor:#46344E;purple
//   --mainColor:#606B56;green

const backgroundColors = ['#eaeaea','#15202B','#606B56','#46344E']
// Animation Loop
function animate() {
  requestAnimationFrame(animate);
   // c.fillStyle = 'rgba(255, 255, 255, 0.05)';
   
  let theme = localStorage.getItem('theme')

  if(theme == 'light'){
    c.fillStyle = backgroundColors[0];
    c.fillStyle = 'rgba(255, 255, 255, 0.05)';
  }

  if(theme == 'blue'){
    c.fillStyle = backgroundColors[1];
    c.fillStyle = 'rgba(21, 32, 43, 0.07)';
  }

  if(theme == 'green'){
    c.fillStyle = backgroundColors[2];
    c.fillStyle = 'rgba(96, 107, 86, 0.09)';
  }

  if(theme == 'purple'){
    c.fillStyle = 'rgba(70, 52, 78, 0.09)';
  } 
  //c.fillStyle = 'blue'; 
   c.fillRect(0, 0, canvas.width, canvas.height)

  // c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
  particles.forEach(particle => {
    particle.update()
  })
}
// document.body.style.background = 'url(' + c.toDataURL() + ')';

function setDynamicBackground(){
  //generate the image from the canvas
  var imageDataURL = document.getElementsByTagName("canvas")[0].toDataURL();

  //set the dynamic image as the background
  document.body.style.background = 
   "transparent url('"+imageDataURL+"') repeat";
}
init()
animate()
