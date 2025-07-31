var Jahreszeit = 1    // 1 Sommer; 2 Winter;3 Herbst
// Startenergie: Jedes Gras beginnt mit einer zufälligen Energiemenge zwischen 0 und 2.
// Energiegewinn: In jedem Zyklus (Frame) erhöht sich die Energie des Grases um 1.
// Fortpflanzung: Erreicht das Gras eine Energie von 7 oder mehr, pflanzt es sich fort.
//     Es sucht in seiner unmittelbaren Umgebung (Nachbarfelder) nach leeren Feldern.
//     Wenn leere Felder vorhanden sind, wird zufällig eines ausgewählt.
//     Auf diesem leeren Feld wird ein neues Grasobjekt erstellt.
//     Die Energie des ursprünglichen Grases wird nach der Fortpflanzung auf 0 zurückgesetzt.


// Startenergie: Jeder Grasfresser beginnt mit einer Energie von 5.
// Nahrungssuche: In jedem Zyklus sucht der Grasfresser in seiner unmittelbaren Umgebung nach Nahrung.
//     Gras gefunden:
//         Der Grasfresser bewegt sich auf das Feld, auf dem sich das Gras befindet.
//         Dadurch wird das Gras "gefressen" und der Grasfresser erhält 1 Energiepunkt dazu.
//     Kein Gras gefunden:
//         Der Grasfresser sucht nach einem leeren Feld in seiner Umgebung.
//         Wenn ein leeres Feld gefunden wird, bewegt sich der Grasfresser dorthin.
//         Da keine Nahrung gefunden wurde, verliert der Grasfresser 1 Energiepunkt.
// Fortpflanzung: Erreicht der Grasfresser eine Energie von 10 oder mehr, pflanzt er sich fort.
//     Er sucht nach einem leeren Feld in seiner Umgebung.
//     Wenn ein leeres Feld gefunden wird, wird dort ein neuer Grasfresser erstellt.
//     Der ursprüngliche Grasfresser verliert 5 Energiepunkte durch die Fortpflanzung.
// Tod: Sinkt die Energie des Grasfressers auf 0 oder weniger, stirbt er und das Feld, auf dem er sich befand, wird leer.


// Startenergie: Jeder Fleischfresser beginnt mit einer Energie von 100.
// Nahrungssuche: In jedem Zyklus sucht der Fleischfresser in seiner unmittelbaren Umgebung nach Nahrung.
//     Grasfresser gefunden:
//         Der Fleischfresser bewegt sich auf das Feld, auf dem sich der Grasfresser befindet.
//         Dadurch wird der Grasfresser "gefressen" und der Fleischfresser erhält 10 Energiepunkte dazu.
//     Kein Grasfresser gefunden:
//         Der Fleischfresser kann kein leeres Feld suchen, sondern verliert 1 Energiepunkt.
// Fortpflanzung: Erreicht der Fleischfresser eine Energie von 120 oder mehr, pflanzt er sich fort.
//     Er sucht nach einem leeren Feld in seiner Umgebung.
//     Wenn ein leeres Feld gefunden wird, wird dort ein neuer Fleischfresser erstellt.
//     Der ursprüngliche Fleischfresser verliert 100 Energiepunkte durch die Fortpflanzung.
// Tod: Sinkt die Energie des Fleischfressers auf 0 oder weniger, stirbt er und das Feld, auf dem er sich befand, wird leer.

let backgroundColor = "#cccccc"; // Hintergrundfarbe der Zeichenfläche
let matrix = []; // Liste von Listen. Enthält alle Kreaturen.
let matrixSize = 80; // Größe der Matrix, Anzahl der Zellen in Breite und Höhe
let blockSize = 10; // Anzeigengröße in Pixeln für jede Zelle

// Wahrscheinlichkeit, mit der jede Kreatur erstellt wird
let creatureProbabilities = [
    [Grass, 0.25],       // Gras: 25%
    [GrassEater, 0.05],  // Grasfresser: 5%
    [MeatEater, 0.02],   // Fleischfresser: 2%
    [Flussbauer, 0.001],  // Schiffbauer 1%;
    [Meteroiteneinschläge, 0.001], // 0,001 %;
    [Mensch, 0.0025]
]

// Wählt basierend auf den Wahrscheinlichkeiten zufällig eine Kreatur aus
function getRandomCreature() {
    let rand = random(); // Zufallszahl zwischen 0 und 1
    let sum = 0;
    for (let i = 0; i < creatureProbabilities.length; i++) {
        let creatureClass = creatureProbabilities[i][0];
        let probability = creatureProbabilities[i][1];
        sum += probability; // Summiert die Wahrscheinlichkeiten
        if (rand < sum) {   // Wenn die Zufallszahl kleiner ist, wähle diese Kreatur
            return new creatureClass();
        }
    }
    return new Empty(); // Wenn keine andere Bedingung zutrifft, wird ein leeres Feld zurückgegeben
}

// Füllt die Matrix zufällig mit Kreaturen basierend auf den Wahrscheinlichkeiten
function fillRandomMatrix() {
    matrix = []
    for (let i = 0; i < matrixSize; i++) {
        matrix.push([])
        for (let j = 0; j < matrixSize; j++) {
            let creature = getRandomCreature()
            matrix[i].push(creature)
        }
    }
}

// Aktualisiert die Position einer Kreatur in der Matrix
// Erstellt ein neues leeres Objekt an der alten Position
function updateCreaturePosition(creature, newPos) {
    if (matrix[creature.row][creature.col] !== creature) {
        let creatureType = creature.constructor.name;
        let message = `Ein ${creatureType}-Kreatur soll bewegt werden, aber befindet sich nicht mehr in der Matrix.\
Das liegt wahrscheinlich daran, dass sie zuvor "gestorben" ist und die Position bereits\
von einer anderen Kreatur eingenommen wurde. Nachdem eine Kreatur "stirbt", sollte sie\
sich nicht mehr bewegen. Wahrscheinlich hast du die Logik fürs sterben vor der logik fürs\
fressen/bewegen in der step() Methode. Versuche, die Logik fürs sterben ganz ans Ende der\
step() Methode zu verschieben oder verwende ein return, um die Methode nach dem Sterben zu beenden.`;
        throw new Error(message);
    }
    matrix[newPos.row][newPos.col] = creature;
    matrix[creature.row][creature.col] = new Empty();
    creature.row = newPos.row;
    creature.col = newPos.col;
}

// Für eine gegebene Position werden alle Nachbarpositionen gesucht,
// die einen bestimmten Kreaturentyp enthalten und innerhalb einer bestimmten Distanz liegen
// Gibt eine Liste von Objekten zurück, die jeweils eine row und col-Eigenschaft haben
// Beispiel: findNeighbourPositions(10, 10, 1, Empty) gibt alle leeren Zellen
// um die Position 10, 10 im Abstand von 1 zurück.
// Wenn alle Zellen leer sind, wird [{row: 9, col: 9}, {row: 9, col: 10}, {row: 9, col: 11}, {row: 10, col: 9}, {row: 10, col: 11}, {row: 11, col: 9}, {row: 11, col: 10}, {row: 11, col: 11}] zurückgegeben
function findNeighbourPositions(row, col, distance, Feldtyp) {
    let l = []
    for (let i = row - distance; i <= row + distance; i++) {
        for (let j = col - distance; j <= col + distance; j++) {
            let isInMatrix = i >= 0 && j >= 0 && i < matrixSize && j < matrixSize
            if ((i != row || j != col) && isInMatrix && matrix[i][j] instanceof Feldtyp) {
                let pos = { row: i, col: j }
                l.push(pos)
            }
        }
    }
    return l
}

// Variablen zur Statistik
var Anzahl;
var Anzahl2;
var Anzahl3;
var Anzahl4;
var Anzahl5;
var Anzahl6;
var GrassAnzahl=0
var GrassEaterAnzahl=0
var MeatEaterAnzahl=0
var EmptyAnzahl=0
var MenschenAnzahl=0
var MeteoritenAnzahl =0
var Flussbaueranzahl=0
var blackEmptyanzahl=0
var Main = document.getElementById("main")



// Initialisiert die Zeichenfläche und füllt die Matrix mit Kreaturen
// Wird einmal beim Start aufgerufen
function setup() {
    createCanvas(matrixSize * blockSize, matrixSize * blockSize); // Zeichenfläche erstellen
    fillRandomMatrix(); // Matrix zufällig füllen
    noStroke(); // Keine Umrandungen für Rechtecke
    frameRate(30); // Bildrate auf 30 Frame pro Sekunde setzen

    var zufälligeAuslöschungeinesWesens = document.getElementById("zufAuseinesWese")
    zufälligeAuslöschungeinesWesens.addEventListener("click", Auslöschung)

    var Neustart = document.getElementById("Neustart")
    Neustart.addEventListener("click", Start)

    var Winterbutton = document.getElementById("Winterbutton")
    Winterbutton.addEventListener("click", () => {
        Buttonzurücksetzen()
        Winter()
    })
    var Sommerbutton = document.getElementById("Sommerbutton")
    Sommerbutton.addEventListener("click", () => {
        Buttonzurücksetzen()
        Sommer()
    })
    var Herbstbutton = document.getElementById("Herbstbutton")
    Herbstbutton.addEventListener("click", function () {
        Buttonzurücksetzen()
        Herbst()
    })

    var Text = document.getElementById("Text")

    function Winter() {
        Text.innerHTML = "Das ist eine Simulation einer Wiese, die von Kraturen die Grass verschlingen zerlegt wird. Dabei gibt es <br> auch andere Kreaturen, die die Grassfressenden Kreaturen essen. Außerdem schlagen dauernd Meteroit-<br>en in die Landschaft ein, währens Flussbauer dauernd die Landschaft durchqueren und Flüsse bauen wollen.<br> <strong>Nun bricht der Winter an!!! </strong>"
        Jahreszeit = 2
        console.log("Die Jahreszeit ist Momentan:" + Jahreszeit + " 1=Sommer; 2=Winter; 3=Herbst")
        Winterbutton.style.borderColor = "red"
    }
    function Sommer() {
        Text.innerHTML = "Das ist eine Simulation einer Wiese, die von Kraturen die Grass verschlingen zerlegt wird. Dabei gibt es <br> auch andere Kreaturen, die die Grassfressenden Kreaturen essen. Außerdem schlagen dauernd Meteroit-<br>en in die Landschaft ein, währens Flussbauer dauernd die Landschaft durchqueren und Flüsse bauen wollen. <br><em><strong>Noch ist Sommer!!! </strong><em>"
        Jahreszeit = 1
        console.log("Die Jahreszeit ist Momentan:" + Jahreszeit + " 1=Sommer; 2=Winter; 3=Herbst")
        Sommerbutton.style.borderColor = "red"
    }
    function Herbst() {
        Text.innerHTML = "Das ist eine Simulation einer Wiese, die von Kraturen die Grass verschlingen zerlegt wird. Dabei gibt es <br> auch andere Kreaturen, die die Grassfressenden Kreaturen essen. Außerdem schlagen dauernd Meteroit-<br>en in die Landschaft ein, währens Flussbauer dauernd die Landschaft durchqueren und Flüsse bauen wollen. <br><em><strong>Im Herbst ist das Wetter wechselhaft!!! </strong><em>"
        Jahreszeit = 3
        console.log("Die Jahreszeit ist Momentan:" + Jahreszeit + " 1=Sommer; 2=Winter; 3=Herbst")
        Herbstbutton.style.borderColor = "red"
    }
    function Buttonzurücksetzen() {
        Herbstbutton.style.borderColor = "black"
        Sommerbutton.style.borderColor = "black"
        Winterbutton.style.borderColor = "black"
    }


    function Auslöschung() {
        //console.log("ok")
        var Wesen2 = []
        for (var i = 0; i < matrix.length; i++) {
            for (j = 0; j < matrixSize; j++) {
                let classname = matrix[i][j].constructor.name
                if ((!Wesen2.includes(classname)) && classname != "Empty"){
                    Wesen2.push(classname)
                }
            }
        }
        
        var zufall = random(Wesen2)
        
        for (var i = 0; i < matrix.length; i++) {
            for (j = 0; j < matrixSize; j++) {
                if (matrix[i][j].constructor.name == zufall) {
                    matrix[i][j] = new Empty()
                }
            }
        }
    }

    function bestimmteEntfernung(bestimmt){
        for (var i = 0; i < matrix.length; i++) {
            for (j = 0; j < matrixSize; j++) {
                if (matrix[i][j] instanceof bestimmt) {
                    matrix[i][j] = new Empty()
                }
            }
        }
    }


    function Start() {
        // creatureProbabilities = [
        //     [Grass, 0.25],       // Gras: 25%
        //     [GrassEater, 0.05],  // Grasfresser: 5%
        //     [MeatEater, 0.02],   // Fleischfresser: 2%
        //     [Flussbauer, 0.001],  // Schiffbauer 1%;
        //     [Meteroiteneinschläge, 0.001], // 0,001 %;
        //     [Mensch, 0.0025]
        // ]
        Text.innerHTML="Das ist eine Simulation einer Wiese, die von Kraturen die Grass verschlingen zerlegt wird. Dabei gibt es <br> auch andere Kreaturen, die die Grassfressenden Kreaturen essen. Außerdem schlagen dauernd Meteroit-<br>en in die Landschaft ein, währens Flussbauer dauernd die Landschaft durchqueren und Flüsse bauen wollen."
        Buttonzurücksetzen()
        Jahreszeit = 1
        fillRandomMatrix()

        
    }
    Anzahl= document.getElementById("Grassanzahl")
    Anzahl.addEventListener("click",()=>{
        bestimmteEntfernung(Grass)
        //Anzahl.innerHTML="Grass: wurden entfernt"
    })

    Anzahl2= document.getElementById("GrassEateranzahl")
    Anzahl2.addEventListener("click",()=>{
        bestimmteEntfernung(GrassEater)
        //Anzahl2.innerHTML="GrassEater: wurden entfernt"
    })
    Anzahl3= document.getElementById("MeatEateranzahl")
    Anzahl3.addEventListener("click",()=>{
        bestimmteEntfernung(MeatEater)
        //Anzahl3.innerHTML="MeatEater: wurden entfernt"
    })

    Anzahl4= document.getElementById("Emptyanzahl")
    Anzahl5= document.getElementById("Menschenanzahl")
    Anzahl5.addEventListener("click",()=>{
        bestimmteEntfernung(Mensch)
       //Anzahl5.innerHTML="Menschen: wurden entfernt"
    })
    Anzahl6= document.getElementById("Meteroitenanzahl")
    Anzahl6.addEventListener("click",()=>{
        bestimmteEntfernung(Meteroiteneinschläge)
        //Anzahl6.innerHTML="Meteoriten: wurden entfernt"
    })
    Anzahl7= document.getElementById("Flussbaueranzahl")
    Anzahl7.addEventListener("click",()=>{
        bestimmteEntfernung(Flussbauer)
        //Anzahl7.innerHTML="Flussbauer: wurden entfernt"
    })
    Anzahl8= document.getElementById("BlackEmptyanzahl")
}



// Spielschleife. Wird in jedem Frame aufgerufen
// Zeichnet die Matrix und aktualisiert die Kreaturen
function draw() {
    GrassAnzahl =0
    EmptyAnzahl =0
    GrassEaterAnzahl =0
    MenschenAnzahl=0
    MeatEaterAnzahl=0
    MeteoritenAnzahl=0
    Flussbaueranzahl=0
    blackEmptyanzahl=0
    background(backgroundColor); // Hintergrundfarbe festlegen
    for (let row = 0; row < matrixSize; row++) {
        for (let col = 0; col < matrixSize; col++) {
            let obj = matrix[row][col]; // Objekt an der aktuellen Position
            checkErrors(obj);

            // Zeile und Spalte der Kreatur setzen
            obj.row = row;
            obj.col = col;
            if(obj instanceof Grass ){
                GrassAnzahl++
            }
            if(obj instanceof GrassEater){
                GrassEaterAnzahl++
            } 
            if(obj instanceof Empty){
                EmptyAnzahl++
            }
            if(obj instanceof Mensch ){
                MenschenAnzahl++
            }
            if(obj instanceof MeatEater){
                MeatEaterAnzahl++
            }
            if(obj instanceof Meteroiteneinschläge ){
                MeteoritenAnzahl++
            }
            if(obj instanceof Flussbauer ){
                Flussbaueranzahl++
            }
            if(obj instanceof blackEmpty){
                blackEmptyanzahl++
            }



            // Verhindert, dass neu erstellte Kreaturen im gleichen Schritt aktualisiert werden
            // und dass Kreaturen, die sich bewegen, mehrfach in einem Frame aktualisiert werden
            if (obj.stepCount === frameCount) {

                obj.step(); // Kreatur führen ihren Schritt aus
                obj.stepCount++;
            }

            // Kreatur zeichnen
            fill(obj.color); // Farbe der Kreatur setzen
            rect(blockSize * col, blockSize * row, blockSize, blockSize); // Rechteck zeichnen
        }
    }
    
    
    var GrassAnzahl2= "Grass: " + GrassAnzahl
    Anzahl.innerHTML=GrassAnzahl2
    var GrassEaterAnzahl2= "GrassEater: " + GrassEaterAnzahl
    Anzahl2.innerHTML=GrassEaterAnzahl2
    var MeatEaterAnzahl2= "MeatEater: " + MeatEaterAnzahl
    Anzahl3.innerHTML=MeatEaterAnzahl2
    var EmptyAnzahl2= "Empty: " + EmptyAnzahl
    Anzahl4.innerHTML=EmptyAnzahl2
    var MenschenAnzahl2= "Menschen: " + MenschenAnzahl
    Anzahl5.innerHTML=MenschenAnzahl2
    var MeteoritenAnzahl2= "Meteoriten: " + MeteoritenAnzahl
    Anzahl6.innerHTML= MeteoritenAnzahl2
    var Flussbaueranzahl2= "Flussbauer: " + Flussbaueranzahl
    Anzahl7.innerHTML= Flussbaueranzahl2
    var blackEmptyAnzahl2= "BlackEmpty: " + blackEmptyanzahl
    Anzahl8.innerHTML= blackEmptyAnzahl2
   
}

function checkErrors(obj) {
    if (obj === undefined || obj === null) {
        throw new Error("Ein Element in der Matrix ist undefined oder null. Das sollte nicht passieren. Wenn an einer Stelle in der Matrix keine Kreatur ist, sollte dort ein Empty-Objekt sein.");
    }
    if (obj.row < 0 || obj.row >= matrixSize || obj.col < 0 || obj.col >= matrixSize) {
        throw new Error("Eine Kreatur vom Typ " + obj.constructor.name + " ist außerhalb der Matrix");
    }
    if (obj.stepCount === undefined || obj.stepCount === null) {
        throw new Error("Die Klasse " + obj.constructor.name + " hat keine stepCount-Eigenschaft. Jede Kreatur braucht eine solche Eigenschaft. Vielleicht hast du die Zeile 'this.stepCount = frameCount + 1;' im Konstruktor vergessen?");
    }
    if (obj.stepCount < frameCount) {
        throw new Error("Ein Objekt vom Typ " + obj.constructor.name + " hat einen stepCount-Wert, der kleiner ist als frameCount. Das sollte nicht passieren. Überprüfe, ob die Zeile 'this.stepCount = frameCount + 1;' im Konstruktor korrekt ist.");
    }
    if (obj.color === undefined || obj.color === null) {
        throw new Error("Die Klasse " + obj.constructor.name + " hat keine color-Eigenschaft. Jede Kreatur braucht eine solche Eigenschaft. Vielleicht hast du die Zeile 'this.color = ...;' im Konstruktor vergessen?");
    }
}

function moveTo(row, col, target, maxDistance, validStepsFunc){
    let allTargets = findNeighbourPositions(row, col, maxDistance, target)
    let sorted = allTargets.sort(function(a, b){
    let y1 = row-a.row
    let x1 = col-a.col
    let d1 = Math.sqrt(y1*y1 + x1*x1)
    
    let y2 = row-b.row
    let x2 = col-b.col
    let d2 = Math.sqrt(y2*y2 + x2*x2)
    
    return d1-d2
    })
    if(sorted.length > 0){
    let closestTarget = sorted[0]
    
    let rowDirection = constrain(closestTarget.row - row, -1, 1)
    let colDirection = constrain(closestTarget.col - col, -1, 1)
    
    
    let possibleSteps = findNeighbourPositions(row, col, 1, Object)
    let validSteps = possibleSteps.filter(validStepsFunc)
    let stepsInDirection = validSteps.filter(function(e){
    return (e.row-row == rowDirection) && (e.col - col == colDirection)
    })
    if(stepsInDirection.length > 0){
    let step = random(stepsInDirection)
    updateCreaturePosition(matrix[row][col], step)
    }
    }
    }