let container = document.getElementById("tabContainer");

document.getElementById("navStyle").addEventListener("click", function () {
	container.style.left = "0px";
});

document.getElementById("navPosition").addEventListener("click", function () {
	container.style.left = "-150px";
});

document.getElementById("navFile").addEventListener("click", function () {
	container.style.left = "-300px";
});
