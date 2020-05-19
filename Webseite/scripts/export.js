var btnPng = document.getElementById("BTNExportToPng");
var btnJpg = document.getElementById("BTNExportToJpg");

function triggerDownloadPng(imgURI) {
	var evt = new MouseEvent("click", {
		view: window,
		bubbles: false,
		cancelable: true,
	});

	var a = document.createElement("a");
	a.setAttribute("download", "Download.png");
	a.setAttribute("href", imgURI);
	a.setAttribute("target", "_blank");

	a.dispatchEvent(evt);
}

btnPng.addEventListener("click", function () {
	let bg = document.getElementById("background");
	document.getElementById("background").remove();

	if (document.getElementById("selectionVisualisation" != null)) {
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

	if (document.getElementById("background") != null) {
		document.getElementById("background").remove();
	}

	var canvas = document.getElementById("canvas");
	canvas.setAttribute("width", document.getElementById("ID_SVG").getAttribute("width"));
	canvas.setAttribute("height", document.getElementById("ID_SVG").getAttribute("height"));
	var ctx = canvas.getContext("2d");
	var data = new XMLSerializer().serializeToString(document.getElementById("ID_SVG"));
	var DOMURL = window.URL || window.webkitURL || window;

	var img = new Image();
	var svgBlob = new Blob([data], { type: "image/svg+xml;charset=utf-8" });
	var url = DOMURL.createObjectURL(svgBlob);

	img.onload = function () {
		ctx.drawImage(img, 0, 0);
		DOMURL.revokeObjectURL(url);

		var imgURI = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

		triggerDownloadPng(imgURI);
	};

	img.src = url;

	document.getElementById("ID_SVG").prepend(bg);
});

function triggerDownloadJpg(imgURI) {
	var evt = new MouseEvent("click", {
		view: window,
		bubbles: false,
		cancelable: true,
	});

	console.log("blub");
	var a = document.createElement("a");
	a.setAttribute("download", "MY_COOL_IMAGE.jpg");
	a.setAttribute("href", imgURI);
	a.setAttribute("target", "_blank");

	a.dispatchEvent(evt);
}

btnJpg.addEventListener("click", function () {
	let bg = document.getElementById("background");
	document.getElementById("background").remove();
	let restore = document.getElementById("ID_SVG").cloneNode(true);
	console.log("test");
	console.log(getSize());

	document.getElementById("ID_SVG").setAttribute("view-box", getSize().xMin + " " + getSize().yMin + " " + (getSize().xMax - getSize().xMin) + " " + (getSize().yMax - getSize().yMin));

	if (document.getElementById("selectionVisualisation" != null)) {
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

	if (document.getElementById("background") != null) {
		document.getElementById("background").remove();
	}

	var canvas = document.getElementById("canvas");
	canvas.setAttribute("width", document.getElementById("ID_SVG").getAttribute("width"));
	canvas.setAttribute("height", document.getElementById("ID_SVG").getAttribute("height"));
	var ctx = canvas.getContext("2d");
	var data = new XMLSerializer().serializeToString(document.getElementById("ID_SVG"));
	var DOMURL = window.URL || window.webkitURL || window;

	var img = new Image();
	var svgBlob = new Blob([data], { type: "image/svg+xml;charset=utf-8" });
	var url = DOMURL.createObjectURL(svgBlob);

	img.onload = function () {
		ctx.drawImage(img, 0, 0);
		DOMURL.revokeObjectURL(url);

		var imgURI = canvas.toDataURL("image/jpg").replace("image/jpg", "image/octet-stream");

		triggerDownloadJpg(imgURI);
	};

	img.src = url;
	document.getElementById("ID_SVG").prepend(bg);
});

function exportSvg() {
	//get svg element.
	var svg = document.getElementById("ID_SVG");

	//convert svg source to URI data scheme.
	var url = "data:image/svg+xml;utf8," + svg.outerHTML;

	//set url value to a element's href attribute.
	document.getElementById("svgDownload").setAttribute("href", url);
	//you can download svg file by right click menu.
}

function getSize() {
	let svgChildren = document.getElementById("ID_SVG").children;
	console.log("abc");
	let xMin = 1000000,
		xMax = 0,
		yMin = 1000000,
		yMax = 0;

	for (let i = 1; i < svgChildren.length; i++) {
		xMax =
			svgChildren[i].getBoundingClientRect().x + workingArea.scrollLeft + svgChildren[i].getBoundingClientRect().width > xMax
				? svgChildren[i].getBoundingClientRect().x + workingArea.scrollLeft + svgChildren[i].getBoundingClientRect().width
				: xMax;
		yMax =
			svgChildren[i].getBoundingClientRect().y + workingArea.scrollTop + svgChildren[i].getBoundingClientRect().height > yMax
				? svgChildren[i].getBoundingClientRect().y + workingArea.scrollTop + svgChildren[i].getBoundingClientRect().height
				: yMax;

		xMin = svgChildren[i].getBoundingClientRect().x + workingArea.scrollLeft < xMin ? svgChildren[i].getBoundingClientRect().x + workingArea.scrollLeft : xMin;
		yMin = svgChildren[i].getBoundingClientRect().y + workingArea.scrollTop < yMin ? svgChildren[i].getBoundingClientRect().y + workingArea.scrollTop : yMin;
	}
	return {
		xMin: xMin,
		xMax: xMax,
		yMin: yMin,
		yMax: yMax,
	};
}
