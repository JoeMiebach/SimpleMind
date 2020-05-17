let container = document.getElementById("tabContainer");

document.getElementById("navStyle").addEventListener("click", function () {
	container.style.left = "0px";
	document.getElementById("navSelection").style.left = "0%";
});

document.getElementById("navPosition").addEventListener("click", function () {
	container.style.left = "-250px";
	document.getElementById("navSelection").style.left = "33.333333%";
});

document.getElementById("navFile").addEventListener("click", function () {
	container.style.left = "-500px";
	document.getElementById("navSelection").style.left = "66.666666%";
});


function openSlider() {
	document.getElementById("zoomOptionSliderWrapper").style.width = "129px";
	document.getElementById("zoomOptionSliderWrapper").style.paddingLeft = "5px";
	document.getElementById("zoomOptionSliderWrapper").style.paddingRight = "5px";

	if(scrollInX == null) {
		scrollInX = document.getElementById("ID_SVG").getBoundingClientRect().left;
		scrollInY = document.getElementById("ID_SVG").getBoundingClientRect().top ;
	}
}

function closeSlider() {
	document.getElementById("zoomOptionSliderWrapper").style.width = "0px";
	document.getElementById("zoomOptionSliderWrapper").style.paddingLeft = "0px";
	document.getElementById("zoomOptionSliderWrapper").style.paddingRight = "0px";

	scrollInX = null;
	scrollInY = null;
}

function changeZoom(event) {
	workspace.sliderZoom(event);

}