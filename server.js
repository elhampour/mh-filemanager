var express = require('express');
var app = express();
var fs = require("fs");
var path = require('path');

app.use('/public', express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/fileManageCaller.html'));
});

app.get('/filemanager', function(req, res) {
    res.sendFile(path.join(__dirname + '/fileManager.html'));
});

app.get('/list/:pagenumber', function (req, res) {
	
	var allItems = [];
	for(var i=1;i<=17;i++){
		var srcImage = "/public/image/image.jpg";
		allItems.push(
			{
				"src":srcImage,
				"index":i,
				"info":[{"item1":"item1"},{"item2":"item2"},{"item3":"item3"},{"item4":"item4"}]
			}
		);
	}
	
	var itemsToReturn=[];
	var allItemsCount = allItems.length;
	var pageNumber = req.params.pagenumber;
	var itemsPerPage = 18;
	var start = (pageNumber-1)*itemsPerPage;
	var finish = start+itemsPerPage;
	var pageCount = parseInt(allItemsCount/itemsPerPage)+1;
	
	for(var i=start;i<finish;i++){
		var item =allItems[i];
		if(item===undefined){
			break;
		}
		itemsToReturn.push(allItems[i]);
	}
	
	var response = {
		"allItemsCount":allItems.length,
		"items":itemsToReturn,
		"itemPerPage":itemsPerPage,
		"pageCount":pageCount
	};
	
	console.log(response);
	
	res.contentType('application/json');
	res.send(JSON.stringify(response));
});

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://localhost:8081")
});