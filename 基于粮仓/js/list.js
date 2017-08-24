//使用ajax获取list.html的dom节点

$(function(){

    //ajax.获取数据，成功返回后回调函数进行dom操作

    //获取get传参的参数
    var str = location.search;
    console.log(str)//?cat_id=45
    var gooods_id = str.split("=")[1];
    console.log(gooods_id);//45

    $.ajax({
        "url": "http://h6.duchengjiu.top/shop/api_goods.php",
        "type": "GET",
        "data": {
            // 根据AIP商品文档需要传入商品id
            "cat_id": gooods_id

        },
        "dataType": "json",
        "success": function(data){
            console.log(data);
            //进行dom操作

            //循环获取对象data中的每一个data数据数组
            for( i = 0 ; i < data.data.length ; i++){
                // 这里虽然样式对了 但是dom操作有点问题：多了无用的a标签
                var html = `<li>
                                <a href="detail.html?goods_id=${data.data[i].goods_id}">
                                    <div class="bottom-img"><img src="${data.data[i].goods_thumb}" alt=""><div>
                                    <div class="middle-grey"></div>
                                    <div class="top-text">
                                        <p class="bg01">${data.data[i].goods_name}</p>
                                        <p class="bg02">${data.data[i].goods_desc}</p>
                                        <p class="bg03">${data.data[i].price}</p>
                                    <div>
                                </a>                      
                            </li> ` ;
                $("#list-box ul").html( $("#list-box ul").html()+html);
                //使用模板字符串时候需要用return 返回html;就是累加;

            }

        }
    })

})