let mouse = {
	x: 0,
	y: 0,
};

let elemSelected,
	elemSelectedMoving = null;

//Mouse/ Elem Offset
let xoffsetCircle, yoffsetCircle, xoffsetOther, yoffsetOther;

let workingArea = document.getElementById("workingArea");

let undo = [];
let redo = [];
//Settings
let snappingDistance = 20;

document.getElementById("patternHorizontal").setAttribute("width", snappingDistance);
document.getElementById("patternHorizontal").setAttribute("height", snappingDistance);
document.getElementById("patternVertical").setAttribute("width", snappingDistance);
document.getElementById("patternVertical").setAttribute("height", snappingDistance);

document.getElementById("patternVerticalHighlight").setAttribute("width", snappingDistance * 5);
document.getElementById("patternVerticalHighlight").setAttribute("height", snappingDistance);

document.getElementById("patternHorzontalHighlight").setAttribute("width", snappingDistance * 5);
document.getElementById("patternHorzontalHighlight").setAttribute("height", snappingDistance);


changeCords("hLine0", snappingDistance * 0);
changeCords("hLine1", snappingDistance * 1);
changeCords("hLine2", snappingDistance * 2);
changeCords("hLine3", snappingDistance * 3);


changeCords("vLine0", snappingDistance * 0);
changeCords("vLine1", snappingDistance * 1);
changeCords("vLine2", snappingDistance * 2);
changeCords("vLine3", snappingDistance * 3);

undo.push(document.getElementById("ID_SVG").cloneNode(true));

function changeCords(elemId, num) {
	document.getElementById(elemId).setAttribute("x1", num);
	document.getElementById(elemId).setAttribute("x2", num);
	document.getElementById(elemId).setAttribute("y2", num);

	if(elemId = "hLine0") {
		document.getElementById(elemId).setAttribute("y2", snappingDistance);
	}

	if(elemId = "vLine0") {
		document.getElementById(elemId).setAttribute("y2", snappingDistance);
	}
}


let dragedElem = {
	x: 0,
	y: 0,
	width: 0,
	height: 0,
};

let dragedCenterRight = false,
	dragedBottomCenter = false,
	dragedTopCenter = false,
	dragedCenterLeft = false;

function select(elem) {
	if (elemSelectedMoving == null) {
		elemSelectedMoving = elem;
		elemSelected = elem;

		xOffsetCircle = mouse.x + workingArea.scrollLeft - elemSelected.getAttribute("cx");
		yOffsetCircle = mouse.y + workingArea.scrollTop - elemSelected.getAttribute("cy");

		xOffsetOther = (mouse.x - (elemSelected.getAttribute("x")));
		yOffsetOther = (mouse.y - (elemSelected.getAttribute("y")));

		

		if (document.getElementById("selectionVisualisation") != null) {
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

		selectionVisualisation.setAttribute("x", (elemSelected.getBoundingClientRect().x - document.getElementById("ID_SVG").getBoundingClientRect().x) /scaleGlobal);
		selectionVisualisation.setAttribute("y", (elemSelected.getBoundingClientRect().y - document.getElementById("ID_SVG").getBoundingClientRect().y) / scaleGlobal);

		selectionVisualisation.setAttribute("width", (elemSelected.getBoundingClientRect().width) / scaleGlobal) ;
		selectionVisualisation.setAttribute("height", (elemSelected.getBoundingClientRect().height) / scaleGlobal);
		selectionVisualisation.setAttribute("stroke", "grey");
		selectionVisualisation.setAttribute("stroke-width", "1");
		selectionVisualisation.setAttribute("stroke-linejoin", "round");
		selectionVisualisation.setAttribute("fill", "none");
		selectionVisualisation.setAttribute("id", "selectionVisualisation");
		document.getElementById("ID_SVG").appendChild(selectionVisualisation);

		const dragTopLeft = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		dragTopLeft.setAttribute("cx", (elemSelected.getBoundingClientRect().x + workingArea.scrollLeft - document.getElementById("ID_SVG").getBoundingClientRect().x) / scaleGlobal);
		dragTopLeft.setAttribute("cy", (elemSelected.getBoundingClientRect().y + workingArea.scrollTop - document.getElementById("ID_SVG").getBoundingClientRect().y) / scaleGlobal);
		dragTopLeft.setAttribute("id", "dragTopLeft");
		dragTopLeft.setAttribute("class", "draggingPoint");
		document.getElementById("ID_SVG").appendChild(dragTopLeft);

		const dragTopRight = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		dragTopRight.setAttribute("cx", (elemSelected.getBoundingClientRect().x + workingArea.scrollLeft + elemSelected.getBoundingClientRect().width - document.getElementById("ID_SVG").getBoundingClientRect().x) / scaleGlobal);
		dragTopRight.setAttribute("cy", (elemSelected.getBoundingClientRect().y + workingArea.scrollTop - document.getElementById("ID_SVG").getBoundingClientRect().y) / scaleGlobal);
		dragTopRight.setAttribute("id", "dragTopRight");
		dragTopRight.setAttribute("class", "draggingPoint");
		document.getElementById("ID_SVG").appendChild(dragTopRight);

		const dragBottomRight = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		dragBottomRight.setAttribute("cx", (elemSelected.getBoundingClientRect().x + workingArea.scrollLeft + elemSelected.getBoundingClientRect().width - document.getElementById("ID_SVG").getBoundingClientRect().x) / scaleGlobal);
		dragBottomRight.setAttribute("cy", (elemSelected.getBoundingClientRect().y + workingArea.scrollTop + elemSelected.getBoundingClientRect().height - document.getElementById("ID_SVG").getBoundingClientRect().y) / scaleGlobal);
		dragBottomRight.setAttribute("id", "dragBottomRight");
		dragBottomRight.setAttribute("class", "draggingPoint");
		document.getElementById("ID_SVG").appendChild(dragBottomRight);

		const dragBottomLeft = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		dragBottomLeft.setAttribute("cx", (elemSelected.getBoundingClientRect().x + workingArea.scrollLeft - document.getElementById("ID_SVG").getBoundingClientRect().x) / scaleGlobal);
		dragBottomLeft.setAttribute("cy", (elemSelected.getBoundingClientRect().y + workingArea.scrollTop + elemSelected.getBoundingClientRect().height - document.getElementById("ID_SVG").getBoundingClientRect().y) / scaleGlobal);
		dragBottomLeft.setAttribute("id", "dragBottomLeft");
		dragBottomLeft.setAttribute("class", "draggingPoint");
		document.getElementById("ID_SVG").appendChild(dragBottomLeft);

		const dragCenterLeft = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		dragCenterLeft.setAttribute("cx", (elemSelected.getBoundingClientRect().x + workingArea.scrollLeft - document.getElementById("ID_SVG").getBoundingClientRect().x) / scaleGlobal);
		dragCenterLeft.setAttribute("cy", (elemSelected.getBoundingClientRect().y + workingArea.scrollTop + elemSelected.getBoundingClientRect().height / 2 - document.getElementById("ID_SVG").getBoundingClientRect().y) / scaleGlobal);
		dragCenterLeft.setAttribute("id", "dragCenterLeft");
		dragCenterLeft.setAttribute("class", "draggingPoint");
		document.getElementById("ID_SVG").appendChild(dragCenterLeft);

		const dragTopCenter = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		dragTopCenter.setAttribute("cx", (elemSelected.getBoundingClientRect().x + workingArea.scrollLeft + elemSelected.getBoundingClientRect().width / 2 - document.getElementById("ID_SVG").getBoundingClientRect().x) / scaleGlobal);
		dragTopCenter.setAttribute("cy", (elemSelected.getBoundingClientRect().y + workingArea.scrollTop - document.getElementById("ID_SVG").getBoundingClientRect().y) / scaleGlobal);
		dragTopCenter.setAttribute("id", "dragTopCenter");
		dragTopCenter.setAttribute("class", "draggingPoint");
		document.getElementById("ID_SVG").appendChild(dragTopCenter);

		const dragBottomCenter = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		dragBottomCenter.setAttribute("cx", (elemSelected.getBoundingClientRect().x + workingArea.scrollLeft + elemSelected.getBoundingClientRect().width / 2 - document.getElementById("ID_SVG").getBoundingClientRect().x) / scaleGlobal);
		dragBottomCenter.setAttribute("cy", (elemSelected.getBoundingClientRect().y + workingArea.scrollTop + elemSelected.getBoundingClientRect().height - document.getElementById("ID_SVG").getBoundingClientRect().y) / scaleGlobal);
		dragBottomCenter.setAttribute("id", "dragBottomCenter");
		dragBottomCenter.setAttribute("class", "draggingPoint");
		document.getElementById("ID_SVG").appendChild(dragBottomCenter);

		const dragCenterRight = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		dragCenterRight.setAttribute("cx", (elemSelected.getBoundingClientRect().x + workingArea.scrollLeft + elemSelected.getBoundingClientRect().width - document.getElementById("ID_SVG").getBoundingClientRect().x) / scaleGlobal);
		dragCenterRight.setAttribute("cy", (elemSelected.getBoundingClientRect().y + workingArea.scrollTop + elemSelected.getBoundingClientRect().height / 2 - document.getElementById("ID_SVG").getBoundingClientRect().y) / scaleGlobal);
		dragCenterRight.setAttribute("id", "dragCenterRight");
		dragCenterRight.setAttribute("class", "draggingPoint");
		document.getElementById("ID_SVG").appendChild(dragCenterRight);

		// Resize Element
		document.getElementById("dragBottomRight").onmousedown = function () {
			dragedBottomCenter = true;
			dragedCenterRight = true;
			dragedElem.x = mouse.x;
			dragedElem.y = mouse.y;
			dragedElem.width = elemSelected.getBoundingClientRect().width;
			dragedElem.height = elemSelected.getBoundingClientRect().height;
		};
		document.getElementById("dragTopRight").onmousedown = function () {
			dragedTopCenter = true;
			dragedCenterRight = true;
			dragedElem.x = mouse.x;
			dragedElem.y = mouse.y;
			dragedElem.width = elemSelected.getBoundingClientRect().width;
			dragedElem.height = elemSelected.getBoundingClientRect().height;
		};
		document.getElementById("dragTopLeft").onmousedown = function () {
			dragedTopCenter = true;
			dragedCenterLeft = true;
			dragedElem.x = mouse.x;
			dragedElem.y = mouse.y;
			dragedElem.width = elemSelected.getBoundingClientRect().width;
			dragedElem.height = elemSelected.getBoundingClientRect().height;
		};
		document.getElementById("dragBottomLeft").onmousedown = function () {
			dragedBottomCenter = true;
			dragedCenterLeft = true;
			dragedElem.x = mouse.x;
			dragedElem.y = mouse.y;
			dragedElem.width = elemSelected.getBoundingClientRect().width;
			dragedElem.height = elemSelected.getBoundingClientRect().height;
		};
		document.getElementById("dragCenterRight").onmousedown = function () {
			dragedCenterRight = true;
			dragedElem.x = mouse.x;
			dragedElem.y = mouse.y;
			dragedElem.width = elemSelected.getBoundingClientRect().width;
			dragedElem.height = elemSelected.getBoundingClientRect().height;
		};
		document.getElementById("dragBottomCenter").onmousedown = function () {
			dragedBottomCenter = true;
			dragedElem.x = mouse.x;
			dragedElem.y = mouse.y;
			dragedElem.width = elemSelected.getBoundingClientRect().width;
			dragedElem.height = elemSelected.getBoundingClientRect().height;
		};
		document.getElementById("dragCenterLeft").onmousedown = function () {
			dragedCenterLeft = true;
			dragedElem.x = mouse.x;
			dragedElem.y = mouse.y;
			dragedElem.width = elemSelected.getBoundingClientRect().width;
			dragedElem.height = elemSelected.getBoundingClientRect().height;
		};
		document.getElementById("dragTopCenter").onmousedown = function () {
			dragedTopCenter = true;
			dragedElem.x = mouse.x;
			dragedElem.y = mouse.y;
			dragedElem.width = elemSelected.getBoundingClientRect().width;
			dragedElem.height = elemSelected.getBoundingClientRect().height;
		};
	}

	return elem;
}

function deselect(elem, event) {
	deselectResizing();
	closeRightClickMenu();

	if (elemSelected != null) {
		redo = [];
		undo.push(document.getElementById("ID_SVG").cloneNode(true));

		if (event.target !== elem) {
			elemSelectedMoving = null;
		} else {
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
			elemSelectedMoving = null;
		}
	}
}

function deselectResizing() {
	if (document.getElementById("dragCenterRight") != null) {
		dragedCenterRight = false;
	}

	if (document.getElementById("dragBottomCenter") != null) {
		dragedBottomCenter = false;
	}

	if (document.getElementById("dragTopCenter") != null) {
		dragedTopCenter = false;
	}

	if (document.getElementById("dragCenterLeft") != null) {
		dragedCenterLeft = false;
	}
}

function mouseMoving(mouseEvent) {
	if (mouseEvent) {
		//FireFox
		mouse.x = mouseEvent.clientX;
		mouse.y = mouseEvent.clientY;

		mouse.x = (mouse.x - document.getElementById("ID_SVG").getBoundingClientRect().x) / scaleGlobal;
		mouse.y = (mouse.y - document.getElementById("ID_SVG").getBoundingClientRect().y) / scaleGlobal;

	} else {
		//IE
		mouse.x = window.event.clientX;
		mouse.y = window.event.clientY;
	}

	if (elemSelectedMoving != null) {
		elemSelectedMoving.setAttribute("cx", snap(mouse.x + workingArea.scrollLeft - xOffsetCircle));
		elemSelectedMoving.setAttribute("cy", snap(mouse.y + workingArea.scrollTop - yOffsetCircle));

		elemSelectedMoving.setAttribute("x", snap(mouse.x - xOffsetOther));
		elemSelectedMoving.setAttribute("y", snap(mouse.y - yOffsetOther));
	}

	if (elemSelected != null) {
		selectionVisualisation.setAttribute("x", (elemSelected.getBoundingClientRect().x - document.getElementById("ID_SVG").getBoundingClientRect().x) / scaleGlobal);
		selectionVisualisation.setAttribute("y", (elemSelected.getBoundingClientRect().y - document.getElementById("ID_SVG").getBoundingClientRect().y) / scaleGlobal);
			
		selectionVisualisation.setAttribute("width", (elemSelected.getBoundingClientRect().width) / scaleGlobal) ;
		selectionVisualisation.setAttribute("height", (elemSelected.getBoundingClientRect().height) / scaleGlobal);
		dragTopLeft.setAttribute("cx", (elemSelected.getBoundingClientRect().x + workingArea.scrollLeft - document.getElementById("ID_SVG").getBoundingClientRect().x) / scaleGlobal);
		dragTopLeft.setAttribute("cy", (elemSelected.getBoundingClientRect().y + workingArea.scrollTop - document.getElementById("ID_SVG").getBoundingClientRect().y) / scaleGlobal);
		dragTopRight.setAttribute("cx", (elemSelected.getBoundingClientRect().x + workingArea.scrollLeft + elemSelected.getBoundingClientRect().width - document.getElementById("ID_SVG").getBoundingClientRect().x) / scaleGlobal);
		dragTopRight.setAttribute("cy", (elemSelected.getBoundingClientRect().y + workingArea.scrollTop - document.getElementById("ID_SVG").getBoundingClientRect().y) / scaleGlobal);
		dragBottomRight.setAttribute("cx", (elemSelected.getBoundingClientRect().x + workingArea.scrollLeft + elemSelected.getBoundingClientRect().width - document.getElementById("ID_SVG").getBoundingClientRect().x) / scaleGlobal);
		dragBottomRight.setAttribute("cy", (elemSelected.getBoundingClientRect().y + workingArea.scrollTop + elemSelected.getBoundingClientRect().height - document.getElementById("ID_SVG").getBoundingClientRect().y) / scaleGlobal);
		dragBottomLeft.setAttribute("cx", (elemSelected.getBoundingClientRect().x + workingArea.scrollLeft - document.getElementById("ID_SVG").getBoundingClientRect().x) / scaleGlobal);
		dragBottomLeft.setAttribute("cy", (elemSelected.getBoundingClientRect().y + workingArea.scrollTop + elemSelected.getBoundingClientRect().height - document.getElementById("ID_SVG").getBoundingClientRect().y) / scaleGlobal);
		dragCenterLeft.setAttribute("cx", (elemSelected.getBoundingClientRect().x + workingArea.scrollLeft - document.getElementById("ID_SVG").getBoundingClientRect().x) / scaleGlobal);
		dragCenterLeft.setAttribute("cy", (elemSelected.getBoundingClientRect().y + workingArea.scrollTop + elemSelected.getBoundingClientRect().height / 2 - document.getElementById("ID_SVG").getBoundingClientRect().y) / scaleGlobal);
		dragTopCenter.setAttribute("cx", (elemSelected.getBoundingClientRect().x + workingArea.scrollLeft + elemSelected.getBoundingClientRect().width / 2 - document.getElementById("ID_SVG").getBoundingClientRect().x) / scaleGlobal);
		dragTopCenter.setAttribute("cy", (elemSelected.getBoundingClientRect().y + workingArea.scrollTop - document.getElementById("ID_SVG").getBoundingClientRect().y) / scaleGlobal);
		dragBottomCenter.setAttribute("cx", (elemSelected.getBoundingClientRect().x + workingArea.scrollLeft + elemSelected.getBoundingClientRect().width / 2 - document.getElementById("ID_SVG").getBoundingClientRect().x) / scaleGlobal);
		dragBottomCenter.setAttribute("cy", (elemSelected.getBoundingClientRect().y + workingArea.scrollTop + elemSelected.getBoundingClientRect().height - document.getElementById("ID_SVG").getBoundingClientRect().y) / scaleGlobal);
		dragCenterRight.setAttribute("cx", (elemSelected.getBoundingClientRect().x + workingArea.scrollLeft + elemSelected.getBoundingClientRect().width - document.getElementById("ID_SVG").getBoundingClientRect().x) / scaleGlobal);
		dragCenterRight.setAttribute("cy", (elemSelected.getBoundingClientRect().y + workingArea.scrollTop + elemSelected.getBoundingClientRect().height / 2 - document.getElementById("ID_SVG").getBoundingClientRect().y) / scaleGlobal);

	}

	//Resizing

	if (dragedCenterLeft) {
		if (snap(dragedElem.x - snap(mouse.x) + dragedElem.width / scaleGlobal) > 0) {
			elemSelected.setAttribute("x", snap(mouse.x));
			elemSelected.setAttribute("width", snap(dragedElem.x - snap(mouse.x) + dragedElem.width / scaleGlobal));
		}
	}

	if (dragedCenterRight) {
		if (snap(dragedElem.width / scaleGlobal + mouse.x - dragedElem.x) > 0) {
			elemSelected.setAttribute("width", snap(dragedElem.width / scaleGlobal + mouse.x - dragedElem.x));
		}
	}

	if (dragedTopCenter) {
		if (snap(dragedElem.y - snap(mouse.y) + dragedElem.height / scaleGlobal) > 0) {
			elemSelected.setAttribute("y", snap(mouse.y));
			elemSelected.setAttribute("height", snap(dragedElem.y - snap(mouse.y) + dragedElem.height / scaleGlobal));
		}
	}

	if (dragedBottomCenter) {
		if (snap(dragedElem.height / scaleGlobal + mouse.y - dragedElem.y) > 0) {
			elemSelected.setAttribute("height", snap(dragedElem.height / scaleGlobal + mouse.y - dragedElem.y));
		}
	}
	resizeSVG();
}

workingArea.onmousemove = mouseMoving;

function resizeSVG() {
	let svgChildren = document.getElementById("ID_SVG").children;
	let xOutside = 0,
		yOutside = 0;

	for (let i = 1; i < svgChildren.length; i++) {
		xOutside =
			svgChildren[i].getBoundingClientRect().x + workingArea.scrollLeft + svgChildren[i].getBoundingClientRect().width > xOutside
				? svgChildren[i].getBoundingClientRect().x + workingArea.scrollLeft + svgChildren[i].getBoundingClientRect().width
				: xOutside;
		yOutside =
			svgChildren[i].getBoundingClientRect().y + workingArea.scrollTop + svgChildren[i].getBoundingClientRect().height > yOutside
				? svgChildren[i].getBoundingClientRect().y + workingArea.scrollTop + svgChildren[i].getBoundingClientRect().height
				: yOutside;
	}
	xOutside = xOutside > workingArea.getBoundingClientRect().width ? xOutside : workingArea.getBoundingClientRect().width;
	yOutside = yOutside > workingArea.getBoundingClientRect().height ? yOutside : workingArea.getBoundingClientRect().height;
	document.getElementById("ID_SVG").setAttribute("width", xOutside);
	document.getElementById("ID_SVG").setAttribute("height", yOutside);
}

// Right click Menu

window.oncontextmenu = function () {
	openRightClickMenu();
	return false; // cancel default menu
};

function snap(coord) {
	return Math.round(coord / snappingDistance) * snappingDistance;
}

function openRightClickMenu() {
	document.getElementById("rightClickMenu").style.display = "block";
	document.getElementById("rightClickMenu").style.left = (mouse.x) + document.getElementById("ID_SVG").getBoundingClientRect().x + "px";
	document.getElementById("rightClickMenu").style.top = (mouse.y) + document.getElementById("ID_SVG").getBoundingClientRect().y + "px";

	elemSelectedMoving = null;

	if (elemSelected == null) {
		document.getElementById("rightClickMenuCopy").style.opacity = "0.5";
		document.getElementById("rightClickMenuCopy").style.pointerEvents = "none";

		document.getElementById("rightClickMenuCut").style.opacity = "0.5";
		document.getElementById("rightClickMenuCut").style.pointerEvents = "none";

		document.getElementById("rightClickMenuDelete").style.opacity = "0.5";
		document.getElementById("rightClickMenuDelete").style.pointerEvents = "none";

		document.getElementById("rightClickMenuSetBack").style.opacity = "0.5";
		document.getElementById("rightClickMenuSetBack").style.pointerEvents = "none";

		document.getElementById("rightClickMenuSetFront").style.opacity = "0.5";
		document.getElementById("rightClickMenuSetFront").style.pointerEvents = "none";

		document.getElementById("rightClickMenuOneFront").style.opacity = "0.5";
		document.getElementById("rightClickMenuOneFront").style.pointerEvents = "none";

		document.getElementById("rightClickMenuOneBack").style.opacity = "0.5";
		document.getElementById("rightClickMenuOneBack").style.pointerEvents = "none";
	} else {
		document.getElementById("rightClickMenuCopy").style.opacity = "1";
		document.getElementById("rightClickMenuCopy").style.pointerEvents = "all";

		document.getElementById("rightClickMenuCut").style.opacity = "1";
		document.getElementById("rightClickMenuCut").style.pointerEvents = "all";

		document.getElementById("rightClickMenuDelete").style.opacity = "1";
		document.getElementById("rightClickMenuDelete").style.pointerEvents = "all";

		document.getElementById("rightClickMenuSetBack").style.opacity = "1";
		document.getElementById("rightClickMenuSetBack").style.pointerEvents = "all";

		document.getElementById("rightClickMenuSetFront").style.opacity = "1";
		document.getElementById("rightClickMenuSetFront").style.pointerEvents = "all";

		document.getElementById("rightClickMenuOneFront").style.opacity = "1";
		document.getElementById("rightClickMenuOneFront").style.pointerEvents = "all";

		document.getElementById("rightClickMenuOneBack").style.opacity = "1";
		document.getElementById("rightClickMenuOneBack").style.pointerEvents = "all";
	}
}

function closeRightClickMenu() {
	document.getElementById("rightClickMenu").style.display = "none";
}

function rightClickMenuDelete() {
	if (elemSelected != null) {
		elemSelected.remove();
		closeRightClickMenu();

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
		elemSelectedMoving = null;
	}
}

let clipboard;
function rightClickMenuCopy() {
	if (elemSelected != null) {
		clipboard = elemSelected.cloneNode(true);
		closeRightClickMenu();
	}
}

function rightClickMenuCut() {
	if (elemSelected != null) {
		clipboard = elemSelected.cloneNode(true);
		elemSelected.remove();

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
		elemSelectedMoving = null;
		closeRightClickMenu();
	}
}

function rightClickMenuPaste() {
	if (clipboard != null) {
		clipboard = clipboard.cloneNode(true);
		closeRightClickMenu();
		document.getElementById("ID_SVG").appendChild(clipboard);
	}
}

function rightClickMenuSetBack() {
	document.getElementById("background").after(elemSelected);
	closeRightClickMenu();
}

function rightClickMenuSetFront() {
	document.getElementById("selectionVisualisation").before(elemSelected);
	closeRightClickMenu();
}

function rightClickMenuOneBack() {
	if (elemSelected.previousElementSibling != null && elemSelected.previousElementSibling != document.getElementById("background")) elemSelected.previousElementSibling.before(elemSelected);
}

function rightClickMenuOneFront() {
	if (elemSelected.nextElementSibling != null && elemSelected.nextElementSibling != document.getElementById("selectionVisualisation")) elemSelected.nextElementSibling.after(elemSelected);
}

document.body.addEventListener(
	"keydown",
	function (e) {
		e = e || window.event;
		let key = e.which || e.keyCode; // keyCode detection
		let shift = e.shiftKey ? e.shiftKey : key === 16 ? true : false; // shift detection
		let ctrl = e.ctrlKey ? e.ctrlKey : key === 17 ? true : false; // ctrl detection
		let alt = e.altKey ? e.altKey : key === 18 ? true : false; // alt detection
		let meta = e.metaKey ? e.metaKey : false; // meta detection

		ctrl = ctrl || meta ? true : false;

		// functions

		if (key == 86 && ctrl) {
			// Paste
			rightClickMenuPaste();
		}

		if (key == 67 && ctrl) {
			// Copy
			rightClickMenuCopy();
		}

		if (key == 88 && ctrl) {
			// Cut
			rightClickMenuCut();
		}

		if (key == 46 || key == 8) {
			// Delete
			rightClickMenuDelete();
		}

		if (key == 90 && ctrl && shift) {
			//Strg + Shift + Z
			if (redo.length > 0) {
				document.getElementById("ID_SVG").remove();
				workingArea.prepend(redo[redo.length - 1].cloneNode(true));
				elemSelectedMoving = null;
				elemSelected = null;
				
				if(document.getElementById("selectionVisualisation") != null) {
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

				undo.push(redo[redo.length - 1]);
				redo.pop();

				contentEl = document.getElementById("ID_SVG");
				workspace = PanZoom( contentEl, containerEl );

			}
		} else if (key == 90 && ctrl) {
			//Strg + Z
			if (undo.length > 1) {
				document.getElementById("ID_SVG").remove();
				workingArea.prepend(undo[undo.length - 2].cloneNode(true));
				elemSelectedMoving = null;
				elemSelected = null;

				if(document.getElementById("selectionVisualisation") != null) {
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

				redo.push(undo[undo.length - 1]);
				undo.pop();

				contentEl = document.getElementById("ID_SVG");
				workspace = PanZoom( contentEl, containerEl );
			}
		}

		if (key == 27) {
			// Escape
			closeRightClickMenu();
			
			if(document.getElementById("selectionVisualisation") != null) {
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
				elemSelectedMoving = null;
			}
		}
	},
	false
);
