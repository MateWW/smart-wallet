const tcpPortUsed = require('tcp-port-used');

tcpPortUsed.waitUntilFree(9229, 500, 4000)
.then(function() {
    console.log('Port 9229 is now free.');
}, function(err) {
    console.log('Error:', err.message);
});
