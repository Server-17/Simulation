let blockSize = 50;
let matrixSize = 5;

class Empty { constructor() { this.color = "white" } }
class Red { constructor() { this.color = "red" } }
class Green { constructor() { this.color = "green" } }
class Yellow { constructor() { this.color = "yellow" } }

let matrix = [
    [new Empty(), new Empty(), new Green(), new Empty(), new Empty()],
    [new Green(), new Green(), new Empty(), new Red(), new Empty()],
    [new Empty(), new Red(), new Yellow(), new Green(), new Empty()],
    [new Empty(), new Red(), new Empty(), new Empty(), new Green()],
    [new Green(), new Empty(), new Empty(), new Empty(), new Empty()],
]

function setup() {
    createCanvas(500, 500);
    translate(100, 100);
    drawMatrix(matrix);

    // Hier verändern, um verschiedene Positionen zu testen
    let row = 2;
    let col = 1;
    let distance = 2;

    visualizeSearchRange(row, col, distance);
    let neighbours = findNeighbourPositions(row, col, distance);
    visualizeNeighbourPositions(neighbours);
}

function drawMatrix(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            fill(matrix[i][j].color || "white");
            rect(j * blockSize, i * blockSize, blockSize, blockSize);
        }
    }
}

function visualizeNeighbourPositions(neighbours) {
    fill("orange");
    for (let neighbour of neighbours) {
        ellipse((neighbour[1] + 0.5) * blockSize, (neighbour[0] + 0.5) * blockSize, blockSize * 0.5, blockSize * 0.5);
    }
}

function visualizeSearchRange(row, col, distance) {
    stroke("blue");
    noFill();
    strokeWeight(6);
    blocks = distance * 2 + 1;
    rect((col - distance) * blockSize, (row - distance) * blockSize, blocks * blockSize, blocks * blockSize);
    rect(col * blockSize, row * blockSize, blockSize, blockSize);
    strokeWeight(1);
}