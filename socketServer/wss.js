//socket server
var websocket = require("ws");
var wss = new websocket.Server({port:8080});
var uuid = require('uuid');
wss.on("connection",function (ws) {
	
	var id = uuid.v4();
	ws.send(id);

	// console.log(wss.clients);
	ws.on("message",function(res){
		var json = JSON.parse(res);
		console.log(resJson);

		if(json.to=="random"){
  		console.log("客户端随机匹配")
  		var ids = [];
  		wss.clients.forEach(function(client,index){
  			ids.push(client.id);
  		});
  		console.log(ids[0]);
  		ws.send(JSON.stringify({
  			id:ids[0],
  			from:"random"
  		}));
	  	}else{
	  		//筛选出匹配的id
		  	//wss.clients 记录了所有连接到服务起的客户端
		  	wss.clients.forEach(function(client,index){
		  		if(client.id == json.to){
		  			client.send(res) ;//发送消息给匹配的客户端
		  		}
		  	})
	  	}
	})
})