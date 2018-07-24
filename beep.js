var io = require('socket.io')({
	transports: ['websocket'],
});

io.attach(3000);

const initiPage = require("fs") .readFileSync("./init.html", "utf8").replace(/\r|\n|\t/g, '').replace(/\\"/g, '"');
const page1 = require("fs") .readFileSync("./page1.html", "utf8").replace(/\r|\n|\t/g, '').replace(/\\"/g, '"');
const page2 = require("fs") .readFileSync("./page2.html", "utf8").replace(/\r|\n|\t/g, '').replace(/\\"/g, '"');
const page3 = require("fs") .readFileSync("./page3.html", "utf8").replace(/\r|\n|\t/g, '').replace(/\\"/g, '"');
const endPage = require("fs") .readFileSync("./endPage.html", "utf8").replace(/\r|\n|\t/g, '').replace(/\\"/g, '"');


io.on('connection', function(socket){
	socket.on('init', function(){
		socket.emit("ui", {data: initiPage});
		
	});

	socket.on('action', function(payload){

		if(payload && payload.data) {
			if(typeof payload.data === "string") {
				switch(payload.data) {
					case "1": {
						socket.emit("ui", {data: page1});
						break;
					}
					case "2": {
						socket.emit("ui", {data: page2});
						break;
					}
					case "3": {
						socket.emit("ui", {data: page3});
						break;
					}
					case "4": {
						socket.emit("ui", {data: endPage});
						break;
					}
					default: {
						socket.emit("ui", {data: initiPage});
					}
				}
			}
		}		
	});
})
