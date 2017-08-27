$(function(){

    //先用ajax获取页面的基本节点
    //根据文档AIP接口，要传递参数good_id
    //样板
    //location是指对象包含有关(整个)当前 URL 的信息
    //localtion:file:///C:/Users/Administrator/Desktop/20170优才学习文档/Project-film/基于粮仓/detail.html?goods_id=家具
    //查询url？后面的字符串
    //search:"?goods_id=%22257133%22"

    //通过location.search获取get传参的数据 截取？后面的内容
    var str = location.search.substr(1)

    //用分割方法得到 = 两边的内容：数组长度为2
    var goodsId = str.split("=");

    //用下标找到商品id的值
    console.log(goodsId[1]);

    //下面是转义URI码
	// console.log(decodeURI(goodsId[1]));

    //使用ajax获取页面节点
    $.ajax({
        "url": "http://h6.duchengjiu.top/shop/api_goods.php",
        "type": "GET",
        "data": {
            "goods_id": goodsId[1]
        },
        "dataType": "json",
        "success": function(data){
            
            //节点操作：获取详情页面的节点dom
            
            //使用字符模板
            // console.log(data);
            // console.log(goodsId[1]);
            
            // var html = `<div><img src="${ data.goods_thumb }" alt=""></div>
            //                 <div class="message">
            //                     <p class="good-message"> ${ data.goods_name } </p>
            //                     <p class="good-price"> 
            //                         <span>价格</span>
            //                         <span>￥${ data.goods_number }</span>
            //                     </p>
            //                     <a id= "cart">加入购物车</a>
            //                 </div>
            // `
            // //添加上去
            for(var i=0;i<data.data.length;i++){
                // console.log(data);
            console.log(goodsId);
                $("#detail").html('<div><img src="'+data.data[0].goods_thumb + '" alt=""></div> \
                <div class="message"> \
                    <p class="good-message">'+data.data[0].goods_name+'</p> \
                    <p class="good-price"> \
                        <span>价格</span> \
                        <span>￥'+data.data[0].price+'</span> \
                    </p> \
                    <a id= "cart">加入购物车</a> \
                </div>');
            }


                $("#cart").click( function(){

                    //按照正常逻辑，加入购物车之前要先判断是否是登录状态
                if(!localStorage.getItem("token")){//如果用户id不存在：未登录

                    //增加功能，5秒之后回到登录页面，时间是动态变化
                    //=============================================
                    //==============================================
                    //===============================================
                    //=============================================
                    //==============================================
                    //===============================================
                    //=============================================
                    //==============================================
                    //===============================================
                    //=============================================
                    //==============================================
                    //===============================================

                    //要返回登录页面登录，登录成功之后返回购物车页面
                    location.href = "login.html#callback="+location.href;//记得查询这里的意义；#,callback
                    return;
                }else{

                    //显示弹窗
                    $("#bgzoom").css("display","block");
                    $("#sure-cart").css("display","block");

                    //弹窗消失
                    $("button.remove-alert").click( function(){
                        $("#bgzoom").css("display","none");
                        $("#sure-cart").css("display","none");

                                            //购物车数量更新
                    console.log(goodsId[1]);

                    ////获取本地存储中的商品数量信息
                    //获取本地存储中的商品数量信息,若没有存入则无法获取null
                    
                    var goods_number = localStorage.getItem("cart"+goodsId[1]);
                    //第一次是null

                    console.log(goods_number);

                    //如果有  则是买过：让之前数量+1 如果没买过就是第一次购买 ，那数量就是1
                    goods_number = goods_number ? parseInt(goods_number)+1 : 1;


                    //通过ajax存储ajax存储数据和链接跳转
                    //关于url要记得注意================================
                    $.ajax({
                        "url": "http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.token,//用户当前API接口
                        "type": "POST",
                        "data": {
                            "goods_id":goodsId[1],
                            "number":goods_number
                        },
                        "dataType": "json",
                        "success": function(){

                            //成功之后使用后存储商品的购买数量到本地存储中
                            localStorage.setItem("cart"+goodsId[1] , goods_number)//键值对

                            
                            
                            window.setTimeout("window.location='cart.html'",1000); 
                        }
                    })

                    })
                }    

                })
    

                

        }
    })

})
//确认添加购物车弹窗事件


//在详情页面添加购物车事件

