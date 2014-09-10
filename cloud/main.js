Parse.Cloud.define('receiveSMS', function(request, response) {
    var raw = request.params.Body.split(',');

    var lon = Number(raw[0]);
    var lat = Number(raw[1]);

    var point = new Parse.GeoPoint(lon, lat);
    var object = new Parse.Object('location');

    object.set('location', point);
    object.save();
    response.success();
});