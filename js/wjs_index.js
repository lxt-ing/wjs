$(function(){
    var items = $('.carousel-inner .item');
    var imgsrc;
    var width = $(window).width();
    // 调用bootstrap 的工具提示
    $("[data-toggle='tooltip']").tooltip();

    // 计算ul中li的总宽度
    var totalLi = 0;
    var wjs_proul = $('.wjs_product .nav-tabs');
    var lis = wjs_proul.find('li');
    lis.each(function(index,item){
        totalLi += $(this).outerWidth(true);
    });
    wjs_proul.width(totalLi);
    // 初始化iscroll 插件
    var myScroll = new IScroll('#wrapper',{
        scrollX:true,
        scrollY:false
    });

    $(window).on('resize',function(){
        width = $(window).width();
        console.log(width);
        if(width < 768){
            // 移动端
            items.each(function(){
                imgsrc =  $(this).data("smallImage");
                $(this).html("<a class='mobileImg' href='javascript:;'><image src='"+imgsrc+"'></a>");
                //  Dom 方式获取 data
                // console.log($(this)[0].dataset['largeImage']);
                //<a href='javascript:;'><image src='./images/slide_01_640x340.jpg'></a>
            });
        }else{
            items.each(function(){
                imgsrc = $(this).data("largeImage");
                $(this).html($("<a class='pcImg' href=''></a>").css("backgroundImage","url("+imgsrc+")"));
                //  Dom 方式获取 data
                // console.log($(this)[0].dataset['largeImage']);
                // <a href=''></a> background-image:url();
            });
        }
    }).trigger('resize');
    // 手动滑动
    var startx;
    $('#myCarousel').on('touchstart',function(e){
        startx = e.originalEvent.targetTouches[0].clientX;
    });
    $('#myCarousel').on('touchend',function(e){
        var endX = e.originalEvent.changedTouches[0].clientX;
        if(endX - startx < 0){
            // 向左滑动
            $('.carousel').carousel('next');
        }
        if(endX - startx > 0){
            // 向右滑动
            $('.carousel').carousel('prev');
        }
    });
});