
class Haus extends Wesen {
    constructor() {
        super("brown")
        this.Felder = findNeighbourPositions(this.row, this.col, 5, Haus)
        this.Leben=10

    }
    step(){
        this.Leben-=0.1
    }
}



class Mensch extends Wesen {
    constructor() {
        super("purple", 5)
        this.t = random(0,1)
        this.Leben=20
    }


    step() {

        this.Energie += 1
        if (this.Energie == 20) {
            this.Hausbau()
        }
        else if (this.Energie == 260 && this.t > 0.9) {
            this.Hausabriss()
        }
        else if (this.Energie == 300) {
            let pos = { row: floor(random(matrixSize)), col: floor(random(matrixSize)) }
            updateCreaturePosition(this, pos)
            this.Energie = 1
        }
        else if(this.Energie>20){
            this.Leben-=0.5
        }
        else if(this.Leben== 0){
            this.Sterben()
        }
    }
    Hausbau() {
        var Felder2 = findNeighbourPositions2(this.row, this.col, 5, function (x){return x instanceof Object})
        if (Felder2.length != 0) {
            this.Leben+=1
            // console.log("start")
            for (var i = 0; i < Felder2.length; i++) {
                matrix[Felder2[i].row][Felder2[i].col] = new Haus()
            }
        }
    }
    Hausabriss() {
        var Felder2 = findNeighbourPositions2(this.row, this.col, 5, function (x){return x instanceof Object})
        if (Felder2.length != 0) {
            // console.log("start")
            for (var i = 0; i < Felder2.length; i++) {
                matrix[Felder2[i].row][Felder2[i].col] = new Empty()
            }
        }

    }
}

