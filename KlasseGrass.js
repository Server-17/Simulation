class Grass extends Wesen {
    // Jede Klasse braucht einen Konstruktor
    // Hier werden die Anfangswerte der Kreatur gesetzt
    constructor() {
        super("green",Math.floor(random(0,3)))                  
        // Hier kannst du weitere Eigenschaften hinzufügen
    }

    // Die step() Methode wird in jedem Frame aufgerufen
    // Jede Kreatur braucht eine solche step() Methode!
    step() {
        this.Energiewachstum()
        if(this.Energie>= 7){
            this.multiply()
            this.Energie=0

        }
        // Der Code hier wird in jedem Frame ausgeführt
        // Um den Code zu organisieren, kannst du andere Methoden erstellen und von hier aus aufrufen
        // z.B. könntest du eine multiply() Methode erstellen, die aufgerufen wird, wenn die Energie ≥ 7 ist
    }
    Energiewachstum(){
        this.Energie +=1
    }
    multiply(){
        let LeereFelder = findNeighbourPositions3(this.row,this.col,1,function(x){return x instanceof Empty || x instanceof Haus && x.Leben<2 })
        LeereFelder =  LeereFelder.concat(findNeighbourPositions(this.row,this.col,1,blackEmpty))
        // auch meterioieten überwachsen 
        if(LeereFelder.length>0){
            let randomFeld = random(LeereFelder)
            matrix[randomFeld.row][randomFeld.col]=new Grass()
        }
    }
}
