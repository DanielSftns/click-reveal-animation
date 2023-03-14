let img;
let topImg;
let topLayer;

// #c3f1f1; b
// #fffeea; t

const section = document.querySelector('.section_home-hero')
const target = section.querySelector('.home-hero_img')
let targetData = target.getBoundingClientRect()
let cursor
let dimensions = {
  w: section.offsetWidth,
  h: section.offsetHeight
}

function preload() {
  img = loadImage("images/home-hero-bg-graphic-1.png");
  topImg = loadImage("images/de-new-york-2023.png");
}

function setup() {
  var canvas = createCanvas(dimensions.w, dimensions.h);
  canvas.parent('hero-animation')
  topLayer = createGraphics(width, height);
  
  topLayer.background('#fffeea');
  
  topLayer.image(topImg, targetData.x, targetData.y, targetData.width, targetData.height);

  topLayer.imageMode(CENTER);
  topLayer.strokeWeight(40);
  topLayer.blendMode(REMOVE);  
}

function draw() {
  background('#c3f1f1')
  const scaleImg = 1.18
  image(img, targetData.x * 0.7, 0, targetData.width * scaleImg, targetData.width * scaleImg / 0.5595);
  
  if(mouseIsPressed) {
    topLayer.line(pmouseX, pmouseY, mouseX, mouseY);
  }
  
  image(topLayer, 0, 0);
}

function windowResized() {
  dimensions.w = section.offsetWidth
  dimensions.h = section.offsetHeight
  targetData = target.getBoundingClientRect()
  resizeCanvas(dimensions.w, dimensions.h, true);
  setup()
}

function loadCursor (){
  section.style.overflow = 'hidden'
  section.style.position = 'relative'
  cursor = document.createElement('img')
  cursor.width = 80
  cursor.src = "images/cursor.png"
  cursor.classList.add('custom-cursor')
  section.appendChild(cursor)

  document.addEventListener('mousemove', e => {
    cursor.style.left = `${e.pageX}px`
    cursor.style.top = `${e.pageY - 10}px`
  })
}

loadCursor()

