// 判断当前用户已登录，否则显示注册登录
//token相当于一个ID，因为此项目中的user_id有重复
if( localStorage.getItem("token")){
    $("#nav_topList li:eq(0)>a").html("小仙女"+localStorage.getItem("username")+"您好");
    $("#nav_topList li:eq(1)>a").html("");
}

//获取搜索跳转




// $register.click = function








//鼠标进入购物车和消息b背景色改变
//如果用CSS写不方便，要重新给.dropbox的两个li命名或者重复写两次
//用js可以用parent()指代
//好像更不方便，鼠标移入要写背景色，移除还有删除背景色
// nav_topList 中鼠标滑过显示drop，鼠标移出display:none
// $("#nav_topList li:eq(2)").mouseenter( function(){

//     // $("#nav_topList .dropbox:eq(0)").css( "display" ," block");
//     $(".dropbox:eq(0)").parent().css( "background-color" , "rgb(41,47,52)");
// })
// $("#nav_topList li:eq(2)").mouseleave( function(){
//    $("#nav_topList .dropbox:eq(0)").css( "display" ," none");
// })
// $("#nav_topList li:eq(3)").mouseenter( function(){
//    $("#nav_topList .dropbox:eq(1)").css( "display" ," block");
//    $(".dropbox:eq(1)").parent().css( "background-color" , "rgb(41,47,52)");
// })
// $("#nav_topList li:eq(3)").mouseleave( function(){
//    $("#nav_topList .dropbox:eq(1)").css( "display" ," none");
// })

    //首页的页面分类导航
    //get和ajax都可以
    //ajax多了一个“data”方法，发送到服务器上的数据，可以在url后加上
    //这样查询条件变多，输出的结果较少(多了条件：参数)
    //回调函数两个参数function(data→response ，textStatus)
    $.get("http://h6.duchengjiu.top/shop/api_cat.php",function(data){
        console.log(data);

        //得到多个li>a这样的结构→循环
        for( var i = 0 ; i < data.data.length ;i++){

            //放入结构

            $("#goodsClassfiy").append('<li><a href="list.html?cat_id=' +data.data[i].cat_id+ '">' + data.data[i].cat_name +  '</a></li>');
        }
    })

    
    //输入框跳转：事件1和2

    //输入框样式事件1：鼠标点击icon，输入框出现
    //输入框修改value值，鼠标点击icon，跳转

    var oLeft = $("#navzoom").css("left");

    $(".nav_c12>a").click( function(e){
        if($("#navInput").val()==="search..."){
            e.preventDefault();

            oLeft = (oLeft == 0) ? 335 : 0;
            $("#navzoom").animate({"left":oLeft},300);
            $("#navzoom").css("left",oLeft);
            console.log(1);
        }else{
            var search = $("#navInput").val();

            location.href = "detail.html?goods_id="+search;

            //有bug记得修改，返回时点击搜索又跳转，下面的这一条语句没有达到效果
            $("#navInput").val()= search;
            console.log("00909");
        }
    })

    
    // if($("#navInput").val()==="search..."){

    //     console.log($("#navInput").val()==="search...");
    //     $(".nav_c12>a").click( function(e){
    //         // e.preventDefault();

    //         // oLeft = (oLeft == 0) ? 335 : 0;
    //         // $("#navzoom").animate({"left":oLeft},300);
    //         // $("#navzoom").css("left",oLeft);
    //         // console.log(1);

    //         // location.href = "detail.html?goods_id=" + search;
    //         // location.href = "detail.html?goods_id=" + search;
    //     })
    // }else if($("#navInput").val()!=="search..."){
    //         $(".nav_c12>a").click(function(){

    //             var search = $("#navInput").val();

    //             location.href = "detail.html?goods_is="+search;
    //         })
    // }



    //iBanner的传统轮播效果*(克隆下标为0的图片)
    //移入移出的按钮效果
    //大轮子滚动
    //1自动播放 2鼠标移入停止播放 3 点击按钮图片切换，同时焦点改变
    //4 点击焦点图片切换


    //和原生js一样先获取事件元素
    var $carousel = $("#carousel");
    var $leftBtn = $("a.leftBtn");
    var $rightBtn = $("a.rightBtn");
    var $m_unit = $(".m_unit");
    var $banImgs = $(".m_unit ul li");
    var $circles = $(".circles ol li");
    
    //自动传统轮播(自动向右滚动)最重要。克隆下标最小(0)的图片；定时器
    $(".m_unit ul").append($(".m_unit ul li").eq(0).clone());
    var timer = setInterval(rightBtnHandler,2000);

    //信号量
    var idx = 0;

    //事件==效果

    //事件1：鼠标进入carousel，停止自动播放；鼠标移出继续自动向右播放
    $carousel.mouseenter( function(){
        clearInterval(timer);
    });
    $carousel.mouseleave( function(){
        timer = setInterval( rightBtnHandler,2000);
    });

    //事件2：鼠标进入carousel,按钮出现;
    $carousel.mouseenter( function(){
        $("#carousel .btns>a").addClass("onStyle");
    });
    $carousel.mouseleave( function(){
        $("#carousel .btns>a").removeClass("onStyle");
    });
    //事件3：鼠标进入leftBtn和rightBtn时按钮的背景色发生变化
    // $(".btns a").mouseenter( function(){
    //     $(this).css("background-color", "#878787");
    // })
    // $(".btns a").mouseleave( function(){
    //     $(this).css("opacity", 1);
    // })

    //事件4：核心事件：点击leftBtn。图片向左移动，下标减小
    $leftBtn.click( function(){
        
        //首先判断当前运动状态；是不动，不是动；效果：点击一次动一次(图片滚动一张)
        //除非鼠标移出carsousel或者再点击leftBtn才能播放下一张图片
        //以上专业点说就是函数节流(简单理解：一次触发结束才能开始下一次触发)
        if( $m_unit.is(":animated")) return;

        //具体业务：点击图片下标减小
        idx--;

            //运动结束后要做的事：判断范围
            if(idx<0){
                idx = 7;
                //克隆之后多了一张，在临界点返回时不需要(img.lenght-1)
                $m_unit.css("left",-8*1000)
            }
            $m_unit.animate( {"left":-1000*idx},2000);

            //附带事件：焦点样式改变
            changeCircle();
        
    })

    //事件5：核心事件：点击rightBtn。图片向右移动，下标增大
    $rightBtn.click(rightBtnHandler )

    function rightBtnHandler(){
      
        //函数节流
        if( $m_unit.is(":animated")) return;

        idx++;

        $m_unit.animate( { "left":-1000*idx},300,function(){

            if( idx > 7){
                idx=0;
                $m_unit.css("left",0);
            } 
        });
        changeCircle();
    
    }

    //事件6:鼠标点击焦点circle，图片切换和circle样式改变
    $circles.click( function(){

        idx = $(this).index();
        console.log(idx);
        $m_unit.animate( {"left":-1000*idx},300);

        //附带事件：焦点样式改变
        changeCircle();
    })

    //附带事件：鼠标点击按钮和点击焦点都会是的使得焦点样式改变：添加class名
    function changeCircle(){

        var n = idx <= 7 ? idx : 0;
        
        //排他
        $circles.eq(n).addClass("onStyle").siblings().removeClass("onStyle");
    }
    


//首页的商品goodslist获取==热门商品

$.get("http://h6.duchengjiu.top/shop/api_goods.php",function(data){
    console.log(data);
    for( var i = 0 ; i < data.data.length;i++){
        $("#goodsUl").append('<li><div class="bgzoom"><a href=detail.html?goods_id='+data.data[i].goods_id+'><img src="'+data.data[i].goods_thumb+'" alt=""> \
                    <p class="bg01">'+data.data[i].goods_name+'</p><p class="bg02">'+data.data[i].goods_desc+'</p> \
                    <p class="bg03">'+"¥"+data.data[i].price+"</p> \
                </a></div></li>");
    }
})

//商品内文字p文字效果

