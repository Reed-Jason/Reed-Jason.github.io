function fadeOut(){
    var elem = document.getElementById('box');
    elem.style.transition = "opacity 1s linear 0s"
    elem.style.opacity = 0;
}

function fadeIn(){
    var elem = document.getElementById('box');
    elem.style.transition = "opacity 1s linear 0s"
    elem.style.opacity = 1;
}

function slideOut(){
    var elem = document.getElementById('box2');
    elem.style.transition = "width 1s linear 0s";
    elem.style.width = "20%";
}

function slideIn(){
    var elem = document.getElementById('box2');
    elem.style.transition = "width 1s linear 0s";
    elem.style.width = "85%";
}