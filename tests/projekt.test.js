const { testWrapper } = require('../tests/automatic_testing');
const { findNeighbourPositions } = require('../projekt');


// Mock global variables
global.matrixSize = 5;  // You can set the size according to your test case
let matrix;  // Matrix will be set within test cases

// Mock creature classes
class Empty { }
class CreatureA { }
class CreatureB { }

describe('findNeighbourPositions tests', () => {
    beforeEach(() => {
        // Setting up a 5x5 matrix for testing before each test
        matrix = [
            [new Empty(), new CreatureA(), new Empty(), new Empty(), new Empty()],
            [new Empty(), new Empty(), new CreatureA(), new Empty(), new Empty()],
            [new Empty(), new CreatureB(), new Empty(), new CreatureA(), new Empty()],
            [new Empty(), new Empty(), new CreatureA(), new Empty(), new Empty()],
            [new CreatureB(), new Empty(), new Empty(), new Empty(), new Empty()],
        ];
        global.matrix = matrix;
    });

    //   test('Should find neighbors of type Empty around (2, 2) within distance 1', () => {
    //     const result = findNeighbourPositions(2, 2, 1, Empty);

    //     // Expected neighbors of type Empty around (2, 2) within distance 1
    //     expect(result).toEqual([
    //       [1, 1], [1, 3],
    //       [2, 1], [2, 3],
    //       [3, 1], [3, 3],
    //     ]);
    //   });

    testWrapper('findNeighbourPositions', [
        [[2, 2, 1, Empty], [[1, 1], [1, 3], [2, 1], [2, 3], [3, 1], [3, 3]]],
        [[2, 2, 1, CreatureA], [[1, 2], [3, 2]]],
        [[1, 1, 2, CreatureB], [[2, 1], [4, 0]]],
        [[0, 0, 1, Empty], [[0, 1], [1, 0], [1, 1]]],
        [[4, 4, 1, Empty], [[3, 3], [3, 4], [4, 3]]],
    ], findNeighbourPositions);
});


// class mock_A { }
// class mock_B { }
// class mock_C { }
// class mock_D { }

// jest.mock('../projekt', () => ({
//     matrix: [
//         [new mock_A(), new mock_B(), new mock_C(), new mock_D()],
//         [new mock_A(), new mock_A(), new mock_A(), new mock_B()],
//         [new mock_B(), new mock_A(), new mock_A(), new mock_A()],
//         [new mock_A(), new mock_A(), new mock_D(), new mock_D()],
//     ],
// }));

// describe('Game of Life Tests', () => {
//     testWrapper('findNeighbourPositions', [
//         [[1, 1, 1, mock_A], [[0, 0], [0, 1], [0, 2], [1, 0], [1, 2], [2, 0], [2, 1], [2, 2]]],
//         [[1, 1, 1, mock_B], [[0, 1], [0, 2], [1, 0], [1, 3], [2, 0], [2, 1], [2, 2], [2, 3]]],
//         [[1, 1, 1, mock_C], [[0, 2], [1, 2], [2, 2]]],
//         [[1, 1, 1, mock_D], [[0, 3], [1, 3], [2, 2], [2, 3]]],
//         [[0, 0, 1, mock_A], [[0, 1], [1, 0], [1, 1]]],
//         [[0, 0, 1, mock_B], [[0, 0], [0, 2], [1, 1], [1, 2]]],
//         [[0, 0, 1, mock_C], [[0, 1], [1, 1], [1, 2]]],
//         [[0, 0, 1, mock_D], [[0, 1], [1, 0], [1, 1]]],
//         [[3, 3, 1, mock_A], [[2, 2], [2, 3], [3, 2]]],
//         [[3, 3, 1, mock_B], [[2, 2], [2, 3], [3, 2], [3, 3]]],
//         [[3, 3, 1, mock_C], [[2, 3], [3, 2], [3, 3]]],
//         [[3, 3, 1, mock_D], [[2, 2], [2, 3], [3, 2]]],
//     ], findNeighbourPositions);
// });

