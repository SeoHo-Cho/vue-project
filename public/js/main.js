/* eslint-disable no-unused-vars */
// $(document).ready(function(){
//     var innerW = $(window).width();

//     if (innerW > 1280) {  // 다바이스 크기가 1280이상일때

//         $(".mView_list .btn_view a").click(function(){
//             if($(this).hasClass("on")){
//                 $(this).removeClass("on");
//                 $(this).parent().parent().find("ul").css("height","330px");
//             }else{
//                 $(this).addClass("on");
//                 $(this).parent().parent().find("ul").css("height","100%");
//             }
//             return false;
//         });

//     } else {

//         $(".mView_list .btn_view a").click(function(){
//             if($(this).hasClass("on")){
//                 $(this).removeClass("on");
//                 $(this).parent().parent().find("ul").css("height","270px");
//             }else{
//                 $(this).addClass("on");
//                 $(this).parent().parent().find("ul").css("height","100%");
//             }
//             return false;
//         });

//     }
// });

var ww

$(function () {
  main.init()

  gsap.registerPlugin(ScrollTrigger)

  gsap.from('.typeMain', {
    scrollTrigger: {
      trigger: '.firstAni',
      start: 'top bottom',
      once: true,
      end: 'bottom 0',
      toggleClass: 'ani'
    }
  })

  gsap.from('.typeMain', {
    scrollTrigger: {
      trigger: '.mQuick_wrap',
      start: 'top bottom',
      once: true,
      end: 'bottom 0',
      toggleClass: 'ani'
    }
  })

  gsap.from('.typeMain', {
    scrollTrigger: {
      trigger: '.mProcess',
      start: 'top bottom',
      once: true,
      end: 'bottom 0',
      toggleClass: 'ani'
    }
  })

  gsap.from('.typeMain', {
    scrollTrigger: {
      trigger: '.minH',
      start: 'top center',
      once: true,
      end: 'bottom 0',
      toggleClass: 'ani'
    }
  })

  gsap.from('.typeMain', {
    scrollTrigger: {
      trigger: '.mBanner',
      start: 'top center',
      once: true,
      end: 'bottom 0',
      toggleClass: 'ani'
    }
  })
})

var main = {
  init: function () {
    main.mQuick()
    main.mService()
    main.mScrollTab()
    main.mProcess()

    // $('.mSection').each(function(){
    //     $(this).removeClass('ani')
    // })
  },

  mQuick: function () {
    var mQuick = undefined

    ww = $(window).width()
    initTabSwiper()
    $(window).on('resize', function () {
      ww = $(window).width()
      initTabSwiper()
    })

    function initTabSwiper() {
      if ($(window).width() <= 583 && mQuick == undefined) {
        var swiperOption = {
          slidesPerView: 3,
          navigation: {
            nextEl: '.mQuick_wrap .swiper-button-next',
            prevEl: '.mQuick_wrap .swiper-button-prev'
          },
          freeMode: true
        }
        mQuick = new Swiper('.mQuick', swiperOption)
      } else if ($(window).width() >= 583 && mQuick != undefined) {
        mQuick.destroy()
        mQuick = undefined
      }
    }
  },

  mService: function () {
    var mService = undefined

    $(window).on('load resize', function () {
      ww = $(window).width()
      initTabSwiper()
    })

    function initTabSwiper() {
      if ($(window).width() <= 583 && mService == undefined) {
        var swiperOption = {
          slidesPerView: 'auto',
          freeMode: false
        }
        mService = new Swiper('.mService .swiper-container', swiperOption)
      } else if ($(window).width() >= 583 && mService != undefined) {
        mService.destroy()
        mService = undefined
      }
    }
  },

  mScrollTab: function () {
    var mScrollTab = undefined

    $(window).on('load resize', function () {
      ww = $(window).width()
      initTabSwiper()
    })

    function initTabSwiper() {
      if ($(window).width() <= 583 && mScrollTab == undefined) {
        var swiperOption = {
          slidesPerView: 'auto',
          freeMode: false
        }
        mScrollTab = new Swiper('.mBoard_tab', swiperOption)
      } else if ($(window).width() >= 583 && mScrollTab != undefined) {
        mScrollTab.destroy()
        mScrollTab = undefined
      }
    }
  },

  mProcess: function () {
    var mProcess = undefined

    ww = $(window).width()
    initTabSwiper()

    $(window).on('resize', function () {
      ww = $(window).width()
      initTabSwiper()
    })

    function initTabSwiper() {
      if ($(window).width() <= 583 && mProcess == undefined) {
        var swiperOption = {
          slidesPerView: 'auto',
          freeMode: false
        }
        mProcess = new Swiper('.mProcess .in', swiperOption)
      } else if ($(window).width() >= 583 && mProcess != undefined) {
        mProcess.destroy()
        mProcess = undefined
      }
    }
  }
}
