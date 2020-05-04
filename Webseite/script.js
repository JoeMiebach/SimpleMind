let mouse = {
    x: 0,
    y: 0
}

let elemSelected = null;
let xoffsetCircle, yoffsetCircle;
let xoffsetOther, yoffsetOther;

//Mouse/ Elem Offset
let xOffsetCircle, yOffsetCircle;
let xOffsetOther, yOffsetOther;

//Cords of the Outside Elem
let xOutside, yOutside;

function select(elem) {
    console.log("grab");
    elemSelected = elem;
    xOffsetCircle = mouse.x + document.getElementById("workingArea").scrollLeft - elemSelected.getAttribute("cx");
    yOffsetCircle = mouse.y + document.getElementById("workingArea").scrollTop - elemSelected.getAttribute("cy");

    xOffsetOther = mouse.x + document.getElementById("workingArea").scrollLeft - elemSelected.getAttribute("x");
    yOffsetOther = mouse.y + document.getElementById("workingArea").scrollTop - elemSelected.getAttribute("y");
}


function deselect(elem) {
    elemSelected = null;
}


function findScreenCoords(mouseEvent) {
    

    if (mouseEvent) {
        //FireFox
        mouse.x = mouseEvent.clientX;
        mouse.y = mouseEvent.clientY;
    } else {
        //IE
        mouse.x = window.event.clientX;
        mouse.y = window.event.clientY;
    }

    

    if (elemSelected != null) {
        elemSelected.setAttribute('cx', mouse.x + document.getElementById("workingArea").scrollLeft - xOffsetCircle);
        elemSelected.setAttribute('cy', mouse.y + document.getElementById("workingArea").scrollTop - yOffsetCircle);

        elemSelected.setAttribute('x', mouse.x + document.getElementById("workingArea").scrollLeft - xOffsetOther);
        elemSelected.setAttribute('y', mouse.y + document.getElementById("workingArea").scrollTop - yOffsetOther);


        resizeSVG();
    }


}

document.getElementById("workingArea").onmousemove = findScreenCoords;

function resizeSVG() {
    var svg = document.getElementById("ID_SVG");

    if (svg.getAttribute("width") < elemSelected.getBoundingClientRect().x + elemSelected.getBoundingClientRect().width + document.getElementById("workingArea").scrollLeft) {
        console.log("resize");
        svg.setAttribute("width", elemSelected.getBoundingClientRect().x + elemSelected.getBoundingClientRect().width + document.getElementById("workingArea").scrollLeft);
    }

    if (svg.getAttribute("height") < elemSelected.getBoundingClientRect().y + elemSelected.getBoundingClientRect().height + document.getElementById("workingArea").scrollTop) {
        console.log("resize");
        svg.setAttribute("height", elemSelected.getBoundingClientRect().y + elemSelected.getBoundingClientRect().height + document.getElementById("workingArea").scrollLeft);
    }
}