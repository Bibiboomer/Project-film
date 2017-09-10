
//验证用户名是否重复
$('input[name="username"]').blur( function(){

    var username = $('input[name="username"]').val();
    console.log( $(this).val());

    $.ajax({
        "url": "http://h6.duchengjiu.top/shop/api_user.php",
        "type": "POST",
        "dataType": "json",
        "data":{
            "status": "check",
            "username": username
        },
        "success": function(data){
            console.log(data);
            if( data.code === 0){
            //成功后
            $("form div:eq(1) .success").show();
            $("form div:eq(1) .error").hide();
            $("form div:eq(1) .repeat").hide(); 
            //重复
            }else if( data.code === 2001 ){
                $("form div:eq(1) .repeat").show();
                $("form div:eq(1) .success").hide();
                $("form div:eq(1) .error").hide();
            //不符合条件
            }else if( data.code === 1000){
                $("form div:eq(1) .error").show();
                $("form div:eq(1) .repeat").hide();
                $("form div:eq(1) .success").hide();
            }
        }
    })
})

//验证密码是否符合要求
$('input[name="password"]').blur( function(){
    var password1 = $('input[class="password1"]').val();
    // console.log(password1);

    //验证
    if( password1.length < 6 || password1.length > 20){
        $("form div:eq(2) .error").show();
        $("form div:eq(2) .success").hide();
	}else{
        $("form div:eq(2) .error").hide();
        $("form div:eq(2) .success").show();
    }
    // $.ajax({
    //     "url": "http://h6.duchengjiu.top/shop/api_user.php",
    //     "type": "POST",
    //     "dataType": "json",
    //     "data": {
    //         "status": "check",
    //         "username": password1
    //     },
    //     "success": function(data){

    //     }
    // })
})

//验证重置成功
$('input[name="password"]').blur( function(){
    var password1 = $('input[class="password1"]').val();
    //console.log(password1);
    var password2 = $('input[class="password2"]').val();
    //console.log(password2);

    if( password1 == password2){
        $("form div:eq(3) .error").hide();
        $("form div:eq(3) .success").show();
    }else{
        $("form div:eq(3) .error").show();
        $("form div:eq(3) .success").hide();
        return
    }

    //
})

//注册验证
$("form .regBtn").click( function(){
    var username = $('input[name="username"]').val();
	var password = $('input[name="password"]').val();
    //console.log(username);
    //console.log(password);

    $.ajax({
        "type": "POST",
        "url": "http://h6.duchengjiu.top/shop/api_user.php",
        "data": {
            "status": "register",
            "username": username,
            "password": password
        },
        "dataType": "json",
        "success": function(data){
            window.location.href = "login.html";
        }

    })

})



