(function($,fileManagerCallerModule,undefined){
	
		var setted = "";
	
		fileManagerCallerModule.set=function(text){
			setted = text;
		};
	
		var onClickFileManager=function(event){
			event.preventDefault();
			var filemanager = window.open("filemanager", "filemanager", "fullscreen=yes");
		};
		
		var onClickGetSetted=function(event){
			event.preventDefault();
			alert(setted);
		};
	
		var init =function(){
		
		};
		
		var wireEvents = function(){
			$("#fileManager").on("click",onClickFileManager);
			$("#getSetted").on("click",onClickGetSetted);
		};
		
		$(function(){
			wireEvents();
			init();
		});
		
	}(jQuery,fileManagerCallerModule=window.fileManagerCallerModule|| {} ));