$(function(){
	
	var lunboImg = $(".jd-clo2-hd ul li");
	
	// 生成轮播小点
	for (var i = 0 ; i < lunboImg.length ; i++) {
		$("<li></li>").appendTo( $(".jd-clo2-hd ol"));
	};
	
	$(".jd-clo2-hd").hover(function(){
		$(".arr-l").show();
		$(".arr-r").show();
		clearInterval(t);
	},function(){
		$(".arr-l").hide();
		$(".arr-r").hide();
		t = setInterval(play,2000);
	});
	
	var t = 0;
	var index = 0; // 记录下来当前显示的图片下标
	
	$(".jd-clo2-hd ol li:first-child").addClass("current");
	
	// 自动播放
	t = setInterval(play,2000);
	function play(){
		index++;
		
		if(index == $(".jd-clo2-hd ul li").length){
			index = 0; // 超过图片个数重置
		}
		
		$(".jd-clo2-hd ol li").eq(index).addClass("current").siblings().removeClass("current");
		
		$(".jd-clo2-hd ul li").eq(index).fadeIn().siblings("li").fadeOut();
	};
	
	// 点击小圆点切换
	$(".jd-clo2-hd ol li").click(function(){
		
		$(this).addClass("current").siblings().removeClass("current");
		
		var count = $(this).index();
		index = count;
		console.log(index);
		
		$(".jd-clo2-hd ul li").eq(index).fadeIn().siblings("li").fadeOut();	
	});
	
	// 上一张 
	$(".arr-l").click(function(){
		index --;
		if(index == -1) {
			index = $(".jd-clo2-hd ul li").length;
		}
		$(".jd-clo2-hd ol li").eq(index).addClass("current").siblings().removeClass("current");
		$(".jd-clo2-hd ul li").eq(index).fadeIn().siblings("li").fadeOut();
	});
	// 下一张
	$(".arr-r").click(function(){
		index ++;
		if(index == $(".jd-clo2-hd ul li").length) {
			index = 0;
		}
		$(".jd-clo2-hd ol li").eq(index).addClass("current").siblings().removeClass("current");
		$(".jd-clo2-hd ul li").eq(index).fadeIn().siblings("li").fadeOut();
	});
});
