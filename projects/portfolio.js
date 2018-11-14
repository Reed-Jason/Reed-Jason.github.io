var isUp = false;

function triggerDiv(id){
    // reset all tags
    var id1 = id + '1';
    document.getElementById('home').style.backgroundColor = 'initial';
    document.getElementById('skills').style.backgroundColor = 'initial';
    document.getElementById('contact').style.backgroundColor = 'initial';
    
    document.getElementById('home1').style.display = 'none';
    document.getElementById('skills1').style.display = 'none';
    document.getElementById('contact1').style.display = 'none';
    
    var elem = document.getElementById(id).style;
    var elem1 = document.getElementById(id1).style;
    console.log(id1);
    // set the current tag
    elem.backgroundColor = '#B82601';
    elem1.display = 'inherit';
    elem1.animation = 'paragraph 0.5s linear';
    
}

function changeOpacity(id){
    var elem = document.getElementById(id).style;
    elem.transition = 'opacity 2.5s linear';
    elem.opacity = '1';
}

function fall() {
    var elem = document.getElementById("navBar").style;
    elem.animation = "moveLeft 1s linear";
}

function start() {
    changeOpacity('navBar');
    fall();
    triggerDiv('home');
}

function increaseProject(){
    var elem = document.getElementById('projects').style;
    var elem1 = document.getElementById('down').style;
    var text = document.getElementById('projectContent').style;
    
    
    
    elem.transition = "transform 2.5s";
    if (isUp){
        elem.transform = "scale(1.0)"
        text.display = "none";
    } else {
        elem.transform = "scale(1.2)";
        text.display = 'inherit';
        var scrollingElement = (document.scrollingElement || document.body);
        scrollingElement.scrollTop = scrollingElement.scrollHeight;
    }
    
    elem1.transition = "transform 2.5s";
    
    if(isUp){
        elem1.transform = "rotate(45deg)";
        isUp = false;
    } else {
        elem1.transform = "rotate(225deg)";
        isUp = true;
    }
}