class Meteroiteneinschläge extends Wesen{
    constructor(){
        super("#cccccc",5)
        this.Größe=2
        this.Lebensleistung=50
    }
    step(){
        this.color="#cccccc"

        //console.log(this.EnergieEnergie)
        if(this.Energie>0 &&this.Energie%5==0 && this.Energie< 50){
            //console.log("funktioniert")
            this.Meteroiteneinschlag()
        }
        else if(this.Energie>=50 && this.Energie%10==0){
            this.Größe+=0.1
            this.Meteroiteneinschlag()
           // updateCreaturePosition(this,random(matrix))

        }
        else if(this.Lebensleistung<0){
            this.Sterben()
        }
        else{
            this.Energie+=2.5
            this.Lebensleistung-=0.1
            //console.log(this.Lebensleistung)


        }


    }
    Meteroiteneinschlag(){
        this.color= "black"
        let Felder = findNeighbourPositions3(this.row,this.col,floor(this.Größe),function(x){return x instanceof Grass || x instanceof Haus || x instanceof Mensch})
        //console.log(Felder)
        if(Felder.length != 0){
           // console.log("start")
            for(var i=0;i<Felder.length;i++){
                 matrix[Felder[i].row][Felder[i].col]= new blackEmpty()
            }
            this.Energie+=2.5
            let pos = {row: floor(random(matrixSize)),col: floor(random(matrixSize))}
            updateCreaturePosition(this,pos)
        }
        else{
            this.Energie+=2.5
        }
    }
}