$(document).ready(function(){
  		$('.ma').mousemove(function(){
  		$('.weixin').slideDown(200);//可以设置切换时间 
  	});
  		$('.ma').mouseleave(function(){
  		$('.weixin').slideUp("fast");
  	});
});
