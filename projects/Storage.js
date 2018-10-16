/**
* This function gets the form data and stores into JSON
*/
function getUserInput() {
    // get the form data from the dom
    var first = document.getElementById("firstName").value;
    var last = document.getElementById("lastName").value;
    var color = document.getElementById("color").value;
    var car = document.getElementById("car").value;
    var food = document.getElementById("food").value;
    
    // create an object out of the inputs
    var person = {first: first, last: last, color: color, car: car, food: food};
    // just a simple madlib
    var stringArray = ["Your first name is ", ", and you come from the ", " family.", " You want to drive a ", " ", ". Just don't spill " , " in that car!"];
    
    // create an abject using the person object and stringArray
    var object = new PersonObject(person, stringArray);
    // convert it to JSON
    var jsonObject = JSON.stringify(object);
    
    saveObject(jsonObject);
    loadLocalStorage();
}

/**
* This is an object constructor
*/
function PersonObject (person, stringArray) {
    this.person = person;
    this.stringArray = stringArray;   
}

/**
* This creates and stores to the local storage api
*/
function saveObject(jsonObject){
    if (typeof(Storage) !== "undefined") {
        localStorage.personObject = jsonObject;
    } else {
        window.alert("Your browser doesn't support local storage. This website will not work!");
    }
    
}

/**
* This function will load the mad lib from the local storage and 
* manipulates the dom if there is an object stored.
*/
function loadLocalStorage() {
    //localStorage.removeItem("personObject");
    if(localStorage.personObject){
        // Get the JSON object from local storage and parse it
        var object = JSON.parse(localStorage.personObject);
        var person = object.person;
        var madLib = object.stringArray;
        
        // Getting the div tag that will be changed
        var element = document.getElementById("savedData");
        
        // Add a title
        var title = document.createElement("h2");
        var node = document.createTextNode("Simple Madlib: ")
        title.appendChild(node);
        element.appendChild(title);
        
        // Add the madlib
        var paragraph = document.createElement("p");
        paragraph.setAttribute("class", "madLib");
        var text = madLib[0] + person.first + madLib[1] + person.last + madLib[2] + madLib[3] + person.color + madLib[4] + person.car + madLib[5] + person.food + madLib[6];
        
        node = document.createTextNode(text);
        paragraph.appendChild(node);
        element.appendChild(paragraph);
        
        var button = document.createElement("button");
        button.setAttribute('type', 'button');
        button.setAttribute('onclick', 'deleteObject()');
        button.setAttribute('class', 'delete');
        node = document.createTextNode("Delete");
        button.appendChild(node);
        
        element.appendChild(button);
        
        var disclaimer = document.createElement("p");
        node = document.createTextNode("**If you refresh your page, your madlib will still be saved");
        disclaimer.appendChild(node);
        
        element.appendChild(document.createElement('br'));
        element.appendChild(document.createElement('br'));
        element.appendChild(disclaimer);
        
        // Make the form disappear so that they cannot add another form
        document.getElementById("form").style.display = "none";
        
    } else {
        console.log("Nothing to load!");
    }
}

/**
* This will just delete the item that is in local storage
*/
function deleteObject() {
    localStorage.removeItem("personObject");
    location.reload();
}
