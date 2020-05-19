function getCountry() {
	var xhttp = new XMLHttpRequest();
	var result = null;
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			result = JSON.parse(this.responseText);
		}
	};
	xhttp.open("GET", "http://ip-api.com/json", false);
	xhttp.send();
	return result;
}

console.log(getCountry());
switch (getCountry().countryCode) {
	case "DE":
		window.location.replace("./de/");
		break;
	default:
		console.log("englisch");
		break;
}
