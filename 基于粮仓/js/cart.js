$(function(){

    //获取API接口:获取购物车数据
    $.ajax({
        "url": "http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.getItem("token"),
        "type": "GET",
        "dataType": "json",
        "success": function(data){
            console.log(data);
            console.log(data.data.length);
            //判断当前购物车里有没有商品
            if( data.data.length > 0){

            } 
        }
    })


})