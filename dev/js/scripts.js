var app = app || {};

var spBreak = 767;
var offsetY = window.pageYOffset;

app.init = function () {

  app.tabletViewport();
  app.fixedHeader();
  app.toggleNavi();

  app.initBackToTop();
  app.initTabs();
  app.initModal();
  app.initAccordion();
  app.initEquallyHigh();
  app.initSlick();

};

app.isMobile = function () {

  return window.matchMedia('(max-width: ' + spBreak + 'px)').matches;

};

/** Function Block Body
 */
app.stickBody = function () {
  $('body').css({
    'position':   'fixed',
    'top':        -offsetY + 'px',
    'width':      '100%'
  });
};

/** Function unBlock Body
 */
app.unStickBody = function () {
  $('body').css({
    'position':   'static',
    'top':        'auto',
    'width':      'auto'
  });
  $(window).scrollTop(offsetY);
};

/** Function Viewport
 */
app.tabletViewport = function () {

  var viewport = document.getElementById('viewport');

  var viewportSet = function () {
    if (screen.width >= 768 && screen.width <= 1024) {
      viewport.setAttribute('content', 'width=1300, user-scalable=0');
    } else {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=0');
    }
  };

  viewportSet();

  window.onload = function () {
    viewportSet();
  };

  window.onresize = function () {
    viewportSet();
  };

};

/** Function Back To Top
 */
app.initBackToTop = function () {

  var btnBack = $('.js-backtotop');

  var funcInit = function () {

    btnBack.off('click.btnClick').on('click.btnClick', function (event) {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: 0
      }, 500);
    });

    funcFadeBtn();
    funcFixedBtn();

    $(window).on('load scroll resize', function () {
      funcFadeBtn();
      funcFixedBtn();
    });

  };

  var funcFadeBtn = function () {
    if ($(window).scrollTop() > $(window).height() * 0.2) {
      if (!btnBack.is(':visible')) {
        btnBack.css('opacity', 0).show();
        btnBack.animate({
          opacity: 1
        }, 400);
      }
    } else {
      if (btnBack.is(':visible') && !btnBack.is(':animated')) {
        btnBack.animate({
          opacity: 0
        }, 400, function () {
          btnBack.css('opacity', 1).hide();
        });
      }
    }
  };

  var funcFixedBtn = function () {
    if (!app.isMobile()) {
      var gutter          = 20;
      var footer          = $('footer');
      var footerLine      = $('html').height() - footer.outerHeight() - gutter;
      var winBottomLine   = $(window).scrollTop() + $(window).height();
      var distance        = winBottomLine - footerLine;
      if (distance > gutter) {
        btnBack.css('bottom', distance + 'px');
      } else {
        btnBack.css('bottom', gutter + 'px');
      }
    }
  };

  if(btnBack.length) {
    funcInit();
  }

};

/** Function Scroll Page
 */
app.smoothScrollPage = function () {

  var smooth = $('.smooth');

  var funcInit = function () {

    if(smooth.length) {
      funcSmoothInPage();
    }

    funcSmoothOnLoadPage();
    $(window).on('load', function () {
      funcSmoothOnLoadPage();
    });

  };

  /* scroll on Page */
  var funcSmoothInPage = function () {

    smooth.off('click.btn').on('click.btn', function (event) {

      event.preventDefault();

      var targetHref    = $(this).attr('href');
      var targetArr     = targetHref.split('/');
      var targetID      = targetArr.length - 1;

      if($(targetArr[targetID]).length) {
        var gutter = $('header').outerHeight();
        var val = $(targetArr[targetID]).offset().top - gutter;
        $('html, body').animate({
          scrollTop: val
        }, 500);
      }

    });

  };

  /* scroll on load Page */
  var funcSmoothOnLoadPage = function () {
    var hash = location.hash;
    if (hash) {
      scroll(0, 0);
      setTimeout(function (){
        var target = $(hash).offset();
        var gutter = $('header').outerHeight() + 10;
        $('html, body').animate({
          scrollTop: target.top - gutter
        }, 300);
      }, 500);
    }
  };

  funcInit();

};

/** Function Fixed Header
 */
app.fixedHeader = function () {

  var headerFixed = $('.header-fixed');

  var funcInit = function () {

    if (!app.isMobile() && headerFixed.length) {
      element = $('header');
      funcToogleHeaderLeft();
      $(window).on('load scroll resize', function () {
        funcToogleHeaderLeft();
      });
    }

  };

  var funcToogleHeaderLeft = function () {

    var winLeft = $(window).scrollLeft();

    if (winLeft > 0) {
      element.css('left', -winLeft + 'px');
    } else {
      element.css('left', 0);
    }

  };

  if(headerFixed.length) {
    funcInit();
  }

};

/** Function Navi Menu
 */
app.toggleNavi = function () {

  var navDropdown   = $('.nav-item.dropdown');
  var navBtn        = $('.navbar-toggler');
  var navCollapse   = $('.navbar-collapse');
  var navOver       = $('.navbar-over');

  var funcInit = function () {

    if(navDropdown.length) {
      funcDropdownNav();
    }

    if(navBtn.length) {
      funcClickHamburger();
    }

    funcClickArea();
    funcClose();

  };

  var funcDropdownNav = function () {

    navDropdown
      .mouseenter( function (){
        $(this)
          .find('.nav-dropdown')
          .stop()
          .slideDown(300);
      });

    navDropdown
      .mouseleave( function () {
        $(this)
          .find('.nav-dropdown')
          .stop()
          .slideUp(300);
        setTimeout(function (){
          $(this)
            .find('.nav-dropdown')
            .removeAttr('style');
        }, 300);
      });

    navDropdown
      .off('click.btnClick')
      .on('click.btnClick', function () {
        $(this)
          .find('.nav-dropdown')
          .slideToggle(300);
      });

  };

  var funcClickHamburger = function () {

    navBtn
      .off('click.btn')
      .on('click.btn', function () {

        navCollapse.slideToggle();

        /* Add CSS - overflow: auto */
        if (navCollapse.hasClass('is-active')) {
          navCollapse.removeClass('is-active');
        } else {
          setTimeout(function () {
            navCollapse.addClass('is-active');
          }, 410);
        }

        $(this)
          .find('.toggler-btn')
          .toggleClass('is-active');
        $('body')
          .toggleClass('is-toggle-nav');

        /* Fixed Body */
        if ($('body.is-toggle-nav').length) {
          offsetY = window.pageYOffset;
          app.stickBody();
        } else {
          app.unStickBody();
        }

      });

  };

  var funcClose = function () {

    navOver.off('click.btn').on('click.btn', function () {
      navCollapse.slideUp();
      navCollapse.removeClass('is-active');
      $('.toggler-btn').removeClass('is-active');
      $('body').removeClass('is-toggle-nav');
      app.unStickBody();
    });

  };

  var funcClickArea = function () {
    $('body')
      .off('click.btn touchstart.btn')
      .on('click.btn touchstart.btn', function (event) {
        if(!$(event.target).parents('.nav-item.dropdown').length) {
          $('.nav-dropdown')
            .stop()
            .slideUp(300)
            .removeAttr('style');
        }
      });
  };

  funcInit();

};

/** Function Modal
 */
app.initModal = function () {

  var modal = $('.js-modal');

  var funcInit = function () {
    funcCreate();
    $(window).on('load', function () {
      funcCreate();
    });
  };

  var funcCreate = function () {
    modal.each( function (){
      var itemModal = $(this);
      itemModal
        .off('click.btn')
        .on('click.btn', function (event) {

          event.preventDefault();

          var target =  $(this).attr('data-modal');
          var html =    $('#' + target).html();

          var template =
            '<div id="modal" class="modal">' +
            '<div class="modal-content">' +
            '<p class="modal-close trans js-modal-close"></p>' +
            html +
            '</div>' +
            '<div class="modal-over"></div>' +
            '</div>';

          $('body').append(template);
          $('#modal').fadeIn(500);

          offsetY = window.pageYOffset;
          app.stickBody();

          $('.modal-close, .modal-over').append( function () {
            funcDelete();
          });

        });
    });

  };

  var funcDelete = function () {

    $('.js-modal-close, .modal-over').off('click.btn').on('click.btn', function () {
      $('#modal').fadeOut(500);
      setTimeout( function () {
        $('#modal').remove();
      }, 500);
      app.unStickBody();
    });

  };

  if (modal.length) {
    funcInit();
  }

};

/** Function Tabs
 */
app.initTabs = function () {

  var tabs = $('.js-tabs');

  var funcInit = function () {
    funcActive();
  };

  var funcActive = function () {

    tabs.find('.tabs-link li').each( function () {

      var itemTab = $(this);

      itemTab.off('click.btn').on('click.btn', function (e) {

        e.preventDefault();
        var tabId           = $(this).attr('data-tab');
        var tabsLink        = $(this).closest('.tabs-link');
        var tabsWrapper     = $(this).closest('.tabs-wrapper');

        tabsLink.find('li').removeClass('is-current');
        tabsWrapper.find('.tabs-body .tabs-content').removeClass('is-current');

        $(this).addClass('is-current');

        if(tabId) {
          var tabsContent = tabsWrapper.find('.tabs-body #' + tabId);
          if(tabsContent) {
            tabsContent.addClass('is-current');
          } else {
            return false;
          }
        } else {
          return false;
        }
      });

    });

  };

  if(tabs.length) {
    funcInit();
  }

};

/** Function Accordion
 */
app.initAccordion = function () {

  var accordion = $('.js-accordion');

  if (accordion.length) {

    accordion.each( function () {
      var itemAccordion = $(this);
      var toggle = itemAccordion.find('.is-toggle');
      if (toggle) {
        toggle.off('click.btn').on('click.btn', function () {
          $(this).parent().toggleClass('is-active');
          $(this).next().slideToggle();
        });
      } else {
        return false;
      }
    });

  }

};

/** Function Equally High
 */
app.initEquallyHigh = function () {

  var equally       = $('.equal-height');
  var maxHeight     = 0;
  var height        = 0;

  var funInit = function () {
    funcSetHeight();
    $(window).on('load resize', function () {
      funcSetHeight();
    });
  };

  var funcSetHeight = function () {
    equally.each(function () {
      height = $(this).outerHeight();
      if(height > maxHeight) {
        maxHeight = height;
      }
    });
    equally.css('height', maxHeight);
  };

  if(equally.length) {
    funInit();
  }

};

/** Function Slick
 */
app.initSlick = function () {

  var slick = $('.js-slick');
  if(slick.length) {
    slick
      .slick({
        infinite:         false,
        slidesToShow:     1,
        slidesToScroll:   1,
        autoplay:         false,
        speed:            1000,
        autoplaySpeed:    2000,
        arrows:           true,
        dots:             true
      });
  }

  var slickCounter = $('.js-slick-counter');
  if(slickCounter.length) {
    slickCounter
      .on('init', function (event, slick) {
        $(this)
          .append('<div class="slick-counter"><span class="current current01"></span> / <span class="total total01"></span></div>');
        $('.current01')
          .text(slick.currentSlide + 1);
        $('.total01')
          .text(slick.slideCount);
      })
      .slick({
        infinite: true,
        arrows: true,
        dots: false,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        speed: 1000
      })
      .on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        $('.current01').text(nextSlide + 1);
      });
  }


  var slick01 = $('.js-slick-01');
  if(slick01.length) {
    slick01
      .slick({
        infinite:         false,
        slidesToShow:     3,
        slidesToScroll:   1,
        autoplay:         false,
        speed:            1000,
        autoplaySpeed:    2000,
        arrows:           true,
        dots:             false
      });
  }

};

$(function () {

  app.init();

});
