var net = require('net');
var colors =  require('colors');

var server = net.createServer();

server.on('connection', (socket)=>{
  var remoteAddress =  socket.remoteAddress + ':' + socket.remotePort;
  console.log("New client connection is made %s".green, remoteAddress);

  socket.on('data', (d)=>{
    console.log('data from %s,%s'.cyan, remoteAddress, d);
    socket.write('Hello ' + d);
  });
  socket.once('close', ()=>{
    console.log(`connection from ${remoteAddress} closed`.yellow);
  });
  socket.on('error', (err)=>{
    console.log(`connection ${remoteAddress} error ${err.message}`.red);
  });
});

server.listen(9000, ()=>{
  console.log('Server listening to %j', server.address());
});
