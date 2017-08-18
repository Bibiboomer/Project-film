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