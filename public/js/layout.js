/* eslint-disable no-unused-vars */
$(window).on('load', function () {
  typeLayout.init()
})

//타입별 레이아웃
var typeLayout = {
  val: {
    //gnbBrakePoint: 1040,						//레이아웃 타입별 PC에서 모바일 전환 하는 해상도
    typeKeyNav: '', //키보드이동 모바일 상태변수
    conts_loc: $(window).scrollTop() //scrolltop
  },
  init: function () {
    typeLayout.layoutSet()
    typeLayout.gnb.init();
  },
  //공통 셋팅
  layoutSet: function () {
    /*** GNB ***/
    if (typeof gnbDep1 != 'undefined') {
      /*gnb*/
      var gnbCrt1 = $('#gnb>li:nth-child(' + gnbDep1 + ')>a')
      var gnbCrt2 = $('#gnb>li:nth-child(' + gnbDep1 + ')>ul>li:nth-child(' + gnbDep2 + ')>a')
      var gnbCrt3 = $('#gnb>li:nth-child(' + gnbDep1 + ')>ul>li:nth-child(' + gnbDep2 + ')>ul>li:nth-child(' + gnbDep3 + ')>a')

      if (gnbCrt1) gnbCrt1.addClass('on').parent('li').addClass('act')
      if (gnbCrt2) gnbCrt2.addClass('on').parent('li').addClass('act')
      if (gnbCrt3) gnbCrt3.addClass('on')
    }

    //옵션확장
    $('.optionGroup .optionSlideBtn').on('click', function (e) {
      if (!$(this).parents('.optionGroup').hasClass('open')) {
        $(this).attr('aria-expanded', true).find('.base').html('닫기')
        $(this).parents('.optionGroup').addClass('open')
        $(this).parents('.optionGroup').find('.slideOption').slideDown(300)
      } else {
        $(this).attr('aria-expanded', false).find('.base').html('열기')
        $(this).parents('.optionGroup').removeClass('open')
        $(this).parents('.optionGroup').find('.slideOption').slideUp(300)
      }
    })

    //글자크기
    $('[data-id=fontSize]').on('click', function (e) {
      if ($(this).next('.sizeBox').is(':visible') == false) {
        $(this).addClass('open').attr('title', '글자크기 선택 박스 확장됨').next('.sizeBox').show()
      }
      ui.accessibility.focusloop('.sizeBox')
    })

    $('.sizeBox .btn_close').on('click', function (e) {
      if (!$(this).parent('.sizeBox').is(':visible') == false) {
        $('.sizeBox').hide()
        $('[data-id=fontSize]').removeClass('open').attr('title', '글자크기 선택 박스 축소됨')
      }
      ui.accessibility.focusloopClose()
    })

    $('.sizeBox .btn_plus').on('click', function (e) {
      var lv = $(this).parent('li').attr('class')
      sizeChoice(this, lv)
    })

    function sizeChoice(el, lv) {
      $('.sizeBox .btn_plus').removeClass('on')
      $('.sizeBox .btn_plus').attr('title', '')
      $(el).addClass('on')
      $(el).attr('title', '선택됨')

      if (lv == 'lv1') {
        $('body').css('zoom', '90%')
      } else if (lv == 'lv2') {
        $('body').css('zoom', '100%')
      } else if (lv == 'lv3') {
        $('body').css('zoom', '110%')
      } else if (lv == 'lv4') {
        $('body').css('zoom', '120%')
      } else if (lv == 'lv5') {
        $('body').css('zoom', '130%')
      }
    }

    $('#btn_top').click(function () {
      $('html, body').stop().animate(
        {
          scrollTop: 0
        },
        150
      )
    })

    $('.quickMenu ul li .setting').on('click', function () {
      $('.themeArea').fadeIn(300)
      ui.accessibility.focusloop('.themeArea')
    })
  
    $('.quickMenu .themeArea .themeClosed').on('click', function () {
      $('.themeArea').fadeOut(300)
      ui.accessibility.focusloopClose()
    })
  
    //테마설정 스크립트
    $('.themeBtn').on('click', function () {
      let theme = $(this).val()
      $('.themeBtn').removeClass('on')
      $(this).addClass('on')
      $('body').removeClass('purpleTheme greenTheme blueTheme orangeTheme').addClass(theme)
    })
  },
  //GNB 이벤트
  gnb: {
    init: function () {
      //GNB 탭이벤트
      $('#header nav .gnbTab .default.on').attr('title', '선택됨')

      $('#header nav .gnbTab .default').on('click', function (e) {
        var ShowMenu = $(this).attr('data-id')
        $('#header nav .gnbTab .default').removeClass('on').removeAttr('title')
        $(this).addClass('on').attr('title', '선택됨')

        $('.gnbMenu, .favoritesList').removeClass('on')
        $(`#${ShowMenu}`).addClass('on')

        if (window.innerWidth <= 1300) {
          $('body').addClass('gnb_on')
          ui.accessibility.focusloop('header>nav')
        }
      })

      $('#dim').on('click', function (e) {
        $('body').removeClass('gnb_on')
        ui.accessibility.focusloopClose()
      })

      // 1뎁스 클릭 이벤트
      $('#header nav .gnbMenu>li.child>a').click(function (event) {
        if ($(this).parent('li').hasClass('act')) {
          $(this).parent('li').removeClass('act')
          $(this).siblings('ul').slideUp(200)

          return false
        } else {
          $(this).parents('.gnbMenu').children('li').removeClass('act')
          $(this).parents('.gnbMenu').find('.menuM').slideUp(200)

          $(this).parent('li').addClass('act')
          $(this).siblings('ul').slideDown(200)
          return false
        }
      })

      //2뎁스 클릭 이벤트
      $('#header nav .menuM>li.child>a').click(function (event) {
        if ($(this).parent('li').hasClass('act')) {
          $(this).parent('li').removeClass('act')
          $(this).siblings('ul').slideUp(200)

          return false
        } else {
          $(this).parents('.gnbMenu').find('.menuM>li').removeClass('act')
          $(this).parents('.gnbMenu').find('.menuS').slideUp(200)

          $(this).parent('li').addClass('act')
          $(this).siblings('ul').slideDown(200)
          return false
        }
      })
    }
  }
}
