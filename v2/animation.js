let img;
let topImg;
let topLayer;

// #c3f1f1; b
// #fffeea; t

const section = document.querySelector('section')
const aspectRatio = 0.5916
let canPress = false

let dimensions = {
  w: section.offsetWidth,
  h: section.offsetHeight
}

function preload() {
  img = loadImage("./AfterScratch.webp");
  // topImg = loadImage("./AfterScratch.webp");
  topImg = loadImage("./BeforeScratch.webp");
  // img = loadImage("./BeforeScratch.webp");
}

let rect = {
  x: dimensions.w * 0.3955,
  y: dimensions.w * aspectRatio * 0.8218,
  width: dimensions.w * 0.2080,
  height: dimensions.w * aspectRatio * 0.0892,
};

console.log(rect.x / dimensions.w + '% - x')
console.log(rect.y / (dimensions.w * aspectRatio) + '% - y')
console.log(rect.width / dimensions.w + '% - w')
console.log(rect.height / (dimensions.w * aspectRatio) + '% - h')

function setup() {
  var canvas = createCanvas(dimensions.w, dimensions.w * aspectRatio);
  canvas.parent('hero-animation')
  topLayer = createGraphics(width, height);
  
  topLayer.background('#fffeea');
  
  topLayer.image(topImg, 0, 0, dimensions.w, dimensions.w * aspectRatio);
  // const btn = topLayer.rect(rect.x, rect.y, rect.width, rect.height)
  // btn.mouseClicked(function (){
  //   console.log('mouse over')
  // })
  topLayer.imageMode(CENTER);
  topLayer.strokeWeight(40);
  topLayer.blendMode(REMOVE);  
}

function draw() {
  // background('#c3f1f1')
  image(img, 0, 0, dimensions.w, dimensions.w * aspectRatio);
  
  if(mouseIsPressed) {
    topLayer.line(pmouseX, pmouseY, mouseX, mouseY);
    if(isInside({ x: mouseX, y: mouseY }, rect)) {
      canPress = true
    }
  }
  
  image(topLayer, 0, 0);
}

let count = 0
function mouseClicked(event) {
  if (count >= 1) {
    console.log(isInside(event, rect))
  }
  if (canPress) {
    console.log('active link')
    count ++
    const exist = section.querySelector('a')
    if (exist) return
    const link = document.createElement('a')
    link.href = '#cool'
    link.style.display = 'block'
    link.style.position = 'absolute'
    link.style.left = rect.x + 'px'
    link.style.top = rect.y + 'px'
    link.style.width = rect.width + 'px'
    link.style.height = rect.height + 'px'

    section.appendChild(link)
  }
}

function isInside(pos, rect) {
  return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.height && pos.y > rect.y
}

function windowResized() {
  dimensions.w = section.offsetWidth
  dimensions.h = section.offsetHeight
  rect = {
    x: dimensions.w * 0.3955,
    y: dimensions.w * aspectRatio * 0.8218,
    width: dimensions.w * 0.2080,
    height: dimensions.w * aspectRatio * 0.0892,
  };
  resizeCanvas(dimensions.w, dimensions.w * aspectRatio, true);
  const link = section.querySelector('a')
  if (!link) return
  link.remove()
  setup()
}

// function loadCursor (){
//   section.style.overflow = 'hidden'
//   section.style.position = 'relative'
//   cursor = document.createElement('img')
//   cursor.width = 80
//   cursor.src = "images/cursor.png"
//   cursor.classList.add('custom-cursor')
//   section.appendChild(cursor)

//   document.addEventListener('mousemove', e => {
//     cursor.style.left = `${e.pageX}px`
//     cursor.style.top = `${e.pageY - 10}px`
//   })
// }

// loadCursor()
