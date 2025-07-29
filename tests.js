let blockSize = 10;
let matrixSize = 50;

class Empty { constructor() { this.color = "white" } }
class Grass { constructor() { this.color = "green" } }
class GrassEater { constructor() { this.color = "yellow" } }
class MeatEater { constructor() { this.color = "red" } }


let matrix = []

function setup() {
    matrix = fillRandomMatrix(matrixSize, matrix)
    createCanvas(500, 500);
    translate(100, 100);
    drawMatrix(matrix);

    // Hier verändern, um verschiedene Positionen zu testen
    let row = 2;
    let col = 1;
    let distance = 2;
    let Feldtyp = GrassEater
    console.log(matrix)

    visualizeSearchRange(row, col, distance);

    // Hier für Aufgabe 2 verändern. Z.B. findNeighbourPositions(row, col, distance, GrassEater)
    let neighbours = findNeighbourPositions(row, col, distance, Feldtyp);
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
        ellipse((neighbour.col + 0.5) * blockSize, (neighbour.row + 0.5) * blockSize, blockSize * 0.5, blockSize * 0.5);
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


function findNeighbourPositions(row, col, distance, Feldtyp) {
    let l = []
    for (let i = row - distance; i <= row + distance; i++) {
        for (let j = col - distance; j <= col + distance; j++) {
            let isInMatrix = i >= 0 && j >= 0 && i < matrixSize && j < matrixSize
            if ((i != row || j != col) && isInMatrix && matrix [i][j] instanceof Feldtyp) {
                let pos = { row: i, col: j }
                l.push(pos)
            }
        }
    }
    return l
}

// What probability each creature has to be created
let creaturePropabilities = [
    [Grass, 0.25],   //// originale Wahrscheinlichkeit = 0,25
    [GrassEater, 0.05], ////originale Wahrscheinlicheit = 0.05
    [MeatEater, 0.02], ///originale Wahrscheinlichkeit =0.02
];

// Choose a random creature based on the probabilities
function getRandomCreature() {
    let rand = random();
    let sum = 0;
    for (let i = 0; i < creaturePropabilities.length; i++) {
        let creatureCLass = creaturePropabilities[i][0];
        let propability = creaturePropabilities[i][1];
        sum += propability;
        if (rand < sum) {
            return new creatureCLass();
        }
    }
    return new Empty();
}

function fillRandomMatrix(matrixSize,Sammlung){
    for(var i =0; i<matrixSize;i++){
        Sammlung.push([])
        for(var j =0;j<matrixSize;j++){
            Sammlung[i][j]= getRandomCreature()
            

        }
    }
    return Sammlung
}
