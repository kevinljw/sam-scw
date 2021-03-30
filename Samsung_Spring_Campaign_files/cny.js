var script = function () {

    var $body = $('html,body');
    var winH = $(window).height();
    var winW = $(window).outerWidth();
    // var docH  = $(document).height();
    var $win = $(window);
    var headerH = $('.myheader2').height();

    // console.log("headerH2:"+headerH+"headerH1:"+$('.myheader').height());

    var $sec = $('.sec');
    var hash = location.hash,
href;

    AOS.init({
        offset: 150,
        duration: 800,
        delay: 0,
        easing: 'ease-in-out-sine',
        anchorPlacement: 'top-bottom',
    });

    /* page scroll */
    var thispage = 0;
    var pageT = [],
        $sec = $('.sec'),
        $main = $('.wrapper'),
        // _mainTOP = $main.offset().top,
        ah = $main.outerHeight(true),
        pageName = ['kv', 'main', 'z-series', 's21', 'n20', 'tab-s7', 'video', 'moresp', 'buy'];

    var _thispagescroll = pageName.indexOf(hash);

    var go = 0;

    function swipergo2() {
        var _scroll = $win.scrollTop();
        var _sec8pos = $('.sec8').offset().top;

        // if (go == 0) {
        //     if (_scroll >= _sec8pos - 500) {
        //         $('.sec8 .title').addClass('go');
        //         $('.sec8 .title').css("display", "block");
        //         go++;
        //     }
        // }
    }

    $win.scroll(swipergo2);




    $('.btn_next').click(function () {

        $('.mainIframe').each(function () {
            this.contentWindow.postMessage('{"event": "command", "func": "stopVideo", "args": ""}', '*');
        });

    });


    $('.btn_prev').click(function () {
        $('.mainIframe').each(function () {
            this.contentWindow.postMessage('{"event": "command", "func": "stopVideo", "args": ""}', '*');
        });

    });


    $('.btnback').click(function () {
        $('html,body').animate({ scrollTop: 0 }, 333);
    });


    /* header fix ---------------------------------------------------*/

    var _sec2pos = $('.sec2').offset().top;

    function headerfix() {
        var _scroll = $win.scrollTop();
        // console.log(_scroll, _sec2pos)
        if (_scroll >= _sec2pos / 3) {
            $('.myheader2').fadeIn('fast');
        } else {
            $('.myheader2').fadeOut('fast');
        }
    }

    $win.scroll(headerfix);


    // 重設
    function navde() {

        $('.mainnav').find('li').removeClass('open');

        // $('.subnav').hide();

        $('.burger').attr('toggle', '0');
        $('.burger').removeClass('isclick');

        $('.mainnav').css('height', '');
        $('.myheader').css('height', '');

        TweenMax.to('.myheader', .1, { backgroundColor: '#cfa1e0', ease: Quart.easeOut });

        if (winW <= 768) {
            $('.mainnav').hide();
        } else {
            $('.mainnav').show();
        }
    }
    navde();

    // 主選單
    function navfunc() {
        var navopen = $('.burger').attr('toggle');
        if (navopen == 0) {
            TweenMax.to('.myheader', .1, { backgroundColor: '#cfa1e0', ease: Quart.easeOut });

            $('.mainnav').slideDown();

            $('.burger').attr('toggle', '1');
            $('.burger').addClass('isclick');

        } else if (navopen == 1) {

            $('.mainnav').css('height', '');
            $('.myheader').css('height', '11vw');
            TweenMax.to('.myheader', .5, { backgroundColor: '#cfa1e0', delay: 0, ease: Quart.easeOut });
            $('.mainnav').slideUp();

            $('.burger').attr('toggle', '0');
            $('.burger').removeClass('isclick');
        }
    }
    $('.burger').click(navfunc);


    /* nav scroll --------------------------------------------*/

    /* page scroll */
    var thispage = 0;
    var pageT = [],
        $sec = $('.sec'),
        $main = $('.wrapper'),
        ah = $main.outerHeight(true);


    var $navbtn = $('.navbtn');

    var pageReset = function () {
        pageT = [];
        winW = $win.outerWidth();
        ah = $main.outerHeight(true);
        $sec.each(
            function (i, obj) {
                var t = $(obj).offset().top;
                pageT.push(t);
                if (i == $sec.length - 1) { pageT.push(ah); }
            }
        );
    }

    var menuselect = function () {
        $navbtn.removeClass('select');
        pageReset();

        if (thispage >= 1 && thispage < 6) {
            $('.navbtn[data-page="' + 2 + '"]').addClass('select');
        }
        else {
            $('.navbtn[data-page="' + thispage + '"]').addClass('select');
        }
        // $(document).ready(function () {
        //     console.log($("li.select span").html())
        // });
    }

    var menuscroll = function (n) {
        var _pos;
        thispage = n;
        pageReset();
        $body.animate({
            scrollTop: pageT[thispage] - headerH - 50
        }, 600);

    }
    menuselect();

    var scrollPage = function (wt, whelf) {
        winH = $win.height();
        winW = $win.outerWidth();
        wt = $win.scrollTop();


        if (winW < 768) {
            whelf = winH / 6;
        }
        else {
            whelf = winH / 3;
        }
        // _mainTOP = $main.offset().top;

        //        console.log("width:"+winW+"H:"+winH+" "+whelf);

        for (var p = 0; p < $sec.length; p++) {
            if (wt > pageT[p] - whelf && wt < pageT[p + 1] - whelf) {
                thispage = p;
            }
        }

        menuselect();

        href = pageName[thispage];
        window.location.hash = href;
    }

    var scrollthispage = function () {
        _thispagescroll = pageName.indexOf(hash.substr(1));


        pageReset();

        var topH = $('.myheader2').height();

        if (_thispagescroll != -1) {
            thispage = pageName.indexOf(hash.substr(1));

            pageReset();

            if (thispage == 0) {
                TweenMax.to('body,html', .8, { scrollTop: 0, ease: Quart.easeOut });
            } else {
                TweenMax.to('body,html', .8, { scrollTop: pageT[thispage] - topH, ease: Quart.easeOut });

            }

            menuselect();
            href = pageName[thispage];
            window.location.hash = href;
            pagescroll = false;
        } else {

            TweenMax.to('body,html', .8, { scrollTop: 0, ease: Quart.easeOut });
        };

    }
    setTimeout(function () {
        scrollthispage()
    }, 600);

    $navbtn.click(
        function () {
            var n = $(this).data('page');
            navde();
            menuscroll(n);
        }
    );


    /* resize
    ------------------------------------------------------------*/

    var _resize = function () {

        winW = $win.outerWidth();
        winH = $win.height();
        docH = $(document).height();
        _scroll = $(window).scrollTop();
        scrollBottom = $(window).scrollTop() + $(window).height();
        headerH = $('.myheader2').height();

        navde();

    }
    $win.scroll(scrollPage);
    _resize();
    $win.resize(function () {

        // _resize();

    });





    var windowHeight = $(window).height();

    // Resize Event
    $(window).resize(function () {

        // Check window width has actually changed and it's not just iOS triggering a resize event on scroll
        if ($(window).width() != windowHeight) {

            // Update the window width for next time
            windowHeight = $(window).width();

            // Do stuff here
            _resize();
            // if (pagescroll || windowHeight > 768) scrollthispage();

        }

    });
}


$(function () {

    script();

    $('.gb-footer-2019__btn-top').click(function () {
        var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
        $body.animate({
            scrollTop: 0
        }, 600);
    })

});



$(document).ready(function () {
    $('#carouselControls').carousel({
        interval: 1000 * 1000
    });
});

$(document).ready(function () {
    $('#demo').carousel({
        interval: 1000 * 1000
    });
});