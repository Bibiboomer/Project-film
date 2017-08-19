//鼠标进入购物车和消息b背景色改变
//如果用CSS写不方便，要重新给.dropbox的两个li命名或者重复写两次
//用js可以用parent()指代
//好像更不方便，鼠标移入要写背景色，移除还有删除背景色
// nav_topList 中鼠标滑过显示drop，鼠标移出display:none
$("#nav_topList li:eq(2)").mouseenter( function(){

    $("#nav_topList .dropbox:eq(0)").css( "display" ," block");
    // $(".dropbox:eq(0)").parent().css( "background-color" , "rgb(41,47,52)");
})
$("#nav_topList li:eq(2)").mouseleave( function(){
   $("#nav_topList .dropbox:eq(0)").css( "display" ," none");
})
$("#nav_topList li:eq(3)").mouseenter( function(){
   $("#nav_topList .dropbox:eq(1)").css( "display" ," block");
//    $(".dropbox:eq(1)").parent().css( "background-color" , "rgb(41,47,52)");
})
$("#nav_topList li:eq(3)").mouseleave( function(){
   $("#nav_topList .dropbox:eq(1)").css( "display" ," none");
})

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

    //输入框跳转

    //iBanner的轮播效果
    //移入移出的按钮效果
    $(".oBanners").mouseenter( function(){
        $(".oBtns a").css("width",50);
    })
    $(".oBanners").mouseleave( function(){
        $(".oBtns a").css("width",0);
    })

    //轮播效果
    //大轮子滚动
    //1自动播放 2鼠标移入停止播放 3 点击按钮图片切换，同时焦点改变
    //4 点击焦点图片切换

    //找到lis(图片的容器)
    var $lis = $(".oBanners ul li");//
    var $oBtns = $(".oBanners .oBtns");//按钮


    //信号量
    var idx = 0;
    var timer = null;

    //事件


    $(".oBanners .leftBtn").click( function(){
        //线判断当前运动状态：效果：点击一张只能动一次，不能持续运动
        //函数节流
        if( $lis.eq(idx).is(":animated")){
            return;
        }
        //信号量改变
        idx--;
        //先判断
        if( idx < 0){
            idx = $lis.length-1;
        }
        $lis.eq(idx).addClass

    })
    




