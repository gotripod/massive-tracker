var client = require('twilio')('ACc728a749974a87ed179b8a8af525965c', '1224720c600ba86ace438968cb887257');
 
Parse.Cloud.define('sendSMS', function(request, response) {
    client.sendSms({
        to:'+447593117448', 
        from: '+18559771780', 
        body: 'fix030s0001n123456'
      }, function(err, responseData) { 
        if (err) {
            console.log(err);
            response.error();
        } else { 
            
            console.log(responseData.from); 
            console.log(responseData.body);
            response.success();
        }
      }
    );
});

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