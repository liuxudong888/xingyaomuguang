$(function(){
	new  Slideshow({
		boxId:"#box",
		imgs:["../img/sjfbx.jpg","../img/sjjgw.jpg","../img/sjstk.jpg","../img/njfsj.jpg","../img/zk.jpg"],
		width:1200,
		height:535,
		timeSpace:3000,
		fadeInOutTime:2000,
		btnColor:"pink",
		btnHighColor:"red",
		btnWidth:20,
		btnHeight:20,
		btnHasOrd:true
	});
});


function Slideshow(obj){

	this.boxId=obj.boxId;	
	
	this.imgs=obj.imgs;
	
	this.width =obj.width;
	this.height =obj.height;
	
	this.timeSpace=obj.timeSpace;
	this.currInOrd =1;
	this.currOutOrd =0;
	
	this.timer =null;
	
	
	this.fadeInOutTime =obj.fadeInOutTime;//2000
	
	//淡入淡出效果
	this.fadeInOutTimer =null;
	
	//三、按钮的属性；
	this.btnColor =obj.btnColor;//原始颜色
	this.btnHighColor =obj.btnHighColor;//高亮颜色
	this.btnWidth =obj.btnWidth;//按钮的宽
	this.btnHeight =obj.btnHeight;
	this.btnHasOrd =obj.btnHasOrd;//按钮上是否有序号；
	//还可以扩展：按钮的位置是上右下左等等。
	this.initUI();
	this.go();
}

Slideshow.prototype.initUI = function(){
	//一、创建轮播图所需要的DOM元素
	//1、所有图片的创建
	for(var i=0;i<this.imgs.length;i++){
		let str = "<img src='"+this.imgs[i]+"' style='width:"+this.width+"px;height:"+this.height+"px;position:absolute;z-index:"+(this.imgs.length-i)+";display:none'/>";
		$(this.boxId).append(str);
	}
	$(this.boxId+" img:first").css({"display":"block"});

	//2、所有按钮的创建
	let ulliStr = "<ul style='position:absolute;right:30px;bottom:0px;z-index:999;display:flex;justify-content:space-between'>";
	
	for(let i=0;i<this.imgs.length;i++){
		ulliStr +="<li ord='"+(i+1)+"' style='list-style:none;float:left;margin:10px;width:"+this.btnWidth+"px;height:"+this.btnHeight+"px;border-radius:50%;text-align:center;background-color:"+this.btnColor+";'>"+(i+1)+"</li>"
	}
	ulliStr +="</ul>";
	$(this.boxId).append(ulliStr);
	
	$(this.boxId+" ul li").mouseover(function(){
		that.goImg(this.getAttribute("ord"));
	});
	
	//让第一个按钮变成高亮颜色；
	$(this.boxId+" ul li:first").css({"background-color":this.btnHighColor});
	
	var that = this;
	$(this.boxId).mouseover(function(){		
		that.stopChange();
	});

	$(this.boxId).mouseout(function(){
		that.go();
	});	
}

Slideshow.prototype.go = function(){
	let that = this;
	this.timer = setInterval(function(){
		that.goStep();
	},this.timeSpace);
}


//改变图片。
Slideshow.prototype.goStep = function(){
	//1）、改变淡入和淡出的图片序号（按照顺序进行变换）
	this.currInOrd++;//1-6   2,3,4,5,6
	this.currOutOrd=this.currInOrd-1; //1,2,3,4,5	
	
	if(this.currInOrd>this.imgs.length){
		this.currInOrd=1;
	}
	if(this.currOutOrd>this.imgs.length){
		this.currOutOrd=1;
	}
	//2）、淡入淡出效果
	this.fadeInOut();
	//3）、改变按钮颜色
	this.changeBtnColor();
}

Slideshow.prototype.fadeInOut=function(){
	$(this.boxId+" img:eq("+(this.currInOrd-1)+")").fadeIn(this.fadeInOutTime);//4
	$(this.boxId+" img:eq("+(this.currOutOrd-1)+")").fadeOut(this.fadeInOutTime);//3
}

Slideshow.prototype.changeBtnColor=function(){
	$(this.boxId+" ul li:eq("+(this.currInOrd-1)+")")
	.css("background-color",this.btnHighColor)
	.siblings()
	.css("background-color",this.btnColor);
}

Slideshow.prototype.stopChange = function(){	
	window.clearInterval(this.timer);
}	

Slideshow.prototype.goImg = function(ord){
	this.currOutOrd = this.currInOrd;
	this.currInOrd = ord; 
	//2）、淡入淡出效果
	this.fadeInOut();
	//3）、改变按钮颜色
	this.changeBtnColor();	
}