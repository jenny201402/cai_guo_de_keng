/**
 * Created by Administrator on 2017/5/18.
 */

$(function(){
    $('.news_login').click(function(){
        layer.open({
            type:2,
            title:false,
            skin:'demo-class',
            area:['700px', '400px'],
            fixed: false, //不固定
            maxmin: true,
            //content: 'index.php?r=user/login'
            content: '/user/login.html'
        })
    })



    $('#myCarousel').mouseover(function(){
        $('.glyphicon-chevron-left,.glyphicon-chevron-right').show();
    })
    $('#myCarousel').mouseout(function(){
        $('.glyphicon-chevron-left,.glyphicon-chevron-right').hide();
    })


    $('.zuixin').mouseover(function(){
        $(this).addClass('shequ_active');
        $('.remen,.jinghua').removeClass('shequ_active');
        var url=$(this).attr('url');
        var dz=$(this).attr('dz');
        getList(url,dz);
    })
    $('.remen').mouseover(function(){
        $(this).addClass('shequ_active');
        $('.zuixin,.jinghua').removeClass('shequ_active');
        var url=$(this).attr('url');
        var dz=$(this).attr('dz');
        getList(url,dz);
    })
    $('.jinghua').mouseover(function(){
        $(this).addClass('shequ_active');
        $('.zuixin,.remen').removeClass('shequ_active');
        var url=$(this).attr('url');
        var dz=$(this).attr('dz');
        getList(url,dz);
    })
    function getList(url,dz){
        $.post(url,function(data){
            data=JSON.parse(data);
            len=data.length;
            $('.zhuti_content1').remove();
            $('.zhuti_content2').remove();
            var str1="<div class='shequ_zhuti_content1 zhuti_content1'>";
            for(i=0;i<10;i++){
                if(i>=len){
                    break;
                }
                str1+="<a href='"+dz+"/thread-"+data[i].tid+"-1-1.html' target='_blank' class='shequ_zhuti_item'>"+data[i].subject+"</a>";
            }
            str1+="</div>";
            var str2="<div class='shequ_zhuti_content2 zhuti_content2'>";
            for(i=10;i<20;i++){
                if(i>=len){
                    break;
                }
                str2+="<a href='"+dz+"/thread-"+data[i].tid+"-1-1.html' target='_blank' class='shequ_zhuti_item'>"+data[i].subject+"</a>";
            }
            str2+="</div>";
            $('#shequ_zhuti').append(str1);
            $('#shequ_zhuti').append(str2);
        })

    }

    $('.ershou').mouseover(function(){
        $(this).addClass('shequ_active');
        $('.fangwu,.qiche,.xiaoe').removeClass('shequ_active');
        var url=$(this).attr('url');
        var dz=$(this).attr('dz');
        getBankuai(url,dz);
    })
    $('.fangwu').mouseover(function(){
        $(this).addClass('shequ_active');
        $('.ershou,.qiche,.xiaoe').removeClass('shequ_active');
        var url=$(this).attr('url');
        var dz=$(this).attr('dz');
        getBankuai(url,dz);
    })
    $('.qiche').mouseover(function(){
        $(this).addClass('shequ_active');
        $('.ershou,.fangwu,.xiaoe').removeClass('shequ_active');
        var url=$(this).attr('url');
        var dz=$(this).attr('dz');
        getBankuai(url,dz);
    })
    $('.xiaoe').mouseover(function(){
        $(this).addClass('shequ_active');
        $('.ershou,.fangwu,.qiche').removeClass('shequ_active');
        var url=$(this).attr('url');
        var dz=$(this).attr('dz');
        getBankuai(url,dz);
    })

    $('.coin_num').keyup(function(){
        var total = parseInt($('.coins_total').val());
        var num = $(this).val();
        var rate=$('.cash_rate').val();
        if ((total - num) < 0) {
            layer.msg('您提现的数量超过了新博币总数');
        } else {
            $('.coins_left').text(total - num);
            var RMB=rate*num;
            RMB=RMB.toFixed(1);
            $('.renminbi_num').text(RMB);
        }

    });

    function getBankuai(url,dz){
        $.post(url,function(data){
            data=JSON.parse(data);
            len=data.length;
            $('.bankuai_content1').remove();
            $('.bankuai_content2').remove();
            var str1="<div class='shequ_zhuti_content1 bankuai_content1'>";
            for(i=0;i<10;i++){
                if(i>=len){
                    break;
                }
                str1+="<a href='"+dz+"/thread-"+data[i].tid+"-1-1.html' target='_blank' class='shequ_zhuti_item'>"+data[i].subject+"</a>";
            }
            str1+="</div>";
            var str2="<div class='shequ_zhuti_content2 bankuai_content2'>";
            for(i=10;i<20;i++){
                if(i>=len){
                    break;
                }
                str2+="<a href='"+dz+"/thread-"+data[i].tid+"-1-1.html' target='_blank' class='shequ_zhuti_item'>"+data[i].subject+"</a>";
            }
            str2+="</div>";
            $('#shequ_bankuai').append(str1);
            $('#shequ_bankuai').append(str2);
        })

    }

    $('.get_tel_captcha').click(function(){
        var country=$('.country_code').val();
        var tel=$('.cash_tel').val();
        if(country==0){
            layer.msg('请选择国家');
        }else if(tel==0){
            layer.msg('请输入手机号');
        }else{
            if(country==86){
                isChina=true;
            }else{
                isChina=false;
            }
            result=checkTel(tel,isChina);
            if(!result){
                layer.msg('您输入的手机号码格式不正确');
            }else{
                url=$(this).attr('url');
                $.post(url,{country:country,tel:tel},function(data){
                    data = JSON.parse(data);
                    if (data.code == 1) {
                        layer.alert('验证码发送成功', {skin: 'layui-layer-molv'}, function () {
                            var str = "<span class='re_get_captcha'><b>60</b>秒后重新获取</span>";
                            $('.get_tel_captcha').remove();
                            $('.tel_captcha_tip').before(str);
                            timer = setInterval(delTime, 1000);
                            layer.closeAll();
                        });
                    } else {
                        layer.msg(data.msg);
                    }
                })
            }
        }
    })

    $('.jisuanqi').click(function(){
        url=$(this).attr('url');
        layer.open({
            title:'计算器',
            type: 2,
            area: ['578px', '480px'],
            fixed: false, //不固定
            maxmin: true,
            content: [url,'no']
        });

    })
})

function checkTel(tel,isChina){
    if(isChina){
        var reg=/^1[34578]\d{9}$/ig;
    }else{
        var reg=/^\d{5,13}$/ig;
    }
    return reg.test(tel);
}
function delTime(){
    var time=$('.re_get_captcha>b').text();
    time=parseInt(time);
    if(time<=1){
        $('.re_get_captcha').remove();
        //var str="<span class='get_tel_captcha' url='/index.php?r=index%2Fget-tel-captcha'>获取验证码</span>";
        var str="<span class='get_tel_captcha' url='/index/get-tel-captcha.html'>获取验证码</span>";
        $("body").on("click",".get_tel_captcha",function(){
            var country=$('.country_code').val();
            var tel=$('.cash_tel').val();
            if(country==0){
                layer.msg('请选择国家');
            }else if(tel==0){
                layer.msg('请输入手机号');
            }else{
                if(country==86){
                    isChina=true;
                }else{
                    isChina=false;
                }
                result=checkTel(tel,isChina);
                if(!result){
                    layer.msg('您输入的手机号码格式不正确');
                }else{
                    url=$(this).attr('url');
                    $.post(url,{country:country,tel:tel},function(data){
                        data = JSON.parse(data);
                        if (data.code == 1) {
                            layer.alert('验证码发送成功', {skin: 'layui-layer-molv'}, function () {
                                var str = "<span class='re_get_captcha'><b>60</b>秒后重新获取</span>";
                                $('.get_tel_captcha').remove();
                                $('.tel_captcha_tip').before(str);
                                timer = setInterval(delTime, 1000);
                                layer.closeAll();
                            });
                        } else {
                            layer.msg(data.msg);
                        }
                    })
                }
            }

        });
        $('.tel_captcha_tip').before(str);

        clearInterval(timer);
    }else{
        time=time-1;
        $('.re_get_captcha>b').text(time)
    }
}


