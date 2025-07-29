class Wesen{
    constructor(Farbe,Energie){
        this.stepCount = frameCount + 1;
        this.color = Farbe
        this.Energie= Energie
    }
    step() {
        // Leere Felder machen nichts
    }
    Sterben(){
        matrix[this.row][this.col]=new Empty()
    }
}
