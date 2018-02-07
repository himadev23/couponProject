//var apiKey='AIzaSyA4RKDWn0lwizH9Tm2BFWUGa-pMn_xZ8bM';
var map;
// var service;
var infowindow;

var lng, lat;

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
        }else{
        console.log('place!!!!!', place);
    }

        	lat = place.geometry.location.lat();
        	lng = place.geometry.location.lng();
        
            map.setCenter(place.geometry.location);
            map.setZoom(17); // Why 17? Because it looks good.
            console.log(place.geometry.location);
            findCoupons(lng,lat,$('#search-coupon-input').val());
        
    });


}
initialize();

function getUserLocation() {
    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(function(response) {
            //console.log(response);
            var position = {
	           	lng: response.coords.longitude,
	            lat: response.coords.latitude,
	        }
	        lng = position.lng;
	        lat = position.lat;
	        map.setCenter(position);
	        map.setZoom(20);
	        var geoCoder=new google.maps.Geocoder();
	        geoCoder.geocode({'latLng':map.getCenter()},function(result,status){
	        	$('#auto-complete').val(result[0].formatted_address);
	        	findCoupons(position.lng,position.lat);


	        })
        });

    }
    else{
    	console.log("location not identified");
    }


}


getUserLocation();

function findCoupons(lng,lat,query){
	var url='https://api.sqoot.com/v2/deals';
	var api_key="h7-Xq3wp2EUVjb4W-u80";
	var location = lat + "," + lng;
	var radius = 5;
	$.ajax({
		url,
		dataType:'JSON',
		data: {
			api_key,
			location,
			radius,
			per_page: 100,
			query

		}

	}).then(function(response){
		console.log(response);
		$('#coupons-data').empty();
		for(var i=0;i<response.deals.length;i++){
			var deal = response.deals[i].deal;
			$('#coupons-data').append('<h3>'+ deal.title +'</h3>')
		}
	})
}

$('#search-coupon-input').on('input',function(){
	var query=$(this).val();
	findCoupons(lng,lat,query);
})


/*var apiKeyCoupon=h7-Xq3wp2EUVjb4W-u80 ;
var searchType=
url:'https://api.sqoot.com/v2/deals/:id'*/













