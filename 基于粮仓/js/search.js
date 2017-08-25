
$(function(){
//通过ajax获取数据，进行dom操作

//先获取当前url地址=后面的id，它是get方法后面拼接的参数

var str = location.href;

var search =decodeURI(str.split("=")[1]);
//这里之所以不成功的原因：search没有转码，现在已经OK

console.log(search);
// console.log(1);
$.ajax({
    "url": "http://h6.duchengjiu.top/shop/api_goods.php",
    "type": "GET",
    "data": {
        "search_text": search
    },
    "dataType": "json",
    "success": function(data){
        console.log(data);
        //成功之后进行dom操作
       
            for( var i = 0 ; i < data.data.length ; i++){

                var html = `<li>
                                <a href="detail.html?goods_id=${ data.data[i].goods_id }">
                                    <div class="bottom-img"><img src="${ data.data[i].goods_thumb }" alt=""></div>
                                    <div class="middle-grey"></div>
                                    <div class="top-text">
                                        <p class="bg01">${ data.data[i].goods_name }</p>
                                        <p class="bg02">${ data.data[i].goods_desc }</p>
                                        <p class="bg03">${ data.data[i].price }</p>
                                    </div>
                                </a>
                            </li>`;
                $("#search-list ul").html($("#search-list ul").html()+html);

            }
        
    }
});

})