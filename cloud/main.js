var client = require('twilio')('ACc728a749974a87ed179b8a8af525965c', '1224720c600ba86ace438968cb887257');
 
function sendLocationRequest(request, response, status) {

    if(status) {
        console.log(status);
    }

    client.sendSms({
        to:'+447593117448', 
        from: '+18559771780',
        body: 'fix050s002n123456'
      }, function(err, responseData) { 
        if (err) {
            console.log(err);

            if(response) {
                response.error();
            }
        } else { 
            
            console.log(responseData.from); 
            console.log(responseData.body);

            if(response) {
                response.success();
            }
        }
      }
    );
}


Parse.Cloud.job("pingLocation", function(request, status) {
    sendLocationRequest(request, null, status);
});


Parse.Cloud.define('sendSMS', function(request, response) {
    sendLocationRequest(request, response);
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