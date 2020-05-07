let mouse = {
    x: 0,
    y: 0
}

let elemSelected = null;
let elemSelectedMoving = null;
let xoffsetCircle, yoffsetCircle;
let xoffsetOther, yoffsetOther;

//Mouse/ Elem Offset
let xOffsetCircle, yOffsetCircle;
let xOffsetOther, yOffsetOther;

//Cords of the Outside Elem
let xOutside, yOutside;

let snappingDistance = 30;


function multiSelection() {
    console.log("multi");
}

function select(elem) {

    
    if(elemSelectedMoving == null) {
        elemSelectedMoving = elem;
        elemSelected = elem;
        xOffsetCircle = mouse.x + document.getElementById("workingArea").scrollLeft - elemSelected.getAttribute("cx");
        yOffsetCircle = mouse.y + document.getElementById("workingArea").scrollTop - elemSelected.getAttribute("cy");
        
        xOffsetOther = mouse.x + document.getElementById("workingArea").scrollLeft - elemSelected.getAttribute("x");
        yOffsetOther = mouse.y + document.getElementById("workingArea").scrollTop - elemSelected.getAttribute("y");
        
        if(document.getElementById("selectionVisualisation") != null) {
            // DELETE DRAGBOX
            document.getElementById("selectionVisualisation").remove();
            document.getElementById("dragTopLeft").remove();
            document.getElementById("dragTopCenter").remove();
            document.getElementById("dragTopRight").remove();
            document.getElementById("dragCenterRight").remove();
            document.getElementById("dragBottomRight").remove();
            document.getElementById("dragBottomCenter").remove();
            document.getElementById("dragBottomLeft").remove();
            document.getElementById("dragCenterLeft").remove();

        }
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
            dragTopLeft.setAttribute("cx", elemSelected.getBoundingClientRect().x + document.getElementById("workingArea").scrollLeft);
            dragTopLeft.setAttribute("cy", elemSelected.getBoundingClientRect().y + document.getElementById("workingArea").scrollTop);
            dragTopLeft.setAttribute("id", "dragTopLeft");
            dragTopLeft.setAttribute("class", "draggingPoint");
            document.getElementById("ID_SVG").appendChild(dragTopLeft);


            const dragTopCenter = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            dragTopCenter.setAttribute("cx", elemSelected.getBoundingClientRect().x + document.getElementById("workingArea").scrollLeft + elemSelected.getBoundingClientRect().width / 2);
            dragTopCenter.setAttribute("cy", elemSelected.getBoundingClientRect().y + document.getElementById("workingArea").scrollTop);
            dragTopCenter.setAttribute("id", "dragTopCenter");
            dragTopCenter.setAttribute("class", "draggingPoint");
            document.getElementById("ID_SVG").appendChild(dragTopCenter);

            

            const dragTopRight = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            dragTopRight.setAttribute("cx", elemSelected.getBoundingClientRect().x + document.getElementById("workingArea").scrollLeft + elemSelected.getBoundingClientRect().width);
            dragTopRight.setAttribute("cy", elemSelected.getBoundingClientRect().y + document.getElementById("workingArea").scrollTop);
            dragTopRight.setAttribute("id", "dragTopRight");
            dragTopRight.setAttribute("class", "draggingPoint");
            document.getElementById("ID_SVG").appendChild(dragTopRight);



            const dragCenterRight = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            dragCenterRight.setAttribute("cx", elemSelected.getBoundingClientRect().x + document.getElementById("workingArea").scrollLeft + elemSelected.getBoundingClientRect().width);
            dragCenterRight.setAttribute("cy", elemSelected.getBoundingClientRect().y + document.getElementById("workingArea").scrollTop + elemSelected.getBoundingClientRect().height / 2);
            dragCenterRight.setAttribute("id", "dragCenterRight");
            dragCenterRight.setAttribute("class", "draggingPoint");
            document.getElementById("ID_SVG").appendChild(dragCenterRight);

            const dragBottomRight = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            dragBottomRight.setAttribute("cx", elemSelected.getBoundingClientRect().x + document.getElementById("workingArea").scrollLeft + elemSelected.getBoundingClientRect().width);
            dragBottomRight.setAttribute("cy", elemSelected.getBoundingClientRect().y + document.getElementById("workingArea").scrollTop + elemSelected.getBoundingClientRect().height);
            dragBottomRight.setAttribute("id", "dragBottomRight");
            dragBottomRight.setAttribute("class", "draggingPoint");
            document.getElementById("ID_SVG").appendChild(dragBottomRight);

            const dragBottomCenter = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            dragBottomCenter.setAttribute("cx", elemSelected.getBoundingClientRect().x + document.getElementById("workingArea").scrollLeft + elemSelected.getBoundingClientRect().width / 2);
            dragBottomCenter.setAttribute("cy", elemSelected.getBoundingClientRect().y + document.getElementById("workingArea").scrollTop + elemSelected.getBoundingClientRect().height);
            dragBottomCenter.setAttribute("id", "dragBottomCenter");
            dragBottomCenter.setAttribute("class", "draggingPoint");
            document.getElementById("ID_SVG").appendChild(dragBottomCenter);

            const dragBottomLeft = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            dragBottomLeft.setAttribute("cx", elemSelected.getBoundingClientRect().x + document.getElementById("workingArea").scrollLeft);
            dragBottomLeft.setAttribute("cy", elemSelected.getBoundingClientRect().y + document.getElementById("workingArea").scrollTop + elemSelected.getBoundingClientRect().height);
            dragBottomLeft.setAttribute("id", "dragBottomLeft");
            dragBottomLeft.setAttribute("class", "draggingPoint");
            document.getElementById("ID_SVG").appendChild(dragBottomLeft);

            const dragCenterLeft = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            dragCenterLeft.setAttribute("cx", elemSelected.getBoundingClientRect().x + document.getElementById("workingArea").scrollLeft);
            dragCenterLeft.setAttribute("cy", elemSelected.getBoundingClientRect().y + document.getElementById("workingArea").scrollTop + elemSelected.getBoundingClientRect().height / 2);
            dragCenterLeft.setAttribute("id", "dragCenterLeft");
            dragCenterLeft.setAttribute("class", "draggingPoint");
            document.getElementById("ID_SVG").appendChild(dragCenterLeft);
        


    }
}


function deselect(elem, event) {
    

    if (event.target !== elem) {
        console.log("Ja")
        

        elemSelectedMoving = null;
        

    } else {
        console.log("nein")

        // DELETE DRAGBOX
        document.getElementById("selectionVisualisation").remove();
        document.getElementById("dragTopLeft").remove();
        document.getElementById("dragTopCenter").remove();
        document.getElementById("dragTopRight").remove();
        document.getElementById("dragCenterRight").remove();
        document.getElementById("dragBottomRight").remove();
        document.getElementById("dragBottomCenter").remove();
        document.getElementById("dragBottomLeft").remove();
        document.getElementById("dragCenterLeft").remove();

        elemSelected = null;
    }

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

    

    if (elemSelectedMoving != null) {
        elemSelectedMoving.setAttribute('cx', (Math.round((mouse.x + document.getElementById("workingArea").scrollLeft - xOffsetCircle) / snappingDistance)) * snappingDistance);
        elemSelectedMoving.setAttribute('cy', (Math.round((mouse.y + document.getElementById("workingArea").scrollTop - yOffsetCircle) / snappingDistance)) * snappingDistance);

        elemSelectedMoving.setAttribute('x', (Math.round((mouse.x + document.getElementById("workingArea").scrollLeft - xOffsetOther) / snappingDistance)) * snappingDistance);
        elemSelectedMoving.setAttribute('y', (Math.round((mouse.y + document.getElementById("workingArea").scrollTop - yOffsetOther) / snappingDistance)) * snappingDistance);

        resizeSVG();
    }

    if (elemSelected != null) {
        document.getElementById("selectionVisualisation").setAttribute("x", elemSelected.getBoundingClientRect().x + document.getElementById("workingArea").scrollLeft)
        document.getElementById("selectionVisualisation").setAttribute("y", elemSelected.getBoundingClientRect().y + document.getElementById("workingArea").scrollTop);

        // DRAG BOX
        document.getElementById("selectionVisualisation").setAttribute("x", elemSelected.getBoundingClientRect().x + document.getElementById("workingArea").scrollLeft)
        document.getElementById("selectionVisualisation").setAttribute("y", elemSelected.getBoundingClientRect().y + document.getElementById("workingArea").scrollTop);

        document.getElementById("dragTopLeft").setAttribute("cx", elemSelected.getBoundingClientRect().x + document.getElementById("workingArea").scrollLeft)
        document.getElementById("dragTopLeft").setAttribute("cy", elemSelected.getBoundingClientRect().y + document.getElementById("workingArea").scrollTop);
        
        document.getElementById("dragTopCenter").setAttribute("cx", elemSelected.getBoundingClientRect().x + document.getElementById("workingArea").scrollLeft + elemSelected.getBoundingClientRect().width / 2)
        document.getElementById("dragTopCenter").setAttribute("cy", elemSelected.getBoundingClientRect().y + document.getElementById("workingArea").scrollTop);

        document.getElementById("dragTopRight").setAttribute("cx", elemSelected.getBoundingClientRect().x + document.getElementById("workingArea").scrollLeft + elemSelected.getBoundingClientRect().width)
        document.getElementById("dragTopRight").setAttribute("cy", elemSelected.getBoundingClientRect().y + document.getElementById("workingArea").scrollTop);

        document.getElementById("dragCenterRight").setAttribute("cx", elemSelected.getBoundingClientRect().x + document.getElementById("workingArea").scrollLeft + elemSelected.getBoundingClientRect().width)
        document.getElementById("dragCenterRight").setAttribute("cy", elemSelected.getBoundingClientRect().y + document.getElementById("workingArea").scrollTop + elemSelected.getBoundingClientRect().height / 2);
       
        document.getElementById("dragBottomRight").setAttribute("cx", elemSelected.getBoundingClientRect().x + document.getElementById("workingArea").scrollLeft + elemSelected.getBoundingClientRect().width)
        document.getElementById("dragBottomRight").setAttribute("cy", elemSelected.getBoundingClientRect().y + document.getElementById("workingArea").scrollTop + elemSelected.getBoundingClientRect().height);

        document.getElementById("dragBottomCenter").setAttribute("cx", elemSelected.getBoundingClientRect().x + document.getElementById("workingArea").scrollLeft + elemSelected.getBoundingClientRect().width / 2)
        document.getElementById("dragBottomCenter").setAttribute("cy", elemSelected.getBoundingClientRect().y + document.getElementById("workingArea").scrollTop + elemSelected.getBoundingClientRect().height);

        document.getElementById("dragBottomLeft").setAttribute("cx", elemSelected.getBoundingClientRect().x + document.getElementById("workingArea").scrollLeft)
        document.getElementById("dragBottomLeft").setAttribute("cy", elemSelected.getBoundingClientRect().y + document.getElementById("workingArea").scrollTop + elemSelected.getBoundingClientRect().height);

        document.getElementById("dragCenterLeft").setAttribute("cx", elemSelected.getBoundingClientRect().x + document.getElementById("workingArea").scrollLeft)
        document.getElementById("dragCenterLeft").setAttribute("cy", elemSelected.getBoundingClientRect().y + document.getElementById("workingArea").scrollTop + elemSelected.getBoundingClientRect().height / 2);
    }

}

document.getElementById("workingArea").onmousemove = findScreenCoords;

function resizeSVG() {
    var svg = document.getElementById("ID_SVG");

    if (svg.getAttribute("width") < elemSelected.getBoundingClientRect().x + elemSelected.getBoundingClientRect().width + document.getElementById("workingArea").scrollLeft) {
        svg.setAttribute("width", elemSelected.getBoundingClientRect().x + elemSelected.getBoundingClientRect().width + document.getElementById("workingArea").scrollLeft);
    }

    if (svg.getAttribute("height") < elemSelected.getBoundingClientRect().y + elemSelected.getBoundingClientRect().height + document.getElementById("workingArea").scrollTop) {
        svg.setAttribute("height", elemSelected.getBoundingClientRect().y + elemSelected.getBoundingClientRect().height + document.getElementById("workingArea").scrollLeft);
    }
}

