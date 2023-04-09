// function setup() {
//   let canvas = createCanvas(windowWidth, windowHeight);
//   canvas.id("myCanvas"); // Assign an ID to the canvas for CSS targeting
//   // canvas.parent("jimjam");
// }

// function draw() {
//   background(220);
//   background(220);
//   fill(255, 0, 0);
//   rect(
//     windowWidth - windowWidth + 100,
//     windowHeight - windowHeight + 100,
//     100,
//     100
//   );
// }

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight); // Resize the canvas when the window is resized
// }

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.id("myCanvas"); // Assign an ID to the canvas for CSS targeting
}

function draw() {
  background(0, 20, 20);
  fill(255, 0, 0);
  rect(
    windowWidth - windowWidth + 100,
    windowHeight - windowHeight + 100,
    100,
    100
  );
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Resize the canvas when the window is resized
}
