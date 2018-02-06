//var apiKey='AIzaSyA4RKDWn0lwizH9Tm2BFWUGa-pMn_xZ8bM';
var map;
// var service;
var infowindow;
function initialize() {
    var pyrmont = new google.maps.LatLng(-33.8665433, 151.1956316);

    map = new google.maps.Map(document.getElementById('map'), {
        center: pyrmont,
        zoom: 15
    });
    var input = document.getElementById('auto-complete');
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    autocomplete.addListener('place_changed', function() {
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }

        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17); // Why 17? Because it looks good.
        }
    });


}
initialize();

function getUserLocation () {
	if(navigator.geolocation){
		navigator.permissions.query({name:'geolocation'}).then(function(result) {
		  if (result.state === 'granted') {
		    navigator.geolocation.getCurrentPosition(function(response){
				console.log("aaaa", response);
			});
		  } else if (result.state === 'prompt') {
		    getLocationByIpInfo();
		  }
		  // Don't do anything if the permission was denied.
		});
	} else {
		getLocationByIpInfo();
	}

	function getLocationByIpInfo () {

		$.ajax({
			url:'https://ipinfo.io',
			dataType:'JSON',

		}).then(function(response){
			console.log('response.!!!!! ', response);
		})

	}
}
getUserLocation();
