(function($,fileManagerModule,undefined){
		
	var onClickTestFileManager=function(event){
		event.preventDefault();
		window.opener.fileManagerCallerModule.set("Selected");
		window.close();
	};

	var firstPage =function(){
		var url="/list/1";
		return $.ajax({
			url:url,
			type:"get",
			dataType:"json"
		});
	};
	
	var changePage=function(pageNumber){
		var url="/list/"+pageNumber;
		return $.ajax({
			url:url,
			type:"get",
			dataType:"json"
		});
	};
	
	var createPageNumberHtml=function(pageCount){
		var prevLink = "<li data-p='prev'><a href='#'><span aria-hidden='true'>&laquo;</span></a></li>";
		var nextLink = "<li data-p='next'><a href='#'><span aria-hidden='true'>&raquo;</span></a></li>";
		$(".pagination").append(prevLink);
		for (var i = 1; i < pageCount + 1; i++) {
			var pagehtml = "<li data-p='" + i + "'><a href='#'>" + i + "</a></li>";
			$(".pagination").append(pagehtml);
		}
		
		$(".pagination").append(nextLink);
		
		$(".pagination").find("li[data-p='1']").addClass("active");
	};
	
	var updateFileManageList=function(items){
		$(".fileManagerList").html("");
		
		$.each(items,function(index,item){
			var itemHtml = "<div class='col-lg-2 col-md-3 col-sm-4 col-xs-12' ><img class='img-responsive' src='"+item.src+"'/><span>"+item.index+"</span></div>";
			var html= "<div class='col-lg-2 col-md-4 col-sm-6 col-xs-12'><div class='hover hover1'><img class='img-responsive' src='"+item.src+"' alt=''><div class='overlay'><h2>Hover effect 3</h2><button class='info'>Show code</button></div></div></div>";
			$(".fileManagerList").append(html);
		});
	};
	
	var afterFirstPage=function(response){
		
		var allItemsCount = parseInt(response.allItemsCount);
		var itemsPerPage = parseInt(response.itemPerPage);
		var pageCount = parseInt(response.pageCount);
		
		$(".pagination").data("pageCount",pageCount);
		
		createPageNumberHtml(pageCount);
				
		var allItems = response.items;
		
		updateFileManageList(allItems);
	};
	
	var afterChangePage=function(response){
		
		updateFileManageList(response.items);
		
	};
	
	var onChnagePage= function(event){
		event.preventDefault();
		
		var pagesCount = $(".pagination").data("pageCount");
		var $targetLiElement = $(this);
		var $currentLiElement = $(".pagination").find("li.active");
		
		var targetPageDescription = $targetLiElement.data("p");
		var currentPageDescription = $currentLiElement.data("p");
		
		var currentPageNumber = currentPageDescription;
		var targetPageNumber=0;
		
		if(targetPageDescription==="prev"){
			if(currentPageNumber===1){
				return;
			}
			targetPageNumber  = currentPageNumber-1;
		}else if(targetPageDescription==="next"){
			if(currentPageNumber===pagesCount){
				return;
			}
			targetPageNumber  = currentPageNumber+1;
		}else{
			//number
			targetPageNumber  = targetPageDescription;
		}
		
		$currentLiElement.removeClass("active");
		$(".pagination").find("li[data-p='"+targetPageNumber+"']").addClass("active");
		
		changePage(targetPageNumber).done(afterChangePage);
	};

	var init =function(){
		var url ="";
		firstPage().done(afterFirstPage);
	};
	
	var wireEvents = function(){
		$("#testFileManager").on("click",onClickTestFileManager);
		$(".pagination").on('click', 'li',onChnagePage);
	};	
	
	$(function(){
		wireEvents();
		init();
	});
	
}(jQuery,fileManagerModule=window.fileManagerModule||{}));