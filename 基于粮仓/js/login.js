//当到达login页面

//获取用户的数据，匹配成功跳转到首页
//登录页面不需要验证什么条件，只要值在数据库能找到匹配则可

$( function(){
$("#inputBtn").click( function(){

    //获取用户数据密码
    var username = $('input[name="username"]').val();
    var password = $('input[name="password"]').val();
    //console.log(username,password);
    //逻辑问题：一般页面登录之后不应该再有登录页面
    //判断当前用户是否已经登录：登录显示用户名，否则显示注册登录
    // if( localStorage.getItem("token")){
    //     $("body").html( localStorage.getItem("username")+"您已经登录成功！请不要重复登录");
    //     setInterval( function(){
    //         location.href = "index。html";
    //     })
    // }

    $.ajax({
        "url": "http://h6.duchengjiu.top/shop/api_user.php",
        "type": "POST",
        "data": {
            "status": "login",
            "username": username,
            "password": password
        },
        "dataType": "json",
        "success": function(data){
            console.log(data);

            // localStorage.setItem("token",data.data.token);
            // alert(data.message);
            //登录成功之后
            if( data.code === 0){

                // 个人信息k存入变量data
                var data = data.data;

                // 遍历 prop属性单词的简写这个是变量
                for( prop in data){
                    
                    //判断这个属性是否是本身的属性
                    if( data.hasOwnProperty(prop)){

                        // 把键值对存储到本地仓库(属性，数据[属性])
                        localStorage.setItem( prop, data[prop]);
                    }
                }
                //写在if code === 0 里面: 成功之后提示：然后跳转到首页
                location.href = "index.html"
            }
        }
    })
})

})