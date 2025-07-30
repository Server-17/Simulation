class Flussbauer extends Wesen{
    constructor(){
        super("blue",1)
        this.Größe=5
        this.Anzahl=1
        this.Zähler=0
        this.Richtung=0
        this.Richtung2=0
    }
    step(){
        
        this.Zähler+=1
        if(this.Energie<5 && this.Energie>0){
            this.Schiffbau()
            this.Energie+=0,1

        }
        else if(this.Energie>=5){
            this.Schiffbau2()


        }
        else{
            this.Sterben()
        }
        
    }
    Schiffbau(){
        
        if(this.Richtung==0){
                updateCreaturePosition(this, {row:this.row, col:this.col+1})
                if(this.col==matrixSize-1){
                 this.Richtung=1
             }
        }
        
        else if(this.Richtung==1){
             updateCreaturePosition(this, {row:this.row, col:this.col-1})
             if(this.col==0){
                this.Richtung=0
             }
        }
        
  
    }

    
    Schiffbau2(){
        if(this.Richtung<matrixSize-1){
            this.Richtung+=1
            updateCreaturePosition(this, {row:this.row, col:this.col+1})
            if(this.Richtung2<matrixSize-1){
                 matrix[this.row+1][this.col]= new Empty()
                this.Richtung2+=1
            }
           
            else if(this.Richtung2>=matrixSize-1){
            matrix[this.row-1][this.col]= new Empty()
            this.Richtung2+=1

            }

        }
        else{
            updateCreaturePosition(this, {row:this.row, col:this.col-1})
            if(this.Richtung2<matrixSize-1){
                matrix[this.row+1][this.col]= new Empty()
                this.Richtung2+=1

            }
                else if(this.Richtung2>=matrixSize-1){
                matrix[this.row-1][this.col]= new Empty()
                this.Richtung2+=1

            }
    

    }
}
}