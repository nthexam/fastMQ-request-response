const FastMQ = require('fastmq');
var responseChannel;
// create a client with 'requestChannel' channel name and connect to server.
FastMQ.Client.connect('responseChannel', 'master')
    .then((channel) => {
        // client connected
        responseChannel = channel;
        responseChannel.response('test_cmd', (msg, res) => {
            console.log('Receive request payload:', msg.payload);
            // echo request data back;
            let resData = { data: msg.payload.data, "new": "serv ice3" };
            res.send(resData, 'json');
        });

    })
    .catch((err) => {
        console.log('Got error:', err.stack);
    });