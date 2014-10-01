Parse.initialize('nscyLFNtiKcHii5y3gly7g9EXERaljN41fQEQA40', 'S62ZcZ1aPbiPc44Sq1b9Jfh1ZLMUzwbw27zSoEly');

var Location = Parse.Object.extend("location"),
    query = new Parse.Query(Location);

query.descending("createdAt").first({
    success: function(coord) {

        // Transform the Parse results into Google lat-longs
        coord = new google.maps.LatLng(coord.get('location').latitude, coord.get('location').longitude);

        // map config, centered on the coordinate
        var mapOptions = {
            zoom: 12,
            center: coord,
            mapTypeId: google.maps.MapTypeId.TERRAIN
        };

        // Popup window containing label
        var infowindow = new google.maps.InfoWindow({
            content: 'We\'re here!'
        });

        // Create the map from the map-canvas DOM element
        var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        // Create a pin to show the current coord
        var marker = new google.maps.Marker({
            position: coord,
            map: map
        });

        // Wait a second then bounce the pin to draw attention.
        setTimeout(function() {
            marker.setAnimation(google.maps.Animation.DROP);

            // Auto-pop open the info popup
            infowindow.open(map, marker);
        }, 1000);
    },
    error: function(error) {
        alert("Error: " + error.code + " " + error.message);
    }
});