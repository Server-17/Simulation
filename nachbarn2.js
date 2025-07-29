function findNeighbourPositions2(row, col, distance, funktion) {
    let l = []
    for (let i = row - distance; i <= row; i++) {
        for (let j = col - distance; j <= col; j++) {
            let isInMatrix = i >= 0 && j >= 0 && i < matrixSize && j < matrixSize
            if(!isInMatrix){
                continue
            }
            let inFilter = funktion(matrix[i][j])
            if ((i != row || j != col) && inFilter) {
                let pos = { row: i, col: j }
                l.push(pos)
            }
        }
    }
    return l
}


function findNeighbourPositions3(row, col, distance, funktion) {
    let l = []
    for (let i = row - distance; i <= row+distance; i++) {
        for (let j = col - distance; j <= col+ distance; j++) {
            let isInMatrix = i >= 0 && j >= 0 && i < matrixSize && j < matrixSize
            if(!isInMatrix){
                continue
            }
            let inFilter = funktion(matrix[i][j])
            if ((i != row || j != col) && inFilter) {
                let pos = { row: i, col: j }
                l.push(pos)
            }
        }
    }
    return l
}