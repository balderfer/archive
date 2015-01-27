// JavaScript Document
jQuery.fn.margin = function() {
var marginTop = this.outerHeight(true) - this.outerHeight();
var marginLeft = this.outerWidth(true) - this.outerWidth();

return {
    top: marginTop,
    left: marginLeft
}};

/*!
 * jQuery Double Tap Plugin.
 * 
 * Copyright (c) 2010 Raul Sanchez (http://www.sanraul.com)
 * 
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */

(function($){
	// Determine if we on iPhone or iPad
	var isiOS = false;
	var agent = navigator.userAgent.toLowerCase();
	if(agent.indexOf('iphone') >= 0 || agent.indexOf('ipad') >= 0){
	       isiOS = true;
	}
	
	$.fn.doubletap = function(onDoubleTapCallback, onTapCallback, delay){
		var eventName, action;
		delay = delay == null? 300 : delay;
		eventName = isiOS == true? 'touchend' : 'click';
		
		
		$(this).bind(eventName, function(event){
										 
			var now = new Date().getTime();
			var lastTouch = $(this).data('lastTouch') || now + 1 /** the first time this will make delta a negative number */;
			var delta = now - lastTouch;
			var lastPoint=$(this).data('lastPoint')||{x:-1000,y:-1000};
			var currentPoint={x:event.pageX,y:event.pageY};
			//var str='go2:'+event.pageX+','+event.originalEvent.changedTouches;
			 if (event.originalEvent.changedTouches&&event.originalEvent.changedTouches.length >0)
			  {
			   currentPoint.x = event.originalEvent.changedTouches[0].pageX;
			   currentPoint.y = event.originalEvent.changedTouches[0].pageY
			//   str+='has touches...:'+ event.originalEvent.changedTouches[0].pageX;
			  }
			var dx=currentPoint.x-lastPoint.x;
			var dy=currentPoint.y-lastPoint.y;
			//clearTimeout(action);
		//	debug(str+'dx='+dx+',dy='+dy);
			if(delta<delay && delta>0&&Math.abs(dx)<20&&Math.abs(dy)<20){
				
				//$(this).trigger('doubletap', [event]);
				if(onDoubleTapCallback != null && typeof onDoubleTapCallback == 'function'){
					onDoubleTapCallback(event);
					 $(this).data('lastTouch',-1);;
					return;
				}
			}else{
				//$(this).data('lastTouch', now);
				/**
				action = setTimeout(function(evt){
					if(onTapCallback != null && typeof onTapCallback == 'function'){
						onTapCallback(evt);
					}
					clearTimeout(action);   // clear the timeout
				}, delay, [event]);
				****/
			}
			$(this).data('lastTouch', now);
			$(this).data('lastPoint', currentPoint);
		});
	};
})(jQuery);
//=====================================================================================================================		
	function debug(str){
		$('#log').html(str);		
		if(window.console&&window.console.log){
			window.console.log(str);
		}
	}
//=====================================================================================================================		

(function($){
		  
/**
 * You can identify a swipe gesture as follows:
 * 1. Begin gesture if you receive a touchstart event containing one target touch.
 * 2. Abort gesture if, at any time, you receive an event with >1 touches.
 * 3. Continue gesture if you receive a touchmove event mostly in the x-direction.
 * 4. Abort gesture if you receive a touchmove event mostly the y-direction.
 * 5. End gesture if you receive a touchend event.
 * 
 * @author Dave Dunkin
 * @copyright public domain
 */

function addSwipeListener(el, listener)
{
 var startX;
 var dx;
 var direction;
 
 var cancelTouch=function cancelTouch()
 {
  el.removeEventListener('touchmove', onTouchMove);
  el.removeEventListener('touchend', onTouchEnd);
  startX = null;
  startY = null;
  direction = null;
 }
 var ii=0;
 function onTouchMove(e)
 {
	 
	 /***
  if (e.touches.length > 1)
  {
   cancelTouch();
  }
  else
  ****/
  {
   dx = e.touches[0].pageX - startX;
   var dy = e.touches[0].pageY - startY;
   if (direction == null)
   {
    direction = dx;
    e.preventDefault();
   }
   else if ((direction < 0 && dx > 0) || (direction > 0 && dx < 0) )
   {
    cancelTouch();
   }
  }
 }

 function onTouchEnd(e)
 {
	  
 
  if (Math.abs(dx) > 10)
  {
   listener({ target: el, direction: dx > 0 ? 'right' : 'left' });
   el.removeEventListener('touchstart', onTouchStart);
   
  }
  
   cancelTouch();
 }
 
 function onTouchStart(e)
 {
	 ii=0;
  if (e.touches.length == 1)
  {
   startX = e.touches[0].pageX;
   startY = e.touches[0].pageY;
   el.addEventListener('touchmove', onTouchMove, false);
   el.addEventListener('touchend', onTouchEnd, false);
  }
 }
 
// debug('go go ..');
 el.addEventListener('touchstart', onTouchStart, false);
}



//addSwipeListener(document.body, function(e) { alert(e.direction); }

		  
	
		  

 //begin of fbBook plug-in	
  $.fn.fbBook=function(options){							
				var defaults={
					totalPage:0,
					pageWidth:1,
					pageHeight:1,
					fbContainer:$("#fbBookPages"),
					fbCurrentPageIndex:$('#fbCurrentPageIndex'),
					fbTotalPageCount:$('#fbTotalPageCount'),
					normalPageDir:'../files/page/',
					zoomPageDir:'../files/large/',
					pageExt:'.jpg'
					
				};	
			
				//$curentImgObj=options.curentImgObj;
				// Merge the users options with our defaults
				options = $.extend(defaults, options);

		return new $.fbBook2(this, options);				
	}//end of fbBook plug-in
	var fbPage=function(pw,ph,pageIndex,pageURL){
		var $pageIndex=pageIndex;
		var $pageWidth=pw;
		var $pageHeight=ph;
		
		var pageOptions={
			pageIndex:pageIndex,
			pageWidth:pw,
			pageHeight:ph
		};
		var $html=$("<div class='fbPage'><div class='fbPageLoading'></div><img style='width:100px;height:100px' src='' ></img></div>");	
		//debug($html.html());
		$.fn.extend($html, pageOptions);
		$.fn.extend($html, {imgObj:$html.find('img')});
		
		$html.imgObj.attr("src",pageURL);
		
		$.fn.extend($html, {
					onResize: function(){							  
							this.imgObj.css('width',this.width());
							this.imgObj.css('height',this.height());
					},
					showLoading:function(){
						this.find(".fbPageLoading").show();	
						this.imgObj.hide();
					},
					hideLoading:function(){
						this.find(".fbPageLoading").hide();
						this.imgObj.show();
					}
			});
		$html.imgObj.load(function(){
			$html.hideLoading();						   
		});
	$html.imgObj.error(function(){
			$html.showLoading();						   
		});
	
		return $html;		
	}
	$.fbBook2 = function(element, options) {
			var $orginPageWidth=options.pageWidth;
			var $orginPageHeight=options.pageHeight;
			var $bookPageWidth=options.pageWidth;
			var $bookPageHeight=options.pageHeight;
			var $currentPageIndex=1;
			var $currentPage=null;
			var $zoomPage=null;
			var $oldMarginLeft=0;
			var $oldMarginTop=0;
			//var $leftPage=null;
		//	var $rightPage=null;
			var $context=element;
			var $totalPage=options.totalPage;
			var $pages=new Array($totalPage);
			var $oldMarginLeft;
			var $oldMarginTop;
			var $normalPageDir=options.normalPageDir;
			var $zoomPageDir=options.zoomPageDir;
			var $pageExt=options.pageExt;
	
			var $touchStartX=0;
			var $touchStartY=0;
			var $fbContainer=options.fbContainer;
			
		var	isIphone = (/iphone/gi).test(navigator.appVersion);
		var	isIpad = (/ipad/gi).test(navigator.appVersion);
		var	isAndroid = (/android/gi).test(navigator.appVersion);
		var	isTouch = isIphone || isIpad || isAndroid;
			
			
			// Fix scope problems
			var self = this;
			var $isZooming=false;
			var $isMoving=false;
	
			
			// Methods
		$.fn.extend(this, {
			pages:$pages,
			fbContainer:$fbContainer,
			onZoomPageTouchStart:function(e){
				
				$oldMarginLeft=$zoomPage.margin().left;
				$oldMarginTop=$zoomPage.margin().top;
				e.preventDefault();
				e.stopPropagation();
			//	var isTouch=true;
				self.$touchStartX = isTouch ? e.touches[0].pageX : e.pageX;
				self.$touchStartY = isTouch ? e.touches[0].pageY : e.pageY;
			},
			onZoomPageTouchMove:function(e){
				try{					
					if($zoomPage==null)return;
					
				//	var isTouch=true;
					var pageX = isTouch ? e.touches[0].pageX : e.pageX;
					var pageY = isTouch ? e.touches[0].pageY : e.pageY;
					
					//return;
					var leftDelta =pageX - self.$touchStartX;
					var topDelta = pageY - self.$touchStartY;
					
					//return;			
					
					$zoomPage.css("margin-left",($oldMarginLeft+leftDelta)+'px');
					$zoomPage.css("margin-top",($oldMarginTop+topDelta)+'px');
					$currentPage.css("margin-left",($oldMarginLeft+leftDelta)+'px');
					$currentPage.css("margin-top",($oldMarginTop+topDelta)+'px');
					//
					e.stopPropagation();
					e.preventDefault();
				}catch(err){
					debug(err);
				}
					
			},
			onZoomPageTouchEnd:function(e){
				e.stopPropagation();
				e.preventDefault;																		
			},
			onSwipe:function(ee){
				
				if(ee&&ee.direction=='left'){
				 	self.nextPage();
				}else{
					self.prePage();
				}
			},			
		    getPage:function(pageIndex){			 
				if(self.pages[pageIndex-1]!=null){
					return self.pages[pageIndex-1];
				}else{
					var pp=fbPage($bookPageWidth,$bookPageHeight,pageIndex,self.getPageURL(pageIndex));
					self.pages[pageIndex-1]=pp;
					pp.hide();
					self.fbContainer.append(pp);
					return pp;
				}
			},
			getPageURL:function(pageIndex){
				return  $normalPageDir+pageIndex+$pageExt;
			},
			getZoomPageURL:function(pageIndex){
				return  $zoomPageDir+pageIndex+$pageExt;
			},
			getZoomPage:function(pageIndex){
				var pp=fbPage($bookPageWidth,$bookPageHeight,pageIndex,self.getZoomPageURL(pageIndex));				
				pp.hide();
				pp.css('z-index',1001);
				pp.addClass('fbZoomPage');
				
				return pp;
			},
			flipToLeftPage:function(destPageIndex){
				
			  	var leftPage=self.getPage(destPageIndex);
				self.resizePage(leftPage);
				leftPage.css('z-index',1000);	

				var obj=leftPage;
				obj.css("margin-left",-$bookPageWidth+'px');
				obj.show();
				var toML=($(window).width()-$bookPageWidth)/2;
				var oldML=obj.css("margin-left");//, opacity: 'show'
				obj.animate({ marginLeft:toML+'px'  }, 500,'easeInSine',function(){
					self.updateToPage(destPageIndex);
				//	obj.css("margin-left",oldML);
				}); 
				
			},
			flipToRightPage:function(destPageIndex){
				
				var rightPage=self.getPage(destPageIndex);				
				self.resizePage(rightPage);		
				rightPage.css('z-index',1000);
				var obj=rightPage;
				obj.show();
				obj.css("margin-left",$(window).width()+'px');
				var toML=($(window).width()-$bookPageWidth)/2;
				var oldML=obj.css("margin-left");//, opacity: 'show'
				obj.animate({ marginLeft:toML+'px'  }, 500,'easeInSine',function(){
					self.updateToPage(destPageIndex);
				//	obj.css("margin-left",oldML);
				});
			},
			zoomIn:function(){			
				var toZoomPageObj=$currentPage;
				var toWidth=$orginPageWidth;
				var toHeight=$orginPageHeight;
				var toML=($(window).width()-toWidth)/2;
				$isZooming=true;
				//obj.onResize();
				$zoomPage=self.getZoomPage($currentPage.pageIndex);
				/**/
				toZoomPageObj.animate({marginLeft:toML+'px' , width:toWidth+'px',height:toHeight+'px' },500,'easeInSine',
							function(){	
								//
							}
						);	
				/***/
				toZoomPageObj.imgObj.animate({ width:toWidth+'px',height:toHeight+'px' },500,'easeInSine',
							function(){
								
								
							//	return;
							self.fbContainer.append($zoomPage);
							
							$zoomPage.css("margin-left",toZoomPageObj.css("margin-left"));											
							$zoomPage.css("height",toZoomPageObj.height());	
							$zoomPage.css("width",toZoomPageObj.width());	
							$zoomPage.imgObj.css("height",toZoomPageObj.height());	
							$zoomPage.imgObj.css("width",toZoomPageObj.width());
							$zoomPage.show();
							//toZoomPageObj.hide();
						//	$isZooming=false;
							var T_start=isTouch ? 'touchstart':'mousedown';
							var T_move=isTouch ?'touchmove':'mousemove';
							var T_end=isTouch?'touchend':'mouseup';
							
							$zoomPage.get()[0].addEventListener(T_start,self.onZoomPageTouchStart,false);
							$zoomPage.get()[0].addEventListener(T_move,self.onZoomPageTouchMove,false);
							$zoomPage.get()[0].addEventListener(T_end,self.onZoomPageTouchEnd,false);
							
							$zoomPage.doubletap(function(){self.zoomOut();});
				}); 
				
			},
			zoomOut:function(pageIndex){
				if($zoomPage==null)return;			
				var toWidth=$bookPageWidth;
				var toHeight=$bookPageHeight;
				var toML=($(window).width()-toWidth)/2;
				var toMT=0;
				$isZooming=true;
				$currentPage.animate({marginLeft:toML+'px' ,marginTop:toMT+'px', width:toWidth+'px',height:toHeight+'px' },500,'easeInSine',function(){		
						
				}); 
				$currentPage.imgObj.animate({ width:toWidth+'px',height:toHeight+'px' },500,'easeInSine',
							function(){	
																			
							return;					
							
				});
				$zoomPage.animate({marginLeft:toML+'px' ,marginTop:toMT+'px', width:toWidth+'px',height:toHeight+'px' },500,'easeInSine',function(){		
						
				}); 
				$zoomPage.imgObj.animate({ width:toWidth+'px',height:toHeight+'px' },500,'easeInSine',
							function(){								
							if($zoomPage==null)return;	
							if($currentPage!=null){
								$currentPage.css("margin-left",$zoomPage.css("margin-left"));	
								$currentPage.css("margin-top",$zoomPage.css("margin-top"));	
								$currentPage.css("height",$zoomPage.height());	
								$currentPage.css("width",$zoomPage.width());	
								$currentPage.imgObj.css("height",$zoomPage.height());	
								$currentPage.imgObj.css("width",$zoomPage.width());	
								$currentPage.show();
							}
							$zoomPage.hide();	
							$zoomPage.remove();
							$zoomPage=null;
							$isZooming=false;
							return;					
							
				}); 
			},
			nextPage:function(){
				self.gotoPage($currentPageIndex+1);
			},
			prePage:function(){
				self.gotoPage($currentPageIndex-1);
			},
			firstPage:function(){
				self.gotoPage(1);
			},
			lastPage:function(){
				self.gotoPage($totalPage);
			},
			gotoPage:function(pageIndex){					
				if($currentPage!=null){//if in the first page,you swip to right,then the first page will lost onSwip events.
			   		addSwipeListener($currentPage.imgObj.get()[0],self.onSwipe);	
				}
				if($isMoving)return;
				if(pageIndex<1||pageIndex>$totalPage){					
					return;
				}
				$isMoving=true;
				if(!$isZooming){
					if(pageIndex==$currentPageIndex)return;
					if($currentPageIndex>pageIndex){
						self.flipToLeftPage(pageIndex);
					}else{
						self.flipToRightPage(pageIndex);
					}
				}else{//放大
					
					if($zoomPage==null)return;
					$zoomPage.showLoading();					
					$zoomPage.imgObj.attr("src",self.getZoomPageURL(pageIndex));					
					
					$currentPage.hide();
					$currentPage.css("margin-top",'0px');	
					options.fbCurrentPageIndex.html(pageIndex+'');
					options.fbTotalPageCount.html($totalPage+'');
					$currentPage.css('z-index',1);
					var pp=self.getPage(pageIndex);
					$currentPage=pp;
					$currentPageIndex=pageIndex;
					$currentPage.css('z-index',999);
					addSwipeListener($currentPage.imgObj.get()[0],self.onSwipe);
					if(!$currentPage.data('hasInitedEvents')){							
						$currentPage.doubletap(function(){self.zoomIn();});	
						$currentPage.data('hasInitedEvents',true);
					}
					
					$currentPage.css("margin-left",$zoomPage.css("margin-left"));	
					$currentPage.css("margin-top",$zoomPage.css("margin-top"));	
					$currentPage.css("height",$zoomPage.height());	
					$currentPage.css("width",$zoomPage.width());	
					$currentPage.imgObj.css("height",$zoomPage.height());	
					$currentPage.imgObj.css("width",$zoomPage.width());	
					$currentPage.show();
					$isMoving=false;
				}
				return;		
				
			},
			updateToPage:function(pageIndex){
				
				$currentPage.hide();
				options.fbCurrentPageIndex.html(pageIndex+'');
				options.fbTotalPageCount.html($totalPage+'');
				$currentPage.css('z-index',1);
				var pp=self.getPage(pageIndex);
				$currentPage=pp;
				$currentPageIndex=pageIndex;
				$currentPage.css('z-index',999);
				addSwipeListener($currentPage.imgObj.get()[0],self.onSwipe);	
				if(!$currentPage.data('hasInitedEvents')){												
    				$currentPage.doubletap(function(){self.zoomIn();});
	 				$currentPage.data('hasInitedEvents',true);
				}

				this.resizePage(pp);
				$isMoving=false;
				return pp.show();				
			},
			addResizeEventListner:function(){
				$(window).resize(function(){		 
				//	
					self.resizeBook();
				//	self.gotoPage(3);
				});				
			},
			resizePage:function(pageObj){
				if(pageObj==null)return;
				var marginTop=10;
				var marginBottom=10;
				var viewAreaHeight=$(window).height();
				viewAreaHeight=$(window).height()-marginTop-marginBottom;
				var wTh=options.pageWidth/options.pageHeight;
				var h=viewAreaHeight;//$(window).height()-$('.fbCurrentPage',element).css("padding-top").replace("px", "")-$('.fbCurrentPage',element).css("padding-bottom").replace("px", "");
				var w=$(window).width();
				var wTmp=h * wTh;
				var hTmp=w / wTh;
				//var bookPageWidth=0;
			//	var bookPageHeight=0;
				if (wTh >= w / h)
				{
						if (hTmp <= h)
						{ //如果以宽为标准进行缩放，如果高满足
							$bookPageWidth=w;
							$bookPageHeight=hTmp;
						}
						else
						{ //高不满足，则以高为最高，然后算出宽
							if (wTmp <= w)
							{ //
								$bookPageWidth=wTmp;
								$bookPageHeight=h;
							}
							else
							{ //宽不满足
								$bookPageWidth=h * wTh;
								$bookPageHeight=h;
								
							}
						}
					}
					else
					{
						if (wTmp <= w)
						{ //
							$bookPageWidth=wTmp;
							$bookPageHeight=h;
						}
						else
						{ //宽不满足
							$bookPageWidth=w;
							$bookPageHeight=hTmp;
						}
					}			
				//	
				var pagePaddingH=0;
				var pagePaddingW=0;
				pageObj.imgObj.css("height",$bookPageHeight);
				pageObj.imgObj.css("width",$bookPageWidth);
				pageObj.css("height",$bookPageHeight+pagePaddingH);
				pageObj.css("width",$bookPageWidth+pagePaddingW);
				pageObj.css("margin-left",($(window).width()-$bookPageWidth)/2);
				
			},
			resizeBook:function(){
				if($isZooming)return;
				this.resizePage($currentPage);
			
			},//end of method resiz...
		});
		
		$currentPage=self.getPage(1);
			
		$pages[0]=$currentPage;
			//$currentPage.hide();
		$fbContainer.append($currentPage);
			
		this.resizeBook();
		this.updateToPage(1);
		
		//	self.onSwipe();	
		
	}

	
})(jQuery);















//========================================================================================================================


$(document).ready(function(){		
			var fbBookObj=$(".fbBook").fbBook(fboptions);	
			var startP={x:0,y:0};	
			function hideAddressBar(evt){
				startP.x=evt.clientX;
				startP.y=evt.clientY;
				//$('#log').html('hiding bar');		
				
				// setTimeout(function() { window.scrollTo(0, 1); }, 100);

			}
			function onUp(evt){		
			
				if(evt.target&&(evt.target.tagName=='BUTTON'||evt.target.tagName=='A')){
					//return;
				}
				if(Math.abs(evt.clientX-startP.x)<3&&Math.abs(evt.clientY-startP.y)<3){
					$('#fbToolBar').toggle();
				}
			}
			//var isbutoonClicking=false;
			function preventEvt(evt){
				//window.console.log("isbutoonClicking 222="+isbutoonClicking);
			//	isbutoonClicking=true;
	
				if(evt.originalEvent){					
						try{
							evt.originalEvent.stopPropagation();
						}catch(err){}
						try{
							evt.originalEvent.preventDefault();
						}catch(err){}
				}			
				try{
					evt.preventDefault();			
				}catch(err){}
				try{
					evt.stopPropagation();			
				}catch(err){}
				
		  }
		//	hideAddressBar();
			document.addEventListener('mousedown', hideAddressBar, false);
			document.addEventListener('mouseup', onUp, false);
			document.addEventListener('touchstart', hideAddressBar, false);
			document.getElementById('fbToolBar').addEventListener('mouseup', cancelUp, false);
			function cancelUp(evt){
				preventEvt(evt);
			}
			fbBookObj.addResizeEventListner();
		
			$("#btnLeft").mouseup(function(evt){
				preventEvt(evt);
				fbBookObj.prePage();
				
				
			});
			$("#btnRight").mouseup(function(evt){
				preventEvt(evt);
				fbBookObj.nextPage();
				
			});
			$("#btnFirst").mouseup(function(evt){
				preventEvt(evt);
				fbBookObj.firstPage();
				
			});
			$("#btnLast").mouseup(function(evt){
				preventEvt(evt);
				fbBookObj.lastPage();
				
			});
		});