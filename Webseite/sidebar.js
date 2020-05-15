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
