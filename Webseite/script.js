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

let snappingDistance = 100;

function select(elem) {

    if(elemSelected == null) {
        console.log("grab");
        elemSelected = elem;
        xOffsetCircle = mouse.x + document.getElementById("workingArea").scrollLeft - elemSelected.getAttribute("cx");
        yOffsetCircle = mouse.y + document.getElementById("workingArea").scrollTop - elemSelected.getAttribute("cy");
        
        xOffsetOther = mouse.x + document.getElementById("workingArea").scrollLeft - elemSelected.getAttribute("x");
        yOffsetOther = mouse.y + document.getElementById("workingArea").scrollTop - elemSelected.getAttribute("y");
        
        
        
        const selectionVisualisation = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        
        selectionVisualisation.setAttribute("x", elemSelected.getBoundingClientRect().x + document.getElementById("workingArea").scrollLeft);
        selectionVisualisation.setAttribute("y", elemSelected.getBoundingClientRect().y + document.getElementById("workingArea").scrollTop);
        
        selectionVisualisation.setAttribute("width", elemSelected.getBoundingClientRect().width);
        selectionVisualisation.setAttribute("height", elemSelected.getBoundingClientRect().height);
        selectionVisualisation.setAttribute("stroke", "gray");
        selectionVisualisation.setAttribute("stroke-width", "1");
        selectionVisualisation.setAttribute("stroke-opacity", "0.5");
        selectionVisualisation.setAttribute("stroke-linejoin", "round");
        selectionVisualisation.setAttribute("fill", "none");
        selectionVisualisation.setAttribute("id", "selectionVisualisation")
        document.getElementById("ID_SVG").appendChild(selectionVisualisation);





        const dragTopLeft = document.createElementNS("http://www.w3.org/2000/svg", "circle");

        dragTopLeft.setAttribute("cx", elemSelected.getBoundingClientRect().x);
        dragTopLeft.setAttribute("cy", elemSelected.getBoundingClientRect().y);

        dragTopLeft.setAttribute("r", 30);
        dragTopLeft.setAttribute("fill", "blue");

        console.log(dragTopLeft);
        document.getElementById("ID_SVG").appendChild(dragTopLeft);

    }
}


function deselect(elem) {
    elemSelected = null;
    document.getElementById("selectionVisualisation").remove();
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
        elemSelected.setAttribute('cx', (Math.round((mouse.x + document.getElementById("workingArea").scrollLeft - xOffsetCircle) / snappingDistance)) * snappingDistance);
        elemSelected.setAttribute('cy', (Math.round((mouse.y + document.getElementById("workingArea").scrollTop - yOffsetCircle) / snappingDistance)) * snappingDistance);
        console.log(((Math.round((mouse.x + document.getElementById("workingArea").scrollLeft - xOffsetCircle) / snappingDistance)) * snappingDistance) + " " + (Math.round((mouse.y + document.getElementById("workingArea").scrollTop - yOffsetCircle) / snappingDistance)) * snappingDistance);

        elemSelected.setAttribute('x', (Math.round((mouse.x + document.getElementById("workingArea").scrollLeft - xOffsetOther) / snappingDistance)) * snappingDistance);
        elemSelected.setAttribute('y', (Math.round((mouse.y + document.getElementById("workingArea").scrollTop - yOffsetOther) / snappingDistance)) * snappingDistance);


        document.getElementById("selectionVisualisation").setAttribute("x", elemSelected.getBoundingClientRect().x + document.getElementById("workingArea").scrollLeft)
        document.getElementById("selectionVisualisation").setAttribute("y", elemSelected.getBoundingClientRect().y + document.getElementById("workingArea").scrollTop);

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