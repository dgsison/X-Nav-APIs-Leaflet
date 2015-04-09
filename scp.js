$(document).ready(function() {
	// create a map in the "map" div, set the view to a given place and zoom
	var map = L.map('map').setView([40.2838, -3.8215], 16);

	// add an OpenStreetMap tile layer
	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);

	// add a marker in the given location, attach some popup content to it and open the popup
	// L.marker([40.2838, -3.8215]).addTo(map)
	//     .bindPopup('Aquí estoy estudiendo. <br>')
	//     .openPopup();


	var popup = L.popup();

	function onMapClick(e) {
		alert(e.latlng.toString());
    	popup
	        .setLatLng(e.latlng)
	        .setContent("Coordenadas chacho: " + e.latlng.toString())
	        .openOn(map);
	}

	map.on('click', onMapClick);

	// var circle = L.circle([40.2837, -3.8216], 30, {
	//     color: 'blue',
	//     fillColor: 'blue',
	//     fillOpacity: 0.5
	// }).addTo(map);

	map.locate({setView: true, maxZoom: 16});

	function onLocationFound(e) {
	    var radius = e.accuracy / 2;

	    L.marker(e.latlng).addTo(map)
	        .bindPopup("You are within " + radius + " meters from this point").openPopup();

	    L.circle(e.latlng, radius).addTo(map);
	}

	map.on('locationfound', onLocationFound);

	function onLocationError(e) {
	    alert(e.message);
	}

	map.on('locationerror', onLocationError);

});