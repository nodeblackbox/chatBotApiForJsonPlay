function setup() {
  createCanvas(windowWidth, windowHeight);
  // Start AudioContext in response to user gesture
  document.addEventListener("click", function () {
    getAudioContext().resume();
  });
  // canvas.parent("jimjam");
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function draw() {
  background(220);
  fill(255, 0, 0);
  rect(100, 100, 100, 100);
}
