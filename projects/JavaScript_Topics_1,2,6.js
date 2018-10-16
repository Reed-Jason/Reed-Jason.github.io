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

// Self Invoking function; using to control the list variable without using a global variable
var createEmployees = (function(){
    // Since we do not have a database, hardcoding a few objects
    var john = new Employee("John", "Doe", 32, 1000, 81, 22.50);
    var steve = new Employee("Steve", "Larsen", 22, 1001, 80.45, 19.75);
    var shauna = new Employee("Shauna", "Morris", 25, 1002, 78.76, 20.00);
    var david = new Employee("David", "Lee", 30, 1003, 90.45, 21.00);
    var array = [john, steve, shauna, david];
    
    return{
        // an array of employee objects that various functions will use
        list: array,
        // add to the array when needed
        set: function set(firstName, lastName, age, hours, salary) {
            var id = array[array.length - 1].id + 1;
            var newObject = new Employee(firstName, lastName, age, id, hours, salary)
            array.push(newObject);
            appendList(array.length - 1, array);
        },
        updateHours: function updateHours(hours, person) {
            array[person].hours = hours;
            individualPay(person);
            handlePayRoll();
        }
    }
}());

// Using this function to call other functions to demonstrate a switch statement
function mainExecution(number, value){
    switch (number){
        case 1:
            generateEmployeeList();
            break;
        case 2:
            individualPay(value);
            break;
        case 3:
            handlePayRoll();
            break;
        default:
            return;
    }
}

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
    
        console.log(employees[number].fullName());
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

// This function creates a form when a user clicks 'Add Employee'
function appendEmployeeForm(){
    document.getElementById("addEmployee").style.visibility = 'hidden';
    
    // add first name paragraph and input
    var node = document.createElement('p');
    var textNode = document.createTextNode("First Name: ");
    node.appendChild(textNode);
    document.getElementById("employeeForm").appendChild(node);
    var inputNode = document.createElement('input');
    var inputAppend = document.getElementById("employeeForm").appendChild(inputNode);
    document.getElementById("employeeForm").lastChild.setAttribute("id", "firstname");
    
    // add last name paragraph and input
    var node1 = document.createElement('p');
    textNode = document.createTextNode("Last Name: ");
    node1.appendChild(textNode);
    document.getElementById("employeeForm").appendChild(node1);
    var inputNode1 = document.createElement('input');
    var inputAppend1 = document.getElementById("employeeForm").appendChild(inputNode1);
    document.getElementById("employeeForm").lastChild.setAttribute("id", "lastname");
    
    // add age input and paragraph
    var node2 = document.createElement('p');
    textNode = document.createTextNode("Age: ");
    node2.appendChild(textNode);
    document.getElementById("employeeForm").appendChild(node2);
    var inputNode2 = document.createElement('input');
    var inputAppend2 = document.getElementById("employeeForm").appendChild(inputNode2);
    document.getElementById("employeeForm").lastChild.setAttribute("id", "age");
    
    // add salary input and paragraph
    var node3 = document.createElement('p');
    textNode = document.createTextNode("Salary: ");
    node3.appendChild(textNode);
    document.getElementById("employeeForm").appendChild(node3);
    var inputNode3 = document.createElement('input');
    var inputAppend3 = document.getElementById("employeeForm").appendChild(inputNode3);
    document.getElementById("employeeForm").lastChild.setAttribute("id", "salary");
    
    // add break
    var breakLine = document.createElement('br')
    document.getElementById("employeeForm").appendChild(breakLine);
    
    // add a submit button and create and onclick attribute
    var submit = document.createElement('button');
    textNode = document.createTextNode("Submit");
    submit.appendChild(textNode);
    document.getElementById("employeeForm").appendChild(submit);
    document.getElementById("employeeForm").lastChild.setAttribute('onclick', 'addEmployee()');
}

function addEmployee() {
    var firstName = document.getElementById("firstname").value;
    var lastName = document.getElementById("lastname").value;
    var age = parseInt(document.getElementById("age").value);
    var salary = parseFloat(document.getElementById("salary").value);
    
    createEmployees.set(firstName, lastName, age, 0, salary);
    // Make the Add Employee button visible again
    document.getElementById("addEmployee").style.visibility = 'visible';
    var node = document.getElementById("employeeForm");
    // Delete the form
    while(node.firstChild){
        node.removeChild(node.firstChild);
    }
}

// This function modifies html when the user clicks update hours
function appendHours(){
    document.getElementById('hoursButton').style.visibility = 'hidden';
    var node = document.createElement("input");
    var append = document.getElementById('updateHours').appendChild(node);
    document.getElementById('updateHours').lastChild.setAttribute('placeholder', 'New Hours');
    document.getElementById('updateHours').lastChild.setAttribute('id', 'newHours');
    
    var submit = document.createElement('button');
    textNode = document.createTextNode("Submit");
    submit.appendChild(textNode);
    document.getElementById("updateHours").appendChild(submit);
    document.getElementById("updateHours").lastChild.setAttribute('onclick', 'editHours()');
    
}

// Modify 
function editHours(){
    document.getElementById('hoursButton').style.visibility = 'visible';
    var person = document.getElementById("employeeList2").value;
    createEmployees.updateHours(parseFloat(document.getElementById('newHours').value), person);
    
    var node =document.getElementById("updateHours");
    while(node.firstChild){
        node.removeChild(node.firstChild);
    }

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
