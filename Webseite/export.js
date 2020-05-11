var btnPng = document.getElementById("BTNExportToPng");
var btnJpg = document.getElementById("BTNExportToJpg");

function triggerDownloadPng(imgURI) {
	var evt = new MouseEvent("click", {
		view: window,
		bubbles: false,
		cancelable: true,
	});

	var a = document.createElement("a");
	a.setAttribute("download", "MY_COOL_IMAGE.png");
	a.setAttribute("href", imgURI);
	a.setAttribute("target", "_blank");

	a.dispatchEvent(evt);
}

btnPng.addEventListener("click", function () {
	let bg = document.getElementById("background");
	document.getElementById("background").remove();

	if(document.getElementById("selectionVisualisation" != null)) {
		console.log("remove");
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

	if(document.getElementById("background") != null) {
		document.getElementById("background").remove();
	}

	console.log("arr");

	var canvas = document.getElementById("canvas");
	canvas.setAttribute("width", svg.getAttribute("width"));
	canvas.setAttribute("height", svg.getAttribute("height"));
	var ctx = canvas.getContext("2d");
	var data = new XMLSerializer().serializeToString(svg);
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

	svg.prepend(bg);
});

function triggerDownloadJpg(imgURI) {
	var evt = new MouseEvent("click", {
		view: window,
		bubbles: false,
		cancelable: true,
	});

	var a = document.createElement("a");
	a.setAttribute("download", "MY_COOL_IMAGE.jpg");
	a.setAttribute("href", imgURI);
	a.setAttribute("target", "_blank");

	a.dispatchEvent(evt);
}

btnJpg.addEventListener("click", function () {
	let bg = document.getElementById("background");
	document.getElementById("background").remove();

	
	if(document.getElementById("selectionVisualisation" != null)) {
		console.log("remove");
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

	if(document.getElementById("background") != null) {
		document.getElementById("background").remove();
	}

	var canvas = document.getElementById("canvas");
	canvas.setAttribute("width", svg.getAttribute("width"));
	canvas.setAttribute("height", svg.getAttribute("height"));
	var ctx = canvas.getContext("2d");
	var data = new XMLSerializer().serializeToString(svg);
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
	svg.prepend(bg);
});
