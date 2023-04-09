function setup() {
  createCanvas(400, 400);
  // Start AudioContext in response to user gesture
  document.addEventListener("click", function () {
    getAudioContext().resume();
  });
}

function draw() {
  background(220);
  fill(255, 0, 0);
  rect(100, 100, 100, 100);
}
