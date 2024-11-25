class Empty { }

// Start-Energie: zufällig zwischen 0 und 2.
// Energie steigt jeden Zyklus um 1.
// Bei Energie ≥ 7:
//     Leere Nachbarfelder suchen.
//     Zufälliges leeres Nachbarfeld auswählen, neues Gras erstellen.
//     Energie des alten Gras wird auf 0 gesetzt.
class Grass {
    // dein Code
}

// Start-Energie: 5.
// Jeden Zyklus:
//     Nachbarfelder prüfen:
//         Wenn Gras vorhanden:
//             Zufälliges Gras auswählen und darauf bewegen.
//             Energie +1.
//         Wenn kein Gras:
//             Leere Felder suchen, zufällig eines auswählen und darauf bewegen.
//             Energie -1.
// Bei Energie = 10:
//     Leere Nachbarfelder suchen.
//     Zufälliges leeres Nachbarfeld auswählen, neuer Grasfresser entsteht.
//     Energie des alten Grasfressers -5.
class GrassEater {
    // dein Code
}

// Start-Energie: 100.
// Jeden Zyklus:
//     Nachbarfelder prüfen:
//         Wenn Grasfresser vorhanden:
//             Zufälligen Grasfresser auswählen und darauf bewegen.
//             Energie +10.
//         Wenn kein Grasfresser:
//             Energie -1.
// Bei Energie = 120:
//     Leere Nachbarfelder suchen.
//     Zufälliges leeres Nachbarfeld auswählen, neuer Fleischfresser entsteht.
//     Energie des alten Fleischfressers -100.
class MeatEater {
    // dein Code
}

// Liste von Listen. Enthält alle Kreaturen.
let matrix = [];
// Größe der Matrix, Anzahl der Zellen in Breite und Höhe
let size = 50;
// Anzeigengröße in Pixeln für jede Zelle
let blockSize = 15;

// Wahrscheinlichkeit, mit der jede Kreatur erstellt wird
let creatureAmounts = [
    [Grass, 0.9],       // Gras: 90% Wahrscheinlichkeit
    [GrassEater, 0.005], // Grasfresser: 0,5% Wahrscheinlichkeit
    [MeatEater, 0.02],   // Fleischfresser: 2% Wahrscheinlichkeit
];

// Wählt basierend auf den Wahrscheinlichkeiten zufällig eine Kreatur aus
function getRandomCreature() {
    let rand = random(); // Zufallszahl zwischen 0 und 1
    let sum = 0;
    for (let [creatureClass, probability] of creatureAmounts) {
        sum += probability; // Summiert die Wahrscheinlichkeiten
        if (rand < sum) {   // Wenn die Zufallszahl kleiner ist, wähle diese Kreatur
            return creatureClass;
        }
    }
    return Empty; // Wenn keine andere Bedingung zutrifft, wird ein leeres Feld zurückgegeben
}

// Füllt die Matrix zufällig mit Kreaturen basierend auf den Wahrscheinlichkeiten
function fillRandomMatrix() {
    // dein Code
}

// Aktualisiert die Position einer Kreatur in der Matrix
// Erstellt ein neues leeres Objekt an der alten Position
function updateCreaturePosition(creature, newPos) {
    let [newRow, newCol] = newPos; // Neue Position
    matrix[newRow][newCol] = creature; // Kreatur wird an der neuen Position gesetzt
    matrix[creature.row][creature.col] = new Empty(); // Alte Position wird geleert
    creature.row = newRow; // Zeile der Kreatur wird aktualisiert
    creature.col = newCol; // Spalte der Kreatur wird aktualisiert
}

// Für eine gegebene Position werden alle Nachbarpositionen gesucht,
// die einen bestimmten Kreaturentyp enthalten und innerhalb einer bestimmten Distanz liegen
// Gibt eine Liste von [row, col]-Positionen zurück
// Beispiel: findNeighbourPositions(10, 10, 1, Empty) gibt alle leeren Zellen
// um die Position 10, 10 im Abstand von 1 zurück.
// Wenn alle Zellen leer sind, wird [[9, 9], [9, 10], [9, 11], [10, 9], [10, 11], [11, 9], [11, 10], [11, 11]] zurückgegeben
function findNeighbourPositions(row, col, distance, creatureType) {
    // dein Code
}

// Initialisiert die Zeichenfläche und füllt die Matrix mit Kreaturen
// Wird einmal beim Start aufgerufen
function setup() {
    createCanvas(size * blockSize, size * blockSize); // Zeichenfläche erstellen
    fillRandomMatrix(); // Matrix zufällig füllen
    noStroke(); // Keine Umrandungen für Rechtecke
    frameRate(1); // Bildrate auf 1 Frame pro Sekunde setzen
}

// Spielschleife. Wird in jedem Frame aufgerufen
// Zeichnet die Matrix und aktualisiert die Kreaturen
function draw() {
    background(200); // Hintergrundfarbe setzen
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            let obj = matrix[row][col]; // Objekt an der aktuellen Position

            // Leere Zellen überspringen
            if (obj instanceof Empty) continue;

            // Zeile und Spalte der Kreatur setzen
            obj.row = row;
            obj.col = col;

            // Verhindert, dass neu erstellte Kreaturen im gleichen Schritt aktualisiert werden
            // und dass Kreaturen, die sich bewegen, mehrfach in einem Frame aktualisiert werden
            if (obj.stepCount === frameCount) {
                obj.step(); // Kreatur führen ihren Schritt aus
            }

            // Kreatur zeichnen
            fill(obj.color); // Farbe der Kreatur setzen
            rect(blockSize * obj.col, blockSize * obj.row, blockSize, blockSize); // Rechteck zeichnen
        }
    }
}


// if (typeof module !== 'undefined' && module.exports) {
//     module.exports = { findNeighbourPositions };
//     if (require.main === module) require('./tests/automatic_testing')["run"](__filename);
// }