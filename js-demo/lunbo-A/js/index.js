window.onload = function() {
	// 相框父容器
	var box = document.getElementById("box");

	// 相框
	var screen = box.children[0];

	// 相框的宽度
	var screenW = screen.offsetWidth;

	// 获取ul
	var screenUl = screen.children[0];

	// 获取ul中的所有li
	var screenLi = screenUl.children;

	// 获取ol
	var ol = screen.children[1];

	// 获取左右箭头
	var arr = document.getElementById("arr");

	// 存储索引值
	var pic = 0;

	// 根据轮播图的数量生成轮播底部小按钮
	for(var i = 0; i < screenLi.length; i++) {
		// 创建轮播小按钮
		var olLi = document.createElement("li");
		// 加入到ol容器
		ol.appendChild(olLi);
		// 小按钮里的内容
		olLi.innerHTML = (i + 1);

		//在每个ol中的li标签上添加一个自定义属性,存储索引值
		olLi.setAttribute("index", i);

		// 注册鼠标进入事件
		olLi.onmouseover = function() {
			// 先干掉默认的类样式
			for(var j = 0; j < ol.children.length; j++) {
				ol.children[j].removeAttribute("class");
			}
			// 再设置鼠标进入当前小按钮的类样式
			this.className = "current";

			// 获取鼠标进入的小按钮的当前索引值
			pic = this.getAttribute("index");

			// 移动ul
			animate(screenUl, -pic * screenW);

		};
	}

	//设置ol中第一个li有背景颜色
	ol.children[0].className = "current";

	// 克隆最后一张轮播图放在最后
	var cloneLi = screenUl.children[0].cloneNode(true);
	screenUl.appendChild(cloneLi);
	
	// 自动播放
	var timeId = setInterval(clickHandle, 2500);
	
	// 左右箭头
	screen.onmouseover = function() {
		arr.style.display = "block";
		//鼠标进入废掉之前的定时器
		clearInterval(timeId);
	}
	screen.onmouseout = function() {
		arr.style.display = "none";
		//鼠标离开自动播放
		timeId = setInterval(clickHandle, 2500);
	}

	

	//右边按钮
	document.getElementById("right").onclick = clickHandle;

	function clickHandle() {
		// 如果pic的值是5,恰巧是ul中li的个数-1的值,此时页面显示第六个图片,而用户会认为这是第一个图,
		// 所以,如果用户再次点击按钮,用户应该看到第二个图片	
		if(pic == screenLi.length - 1) {
			//如何从第6个图,跳转到第一个图
			pic = 0; //先设置pic=0
			screenUl.style.left = 0 + "px"; //把ul的位置还原成开始的默认位置
		}
		pic++; //立刻设置pic加1,那么此时用户就会看到第二个图片了
		animate(screenUl, -pic * screenW); //pic从0的值加1之后,pic的值是1,然后ul移动出去一个图片
		//如果pic==5说明,此时显示第6个图(内容是第一张图片),第一个小按钮有颜色,
		if(pic == screenLi.length - 1) {
			//第五个按钮颜色干掉
			ol.children[ol.children.length - 1].className = "";
			//第一个按钮颜色设置上
			ol.children[0].className = "current";
		} else {
			//干掉所有的小按钮的背景颜色
			for(var i = 0; i < ol.children.length; i++) {
				ol.children[i].removeAttribute("class");
			}
			ol.children[pic].className = "current";
		}
	};
	
	//左边按钮
  document.getElementById("left").onclick = function () {
    if (pic == 0) {
      pic = 5;
      screenUl.style.left = -pic * screenW + "px";
    }
    pic--;
    animate(screenUl, -pic * screenW);
    //设置小按钮的颜色---所有的小按钮干掉颜色
    for (var i = 0; i < ol.children.length; i++) {
      ol.children[i].removeAttribute("class");
    }
    //当前的pic索引对应的按钮设置颜色
    ol.children[pic].className = "current";

  };
	

	//设置任意的一个元素,移动到指定的目标位置
	function animate(element, target) {
		clearInterval(element.timeId);
		//定时器的id值存储到对象的一个属性中
		element.timeId = setInterval(function() {
			//获取元素的当前的位置,数字类型
			var current = element.offsetLeft;
			//每次移动的距离
			var step = 10;
			step = current < target ? step : -step;
			//当前移动到位置
			current += step;
			// Math.abs 绝对值
			if(Math.abs(current - target) > Math.abs(step)) {
				element.style.left = current + "px";
			} else {
				//清理定时器
				clearInterval(element.timeId);
				//直接到达目标
				element.style.left = target + "px";
			}
		}, 0);
	}

};