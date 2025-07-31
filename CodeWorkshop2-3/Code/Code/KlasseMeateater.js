class MeatEater extends Wesen {
    constructor() {
        super("red", 100) // Jede Kreatur braucht eine Farbe          
    }

    step() {
        if (this.Energie > 0 && this.Energie < 120) {
            this.Nahrungssuchegrasseater()
        }
        else if (this.Energie >= 120) {
            this.Vermehren()

        }
        else {
            if (this.Energie <= 0) {
                this.Sterben()
            }
        }

    }
    Nahrungssuchegrasseater() {
        let NachbarGrasseaterfelder = findNeighbourPositions(this.row, this.col, 1, GrassEater)
        if (NachbarGrasseaterfelder.length > 0) {
            let zufälligesnachbargrasseaterfeld = random(NachbarGrasseaterfelder)
            // matrix[zufälligesnachbargrassfeld.row][zufälligesnachbargrassfeld.col]=new GrassEater()
            // matrix[this.row][this.col]=new Empty()
            updateCreaturePosition(this, zufälligesnachbargrasseaterfeld)
            this.Energie += 10
        }
        else if (NachbarGrasseaterfelder.length == 0) {
            this.Energie -= 1
        }
    }
    Vermehren() {
        //console.log(this.Energie)
        let Nachbarfeld3 = findNeighbourPositions(this.row, this.col, 1, Empty)
        if (Nachbarfeld3.length > 0) {
            let zufälligesnachbarfeld3 = random(Nachbarfeld3)
            matrix[zufälligesnachbarfeld3.row][zufälligesnachbarfeld3.col] = new MeatEater()
            this.Energie -= 100
        }
        else {
        }
    }
}