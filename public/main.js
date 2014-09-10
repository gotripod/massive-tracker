Parse.initialize('nscyLFNtiKcHii5y3gly7g9EXERaljN41fQEQA40', 'S62ZcZ1aPbiPc44Sq1b9Jfh1ZLMUzwbw27zSoEly');

var Location = Parse.Object.extend("location"),
    query = new Parse.Query(Location),
    mapOptions = {
        zoom: 3,
        center: new google.maps.LatLng(0, -180),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    },
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

query.find({
    success: function(results) {
        var coords = results.map(function(l) {
            return new google.maps.LatLng(l.get('location').latitude, l.get('location').longitude);
        });

        var path = new google.maps.Polyline({
            path: coords,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
        });

        path.setMap(map);
    },
    error: function(error) {
        alert("Error: " + error.code + " " + error.message);
    }
});