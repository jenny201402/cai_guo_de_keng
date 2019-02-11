// var swiper = new Swiper('.swiper-container1', {
//     // pagination: '.swiper-pagination',
//     nextButton: '.banner .swiper-button-next',
//     prevButton: '.banner .swiper-button-prev',
//     slidesPerView: 3,
//     centeredSlides: true,
//     paginationClickable: true,
//     spaceBetween: 34,
//     loop:true,
// });

var swiper1 = new Swiper('.swiper-container1', {
    slidesPerView: 5,
    spaceBetween: 30,
    slidesPerGroup: 1,
    width: 975,
    height: 198,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    // autoplay: 3000,
    loop: true,
    loopFillGroupWithBlank: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});


var swiper2 = new Swiper('.banner_twos', {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    }
});

// var swiper2 = new Swiper('.banner_twos', {
//
//
//
//      pagination: '.swiper-pagination',
//     // nextButton: '.banner_twos .swiper-button-next',
//     // prevButton: '.banner_twos .swiper-button-prev',
//     paginationClickable: true,
//     spaceBetween: 30,
//     loop:true,
//     autoplay : 2000,
// });

function beginroll(one, two, three) {
    var speed = 40
    var demoScrollTop = $(one).scrollTop();
    var demo1OffsetHeight = $(two).height();
    var demohtml = $(two).html();
    $(three).html(demohtml);

    function Marquee() {
        if (demoScrollTop >= demo1OffsetHeight) {
            demoScrollTop = 0;
        } else {
            demoScrollTop = demoScrollTop + 1;
        }
        $(one).scrollTop(demoScrollTop);
    }

    var MyMar = setInterval(Marquee, speed);
    $(one).mouseover(function () {
        clearInterval(MyMar);
    })
    $(one).mouseout(function () {
        MyMar = setInterval(Marquee, speed);
    })
}

beginroll("#demo", "#demo1", "#demo2");
beginroll("#demo5", "#demo3", "#demo4");


$(".offer_list_title li").click(function () {
    $(this).addClass("actives").siblings().removeClass("actives");
    $(".list_ul > ul").eq($(this).index()).show().siblings().hide()
})

// $(".nav_list > li").eq(0).addClass("active").siblings().removeClass("active");
function qd_open(id) {
    var layer = layui.layer
    $.ajax({
        url: '/member/qiandao/' + id,
        method: 'POST',
        dataType: "json",
        success: function (res) {
            console.log(res);
                    if (res.valid === 1) {
                            $('.qd_box .qiandao_num').html(res.data.num);
                            $(".shade_box").show();
                            $(".qd_box").show();
                    } else {
                        layer.alert(res.message, {icon: 2, closeBtn: false}, function () {
                            layer.closeAll()
                            location.reload()
                        })
                    }
        }
    })

}
$(".qd_close").click(function () {
    $(".shade_box").hide();
    $(".qd_box").hide();
    location.reload();
})

// 注册登录
$(".reg_top").click(function () {
    $(".shade_box").show();
    $("img.captcha").trigger("click");
    $(".reg_box").show();
})
$(".login_top").click(function () {
    $(".shade_box").show();
    $("img.captcha").trigger("click");
    $(".log_box").show();
})
$(".close_btn").click(function () {
    $(".shade_box").hide();
    $(".reg_box").hide();
})
$(".close_btn_log").click(function () {
    $(".shade_box").hide();
    $(".log_box").hide();
})
$(".go_reg").click(function () {
    $(".shade_box").show();
    $(".reg_box").show();
    $("img.captcha").trigger("click");
    $(".log_box").hide();
})
$(".go_log").click(function () {
    $(".shade_box").show();
    $(".log_box").show();
    $("img.captcha").trigger("click");
    $(".reg_box").hide();
})
