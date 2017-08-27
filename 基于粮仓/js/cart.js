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
											
											
											


											//事件2：数量输入款和加号减号事件
											//减号按钮事件监听
											

											//加号按钮事件监听
											

                                            //文本框输入事件
											

											//键盘事件监听上、下两个按钮
											$(".center-text").keydown(function(){
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
        //showSum函数：计算购物车的总订单数量和总订单价格。
        function showSum(){
            

        }

        //事件2：被调用次数仅次于总计函数
        //为所有删除事件封装的更新数据函数
        function updataCartAjax(obj,num){

            
        }

        //事件3：全选事件：点击全选按钮，每个input type=“checkbox” 的check值变为ture
        //同时，调用showSum函数
        $("#Shop").click(function(event){
            //全局委托方法
            //全选
            //event.target:返回哪个 DOM 元素触发了事件：
                
                //除了全选的多选框事件
                
            
        })

        //事件4：选中元素删除商品信息
        //调用showSum函数
        $("#Delete").click(function(){
            
            
        })
											
        //事件5:所有商品数量改变事件：点击"+"、点击"、"文本框输入"
        //点击+和-，改变购物车商品数量的业务函数
        //调用showSum函数
        function updataCart(obj,num){  //obj当前触发事件的元素，num = +1 -1
            
        }



        //结尾事件:结算事件页面跳转
        $("#checkout").click(function(){
            
            var sum = $("#Money").text().substr(1);
        //console.log(sum);
            
            location.href = "checkout.html?sum=" + sum;
        })
        
})