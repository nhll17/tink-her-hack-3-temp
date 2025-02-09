let map, marker;

function initMap(lat = 28.6139, lng = 77.2090) { // Default to Delhi
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: lat, lng: lng },
        zoom: 15
    });

    marker = new google.maps.Marker({
        position: { lat: lat, lng: lng },
        map: map,
        draggable: true
    });

    // Update input field when marker is moved
    google.maps.event.addListener(marker, "dragend", function () {
        var latlng = marker.getPosition();
        document.getElementById("location").value = latlng.lat() + ", " + latlng.lng();
    });

    // Place marker when clicking on the map
    google.maps.event.addListener(map, "click", function (event) {
        var clickedLocation = event.latLng;
        marker.setPosition(clickedLocation);
        document.getElementById("location").value = clickedLocation.lat() + ", " + clickedLocation.lng();
    });

    // Google Places Autocomplete
    var input = document.getElementById("location");
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo("bounds", map);

    autocomplete.addListener("place_changed", function () {
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            alert("No details available for input: '" + place.name + "'");
            return;
        }
        marker.setPosition(place.geometry.location);
        map.setCenter(place.geometry.location);
        document.getElementById("location").value = place.geometry.location.lat() + ", " + place.geometry.location.lng();
    });
}

// Function to get the user's current location
function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                var lat = position.coords.latitude;
                var lng = position.coords.longitude;
                document.getElementById("location").value = lat + ", " + lng;
                initMap(lat, lng);
            },
            function (error) {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        alert("Location access denied. Please enable GPS.");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        alert("Location information is unavailable.");
                        break;
                    case error.TIMEOUT:
                        alert("The request to get user location timed out.");
                        break;
                    case error.UNKNOWN_ERROR:
                        alert("An unknown error occurred.");
                        break;
                }
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Initialize the map when the page loads
window.onload = function () {
    initMap();
};
