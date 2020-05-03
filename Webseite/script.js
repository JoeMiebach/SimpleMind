let mouse = {
    x: 0,
    y: 0
}

let elemSelected = null;

function select(elem) {
    elemSelected = elem;
}


function deselect(elem) {
    elemSelected = null;
}


function findScreenCoords(mouseEvent) {
    var xpos;
    var ypos;

    if (mouseEvent) {
        //FireFox
        mouse.x = mouseEvent.screenX;
        mouse.y = mouseEvent.screenY;
    } else {
        //IE
        mouse.x = window.event.screenX;
        mouse.y = window.event.screenY;
    }

    if(elemSelected != null) {
        elemSelected.style.cx = mouse.x;
    }

}

document.getElementById("workingArea").onmousemove = findScreenCoords;