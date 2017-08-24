
    var deviceWidth = document.documentElement.clientWidth;
    console.log(1);

    if(deviceWidth > 640) deviceWidth = 640;
    console.log(1);
    
    document.documentElement.style.fontSize = deviceWidth / 6.4 + 'px';
    console.log(1);
    // 点击播放按钮，切换动态页面
    $("#static>p").click(function(){
        $("#static").css("display","none");
        $("#runing").css("display","block");
    })

    
