const apiKey = "3Oz3I9iE6pWr1o48JSR4InB8E2jdP04xG4DnYYIf";

/****
* This function will make an AJAX call to the NASA Api to retrieve Nasa's 
* picture of the day
**/
function getPic(){
  var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            // parse the JSON
            var data = JSON.parse(this.responseText);
            console.log(data);
            
            // Manipulate the Dom
            var title = document.createElement("h2");
            var titleTxt = document.createTextNode(data.title);
            title.appendChild(titleTxt);
            document.getElementById("section2").appendChild(title);
            
            var img = document.createElement("img");
            img.setAttribute("src", data.hdurl);
            document.getElementById('section1').appendChild(img);
            
            var date = document.createElement("h3");
            var dateTxt = document.createTextNode(data.date);
            date.appendChild(dateTxt);
            document.getElementById("section2").appendChild(date);
            
            var description = document.createElement("p");
            var descriptionTxt = document.createTextNode(data.explanation)
            description.appendChild(descriptionTxt);
            document.getElementById("section2").appendChild(description);
  
        }
    }
  req.open("GET", "https://api.nasa.gov/planetary/apod?api_key=" + apiKey, true);
  req.send();
    
}

/****
* This function will make an AJAX call to the NASA Api to retrieve pictures from the
* curiousity rover
**/
function getRover() {
    var date = new Date();
    var year = date.getFullYear();
    // need to get the month before the current dat since 
    // the rover doesn't update the exact day
    var month = date.getMonth();
    var day = date.getDate();
    var dateToEnter = year + "-" + month + "-" + day;
    
    // make the Ajax call
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            // parse the object
            var data = JSON.parse(this.responseText);
            console.log(data.photos[0].earth_date)
            
            // manipulate the document
            document.getElementById("btn").style.visibility = "hidden";
            document.getElementById("section3").style.visibility = "visible";
            document.getElementById("section4").style.visibility = "visible";
            var title = document.createElement("h2");
            var titleTxt = document.createTextNode("Picture from Curiosity");
            title.appendChild(titleTxt);
            document.getElementById("section4").appendChild(title);
            
            var date = document.createElement("h3");
            var dateTxt = document.createTextNode(data.photos[0].earth_date);
            date.appendChild(dateTxt);
            document.getElementById("section4").appendChild(date);
            
            
            var img = document.createElement("img");
            img.setAttribute("src", data.photos[0].img_src);
            document.getElementById('section3').appendChild(img);
            
        }
    }
    req.open("GET", "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=" + dateToEnter + "&api_key=" + apiKey, true);
    req.send();
}
