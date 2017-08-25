
    var deviceWidth = document.documentElement.clientWidth;
    console.log(1);

    if(deviceWidth > 750) deviceWidth = 750;
    console.log(1);
    
    document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
    console.log(1);
    // 点击播放按钮，切换动态页面
    $("#static>p").click(function(){
        $("#static").css("display","none");
        $("#runing").css("display","block");
    })


    
