var http = require('http');
var express = require('express');
var fs = require('fs');
var events = require('events');

var userModule = require('./user');

//var data = fs.readFileSync('input.txt');

var eventEmitter = new events.EventEmitter();

var buf1 = Buffer.alloc(10);// for 10 octets
var buf2 = Buffer.alloc(10, 1);
var buf3 = Buffer.from([10, 20, 30, 40, 50]);
var buf4 = Buffer.from('just some text', 'ucs2');// other encodings "ascii", "utf8", "utf16le", "ucs2", "base64" or "hex"

var reqHandler = (e) => {
  console.log('request was got');
};

eventEmitter.on('request', reqHandler);

http.createServer(function(req, res) {
  eventEmitter.emit('request');
  res.writeHead(200, {'Content-Type': 'text/plain'});
  fs.readFile('input.txt', function (err, data) {
    if (err) return console.error(err);
    res.end(data.toString());
  });
}).listen(3001);
//console.log('server is running');
console.log(new userModule.User('Brut'));


var util = require('util');

eventEmitter.on('test', o => {
	o.approved = true;
	console.log(o);
});

eventEmitter.emit('test', {text: 'test'});