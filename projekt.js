class Empty {
    constructor() {
        this.stepCount = frameCount + 1;         // Jede Kreatur braucht diese Zeile
        this.color = backgroundColor;            // Jede Kreatur braucht eine Farbe
    }

    step() {
        // Leere Felder machen nichts
    }
}

class blackEmpty {
    constructor() {
        this.stepCount = frameCount + 1;         // Jede Kreatur braucht diese Zeile
        this.color = "black";            // Jede Kreatur braucht eine Farbe
    }

    step() {
        // Leere Felder machen nichts
    }
}


// Startenergie: Jedes Gras beginnt mit einer zufälligen Energiemenge zwischen 0 und 2.
// Energiegewinn: In jedem Zyklus (Frame) erhöht sich die Energie des Grases um 1.
// Fortpflanzung: Erreicht das Gras eine Energie von 7 oder mehr, pflanzt es sich fort.
//     Es sucht in seiner unmittelbaren Umgebung (Nachbarfelder) nach leeren Feldern.
//     Wenn leere Felder vorhanden sind, wird zufällig eines ausgewählt.
//     Auf diesem leeren Feld wird ein neues Grasobjekt erstellt.
//     Die Energie des ursprünglichen Grases wird nach der Fortpflanzung auf 0 zurückgesetzt.
class Grass {

    // Jede Klasse braucht einen Konstruktor
    // Hier werden die Anfangswerte der Kreatur gesetzt
    constructor() {
        this.stepCount = frameCount + 1; // Jede Kreatur braucht diese Zeile
        this.color = "green";            // Jede Kreatur braucht eine Farbe
        this.Energie = Math.floor(random(0,3))
        // Hier kannst du weitere Eigenschaften hinzufügen
    }

    // Die step() Methode wird in jedem Frame aufgerufen
    // Jede Kreatur braucht eine solche step() Methode!
    step() {
        this.Energiewachstum()
        if(this.Energie>= 7){
            this.multiply()
            this.Energie=0

        }
        // Der Code hier wird in jedem Frame ausgeführt
        // Um den Code zu organisieren, kannst du andere Methoden erstellen und von hier aus aufrufen
        // z.B. könntest du eine multiply() Methode erstellen, die aufgerufen wird, wenn die Energie ≥ 7 ist
    }
    Energiewachstum(){
        this.Energie +=1
    }
    multiply(){
        let LeereFelder = findNeighbourPositions(this.row,this.col,1,Empty)
        LeereFelder =  LeereFelder.concat(findNeighbourPositions(this.row,this.col,1,blackEmpty))
        // auch meterioieten überwachsen 
        if(LeereFelder.length>0){
            let randomFeld = random(LeereFelder)
            matrix[randomFeld.row][randomFeld.col]=new Grass()
        }
    }
}

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
class GrassEater {
    constructor() {
        this.stepCount = frameCount + 1;         // Jede Kreatur braucht diese Zeile
        this.color = "yellow"; 
        this.Energie=5           // Jede Kreatur braucht eine Farbe
    }

    step() {
        //console.log(this.Energie)
        if(this.Energie>0 && this.Energie<10){
            this.Nahrungssuche()
        }
        else if(this.Energie>=10){
            this.Vermehren()

        }
        else{
            this.Sterbenüberprüfen()
        }
        
        
    }
    Nahrungssuche(){
        let NachbarGrassfelder = findNeighbourPositions(this.row,this.col,1,Grass)
        if(NachbarGrassfelder.length>0){
            let zufälligesnachbargrassfeld = random(NachbarGrassfelder)
            // matrix[zufälligesnachbargrassfeld.row][zufälligesnachbargrassfeld.col]=new GrassEater()
            // matrix[this.row][this.col]=new Empty()
            updateCreaturePosition(this, zufälligesnachbargrassfeld)
            this.Energie+=1
        }
        else if(NachbarGrassfelder.length==0){
            this.keineNahrunggefunden()
            this.Energie-=1
        }
        
    }
    keineNahrunggefunden(){
        let leeresNachbarfeld = findNeighbourPositions(this.row,this.col,1,Empty)
        if(leeresNachbarfeld.length>0){
            let zufäligesleeresNachbarfeld= random(leeresNachbarfeld)
            // matrix[this.row][this.col]=new Empty()
            // matrix[zufäligesleeresNachbarfeld.row][zufäligesleeresNachbarfeld.col]= this
            updateCreaturePosition(this, zufäligesleeresNachbarfeld)
            
        }
    }
    Sterbenüberprüfen(){
        if(this.Energie<=0){
            matrix[this.row][this.col]=new Empty()
        }
    }

    Vermehren(){
        //console.log(this.Energie)
        let Nachbarfeld2 = findNeighbourPositions(this.row,this.col,1,Object)
        let zufälligesnachbarfeld2 = random(Nachbarfeld2)
        matrix[zufälligesnachbarfeld2.row][zufälligesnachbarfeld2.col]=new GrassEater()
        this.Energie-=5


    }
}

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
class MeatEater {
    constructor() {
        this.stepCount = frameCount + 1;         // Jede Kreatur braucht diese Zeile
        this.color = "red";            // Jede Kreatur braucht eine Farbe
        this.Energie=100
    }

    step() {
        if(this.Energie>0 && this.Energie<120){
            this.Nahrungssuchegrasseater()
        }
        else if(this.Energie>=120){
            this.Vermehren()

        }
        else{
            this.Sterbenüberprüfen()
        }
        
    }
    Nahrungssuchegrasseater(){
        let NachbarGrasseaterfelder = findNeighbourPositions(this.row,this.col,1,GrassEater)
        if(NachbarGrasseaterfelder.length>0){
            let zufälligesnachbargrasseaterfeld = random(NachbarGrasseaterfelder)
            // matrix[zufälligesnachbargrassfeld.row][zufälligesnachbargrassfeld.col]=new GrassEater()
            // matrix[this.row][this.col]=new Empty()
            updateCreaturePosition(this, zufälligesnachbargrasseaterfeld)
            this.Energie+=10
        }
        else if(NachbarGrasseaterfelder.length==0){
            this.Energie-=1
        }
}
    Vermehren(){
        //console.log(this.Energie)
        let Nachbarfeld3 = findNeighbourPositions(this.row,this.col,1,Empty)
        if(Nachbarfeld3.length>0){
            let zufälligesnachbarfeld3 = random(Nachbarfeld3)
            matrix[zufälligesnachbarfeld3.row][zufälligesnachbarfeld3.col]=new MeatEater()
            this.Energie-=100
        }
        else{

        }


}
   Sterbenüberprüfen(){
           if(this.Energie<=0){
            matrix[this.row][this.col]=new Empty()
         }
      }
}


class Flussbauer{
    constructor(){
        this.stepCount = frameCount + 1;         // Jede Kreatur braucht diese Zeile
        this.color = "blue";            // Jede Kreatur braucht eine Farbe
        this.Energie=1
        this.Größe=5
        this.Anzahl=1
        this.Zähler=0
        this.Richtung=0
        this.Richtung2=0

    }
    step(){
        
        this.Zähler+=1
        if(this.Energie<5 && this.Energie>0){
            this.Schiffbau()
            this.Energie+=0,1

        }
        else if(this.Energie>=5){
            this.Schiffbau2()


        }
        else{
            this.Sterben()
        }
        
    }
    Schiffbau(){
        
        if(this.Richtung==0){
                updateCreaturePosition(this, {row:this.row, col:this.col+1})
                if(this.col==matrixSize-1){
                 this.Richtung=1
             }
        }
        
        else if(this.Richtung==1){
             updateCreaturePosition(this, {row:this.row, col:this.col-1})
             if(this.col==0){
                this.Richtung=0
             }
        }
        
  
    }

    
    Schiffbau2(){
        if(this.Richtung<matrixSize-1){
            this.Richtung+=1
            updateCreaturePosition(this, {row:this.row, col:this.col+1})
            if(this.Richtung2<matrixSize-1){
                 matrix[this.row+1][this.col]= new Empty()
                this.Richtung2+=1
            }
           
            else if(this.Richtung2>=matrixSize-1){
            matrix[this.row-1][this.col]= new Empty()
            this.Richtung2+=1

            }

        }
        else{
            updateCreaturePosition(this, {row:this.row, col:this.col-1})
            if(this.Richtung2<matrixSize-1){
                matrix[this.row+1][this.col]= new Empty()
                this.Richtung2+=1

            }
                else if(this.Richtung2>=matrixSize-1){
                matrix[this.row-1][this.col]= new Empty()
                this.Richtung2+=1

            }
    

    }
}
    Sterben(){
        matrix[this.row][this.col]=new Empty()
    }
}
class Meteroiteneinschläge{
    constructor(){
        this.stepCount = frameCount + 1;         // Jede Kreatur braucht diese Zeile
        this.color = "#cccccc";            // Jede Kreatur braucht eine Farbe
        this.Größe=2
        this.Energie=5
        this.Lebensleistung=50
    }
    step(){
        this.color="#cccccc"

        //console.log(this.EnergieEnergie)
        if(this.Energie>0 &&this.Energie%5==0 && this.Energie< 50){
            //console.log("funktioniert")
            this.Meteroiteneinschlag()
        }
        else if(this.Energie>=50 && this.Energie%10==0){
            this.Größe+=0.1
            this.Meteroiteneinschlag()
           // updateCreaturePosition(this,random(matrix))

        }
        else if(this.Lebensleistung<0){
            this.Sterben()
        }
        else{
            this.Energie+=2.5
            this.Lebensleistung-=0.1
            //console.log(this.Lebensleistung)


        }


    }
    Meteroiteneinschlag(){
        this.color= "black"
        let Felder = findNeighbourPositions(this.row,this.col,floor(this.Größe),Grass)
        //console.log(Felder)
        if(Felder.length != 0){
           // console.log("start")
            for(var i=0;i<Felder.length;i++){
                 matrix[Felder[i].row][Felder[i].col]= new blackEmpty()
            }
            this.Energie+=2.5
            let pos = {row: floor(random(matrixSize)),col: floor(random(matrixSize))}
            updateCreaturePosition(this,pos)
        }
        else{
            this.Energie+=2.5
        }

    }
    Sterben(){
        matrix[this.row][this.col]=new Empty()
    }

}
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
    [Meteroiteneinschläge, 0.001] // 0,001 %;
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
    for(let i=0; i<matrixSize; i++){
        matrix.push([])
        for(let j=0; j<matrixSize; j++){
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
            if ((i != row || j != col) && isInMatrix && matrix [i][j] instanceof Feldtyp) {
                let pos = { row: i, col: j }
                l.push(pos)
            }
        }
    }
    return l
}

// Initialisiert die Zeichenfläche und füllt die Matrix mit Kreaturen
// Wird einmal beim Start aufgerufen
function setup() {
    createCanvas(matrixSize * blockSize, matrixSize * blockSize); // Zeichenfläche erstellen
    fillRandomMatrix(); // Matrix zufällig füllen
    noStroke(); // Keine Umrandungen für Rechtecke
    frameRate(30); // Bildrate auf 30 Frame pro Sekunde setzen
}

// Spielschleife. Wird in jedem Frame aufgerufen
// Zeichnet die Matrix und aktualisiert die Kreaturen
function draw() {
    background(backgroundColor); // Hintergrundfarbe festlegen
    for (let row = 0; row < matrixSize; row++) {
        for (let col = 0; col < matrixSize; col++) {
            let obj = matrix[row][col]; // Objekt an der aktuellen Position
            checkErrors(obj);

            // Zeile und Spalte der Kreatur setzen
            obj.row = row;
            obj.col = col;

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