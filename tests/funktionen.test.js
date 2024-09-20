try {
    var { berechneUmfang, berechneInhalt, sumArray, reverseArray, findSpan } = require('../wiederholung/funktionen');
} catch (e) {
    console.log(`Die Funktionen konnten nicht importiert werden. Sind sie in 'funktionen.js' vorhanden?\n\n${e.reasonCode}\n${e.message}`);
}

const { testWrapper } = require('../tests/automatic_testing');


describe('Function Tests', () => {
    testWrapper('berechneUmfang', [
        [[3, 4], 14],
        [[0, 0], 0],
        [[1, 1], 4]
    ], berechneUmfang);

    testWrapper('berechneInhalt', [
        [[3, 4], 12],
        [[0, 0], 0],
        [[1, 1], 1]
    ], berechneInhalt);

    testWrapper('sumArray', [
        [[[1, 2, 3, 4]], 10],
        [[[0, 0, 0, 0, 0]], 0],
        [[[1, 1, 1, 1, 1, 1]], 6]
    ], sumArray);

    testWrapper('reverseArray', [
        [[[1, 2, 3, 4]], [4, 3, 2, 1]],
        [[["php", "javascript", "html", "css", "mysql"]], ["mysql", "css", "html", "javascript", "php"]],
        [[[5, "test", false, 0, "test2"]], ["test2", 0, false, "test", 5]]
    ], reverseArray);

    testWrapper('findSpan', [
        [[[4, 6, 5]], 2],
        [[[4, 6, 5, 1, 10]], 9],
        [[[4, 6, 5, 1, 10, 0]], 10],
        [[[4, -6, 5, 1, 10, 0]], 16],
        [[[4, -6, 5, 1, 10, 0, 100]], 106],
        [[[-4, -6, -5, -10, -50]], 46],
        [[[1000000, 1000042]], 42],
        [[[-1000000, -1000042, -1000000]], 42]
    ], findSpan);
});