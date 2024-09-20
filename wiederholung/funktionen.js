// Aufgabe 1:
// Beispiel: 3, 4 => 14
function berechneUmfang(a, b) {
    // schreibe hier deinen Code
}

// Aufgabe 2:
// Beispiel: 3, 4 => 12
function berechneInhalt(a, b) {
    // schreibe hier deinen Code
}

// Aufgabe 3:
// Erstelle eine Funktion, die die Summe aller Elemente des jeweiligen Arrays zurückgibt.
// Beispiel: [1, 2, 3, 4] => 10
function sumArray(arr) {
    // schreibe hier deinen Code
}

// Aufgabe 4:
// Erstelle eine Funktion, die einen neuen Array mit umgekehrter Reihenfolge zurückgibt.
// Beispiel: [1, 2, 3, 4] => [4, 3, 2, 1]
function reverseArray(arr) {
    // schreibe hier deinen Code
}

// Aufgabe 5:
// Schreibe eine Funtion, die einen array bekommt, das größte und das kleinste Element sucht und den Abstand zwischen diesen Elementen zurückgibt
// Beispiel: [4, 6, 5] => 2
function findSpan(arr) {
    // schreibe hier deinen Code
}



///////// NICHT BEARBEITEN //////////
module.exports = { berechneUmfang, berechneInhalt, sumArray, reverseArray, findSpan };
if (require.main === module) require('../tests/automatic_testing')["run"](__filename);