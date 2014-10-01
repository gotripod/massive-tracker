var client = require('twilio')('ACc728a749974a87ed179b8a8af525965c', '1224720c600ba86ace438968cb887257');
 
function sendLocationRequest(request, status) {

    client.sendSms({
        to:'+447593117448', 
        from: '+18559771780',
        body: 'fix050s002n123456'
      }, function(err, responseData) { 
        if (err) {
            status.error(err);
        } else { 
            console.log('Success response: ' + responseData.body); 
            status.success('Ping sent to device successfully.');
        }
      }
    );
}


Parse.Cloud.job("pingLocation", function(request, status) {
    sendLocationRequest(request, status);
});

Parse.Cloud.define('receiveSMS', function(request, response) {
    try {
        var raw = request.params.Body.split('\n');

        var lat = Number(raw[0].replace('lat:', ''));
        var lon = Number(raw[1].replace('long:', ''));

        var point = new Parse.GeoPoint(lat, lon);
        var object = new Parse.Object('location');

        object.set('location', point);
        object.save();
        response.success();
    } catch(e) {
        response.error(e);
    }
    
});