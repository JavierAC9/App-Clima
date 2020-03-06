window.addEventListener('load', ()=> {

	let long;
	let lat;
	let temperatureDescription = document.querySelector(".temperature-description");
	let temperatureDegree = document.querySelector(".temperature-degree");
	let locationTimezone = document.querySelector(".location-timezone");
	let temperatureSection = document.querySelector(".temperature");
	const temperatureSpan = document.querySelector(".temperature span");

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			long = position.coords.longitude;
			lat = position.coords.latitude;

			const proxy = 'https://cors-anywhere.herokuapp.com/';
			const api = `${proxy}https://api.darksky.net/forecast/46e78903e98411a0fa3489dc064b5614/${lat},${long}?lang=es`;

			fetch(api)
				.then(response => {
					return	response.json();
				})
				.then(data => {
					const {temperature,summary,icon} = data.currently;
					let celsius = (temperature - 32) * (5 / 9);
					temperatureDegree.textContent = Math.floor(celsius);
					temperatureDescription.textContent = summary;
					locationTimezone.textContent = data.timezone.replace(/_/g," ");
					

					setIcons(icon, document.querySelector('.icon'));

					temperatureSection.addEventListener("click", () => {
						if (temperatureSpan.textContent === "C") {
							temperatureSpan.textContent = "F";	
							temperatureDegree.textContent = temperature;
						}else{
							temperatureSpan.textContent = "C";
							temperatureDegree.textContent = Math.floor(celsius);
						}
					});
				});
		});
	}else{
		h1.textContent = "Error, no funciona!";
	}


function setIcons(icon, iconID){
	const skycons = new Skycons({color:"white"});
	const currentIcon = icon.replace(/-/g, "_").toUpperCase();
	skycons.play();
	return skycons.set(iconID, Skycons[currentIcon]);
}



});

