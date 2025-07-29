class GrassEater extends Wesen{
    constructor() {
        super("yellow",5)
        // Jede Kreatur braucht eine Farbe
    }

    step() {
        //console.log(this.Energie)
        if(this.Energie>0 && this.Energie<10){
            this.Nahrungssuche()
        }
        else if(this.Energie>=10){
            this.Vermehren()

        }
        else{
            if(this.Energie<=0){
            this.Sterben()
            }
        }
    }
    Nahrungssuche(){
        let NachbarGrassfelder = findNeighbourPositions(this.row,this.col,1,Grass)
        if(NachbarGrassfelder.length>0){
            let zufälligesnachbargrassfeld = random(NachbarGrassfelder)
            // matrix[zufälligesnachbargrassfeld.row][zufälligesnachbargrassfeld.col]=new GrassEater()
            // matrix[this.row][this.col]=new Empty()
            updateCreaturePosition(this, zufälligesnachbargrassfeld)
            this.Energie+=1
        }
        else if(NachbarGrassfelder.length==0){
            this.keineNahrunggefunden()
            this.Energie-=1
        }
        
    }
    keineNahrunggefunden(){
        let leeresNachbarfeld = findNeighbourPositions(this.row,this.col,1,Empty)
        if(leeresNachbarfeld.length>0){
            let zufäligesleeresNachbarfeld= random(leeresNachbarfeld)
            // matrix[this.row][this.col]=new Empty()
            // matrix[zufäligesleeresNachbarfeld.row][zufäligesleeresNachbarfeld.col]= this
            updateCreaturePosition(this, zufäligesleeresNachbarfeld)
            
        }
    }

    Vermehren(){
        //console.log(this.Energie)
        let Nachbarfeld2 = findNeighbourPositions(this.row,this.col,1,Object)
        let zufälligesnachbarfeld2 = random(Nachbarfeld2)
        matrix[zufälligesnachbarfeld2.row][zufälligesnachbarfeld2.col]=new GrassEater()
        this.Energie-=5
    }
}