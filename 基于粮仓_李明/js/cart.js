$(function(){

    //获取API接口:获取购物车数据即购物车列表
        var token_me = localStorage.getItem("token");
    $.ajax({
        //查询是否有一个用户(token)匹配当前的用户，即这个用户存不存在
        "url": "http://h6.duchengjiu.top/shop/api_cart.php",
        "type": "GET",
        "data":{
            "token":token_me
        },
        "dataType": "json",
        "success": function(data){
            console.log(data);//object
            console.log(data.data.length);
            //判断当前购物车里有没有商品
            console.log(data .data.length);
            
            //进行dom操作，获取cart.html中购物车列表，基本模板复制变量切换
            //先判断购物车里有没有东西
            if( data .data.length >0){

                for( var i = 0 ; i < data.data.length ; i++){
                    var html = `<ul>
                                    <li class="check-img">
                                        <input type="checkbox" class="checkbox">
                                        <input type="hidden" class="good_id" value="${data.data[i].goods_id}">
                                        <a href=""><img src=" ${data.data[i].goods_thumb}" alt=""></a>
                                    </li>
                                    <li class="good-message"><a href="">${data.data[i].goods_name}</a></li>
                                    <li class="good-up-down">
                                        <span class="goodDown">-</span>
                                        <input class="goodShumu" type="text"  value="${data.data[i].goods_number} ">
                                        <span class="goodUp">+</span>
                                    </li>
                                    <li class="one-price">${data.data[i].goods_price}</li>
                                    <li class="count-this">${ data.data[i].goods_price* data.data[i].goods_number }</li>
                                    <li class="del-this"><a href="">删除</a></li>
                                </ul>`;
                    $(".listItem").append(html);////这里要额外注意，不同的结构不同的模板拼接方式，就是append和
                    //html这两种方法的区别
                    //到底是加到哪个父元素，用append是累加(追加)，记录不会刷新;而html每一次都是刷新(完全替换)
                }
            }

            //事件1和事件2必须ajax调用数据生成文本节点之后发生
							//因为触发事件的元素是用过ajax数据成功返回之后才有的
											//事件一: 添加删除事件
                                            $(".del-this>a").click(function(){
                                            //要记得增加功能
                                            alert("确定");
                                                var del_Ul= this.parentNode.parentNode;
                                                updataCartAjax( del_Ul , 0)
                                                
                                                
                                                $(del_Ul).remove();
                                                showSum();

                                            })
											
											
											//事件2：数量输入款和加号减号事件
											//减号按钮事件监听
											$(".goodDown").click(function(){
                                                updataCart(this,"-1");
                                            })

											//加号按钮事件监听
											$(".goodUp").click(function(){
                                                updataCart(this,"+1");
                                            })

                                            //文本框输入事件
                                            $(".goodShumu").blur(function(){
                                                updataCart(this,"文本框输入");
                                            })
											
											//键盘事件监听上、下两个按钮
											$(".goodShumu").keydown(function(){
												stepSetGoods(this,event)

												//上、下按钮监听//这段函数放在里面和放在外面雾区别，因为被调用的次数少，先暂时放在里面
												function stepSetGoods(obj,event){
													var event = event || window.event;
													event.preventDefault();
													
													if(event.keyCode === 40){
														updataCart(obj,"-1");
													}else if( event.keyCode === 38){
														updataCart(obj,"+1");
													}
												}
											})
                            
        }
    })

    //以下为函数封装和除了由上一个ajax生成的元素节点触发的事件：在上一个ajax外部

        //事件1：被调用次数最多，所有能触发商品数量改变或者选择事件，都需要调用此函湖
        //showSum函数：计算购物车的总订单数量和总订单价格ul为单位(一个订单)。
        function showSum(){
            //得到动态类数组：每个新增的ul
            var ul_muit = $(".listItem>ul");

            var sum = 0; //金额累加
            var num = 0; //数目累加

            //循环每一个ul：订单
            for( var i = 0 ; i < ul_muit.length ; i++){

                var ul_muits = ul_muit[i];
                //判断ul里的复选框是否被选中,每一个ul的checkbox都需要判断
                if( $(ul_muits).children("li:first").children("input").is(":checked") ){

                    sum+=parseInt( $(ul_muits).children("li:eq(4)").text() );
                    num+=parseInt( $(ul_muits).children("li:eq(2)").children("input").val() );
                }
            }

            $("#Numbers").text(num);
            $("#Moneys").text(sum);


        }

        //事件2：被调用次数仅次于总计函数
        //为所有删除事件封装的更新数据函数
        function updataCartAjax(obj,num){
            //找到id，让其num=0：
            var good_Id = obj.getElementsByClassName("good_id")[0].value;
            console.log(good_Id);
            //更新数据
            $.ajax({
                "url": "http://h6.duchengjiu.top/shop/api_cart.php?token="+ localStorage.token,
                "type": "POST",
                "data": {
                    "goods_id": good_Id,
                    "number": num
                },
                "dataType": "json",
                "success": function(data){
                    console.log(data);
                    console.log(good_Id);
                    console.log(number);
                    alert("text");
                },
                "error": function(data){
                                        console.log(data);
                    console.log(good_Id);
                    console.log(number);
                    alert("text");
                    alert("wrong");
                }

            })

        }

        //事件3：全选事件：点击全选按钮，每个input type=“checkbox” 的check值变为ture
        //同时，调用showSum函数
        $("#cartList").click(function(event){
            //全局委托方法
            //全选
            //event.target:返回哪个 DOM 元素触发了事件：
                if( event.target.id === "checkAll"){
                    //获取当前全选按钮 的状态并且存入变量
                    var Selected = event.target.checked;
                    
                    //通过类名得到商品多选的按钮

                    var checkboxs = document.getElementsByClassName("checkbox");
                    
                    //通过循环吧全选按钮的状态传递给每一个ul里的checkbox
                    console.log("事件3");

                    for( var i = 0 ;  i < checkboxs.length ; i++){
                        checkboxs[i].checked = Selected;
                        console.log( i);
                    }

                    //调用showSum函数
                    showSum();
                    console.log("事件3");
                    
                    return;
                }

                //除了全选的多选框事件:就是没法ul里的checkbox里自己的checked的状态
                
                if( event.target.type == "checkbox"){
                    showSum();
                    // console.log("事件3");
                }
                if( event.target.type ==="text"){
                    return
                }
                // console.lo`g("事件3");
        })

        //事件4：选中元素删除商品信息
        //调用showSum函数
        $(".remove-choose>span").click(function(){
            //找到每一个ul里的checkbox状态为checked的chekbox
            var inputs  = $(".listItem .check-img>input:checked");

            //通过循环把每一个符合的ul删除

            for( var i = 0  ; i < inputs.length ;i++){

                //删除的同时要跟新数据→获取goods-id
                var good_Id = document.getElementsByClassName("good_id")[0].value;

                var ul_muit = inputs[i].parentNode.parentNode;

                updataCartAjax(ul_muit,0);
            

                ul_muit.remove();
                console.log("cart"+good_Id);

                
                localStorage.removeItem("cart"+good_Id);
            }
            
            //调用showSum函数
            showSum();
            
            
        })
											
        //事件5:所有商品数量改变事件：点击"+"、点击"、"文本框输入"
        //点击+和-，改变购物车商品数量的业务函数
        //调用showSum函数
        function updataCart(obj,num){  //obj当前触发事件的元素，num = +1 -1
            //找对象
            var listItems = obj.parentNode.parentNode;//模板最外层
            var good_id = listItems.getElementsByClassName("good_id")[0].value;
            var goods_number = listItems.getElementsByClassName("goodShumu")[0]//文本框输入的value
            var goods_number_value = parseInt( goods_number.value);
            var goods_price = listItems.getElementsByClassName("one-price")[0];
            var goods_price_value = parseInt( goods_price.innerText);
            var good_ul_sum =listItems.getElementsByClassName("count-this")[0];
            
            var textnum = parseInt( $(obj).val() );//obj是文本框

            //判断范围
            //文本框输入的大小范围
            if( textnum < 1 || isNaN(textnum) ){
                $( obj ).val(1);//obj是文本框
            }
            if( textnum > 10){
                $(obj).val(10);
            }

            //加减号范围判断
            if ( num == "-1" && goods_number_value <= 1){
                return;
            }
            if( num == "+1" && goods_number_value >= 10 ){
                return;
            }

            //所有num的参数的可能情况
            if( num == "-1"){
                goods_number_value--;
            }else if( num == "+1"){
                goods_number_value++;
            }else if( num === "文本框输入"){
                goods_number_value= textnum;
            }else if( num > 0){
                goods_number_value=num;
            }else{
                goods_number_value = 0;
            }

            //把改变后的商品数量赋值给当前商品的值
            //当前商品的值                  信号量改变后的值
            goods_number.value = goods_number_value

            //算出ul_muit的金额合计
            var subtotal = goods_number_value * goods_price_value;
            good_ul_sum.innerText = subtotal;
            showSum();
        }



        //结尾事件:结算事件页面跳转
        $(".cart-payfor").click(function(){
            
            var sum = $("#Moneys").text();
        console.log(sum);
            
            location.href = "checkout.html?sum=" + sum;
        })

})