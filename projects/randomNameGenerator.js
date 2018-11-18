// Global constant variables
const jason = new Person("Jason", "Julia");
const julia = new Person("Julia", "Jason");
const casey = new Person("Casey", "Becca");
const becca = new Person("Becca", "Casey");
const daniel = new Person("Daniel", "MaryAnn");
const maryAnn = new Person("MaryAnn", "Daniel");
const mcCall = new Person("McCall", "Launce");
const launce = new Person("Launce", "McCall");
const nameList = [jason, julia, casey, becca, daniel, maryAnn, mcCall, launce];

/*
* Person Object: will hold data about each person
*/
function Person (first, spouse) {
    this.first = first;
    this.spouse = spouse;
    this.isTaken = false;
    this.isSpouse = function(name){
        if (name == this.spouse) {
            //console.log("true!");
            return true;
        } else{
            //console.log(name);
            //console.log("false!");
            return false;
        } 
    }
    this.claimed = function(){
        this.isTaken = true;
        //console.log(this.isTaken);
    }
    this.reset = function() {
        this.isTaken = false;
    }
}

/*
* Pair Object: this will be used to hold two people
*/
function Associate (person1, person2) {
    this.person1 = person1;
    this.person2 = person2;
}

/*
* No Inputs
* Displays each person on the array
*/
function displayPersons(){
    var i = 0
    nameList.forEach(function(element) {
        var list;
        if (i == nameList.length - 1){
            list = document.createTextNode(element.first + ".");
        } else {
            list = document.createTextNode(element.first + ", ");
        }
        document.getElementById("nameList").appendChild(list);
        i++;
    });
}

/*
* No Inputs
* This function randomizes a selection of a person off the nameList array.
* If constraints cannot be made and names cannot be selected, it will return false.
* If selections were made, it will return true.
*/
function randomizeNames() {
    nameList.forEach(function(element) {
        element.reset();
    });
    // Variables needed to keep track of things
    var index = 0;
    var length = nameList.length;
    var randomNames = [];
    
    // Iterate through everyon on the list
    while (randomNames.length < 8 ){
        //console.log("main loop");
        var person = nameList[index];
        var random = 0;
        var loopCount = 0;
        // Generate a random person
        while (true){
            //console.log("random Person loop");
            random = Math.floor(Math.random() * length);
            var person2 = nameList[random];

            
            // Constraints: Cannot be the same person, not a spouse, and not claimed
            if (random != index && !person.isSpouse(person2.first) && !person2.isTaken) {
                break;
            }
            // Selection could not be made due to conflicting constraints
            else if (loopCount >= 20) {
                console.log("BUG ALERT");
                /*console.log("Bug Index: " + index);
                randomNames.forEach(function(element){
                    console.log("BUG Pairs: " + element.person1 + " - " + element.person2)
                });*/
                return false;
            }
            //console.log("Random: " + random);
            //console.log("Index: " + index);
            //console.log(loopCount)
            loopCount++;
        }loopCount = 0;
        
        // The person is claimed
        person2.claimed();
        //console.log(person.first + " - " + person2.first);
        
        // Create a pair object and push it onto an array
        var pair = new Associate(person.first, person2.first);
        randomNames.push(pair);
        
        // Increment
        index++;
    }
    
    displayResults(randomNames);
    return true;
}


/*
* Input: an array of pairs
* Displays the pairs using the DOM
*/
function displayResults(object){
    object.forEach(function(element) {
        //console.log(element);
        var list = document.createElement("LI");
        list.setAttribute("class", "list-group-item");
        var text = document.createTextNode(element.person1 + " -> " + element.person2);
        list.appendChild(text);
        
        document.getElementById("resultText").appendChild(list);
        document.getElementById("results").style.display = "inherit";

    });
}

/*
* No Inputs
* This will rund the randomize names function until a good selection is made.
* It will then display the selections.
*/
function runCode(){
    document.getElementById('button').style.display = "none";
    var run = randomizeNames();
    
    // run until a a good selection has been made
    while(!run) {
        console.log("bad mix");
        run = randomizeNames()
    }
}