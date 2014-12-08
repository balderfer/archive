
/*	////////////////////////////////////////////////////////////////////////////////

    --------------------------------------------------------------------------------
	
	DOCUMENT READY
	================================================================================ */
	$(document).ready(function() {
							  

/*	////////////////////////////////////////////////////////////////////////////////

    --------------------------------------------------------------------------------
	
	GOOGLE MAPS
	================================================================================ */
		var geocoder;
		var map;
		
	  function initialize() {
		geocoder = new google.maps.Geocoder();
		var latlng = new google.maps.LatLng(-34.397, 150.644);
		var myOptions = {
		  zoom: 17,
		  center: latlng,
		  mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		map = new google.maps.Map(document.getElementById("map_canvas"),
			myOptions);
	  }
	  
	   function codeAddress() {
		var address = 'Chase Tower, Indianapolis, IN 46204, USA';
		geocoder.geocode( { 'address': address}, function(results, status) {
		  if (status == google.maps.GeocoderStatus.OK) {
			map.setCenter(results[0].geometry.location);
			var marker = new google.maps.Marker({
				map: map,
				position: results[0].geometry.location
			});
		  } else {
			alert("Geocode was not successful for the following reason: " + status);
		  }
		});
	  }
	  
	  if ( $('body').attr('class').indexOf("page-template-contact-us-page-php") > -1 ) {
		  initialize();
		  codeAddress();
	  }
	


/*	////////////////////////////////////////////////////////////////////////////////

    --------------------------------------------------------------------------------
	
	END DOCUMENT READY
	================================================================================ */
	
	
	
	
});
