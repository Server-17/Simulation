// um das Programm zu starten, clicke auf "Go Live" in der unteren rechten Ecke
// Wenn sich nicht automatisch ein neuer Browser-Tab öffnet,
// klicke auf "Open Browser" im Pop-Up-Fenster
// Jede Änderung im Code wird automatisch im Browser angezeigt
// Du kannst dein Browserfenster neben deinem Codefenster platzieren,
// beides gelichzeitig zu sehen.

function setup() {
    // schreibe hier Code, der einmal ausgeführt werden soll
    background(220);

    //// Übung 6 P5

    // fill(0)
    // stroke("red")
    // let array = [1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1]
    // drawArray(array)

    ////Übung 1 Matrizen malen mit p5
    // let array2334 = ["blue", "red", "green", "orange", "green", "red", "blue"]
    // drawArray2(array2334)

    //Übung 3 Matrizen malen mit p5
    var  matrix = [
            ["#ffffff","#28B463","#2ECC71","#ffffff","#28B463","#641E16","#2ECC71","#ffffff","#28B463","#641E16","#ffffff","#28B463","#ffffff","#2874A6","#641E16","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff"],
            ["#ffffff","#28B463","#ffffff","#641E16","#2ECC71","#ffffff","#28B463","#ffffff","#6C3483","#ffffff","#28B463","#28B463","#2ECC71","#8E44AD","#28B463","#ffffff","#641E16","#641E16","#641E16","#641E16"],
            ["#2874A6","#2874A6","#ffffff","#6C3483","#641E16","#28B463","#E74C3C","#641E16","#E74C3C","#28B463","#8E44AD","#ffffff","#641E16","#6C3483","#28B463","#28B463","#ffffff","#ffffff","#ffffff","#ffffff"],
            ["#E74C3C","#2ECC71","#ffffff","#E74C3C","#641E16","#641E16","#E74C3C","#2874A6","#641E16","#E74C3C","#E74C3C","#E74C3C","#ffffff","#E74C3C","#E74C3C","#28B463","#ffffff","#2ECC71","#2874A6","#E74C3C"],
            ["#E74C3C","#E74C3C","#2ECC71","#E74C3C","#28B463","#8E44AD","#28B463","#2ECC71","#641E16","#E74C3C","#E74C3C","#28B463","#2ECC71","#DC7633","#ffffff","#28B463","#E74C3C","#ffffff","#28B463","#E74C3C"],
            ["#E74C3C","#641E16","#DC7633","#2ECC71","#E74C3C","#8E44AD","#641E16","#C0392B","#ffffff","#C0392B","#E74C3C","#C0392B","#ffffff","#C0392B","#C0392B","#2ECC71","#2ECC71","#C0392B","#641E16","#DC7633"],
            ["#2ECC71","#641E16","#E74C3C","#E74C3C","#C0392B","#E74C3C","#E74C3C","#2874A6","#2ECC71","#E74C3C","#28B463","#641E16","#2ECC71","#F7DC6F","#ffffff","#641E16","#2ECC71","#F7DC6F","#641E16","#2ECC71"],
            ["#2874A6","#2ECC71","#C0392B","#C0392B","#2ECC71","#E74C3C","#641E16","#E74C3C","#2ECC71","#2ECC71","#8E44AD","#F7DC6F","#2ECC71","#8E44AD","#2ECC71","#2874A6","#8E44AD","#2ECC71","#E74C3C","#ffffff"],
            ["#2ECC71","#E74C3C","#2874A6","#ffffff","#ffffff","#2ECC71","#E74C3C","#641E16","#E74C3C","#F7DC6F","#641E16","#641E16","#641E16","#6C3483","#E74C3C","#6C3483","#2ECC71","#6C3483","#2ECC71","#E74C3C"],
            ["#2ECC71","#6C3483","#E74C3C","#E74C3C","#2ECC71","#641E16","#641E16","#F7DC6F","#C0392B","#C0392B","#C0392B","#C0392B","#6C3483","#2ECC71","#2ECC71","#C0392B","#6C3483","#2ECC71","#ffffff","#F7DC6F"],
            ["#2ECC71","#2ECC71","#C0392B","#C0392B","#E74C3C","#2ECC71","#E74C3C","#F7DC6F","#E74C3C","#641E16","#C0392B","#2874A6","#6C3483","#2ECC71","#6C3483","#ffffff","#F7DC6F","#2ECC71","#E74C3C","#ffffff"],
            ["#2874A6","#2ECC71","#DC7633","#ffffff","#2ECC71","#ffffff","#F7DC6F","#6C3483","#6C3483","#C0392B","#641E16","#2ECC71","#641E16","#2ECC71","#E74C3C","#2ECC71","#2ECC71","#641E16","#DC7633","#2ECC71"],
            ["#2874A6","#ffffff","#2ECC71","#6C3483","#2874A6","#2ECC71","#2ECC71","#F7DC6F","#DC7633","#2ECC71","#2ECC71","#E74C3C","#E74C3C","#2ECC71","#F7DC6F","#641E16","#E74C3C","#E74C3C","#2ECC71","#641E16"],
            ["#ffffff","#2ECC71","#ffffff","#2874A6","#6C3483","#2ECC71","#2874A6","#C0392B","#E74C3C","#C0392B","#2ECC71","#2ECC71","#2ECC71","#F7DC6F","#2874A6","#2ECC71","#ffffff","#2ECC71","#6C3483","#2874A6"],
            ["#ffffff","#6C3483","#2ECC71","#2874A6","#2ECC71","#2ECC71","#2ECC71","#2874A6","#2ECC71","#F7DC6F","#2874A6","#E74C3C","#2ECC71","#F7DC6F","#ffffff","#641E16","#E74C3C","#2ECC71","#641E16","#2ECC71"],
            ["#6C3483","#6C3483","#ffffff","#ffffff","#2874A6","#ffffff","#6C3483","#2ECC71","#2ECC71","#99A3A4","#ffffff","#99A3A4","#F7DC6F","#6C3483","#99A3A4","#2ECC71","#99A3A4","#F7DC6F","#2ECC71","#E74C3C"],
            ["#2ECC71","#2ECC71","#C0392B","#2874A6","#6C3483","#99A3A4","#2ECC71","#2ECC71","#2ECC71","#6C3483","#6C3483","#2ECC71","#2ECC71","#6C3483","#ffffff","#6C3483","#2ECC71","#2ECC71","#ffffff","#ffffff"],
            ["#ffffff","#2874A6","#2ECC71","#2874A6","#2ECC71","#6C3483","#2ECC71","#2ECC71","#C0392B","#ffffff","#2ECC71","#2874A6","#F7DC6F","#2ECC71","#6C3483","#99A3A4","#99A3A4","#C0392B","#C0392B","#2ECC71"],
            ["#ffffff","#99A3A4","#99A3A4","#99A3A4","#2ECC71","#99A3A4","#C0392B","#99A3A4","#2ECC71","#2874A6","#99A3A4","#C0392B","#99A3A4","#2ECC71","#99A3A4","#2ECC71","#2ECC71","#2874A6","#99A3A4","#99A3A4"],
            ["#6C3483","#ffffff","#ffffff","#2ECC71","#2ECC71","#C0392B","#2ECC71","#C0392B","#C0392B","#C0392B","#C0392B","#2874A6","#C0392B","#F7DC6F","#ffffff","#ffffff","#C0392B","#ffffff","#C0392B","#ffffff"]
       ]
    Farbe =("white")
    //Bildmatrix(matrix)

    ////Übung 4 
    createCanvas(600, 600);

    ////a
    let matrix2 = createMatrixroteKästchen();
    //Bildmatrix(matrix2);
    Summe =0;

    ////b
    let matrixgrün = createMatrixgrüneKästchen()
    Bildmatrix(matrixgrün)

    ////c
    let matrixgelb = createMatrixgelbeKästchen()
    Bildmatrix(matrixgelb)
    //console.log(matrixgelb)
    Differenz=0

    ////d
    let matrixschachbrett = createMatrixSchachbrett()
    Division=0
    Bildmatrix(matrixschachbrett);

    ////e

    let MatrixBonus = createMatrixBonus()
    console.log(MatrixBonus)

    Summe2 =0
    Bildmatrix(MatrixBonus)


}

  function createMatrixroteKästchen() {
    let size = 8;
    let matrix = [];
    for (let i = 0; i < size; i++) {
        matrix.push([]);
        for (let j = 0; j < size; j++) {
            Summe=i+j
            if(Summe==7){
                matrix[i][j]="red";
            }

            else{
                matrix[i][j] = "grey";

            }
        }
    }
    return matrix;
}


function createMatrixgrüneKästchen() {
    let size = 8;
    let matrix = [];
    for (let i = 0; i < size; i++) {
        matrix.push([]);
        for (let j = 0; j < size; j++) {
            Summe=i-j
            if(Summe==0){
                matrix[i][j]="green";
            }

            else{
                matrix[i][j] = "grey";

            }
        }
    }
    return matrix;
}

function createMatrixgelbeKästchen() {
    let size = 8;
    let matrix = [];
    for (let i = 0; i < size; i++) {
        matrix.push([]);
        for (let j = 0; j < size; j++) {
            Differenz=7-i
            if(j<=Differenz){
                matrix[i][j]="yellow";
            }

            else{
                matrix[i][j] = "grey";

            }
        }
    }
    return matrix;
}

function createMatrixSchachbrett() {
    let size = 8;
    let matrix = [];
    for (let i = 0; i < size; i++) {
        matrix.push([]);
        for (let j = 0; j < size; j++) {
            Division= (i+j)%2
            if(Division==0){
                matrix[i][j]="black";
            }

            else{
                matrix[i][j] = "white";

            }
        }
    }
    return matrix;
}

function createMatrixBonus() {
    let size = 8;
    let matrix = [];
    for (let i = 0; i < size; i++) {
        matrix.push([]);
        for (let j = 0; j <8; j+=2) {
            Summe2 = j+1
            Division=(i+j+1)%2
            if(Division==0){
                matrix[i][j]="black";
                matrix[i][Summe2]="black"
            }

            else{
                matrix[i][j] = "white";
                matrix[i][Summe2]= "white";

            }
        }
    }
    return matrix;
}

function draw() {
    // der Code hier wird automatisch dauerhaft wiederholt
}

////Übung 6 P5
function drawArray(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == 1) {
            rect(i * 25, 0, 25, 25)
        }
    }
}
////Übung 1 Matrizen malen mit p5
function drawArray2(arr2) {
    for (var Zähler = 0; Zähler < arr2.length; Zähler++) {
        fill(arr2[Zähler])
        rect(Zähler * 50, 0, 50, 50)
    }
}
////Übung 3 Matrizen malen mit p5
function Bildmatrix(matrixeingabe) {
    for (var i = 0; i < matrixeingabe.length; i++) {
        for (var j = 0; j < matrixeingabe.length; j++) {
            Farbe = matrixeingabe[i][j]
            fill(matrixeingabe[i][j])
            rect(j * 25, i * 25, 25, 25)
        }
    }
}
