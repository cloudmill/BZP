
// ready
'use strict';

$(document).ready(function () {

  var videoIn = $('.b-video');
  var genplanSub = $('.genplan-main__sub');
  var genplanV = $('.genplan-main__video');
  var genplanItem = $('.genplan-main__item');
  var screen_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

  function dynamicVideo() {
    videoIn.load();
    videoIn.on('loadstart', function (event) {
      $('body').addClass('loading');
    });
    videoIn.on('canplay', function (event) {
      $('body').removeClass('loading');
    });
    videoIn[0].play();
  }

  function hoverPopup(elem, sub, unique) {
    $(elem).mouseover(function (event) {
      var mess = undefined;
      var dataA = $(this).data('avail');
      var dataF = $(this).data('floor');
      var dataLink = $(this).data('link');
      var dataNum = $(this).data('num');

      var SVGwidth = $(window).width();
      var SVGheight = $(document).outerHeight();
      var position = $(this).position();
      var left = position.left;
      var top = position.top;
      var right = SVGwidth - left;
      var bottom = SVGheight - event.pageY;
      var rightPer = right * 100 / SVGwidth;

      if (typeof dataA !== typeof undefined && dataA !== false) {
        if (dataA != '0') {
          if (dataLink) {
            if (dataNum) {
              mess = "<div class='svg-popover__left'><b class='text--grey text--uppercase'>" + dataNum + "<br> свободен</b></div><div class='svg-popover__right'><a href='" + dataLink + "' class='text--white text--uppercase'><b>Подробнее...</b></a></div>";
            } else {
              mess = "<div class='svg-popover__left'><b class='text--grey text--uppercase'>" + dataF + "<br> этаж</b></div><div class='svg-popover__right'><a href='" + dataLink + "' class='text--white text--uppercase'>" + dataA + " офисов свободно</a></div>";
            }
          } else {
            mess = "<div class='svg-popover__left'><b class='text--grey text--uppercase'>" + dataF + "<br> этаж</b></div><div class='svg-popover__right'>" + dataA + " офисов свободно</div>";
          }
        } else {
          if (dataLink) {
            if (dataNum) {
              mess = "<div class='svg-popover__left'><b class='text--grey text--uppercase'>" + dataNum + "<br> занят</b></div><div class='svg-popover__right svg-popover__right--un'><a href='" + dataLink + "' class='text--white text--uppercase'><b>Подробнее...</b></a></div>";
            } else {
              mess = "<div class='svg-popover__left'><b class='text--grey text--uppercase'>" + dataF + "<br> этаж</b></div><div class='svg-popover__right svg-popover__right--un'><div>Нет свободных помещений<br><a href='" + dataLink + "' class='text--primary text--uppercase'>Подробнее...</a></div></div>";
            }
          } else {
            mess = "<div class='svg-popover__left'><b class='text--grey text--uppercase'>" + dataF + "<br> этаж</b></div><div class='svg-popover__right svg-popover__right--un'><div>Нет свободных помещений<br><a href='" + dataLink + "' class='text--primary text--uppercase'>Подробнее...</a></div></div>";
          }
        }
        if (sub == true) {
          $('.genplan-pop').addClass('active').css({
            'right': '30%', 'bottom': bottom + 'px'
          }).find('.genplan-pop__wrapper').html(mess);
        } else {
          $('.genplan-pop').addClass('active').css({
            'right': 'calc(' + rightPer + '% - 50px)', 'bottom': bottom + 20 + 'px'
          }).find('.genplan-pop__wrapper').html(mess);
        }
      }
    }).mouseout(function () {
      if (unique) {
        $('.genplan-pop__wrapper').html('');
      }
    });
  }
  hoverPopup('polygon', false, true);
  hoverPopup('path', false, true);

  function dynamicPlanIn(classId, videoIdMIn, imgId, videoIdMOut, svgId) {
    $('.' + classId).click(function () {

      $('.b-video .b-video__mp4').attr("src", videoIdMIn);
      $('.genplan-pop__formobile').removeClass('active');

      var dataB = $(this).parent().data('build');
      var dataSQ = $(this).parent().data('square');
      var dataOff = $(this).parent().data('offices');
      var dataSQs = $(this).parent().data('squares');
      var dataFl = $(this).parent().data('floor');
      var dataFr = $(this).parent().data('free');
      var dataBs = $(this).parent().data('busy');
      var dataIn = $(this).parent().data('info');
      var dataSvg = $(this).parent().data('svg');
      genplanSub.show().addClass(classId);
      genplanV.addClass('animated fadeIn');

      var svgImg = '<image x="0" y="0" width="1900" height="1080" preserveaspectratio="none" xlink:href="' + imgId + '"></image>' + svgId;

      dynamicVideo();

      videoIn.on("ended", function () {
        $('.genplan-build--js').html(dataB);
        $('.genplan-square--js').html(dataSQ);
        $('.genplan-offices--js').html(dataOff);
        $('.genplan-squares--js').html(dataSQs);
        $('.genplan-floor--js').html(dataFl);
        $('.genplan-free--js').html(dataFr);
        $('.genplan-busy--js').html(dataBs);
        $('.genplan-info--js').html(dataIn);
        $('.genplan-main__item svg').html(svgImg);
        genplanV.addClass('fadeOut');
        genplanItem.addClass('animated fadeIn');

        hoverPopup('polygon', true);

        setTimeout(function () {
          genplanV.removeClass('animated fadeIn fadeOut');
        }, 1000);
      });

      $('.' + classId + ' .genplan-back--js').click(function () {
        $('.b-video .b-video__mp4').attr("src", videoIdMOut);
        $('.genplan-pop').removeClass('active').find('.genplan-pop__wrapper').html('');

        $('.svg-popover').removeClass('active').find('.svg-popover__hide').html('');
        genplanItem.addClass('fadeOut');
        genplanV.addClass('animated fadeIn');

        dynamicVideo();

        videoIn.on("ended", function () {
          genplanV.addClass('fadeOut');
          genplanItem.removeClass('animated fadeIn fadeOut');
          setTimeout(function () {
            genplanV.removeClass('animated fadeIn fadeOut');
            $('.' + classId + ':not(.svg-popover__hide)').hide();
            genplanSub.removeClass(classId);
          }, 1000);
        });
        return false;
      });

      return false;
    });
  }

  $('.svg-main rect').each(function () {
    var paths = $(this);
    //data attributes
    var dataB = $(this).data('build');
    var dataT = $(this).data('type');
    var dataA = $(this).data('avail');
    var dataC = $(this).data('class');
    var dataR = $(this).data('reverse');
    var dataSQ = $(this).data('square');
    var dataOff = $(this).data('offices');
    var dataSQs = $(this).data('squares');
    var dataFl = $(this).data('floor');
    var dataFr = $(this).data('free');
    var dataBs = $(this).data('busy');
    var dataIn = $(this).data('info');
    var dataVin = $(this).data('vin');
    var dataVout = $(this).data('vout');
    var dataImg = $(this).data('vimg');
    var dataSvg = $(this).data('svg');

    //positions
    var SVGheight = undefined,
        top = undefined;
    if (screen_width <= 767) {
      SVGheight = $(document).outerHeight();
      top = $(this).position().top;
    } else {
      SVGheight = $('.svg-main').height();
      top = $(this).attr('y');
    }
    var SVGwidth = $('.svg-main').width();
    var left = $(this).position().left;
    var right = SVGwidth - left;
    var bottom = SVGheight - top;
    var topPer = top * 100 / SVGheight;
    var bottomPer = bottom * 100 / SVGheight;
    var rightPer = right * 100 / SVGwidth;
    var leftPer = left * 100 / SVGwidth;

    var mess = "<div class='svg-popover__inner'>Лит <b>" + dataB + "</b></div><div class='svg-popover__hide'></div><div class='genplan-pop__formobile'></div>";
    var mydiv = $('<div/>', {
      'class': 'svg-popover',
      html: mess,
      'data-type': dataT,
      'data-avail': dataA,
      'data-class': dataC,
      'data-build': dataB,
      'data-square': dataSQ,
      'data-offices': dataOff,
      'data-squares': dataSQs,
      'data-floor': dataFl,
      'data-free': dataFr,
      'data-busy': dataBs,
      'data-info': dataIn,
      'data-vin': dataVin,
      'data-vout': dataVout,
      'data-vimg': dataImg,
      'data-svg': dataSvg
    });
    if (dataR) {
      if (screen_width <= 767) {
        mydiv.css({ 'left': leftPer + 1 + '%', 'bottom': bottomPer + 5 + '%' }).addClass('svg-popover--reverse');
      } else if (screen_width > 767 && screen_width <= 900) {
        mydiv.css({ 'left': leftPer + 1 + '%', 'bottom': bottomPer + 7 + '%' }).addClass('svg-popover--reverse');
      } else if (screen_width > 900 && screen_width <= 1000) {
        mydiv.css({ 'left': leftPer + 1 + '%', 'bottom': bottomPer + 7 + '%' }).addClass('svg-popover--reverse');
      } else if (screen_width > 1000 && screen_width <= 1100) {
        mydiv.css({ 'left': leftPer + 1 + '%', 'bottom': bottomPer + 15 + '%' }).addClass('svg-popover--reverse');
      } else if (screen_width > 1100 && screen_width <= 1200) {
        mydiv.css({ 'left': leftPer + 1 + '%', 'bottom': bottomPer + 7 + '%' }).addClass('svg-popover--reverse');
      } else if (screen_width > 1200 && screen_width <= 1300) {
        mydiv.css({ 'left': leftPer + 1 + '%', 'bottom': bottomPer + 7 + '%' }).addClass('svg-popover--reverse');
      } else if (screen_width > 1300 && screen_width <= 1400) {
        mydiv.css({ 'left': leftPer + 1 + '%', 'bottom': bottomPer + 7 + '%' }).addClass('svg-popover--reverse');
      } else if (screen_width > 1400 && screen_width <= 1500) {
        mydiv.css({ 'left': leftPer + 1 + '%', 'bottom': bottomPer + 4 + '%' }).addClass('svg-popover--reverse');
      } else if (screen_width > 1500 && screen_width <= 1600) {
        mydiv.css({ 'left': leftPer + 1 + '%', 'bottom': bottomPer + 3 + '%' }).addClass('svg-popover--reverse');
      } else if (screen_width > 2100 && screen_width <= 2300) {
        mydiv.css({ 'left': leftPer + 1 + '%', 'bottom': bottomPer - 4 + '%' }).addClass('svg-popover--reverse');
      } else if (screen_width > 2300 && screen_width <= 2500) {
        console.log(screen_width);
        mydiv.css({ 'left': leftPer + 1 + '%', 'bottom': bottomPer - 8 + '%' }).addClass('svg-popover--reverse');
      } else if (screen_width > 2500 && screen_width <= 2700) {
        mydiv.css({ 'left': leftPer + 1 + '%', 'bottom': bottomPer - 10 + '%' }).addClass('svg-popover--reverse');
      } else if (screen_width > 2700 && screen_width <= 3000) {
        mydiv.css({ 'left': leftPer + 1 + '%', 'bottom': bottomPer - 12 + '%' }).addClass('svg-popover--reverse');
      } else if (screen_width > 3000) {
        mydiv.css({ 'left': leftPer + 1 + '%', 'bottom': bottomPer - 14 + '%' }).addClass('svg-popover--reverse');
      } else {
        mydiv.css({ 'left': leftPer + 1 + '%', 'bottom': bottomPer - 4 + '%' }).addClass('svg-popover--reverse');
      }
    } else {
      if (screen_width <= 767) {
        mydiv.css({ 'right': rightPer - 4 + '%', 'bottom': bottomPer + 2 + '%' });
      } else if (screen_width > 767 && screen_width <= 900) {
        mydiv.css({ 'left': leftPer + 1 + '%', 'bottom': bottomPer + 9 + '%' }).addClass('svg-popover--reverse');
      } else if (screen_width > 900 && screen_width <= 1000) {
        mydiv.css({ 'left': leftPer + 1 + '%', 'bottom': bottomPer + 9 + '%' }).addClass('svg-popover--reverse');
      } else if (screen_width > 1000 && screen_width <= 1100) {
        mydiv.css({ 'left': leftPer + 1 + '%', 'bottom': bottomPer + 12 + '%' }).addClass('svg-popover--reverse');
      } else if (screen_width > 1100 && screen_width <= 1200) {
        mydiv.css({ 'left': leftPer + 1 + '%', 'bottom': bottomPer + 12 + '%' }).addClass('svg-popover--reverse');
      } else if (screen_width > 1200 && screen_width <= 1300) {
        mydiv.css({ 'left': leftPer + 1 + '%', 'bottom': bottomPer + 9 + '%' }).addClass('svg-popover--reverse');
      } else if (screen_width > 1300 && screen_width <= 1400) {
        mydiv.css({ 'left': leftPer + 1 + '%', 'bottom': bottomPer + 6.5 + '%' }).addClass('svg-popover--reverse');
      } else if (screen_width > 1400 && screen_width <= 1500) {
        mydiv.css({ 'left': leftPer + 1 + '%', 'bottom': bottomPer + 4 + '%' }).addClass('svg-popover--reverse');
      } else if (screen_width > 1500 && screen_width <= 1600) {
        mydiv.css({ 'left': leftPer + 1 + '%', 'bottom': bottomPer + 3 + '%' }).addClass('svg-popover--reverse');
      } else if (screen_width > 2100 && screen_width <= 2300) {
        mydiv.css({ 'left': leftPer + 1 + '%', 'bottom': bottomPer - 6 + '%' }).addClass('svg-popover--reverse');
      } else if (screen_width > 2300 && screen_width <= 2500) {
        mydiv.css({ 'left': leftPer + 1 + '%', 'bottom': bottomPer - 10 + '%' }).addClass('svg-popover--reverse');
      } else if (screen_width > 2500 && screen_width <= 2700) {
        mydiv.css({ 'left': leftPer + 1 + '%', 'bottom': bottomPer - 12 + '%' }).addClass('svg-popover--reverse');
      } else if (screen_width > 2700 && screen_width <= 3000) {
        mydiv.css({ 'left': leftPer + 1 + '%', 'bottom': bottomPer - 14 + '%' }).addClass('svg-popover--reverse');
      } else if (screen_width > 3000) {
        mydiv.css({ 'left': leftPer + 1 + '%', 'bottom': bottomPer - 18 + '%' }).addClass('svg-popover--reverse');
      } else {
        mydiv.css({ 'right': rightPer - 4 + '%', 'bottom': bottomPer - 4 + '%' });
      }
    }
    if (dataB) {
      $('.popovers--js').append(mydiv);
    }
  });

  $('.svg-popover__inner').mouseover(function () {
    $('.genplan-pop__formobile').removeClass('active');
    $('.svg-popover__inner').removeClass('active');
    $('.svg-popover').removeClass('active').find('.svg-popover__hide').html('');
    $(this).addClass('active');
    var dataB = $(this).parent().data('build');
    var dataT = $(this).parent().data('type');
    var dataA = $(this).parent().data('avail');
    var dataC = $(this).parent().data('class');
    var dataFl = $(this).parent().data('floor');
    var dataVin = $(this).parent().data('vin');
    var dataVout = $(this).parent().data('vout');
    var dataImg = $(this).parent().data('vimg');
    var dataSvg = $(this).parent().data('svg');
    var mess = undefined;
    if (dataA != '0') {
      mess = "<div class='svg-popover__left'><b class='text--grey'>Литер " + dataB + "</b><br>" + dataT + "</div><div class='svg-popover__right'>" + dataA + " офисов свободно</div>";
      if (screen_width <= 767) {
        $(this).parent().addClass('active').find('.genplan-pop__formobile').addClass('active ' + dataC).html(mess);
      } else {
        $(this).parent().addClass('active').find('.svg-popover__hide').addClass(dataC).html(mess);
      }
    } else {
      mess = "<div class='svg-popover__left'><b class='text--grey'>Литер " + dataB + "</b><br>" + dataT + "</div><div class='svg-popover__right svg-popover__right--un'><div>Нет свободных помещений <br><span class='text--primary text--uppercase'>Подробнее...</span></div></div>";
      if (screen_width <= 767) {
        $(this).parent().addClass('active').find('.genplan-pop__formobile').addClass('active --un ' + dataC).html(mess);
      } else {
        $(this).parent().addClass('active').find('.svg-popover__hide').addClass('--un ' + dataC).html(mess);
      }
    }
    dynamicPlanIn(dataC, dataVin, dataImg, dataVout, dataSvg);
  }).mouseout(function () {
    // $('.genplan-pop').removeClass('active').html('');
  });
  $('.svg-main').mouseover(function () {
    $('.genplan-pop__formobile').removeClass('active');
    $('.svg-popover__inner').removeClass('active');
    $('.svg-popover').removeClass('active').find('.svg-popover__hide').html('');
  });
  $('.sub-svg image').mouseover(function () {
    $('.genplan-pop').removeClass('active').find('.genplan-pop__wrapper').html('');
  });
});
//# sourceMappingURL=genplan.js.map
//# sourceMappingURL=genplan.js.map

'use strict';

function addPopup(el) {
    el.magnificPopup({
        type: 'inline',
        fixedContentPos: false,
        fixedBgPos: true,
        overflowY: 'auto',
        closeMarkup: '<a class="popup-close popup-modal-dismiss" href="#"><i class="is-icons is-icons--close-lg"></i></a>',
        closeBtnInside: false,
        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-zoom-in',
        callbacks: {
            beforeOpen: function beforeOpen() {
                $('body').addClass('mfp-helper');
            },
            close: function close() {
                $('body').removeClass('mfp-helper');
            }
        }
    });
}

// ready
$(document).ready(function () {

    //aside scroll
    var sidebar = $('.aside-menu');
    if (sidebar.length) {
        var sidebartop = sidebar.offset().top;
        $(window).scroll(function () {
            if ($(window).scrollTop() > sidebartop) {
                sidebar.css({ position: 'fixed', top: '10px', width: '31%' });
            } else {
                sidebar.css({ position: 'static', width: '100%', top: 0 });
            }
        });
    }
    //aside scroll

    // slider {slick-carousel}
    var $slider = $(".slideshow");
    $slider.on('init', function () {
        mouseWheel($slider);
    }).slick({
        dots: true,
        vertical: true,
        arrows: false,
        draggable: true
    });
    function mouseWheel($slider) {
        $(window).on('wheel', { $slider: $slider }, mouseWheelHandler);
    }
    function mouseWheelHandler(event) {
        event.preventDefault();
        var $slider = event.data.$slider;
        var delta = event.originalEvent.deltaY;
        if (delta > 0) {
            $slider.slick('slickPrev');
        } else {
            $slider.slick('slickNext');
        }
    }
    $slider.slickAnimation();
    $('.slider-for').slick({
        mobileFirst: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: false,
        responsive: [{
            breakpoint: 768,
            settings: {
                dots: false,
                asNavFor: '.slider-nav',
                arrows: true,
                appendArrows: ".slider-arrow",
                nextArrow: '<div class="slider-arrow-left slick-arrow"><i class="is-icons is-icons--next-arr"></i></div>',
                prevArrow: '<div class="slider-arrow-right slick-arrow"><i class="is-icons is-icons--prev-arr"></i></div>'
            }
        }]
    });
    $('.slider-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        dots: false,
        focusOnSelect: true
    });
    $('.slider-plan').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: true,
        appendArrows: ".slider-arrow",
        nextArrow: '<div class="slider-arrow-left slick-arrow"><i class="is-icons is-icons--next-arr"></i></div>',
        prevArrow: '<div class="slider-arrow-right slick-arrow"><i class="is-icons is-icons--prev-arr"></i></div>',
        responsive: [{
            breakpoint: 768,
            settings: {
                dots: true,
                arrows: false
            }
        }]
    });
    $('.mobile-slider').slick({
        mobileFirst: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: false,
        responsive: [{
            breakpoint: 768,
            settings: "unslick"
        }]
    });
    // slider

    //map
    $('.contacts-link--js').click(function () {
        $('.contacts-map').toggleClass('active');
        return false;
    });
    //map

    $('.table--mobile-anim td:first-child').click(function () {
        $(this).parent().toggleClass('opened').siblings().removeClass('opened');
    });

    $('.genplan-less--js').click(function () {
        $(this).closest('.genplan-main__infowindow').toggleClass('less');
        if ($(this).closest('.genplan-main__infowindow').hasClass('less')) {
            $(this).html('<span>развернуть</span><i class="is-icons is-icons--nextw-arr"></i>');
        } else {
            $(this).html('<i class="is-icons is-icons--prevw-arr"></i><span>свернуть</span>');
        }
    });

    // adaptive menu
    $('.main-nav__toggle--js').click(function () {
        $(this).next().toggleClass('collapse');
    });
    $('.main-nav__close--js i').click(function () {
        $(this).parent().parent().removeClass('collapse');
    });
    // adaptive menu

    //video
    var play = $('.playbutton');
    var video = $('video');
    play.click(function () {
        $(this).hide();
        video.prop("controls", true);
        video.get(0).play();
    });
    //video

    // popover
    $('.tooltip--js').mouseover(function () {
        var tooltip = $(this).data('tooltip');
        $(this).find('.tooltip').html(tooltip).addClass('active');
    }).mouseout(function () {
        $(this).find('.tooltip').removeClass('active');
    });
    $('.popover--js').click(function () {
        var popover = $(this).data('popover');
        var btn = $(this).data('btn');
        var href = $(this).data('href');
        if (btn) {
            var btnHtml = '<a class="btn btn--full btn--outlined popupka" href="' + href + '">' + btn + '</a>';
        }
        $(this).next().html('<div class="mb50">' + popover + '</div>' + btnHtml + '<div class="popover-close"><span class="is-icons is-icons--close"></span></div>').addClass('active');
        addPopup($('.popupka'));
        setTimeout(function () {
            $('.popover-close, body').on('click.off-popover', function () {
                $('.popover').removeClass('active');
                $('.popover-close, body').off('click.off-popover');
            });
        }, 100);
    });
    // popover

    //range slider
    var range = document.getElementById('range');
    var rangep = document.getElementById('rangep');
    var button1 = document.getElementById('reset--js');
    function updateSliderRange(min, max) {
        range.noUiSlider.updateOptions({
            start: [min, max]
        });
        rangep.noUiSlider.updateOptions({
            start: [min, max]
        });
    }
    if ($("#range").length) {
        noUiSlider.create(range, {
            start: [0, 600],
            connect: true,
            step: 100,
            decimals: 0,
            range: {
                'min': [0],
                'max': 3000
            },
            pips: {
                mode: 'values',
                values: [0, 3000],
                density: 4,
                format: wNumb({
                    decimals: 0,
                    thousand: '',
                    postfix: 'м2'
                })
            },
            format: wNumb({
                decimals: 0,
                thousand: '',
                postfix: 'м<sup>2</sup>'
            })
        });
        noUiSlider.create(rangep, {
            start: [0, 1400],
            connect: true,
            step: 100,
            decimals: 0,
            range: {
                'min': [0],
                'max': 3500
            },
            pips: {
                mode: 'values',
                values: [0, 3500],
                density: 4,
                format: wNumb({
                    decimals: 0,
                    thousand: '',
                    postfix: 'P'
                })
            },
            format: wNumb({
                decimals: 0,
                thousand: '',
                postfix: 'P/м<sup>2</sup>'
            })
        });
        var skipValues = [document.getElementById('skip-value-lower'), document.getElementById('skip-value-upper')];
        var skipValuesP = [document.getElementById('pskip-value-lower'), document.getElementById('pskip-value-upper')];
        range.noUiSlider.on('update', function (values, handle) {
            skipValues[handle].innerHTML = values[handle];
        });
        rangep.noUiSlider.on('update', function (values, handle) {
            skipValuesP[handle].innerHTML = values[handle];
        });
        button1.addEventListener('click', function () {
            updateSliderRange(0, 0);
        });
    }
    //range slider

    // .show--js
    $('.show--js').click(function () {
        $(this).hide();
        $(this).parent().next().slideDown();
        return false;
    });
    // .show--js

    // search
    $('.search-me--js').click(function () {
        $('.search-results').slideDown();
        return false;
    });
    // search

    // mask phone {maskedinput}
    $("[name=phone]").mask("+7 (999) 999-99-99");
    // mask phone

    // select {select2}
    // $('select').select2({
    //   minimumResultsForSearch: Infinity
    // });
    // select

    // popup {magnific-popup}
    $('.popup-in').magnificPopup({
        type: 'inline',
        fixedContentPos: false,
        fixedBgPos: true,
        overflowY: 'auto',
        showCloseBtn: false,
        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-zoom-in',
        callbacks: {
            beforeOpen: function beforeOpen() {
                $('body').addClass('mfp-helper');
            },
            close: function close() {
                $('body').removeClass('mfp-helper');
            }
        }
    });
    addPopup($('.popup'));
    $(document).on('click', '.popup-modal-dismiss', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
    });
    $('.popup-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        closeMarkup: '<a class="popup-close popup-modal-dismiss" href="#"><i class="is-icons is-icons--close-lg"></i></a>',
        mainClass: 'mfp-zoom-in',
        closeBtnInside: false,
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1],
            tCounter: ''
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            titleSrc: function titleSrc(item) {
                return item.el.attr('title');
            }
        },
        removalDelay: 300,
        callbacks: {
            open: function open() {
                $.magnificPopup.instance.next = function () {
                    var self = this;
                    self.wrap.removeClass('mfp-image-loaded');
                    setTimeout(function () {
                        $.magnificPopup.proto.next.call(self);
                    }, 120);
                };
                $.magnificPopup.instance.prev = function () {
                    var self = this;
                    self.wrap.removeClass('mfp-image-loaded');
                    setTimeout(function () {
                        $.magnificPopup.proto.prev.call(self);
                    }, 120);
                };
            },
            imageLoadComplete: function imageLoadComplete() {
                var self = this;
                setTimeout(function () {
                    self.wrap.addClass('mfp-image-loaded');
                }, 16);
            }
        }
    });
    // popup

    //table sorting
    var extractData = function extractData(node) {
        return $(node).text().replace(' ', '');
    };
    $(".table-sort").tablesorter({
        sortList: [[0, 0], [1, 0]],
        textExtraction: extractData
    });
    //table sorting
});
// ready

// mobile sctipts
var screen_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
if (screen_width <= 767) {}
// mobile sctipts

function initMap() {
    var mapOptions = {
        center: new google.maps.LatLng(59.91916157, 30.3251195),
        zoom: 16,
        mapTypeControl: false,
        zoomControl: false,
        scrollwheel: false
    };
    var mapElement = document.getElementById('map');
    var map = new google.maps.Map(mapElement, mapOptions);
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(59.91916157, 30.3251195),
        map: map,
        icon: "images/icons/bubble.svg"
    });
}
//# sourceMappingURL=main.js.map
