/**
 * @author  刘
 * @email   526459956@qq.com
 */
$(function () {

    /* 初始化fullpage组件 */
    $(".container").fullpage({

        /* 配置参数 */

        /* 1.设置每一个屏幕的背景颜色 */
        sectionsColor: ["#fadd67", "#84a2d4", "#ef674d", "#ffeedd", "#d04759", "#84d9ed", "#8ac060"],

        /* 2.设置屏幕内容的对齐方式  默认是垂直居中的  改成顶部对齐 */
        verticalCentered: false,

        /* 3.设置导航 设置指示器 点容器 显示出来 默认为false */
        navigation:true,

        /* 4.监听完全进入某一屏的时候 回调函数 文档中有*/
        afterLoad : function (link,index) {
           // console.log(index);/* index 序号1开始 当前屏的序号 */
            $(".section").eq(index-1).addClass("now"); // 因为这是序号不是索引所以要减一

        },


        /* 最好在组件初始化完毕或者插件内容渲染完毕才执行 */
        // afterRender 页面结构生成后的回调函数，或者说页面初始化完成后的回调函数
        afterRender : function () {
            // this里面没有api方法
            // console.log(this);

            /* jQuery插件初始的时候封装这个方法 */
            /* 1.回想jQuery插件的封装 $.fn.fullpage = function(){}*/
            /* 2.jQuery本身没有的方法通过$.fn的方式追加方法 认为是插件方法 */
            /* 3.例如：$.fn.src = function(){ return $(this).attr("src");} 你选择谁this就指向谁 （jq对象）*/
            /* 5.点击更多切换下一页 */
            $(".more").on("click",function () {
                $.fn.fullpage.moveSectionDown();
            });

            /* 7.当第四屏的购物车动画结束之后执行收货地址的动画 */
            $(".screen04 .cart").on("transitionend",function () {
                /* : last first visible hidden checked selected jQuery扩展选择器*/
                $(".screen04 .address").show().find("img:last").fadeIn(1000);
                $(".screen04 .text").addClass("show");
            });

            /* 第八屏动画 */
            /* 手跟着鼠标移动 */
            $(".screen08").on("mousemove",function (e) {
                $(this).find(".hand").css({
                    // 鼠标的坐标设置给手 暂时废弃
                    // left :  e.clientX - 480 ,
                    // top : e.clientY - 340 ,

                });
            }).find(".again").on("click",function () {
                /* 点击再来一次重置动画跳回第一页 */
                /*
                    加now 类
                    加leaved 类
                    加show 类
                 */
                console.log("1");
                $(".now,.leaved,.show").removeClass("now").removeClass("leaved").removeClass("show");
                /*
                   加css属性  后果：加一个style属性
                 */
                $(".content[style]").removeAttr("style");

                /* 跳回第一页 */
                $.fn.fullpage.moveTo(1);
            });
        },

        /* 6.离开某一页面的时候触发 */
        onLeave : function (index,nextIndex,direction) {
            var pageSum = $(".section").eq(index - 1 );
            if (index == 2 && nextIndex == 3){
                /* 当前是第二页到第三页 */
                pageSum.addClass("leaved");
            }else if(index == 3 && nextIndex == 4){
                /*当前是从第三页到第四页*/
                pageSum.addClass("leaved");
            }else if(index == 5 && nextIndex == 6){
                /*当前是从第5页到第6页*/
                pageSum.addClass("leaved");
                $(".screen06 .box").addClass("show");
            }else if(index == 6 && nextIndex == 7){
                /*当前是从第6页到第7页*/

                /* 星星动画css3方式 */
                $(".screen07 .star").addClass("show");

                $(".screen07 .text").addClass("show");

                /* 星星动画js方式 */
                $(".screen07 .star img").each(function (i,item) {
                    // delay()延迟

                    /* 星星动画js方式 */
                    // 当img采用的是display
                    // $(this).delay(i*0.5*1000).fadeIn();

                    /* 星星动画css3方式 */
                    // 当img采用的是opacity
                    $(this).css("transition-delay",i*0.5+"s");
                });


            }
        },
        /* 页面的切换时间 默认700*/
        scrollSpeed : 1000
    });
});

