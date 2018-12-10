// Using this function to call other functions on start
function mainExecution(){
    changeOpacity('navBar');
    transformObject('title');
    triggerDiv('home');
}

function transformObject(id){
    var elem = document.getElementById(id).style;
    elem.transition = 'transform 0.5s linear';
    elem.transform = 'scale(1.0)';
}

function changeOpacity(id){
    var elem = document.getElementById(id).style;
    elem.transition = 'opacity 1.0s linear';
    elem.opacity = '1';
}

function triggerDiv(id){
    // reset all tags
    var id1 = id + '1';
    document.getElementById('home').style.backgroundColor = 'initial';
    document.getElementById('individuals').style.backgroundColor = 'initial';
    document.getElementById('total').style.backgroundColor = 'initial';
    
    document.getElementById('home1').style.display = 'none';
    document.getElementById('individuals1').style.display = 'none';
    document.getElementById('total1').style.display = 'none';
    document.getElementById('employeeForm').style.display = 'none';
    document.getElementById('addEmployee').style.visibility = 'inherit'
    
    var elem = document.getElementById(id).style;
    var elem1 = document.getElementById(id1).style;

    // set the current tag
    elem.backgroundColor = '#eaa225';
    elem1.display = 'inherit';
    elem1.animation = 'card 0.5s linear';
    
}

// Creating an object to hold employee information
function Employee(firstName, lastName, age, id, hours, salary){
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.id = id;
    this.hours = hours;
    this.salary = salary;
    this.calculatePay = function calculatePay() {
        return this.hours * this.salary;
    };
    this.fullName = function fullName() {
        return this.firstName + " " + this.lastName + ": Employee #" + this.id;
    };
}

// We will use this function get data from firebase through AJAX
function ajaxCall(array){
    // make the Ajax call to firebase
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            dbRef = this.responseText;
            console.log(dbRef)
            dbObj = JSON.parse(dbRef);
            for(var x in dbObj){
                var obj = new Employee (dbObj[x].first, dbObj[x].last, parseInt(dbObj[x].age), parseInt(dbObj[x].id), parseFloat(dbObj[x].hours), parseFloat(dbObj[x].salary))
                array.push(obj);
            }
            
            // check local storage and add to the array if needed
            if(localStorage.obj) {
                var obj = JSON.parse(localStorage.obj);
                console.log(obj);
                for(var x in obj){
                    var newObject = new Employee(obj[x].firstName, obj[x].lastName, parseInt(obj[x].age), parseInt(obj[x].id), parseFloat(obj[x].hours), parseFloat(obj[x].salary));
                    array.push(newObject);
                }
            }
            
            if(localStorage.persons){
                var persons = JSON.parse(localStorage.persons);
                for (var x in array) {
                    for (var j in persons){
                        if(parseInt(persons[j].person) + 1000 == array[x].id){
                            array[x].hours = persons[j].hours;
                            console.log("found match")
                        }
                    }
                }
            }
            
            // once everything has loaded, call these functions
            generateEmployeeList();
            individualPay(0);
            handlePayRoll();
            
        }
    }
    req.open('GET', 'https://employee-tracker-12907.firebaseio.com/employees/.json', true);
    req.send();
    
}

// Self Invoking function; using to control the list variable without using a global variable
var createEmployees = (function(){
    // using this variable to hold the json 
    var dbRef = null;
    var array = [];
    
    // grab the employees from firebase
    ajaxCall(array);
    

    
    return{
        // an array of employee objects that various functions will use
        list: array,
        // add to the array when needed
        set: function set(firstName, lastName, age, hours, salary) {
            var id = array[array.length - 1].id + 1;
            var newObject = new Employee(firstName, lastName, age, id, hours, salary)
            array.push(newObject);
            appendList(array.length - 1, array);
            var storageArray = []
            
            // pull array from local storage
            if(localStorage.obj){
                storageArray = JSON.parse(localStorage.obj)
                storageArray.push(newObject);
            }
            else storageArray.push(newObject)
            
            // push array into local storage
            if (typeof(Storage) !== "undefined") {
                localStorage.obj = JSON.stringify(storageArray);
            } else {
                window.alert("Your browser doesn't support local storage. This website will not work!");
            }
        },
        updateHours: function updateHours(hours, person) {
            var pobj = {person: person, hours: hours}
            var persons = [];
            
            if(localStorage.persons){
                persons = JSON.parse(localStorage.persons);
                var found = false;
                for(var x in persons){
                    if(persons[x].person == person){
                        persons[x] = pobj;
                        found = true;
                    }
                }
                if(!found){
                    persons.push(pobj)
                }
            } else persons.push(pobj);
            console.log(persons)
            localStorage.persons = JSON.stringify(persons);
            array[person].hours = hours;
            individualPay(person);
            handlePayRoll();
        }
    }
}());


// Used to generate and display the employees
function generateEmployeeList(){
    var employees = createEmployees.list;
    var i = 0;
    while(i < employees.length){
        appendList(i, employees);
        // iterate to the next employee
        i++;  
    }
}

// Create an Employee List
function appendList(number, employees){
    

        // append employee list
        var node = document.createElement("li");
        var textNode = document.createTextNode(employees[number].fullName());
        node.appendChild(textNode);
        
        // append the select tag
        var list = document.getElementById("employeeList2");
        var option = document.createElement("option");
        option.setAttribute("value", number);
        option.text = employees[number].fullName();
        list.add(option);
        
        document.getElementById("employeeList").appendChild(node);
}

// This function makes a form visible when a user clicks 'Add Employee'
function appendEmployeeForm(){
    document.getElementById("addEmployee").style.visibility = 'hidden';
    document.getElementById("employeeForm").style.display = 'inherit';
    document.getElementById("employeeForm").style.animation = 'moveLeft 0.5s linear';
    
}

// Grabs inputs from the dom and pushes new employees to the array
function addEmployee() {
    var firstName = document.getElementById("firstname").value;
    var lastName = document.getElementById("lastname").value;
    var age = parseInt(document.getElementById("age").value);
    var salary = parseFloat(document.getElementById("salary").value);
    
    createEmployees.set(firstName, lastName, age, 0, salary);
    // Make the Add Employee button visible again
    document.getElementById("addEmployee").style.visibility = 'visible';
    document.getElementById("employeeForm").style.display = 'none';
    
    document.getElementById("firstname").value = "";
    document.getElementById("lastname").value = "";
    document.getElementById("age").value = "";
    document.getElementById("salary").value = "";
}

// This function modifies html when the user clicks update hours
function appendHours(){
    document.getElementById('hoursButton').style.display = "none";
    var node = document.createElement("input");
    var append = document.getElementById('updateHours').appendChild(node);
    document.getElementById('updateHours').lastChild.setAttribute('placeholder', 'New Hours');
    document.getElementById('updateHours').lastChild.setAttribute('id', 'newHours');
    
    var submit = document.createElement('button');
    textNode = document.createTextNode("Submit");
    submit.appendChild(textNode);
    submit.setAttribute('class', 'btn');
    document.getElementById("updateHours").appendChild(submit);
    document.getElementById("updateHours").lastChild.setAttribute('onclick', 'editHours()');
    
    document.getElementById("updateHours").style.animation = 'changeColor 2s linear';
    
}

// Modify 
function editHours(){
    document.getElementById('hoursButton').style.visibility = 'visible';
    var person = document.getElementById("employeeList2").value;
    createEmployees.updateHours(parseFloat(document.getElementById('newHours').value), person);
    
    var node = document.getElementById("updateHours");
    while(node.firstChild){
        node.removeChild(node.firstChild);
    }
    document.getElementById('hoursButton').style.display = "inherit";

}

// Generate employee's pay information
function individualPay(person){
    var employeeArr = createEmployees.list;
    document.getElementById("name").innerHTML = employeeArr[person].fullName();
    document.getElementById("salary").innerHTML = "Salary: $" + employeeArr[person].salary.toFixed(2);
    document.getElementById("hours").innerHTML = "Hours: " + employeeArr[person].hours.toFixed(2);
    document.getElementById("pay").innerHTML = "Pay: $" + employeeArr[person].calculatePay().toFixed(2);


}

// Return the total hours of all employees
function totalHours(){
    var employeeArr = createEmployees.list;
    var totalHours = 0.00;
    
    for (var i = 0; i < employeeArr.length; i++){
        totalHours += employeeArr[i].hours;
    }
    return totalHours;
}

// Return the total payout of all employees
function totalPayRoll(){    
    var employeeArr = createEmployees.list;
    var totalPay = 0.00;
    
    for (var i = 0; i < employeeArr.length; i++){
        totalPay += employeeArr[i].calculatePay();
    }
    console.log(totalPay.toFixed(2));
    return totalPay;
}

// Display totals
function handlePayRoll() {
    document.getElementById("totalHours").innerHTML = "Total Hours: " + totalHours().toFixed(2);
    document.getElementById("totalPay").innerHTML = "Total Payout: $" + totalPayRoll().toFixed(2);
}         
