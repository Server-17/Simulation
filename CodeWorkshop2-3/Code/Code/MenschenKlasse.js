
class Haus extends Wesen {
    constructor() {
        super("brown")
        this.Felder = findNeighbourPositions(this.row, this.col, 5, Haus)
        this.Leben = 10

    }
    step() {
        this.Leben -= 0.1
    }
}
class Mensch extends Wesen {
    constructor() {
        super("purple", 5)
        this.t = random(0, 1)
        this.Leben = 100
    }


    step() {

        this.Energie += 1
        if (this.Energie == 20) {
            this.Hausbau()
        }
        else if (this.Energie == 260 && this.t > 0.9) {
            this.Hausabriss()
        }
        else if (this.Energie >= 300 && this.Energie <= 315 && this.Energie % 2 == 0) {
            let pos = { row: floor(random(matrixSize)), col: floor(random(matrixSize)) }
            // updateCreaturePosition(this, pos)
            moveTo(this.row, this.col, Mensch, 25, function (pos) {
                let obj = matrix[pos.row][pos.col]
                return obj instanceof Empty || obj instanceof Grass || obj instanceof blackEmpty
            })

        }
        if (this.Energie >= 315) {
            this.Energie = 1
        }
        else if (this.Energie > 20) {
            this.Leben -= 0.2
        }
        else if (this.Leben == 0) {
            this.Sterben()
        }
    }
    Hausbau() {
        var Felder2 = findNeighbourPositions2(this.row, this.col, 5, function (x) { return x instanceof Object })
        if (Felder2.length != 0) {
            this.Leben += 2
            // console.log("start")
            for (var i = 0; i < Felder2.length; i++) {
                matrix[Felder2[i].row][Felder2[i].col] = new Haus()
            }
        }
    }
    Hausabriss() {
        var Felder2 = findNeighbourPositions2(this.row, this.col, 5, function (x) { return x instanceof Object })
        if (Felder2.length != 0) {
            // console.log("start")
            for (var i = 0; i < Felder2.length; i++) {
                matrix[Felder2[i].row][Felder2[i].col] = new Empty()
            }
        }

    }
}