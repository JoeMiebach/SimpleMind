function login() {
	document.getElementById("login").style.display = "block";
}

function signUp() {
	document.getElementById("signUp").style.display = "block";
}

window.onclick = function (event) {
	if (event.target == document.getElementById("login") || event.target == document.getElementById("signUp")) {
		document.getElementById("login").style.display = "none";
		document.getElementById("signUp").style.display = "none";
	}
};
