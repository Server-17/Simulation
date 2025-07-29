////Klasse und Objekte der Klasse erstellen
////eine Klasse ist ein Bauplan für ein Objekt

class Dogs {
    constructor(Name,Herrchen,Rasse,Alter){
        ////im Constructor werden die Eigenschaften der Klasse definiert
        ////mit this. kann innerhalb der klasse auf eine  Eigenschaft zugegriffen werden
        this.namedog = Name
        this.Herrchendog= Herrchen
        this.Rassedog= Rasse
        this.Alterdog =Alter
    }

    hallo(){
        console.log("wau ich bin " + this.namedog + " wau wau, ich bin " + this.Alterdog + " Jahre alt wau wau.")
    }

    rufen(name1){
        if(name1 ===this.namedog){
            console.log("wau wau")
        }
        else{
            console.log("stille")
        }
    }

    geburtstag(){
        this.Alterdog++
    }

    nameÄndern(neuerName){
        this.namedog = neuerName
    }


}
////Ein Objekt der Klasse kann mit Var Hund = new Klasse (Eigenschaften)
var Hund = new Dogs("Wuffi","Jonas","Labrador",5)
////Funktionen des Objekts können mit Objektname.Funktion abgerufen werden
Hund.hallo()
Hund.rufen("Bob")
Hund.geburtstag()
Hund.hallo()
Hund.nameÄndern("Karl")
Hund.hallo()
Hund.rufen("Karl")

Hund.namedog = "Max"

//// Objekt ohne Klasse erstellen:
//
var Auto ={ name: "Karl",}
console.log(Auto)

//Ende


