let http = require('http');
let express = require('express');
let fs = require('fs');
let events = require('events');

let userModule = require('./user');

//var data = fs.readFileSync('input.txt');

let eventEmitter = new events.EventEmitter();

const buf1 = Buffer.alloc(10);// for 10 octets
const buf2 = Buffer.alloc(10, 1);
const buf3 = Buffer.from([10, 20, 30, 40, 50]);
const buf4 = Buffer.from('just some text', 'ucs2');// other encodings "ascii", "utf8", "utf16le", "ucs2", "base64" or "hex"

let reqHandler = (e) => {
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


const util = require('util');

eventEmitter.on('test', o => {
	o.approved = true;
	console.log(o);
});

eventEmitter.emit('test', {text: 'test'});