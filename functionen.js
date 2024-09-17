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




/////////////// ∨∨∨ HIER NICHT VERÄNDERN ∨∨∨ ///////////////////
console.clear();
// Für Aufhabe 1 und 2:
var a = 100;
var b = 200;
var umfang = berechneUmfang(a, b);
var inhalt = berechneInhalt(a, b);
console.log("Aufgabe 1 (Umfang): " + umfang);
console.log("Aufgabe 2 (Inhalt): " + inhalt);

// Für Aufgabe 3
var c = [45, 60, 12, 98, 78, 154, 65];
var m = [15, 98, 45, 33, 78, 98, 100, 56, 98];
var s1 = sumArray(c);
var s2 = sumArray(m);
console.log("Aufgabe 3 (Summen):", s1, s2);

// Für Aufgabe 4
var zahlen = [45, 60, 12, 98, 78, 154, 65];
var zahlenReverse = reverseArray(zahlen);
console.log("Aufgabe 4 (zahlen rückwärts): ", zahlenReverse); //drucke 65,154,78,98,12,60,45

var t = ["php", "javascript", "html", "css", "mysql"];
var reverse = reverseArray(t);
console.log("Aufgabe 4 (Programmiersprachen rückwärts):", reverse); //drucke mysql, css, html, javascript, php

// Für Aufgabe 5
var a5_1 = [4, 5, 6, 5, 3, 1, 4, 5, 3, 9, 5, 4]
var a5_2 = [23, 5, -10, 9, 10, 23, 88, 90]
console.log("Aufgabe 5:", findSpan(a5_1)) // sollte 8 sein
console.log("Aufgabe 5:", findSpan(a5_2)) // sollte 100 sein
/////////////// ∧∧∧ HIER NICHT VERÄNDERN ∧∧∧ //////////////////  