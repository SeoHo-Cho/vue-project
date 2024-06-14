/* eslint-disable no-unused-vars */
$(function(){
	ui.init();
})

var ui = {
	init : function() {
		ui.LayerPop.init();
		ui.Accordion.init();
		ui.tabScroll.init();
		ui.Tab.init();
		ui.accessibility.GNB();
		ui.contents();
		ui.touchDim();
		ui.help();
	},
	Accordion : {
		init : function(){
			$("body *").each(function(e){
				if($(this).hasClass("AccordionBase")){
					$(this).find("li").each(function(e){
						if($(this).hasClass("on")){
							$(this).find(".AccordionBtn").attr({"aria-expanded": true, "title":"확장됨"});
						}else{
							$(this).find(".AccordionBtn").attr("aria-expanded", false);
							$(this).find(".AccordionBtn").removeAttr("title");
						}
					});

					$(document).off("click").on('click', '.AccordionBase .AccordionBtn', function() {
						ui.Accordion.click(this);
						ui.touchDim();
					});	
				}
			});
		},
		click : function(target){
			if($(target).parents("li").hasClass("on")){
				$(target).parents("li").removeClass("on").find(".AccordionCont").slideUp(300);
				$(target).parents("li").find(".AccordionBtn").removeAttr("title").attr("aria-expanded", false);
			}else{
				$(target).parents("li").addClass("on").find(".AccordionCont").slideDown(300);
				$(target).parents("li").find(".AccordionBtn").attr({"aria-expanded": true, "title":"확장됨"});
			}
		},
	},
	LayerPop : {
		init : function(){
			$(".openLYpop").off("click").on("click",function(e){
				var popTarget = $(this).attr("data-LYID"),
				    popSize   = $(this).attr("data-LYsize");

				ui.LayerPop.Show(popTarget, popSize);
			});
		},
		iframe : function(iframeID, PopID, PopSize){
			if(event != undefined){
				$(event.currentTarget).attr("data-retrunFocus","Y");
			}
			$(iframeID).addClass("on");
			$(iframeID).on('load', function() {
				$(iframeID).contents().find(PopID).attr("data-iframeID", iframeID);
				$(iframeID)[0].contentWindow.ui.LayerPop.Show(PopID, PopSize);
				ui.lockBody.lock();
			});
			
		},
		Show : function(PopID, PopSize, open_callbackfcn, open_Pram, closed_callbackfcn, closed_Pram){
			//닫기 실행시 포커스 리턴값 셋팅
			
			if(event != undefined){
				$(event.currentTarget).attr("data-retrunFocus","Y");
			}

			//팝업실행
			$(PopID).find(".popLayout").css("width", PopSize + "px");
			$(PopID).addClass('on');
			// $(PopID).show();
			setTimeout(() => {
				$(PopID).find(".popLayout").css({"opacity" : "1", "top":"0"});
			}, 100);
			//ui.lockBody.lock();

			ui.touchDim();
			
			// ui.LayerPop.centerAlign(PopID);

			//팝업 높이 최대값 설정
			// ui.LayerPop.MaxHeight(PopID);

			//첫뻔재, 마지막 타겟 셋팅시 예외상태 추가
			var TargetState = "[data-hidden=hidden], [style*='display:none'], [style*='display: none'], [style*='display :none'], [style*='display : none']";

			//첫번째, 마지막 포커스 셋팅 전 css로 display:none 처리 되어있는 타겟 분리
			$(PopID).find("a, button, input, select").not(TargetState).each(function(e){
				if($(this).is(":visible") == false){
					$(this).attr("data-hidden","hidden");
				}
			});
			
			
			//팝업 내에 첫번째, 마지막 타겟 지정
			$(PopID).find("a, button, input, select").not(TargetState).first().attr("data-pop-focus","first");
			$(PopID).find("a, button, input, select").not(TargetState).last().attr("data-pop-focus","last");
			
			//팝업뒤 포커스 이동할 객제가 하나도 없을경우 브라우저 밖으로 포커스 이탈 방지를 위한 히든영역
			$(PopID).append("<div class='focuseouthidden' tabindex='0'></div>");

			//팝업내 버튼이 없을경우 팝업영역을 첫번째 포커스로 잡음
			if($(PopID).find("a, button, input, select").length == 1){
				$(PopID).find(".popLayout").attr({"tabindex" : "0", "data-pop-focus":"first"});	
			}

			$(PopID).find('[data-pop-focus=first]').focus();
			
			$("body *").not(PopID).not(PopID + " *").attr({
				"aria-hidden" : true,
				"data-hidden" : "hidden"
			});
			
			//html 깊이 구해서 aria-hidden 처리 삭제
			var targetHtml = $(PopID);
			var endClass = targetHtml.parent().prop('tagName');
			
			for(var i = 0; i<20; i++){
				if(endClass != "BODY"){
					targetHtml.removeAttr('data-hidden').removeAttr('aria-hidden');

					targetHtml = targetHtml.parent();
					endClass = targetHtml.parent().prop('tagName');
					
					//console.log(endClass)
					
					targetHtml.removeAttr('data-hidden').removeAttr('aria-hidden');
				}
				else {
					break
				}
			}

			//오픈 콜백
			if(open_callbackfcn != undefined){
				eval(open_callbackfcn)(open_Pram);
			}

			//팝업 닫기
			$(PopID).find('.btn_popClose').on("click",function(e){
				//ui.lockBody.unlock();
				ui.LayerPop.Closed(PopID, closed_callbackfcn, closed_Pram);
			});

			//접근성 : 첫번째탭에서 shift + tab 경우 마지막버튼으로 (팝업내 포커스 루프)
			$(PopID).find("[data-pop-focus=first]").on("keydown", function(e){
				if(e.shiftKey == true && e.which == 9){
					$(PopID).find("[data-pop-focus=last]").focus();
					return false;
				}
			});
			
			//접근성 : 마지막탭에서 tab 경우 첫번째 버튼 (팝업내 포커스 루프)
			$(PopID).find("[data-pop-focus=last]").on("keydown", function(e){
				if(e.shiftKey == false && e.which == 9){
					$(PopID).find("[data-pop-focus=first]").focus();
					return false;
				}
			});
		},
		Closed : function(PopID, closed_callbackfcn, closed_Pram){
			$(PopID).removeClass('on');
			$(PopID).find(".popLayout").removeAttr("style");
			$(PopID).find(".focuseouthidden").remove();
			$("[data-retrunFocus=Y]").focus();

			//아이프레임체크
			if ( self !== top ) {
				// 부모 창으로 메시지 전송
				window.parent.postMessage('unlockScroll', '*');

				$("[data-retrunFocus=Y]", parent.document).focus().removeAttr("data-retrunFocus");
				$($(PopID).attr("data-iframeid"), parent.document).removeClass("on").remove();
			}


			$("body *").removeAttr("data-retrunFocus");
			$("[data-hidden=hidden]").removeAttr("data-hidden").removeAttr("aria-hidden");

			$(".pop_wrap.addHtmlPop").remove();
			
			/* 닫기 콜백 */
			if(closed_callbackfcn != undefined){
				eval(closed_callbackfcn)(closed_Pram);
			}
		},
		MaxHeight : function(PopID){
			var bottomHeight = $(PopID).find(".popBtnArea").innerHeight();
			if(bottomHeight == undefined){bottomHeight = 0}
			//팝업 높이 최대값 설정
			$(PopID).find(".popInner").css({
				"max-height": $(window).height() * 0.9 - $(PopID).find(".popTit").innerHeight() - bottomHeight
			});
			//console.log(bottomHeight);
			//리사이즈 팝업 높이 최대값 설정
			$(window).bind('resize load', function () {
				$(PopID).find(".popInner").css({
					"max-height": $(window).height() * 0.9 - $(PopID).find(".popTit").innerHeight() - bottomHeight
				});
			});
		},
		centerAlign : function(PopID){
			//팝업 센터정렬(transform 정렬할경우 흐릿하게 나오는 케이스 발생)
			setTimeout(function(){
				$(PopID).find(".popLayout").css({
					"left" : "calc(50% - " + $(PopID).find(".popLayout").innerWidth() / 2 +"px)",
					"top"  : "calc(50% - " + $(PopID).find(".popLayout").innerHeight() / 2 +"px)",
					"opacity" : "1"
				});
			},100)
		
			//리사이즈
			$(window).bind('resize load', function () {
				$(PopID).find(".popLayout").css({
					"left" : "calc(50% - " + $(PopID).find(".popLayout").innerWidth() / 2 +"px)",
					"top"  : "calc(50% - " + $(PopID).find(".popLayout").innerHeight() / 2 +"px)"
				})
			});
		},
		draw : function(conthtml, title, size){
			var popID = "popupDraw" + Math.round( Math.random()*100 );
			var PopHtml = "";
			PopHtml += '<div class="pop_wrap addHtmlPop" id="'+popID+'">';
			PopHtml += '	<section class="popLayout popLayer">';
			PopHtml += '		<h1 class="popTit">'+title+'</h1>';
			PopHtml += '		<div class="popConts">';
			PopHtml += '			<div class="popInner limit">';
			PopHtml += $(conthtml).html();
			PopHtml += '			</div>';
			PopHtml += '		</div>';
			PopHtml += '		<button type="button" class="btn_popClose"><span class="hidden">창닫기</span></button>';
			PopHtml += '	</section>';
			PopHtml += '</div>';

			$("body").append(PopHtml);
			ui.LayerPop.Show('#'+popID, size);
		}
	},
	Tab : {
		init : function() {
			$("body *").each(function(e){
				if($(this).attr("role") == "tabEl"){
					$(this).find("li").each(function(e){
						if($(this).is(":visible") == true){
							$(this).attr("role", "presentation");	
							if($(window).width() < 768){
								$(this).find("a").attr("role", "tab");
							}
						}	

						if($(this).hasClass("on")){
							$(this).find("a").attr({"aria-selected": true, "title":"선택됨"});
						}else{
							$(this).find("a").attr("aria-selected", false);
							$(this).find("a").removeAttr("title");
						}
					});

					$(this).find("ul a").on("click", function(e){
						ui.Tab.click(this);
					});
				}
			});
		},
		click :function(target){
			$(target).parents("[role=tabEl]").find("li").removeClass("on").find("a").attr("aria-selected", false).removeAttr("title");
			$(target).parents("li").addClass("on").find("a").attr({"aria-selected": true, "title":"선택됨"});

			//초기화활 탭 ID 추출
			var hideID = [];
			$(target).parents("[role=tabEl]").find("a").each(function(e){
				hideID.push($(this).attr("data-tabID"));
			});
			for(i=0;i<hideID.length;i++){
				$("#" + hideID[i]).removeClass("on");
			}
			$("#"+$(target).attr("data-tabID")).addClass("on");
		},

		
	},
	tabScroll : {
		init : function(){
			ui.tabScroll.flexble();
			ui.tabScroll.flexble2();
		},
		flexble : function(){
			if($('#pageTab').length == 0){return false}
			
			var scrollTab = undefined;

			tabScrollLoc();

			function tabScrollLoc(){
				if (scrollTab == undefined) {
					var myScrollPos = $('#pageTab>ul>li.on').position().left + $('#pageTab>ul>li.on').outerWidth(true) / 2 + $('#pageTab>ul').scrollLeft() - $('#pageTab>ul').width() / 2;
					$("#pageTab>ul").scrollLeft(myScrollPos);
				}
			}

		},
		flexble2 : function(){
			if($('#contTab').length == 0){return false}
			
			var scrollTab2 = undefined;

			function tabScrollLoc2(){
				if (scrollTab2 == undefined) {
					var myScrollPos2 = $('#contTab>ul>li.on').position().left + $('#contTab>ul>li.on').outerWidth(true) / 2 + $('#contTab>ul').scrollLeft() - $('#contTab>ul').width() / 2;
					$("#contTab>ul").scrollLeft(myScrollPos2);
				}
			}
			tabScrollLoc2();
			
			$('#contTab[role="tabEl"] li>a').click(function() {
				tabScrollLoc2();
			});
			

		},
	},
	contAutoHeight : function(target, point){
		//테블릿, 모바일 분기점 디폴트
		var tabletPoint = "1024",
			mobilePoint = "768";

		if(point[0][1] != undefined){tabletPoint = point[0][1]}
		if(point[1][1] != undefined){mobilePoint = point[1][1]}

		// console.log(tabletPoint);
		// console.log(mobilePoint);

        $(window).bind('load resize', function () {
			//pc
            if(window.innerWidth >= tabletPoint){
                ui.contAutoSetion(target, point[0][0]);
            } 
			//테블릿
            else if(window.innerWidth >= mobilePoint){
                ui.contAutoSetion(target, point[1][0]);
            } 
			//모바일
            else{
				if(point[2][0] == 1){
					//console.log("1개");
					$(target).removeAttr("style");
				}
				else{
					ui.contAutoSetion(target, point[2][0]);
				}
            }
        });
	},
	contAutoSetion : function(target, length){
		$(target).removeAttr("style");
        var listLine = $(target).length;
        var arry = [];
        for (i = 0; i < listLine; i++) {
            var p_list = $(target).eq(i).innerHeight();
            arry.push(p_list);
        }
        for (i = 0; i < listLine; i++) {
            if (i < length * 1) {
                $(target).eq(i).css("height", Math.max.apply(null, arry.slice(0, length)));
            }
            else if (i < length * 2) {
                $(target).eq(i).css("height", Math.max.apply(null, arry.slice(length, length * 2)));
            }
            else if (i < length * 3) {
                $(target).eq(i).css("height", Math.max.apply(null, arry.slice(length * 2, length * 3)));
            }
            else if (i < length * 4) {
                $(target).eq(i).css("height", Math.max.apply(null, arry.slice(length * 3, length * 4)));
            }
            else if (i < length * 5) {
                $(target).eq(i).css("height", Math.max.apply(null, arry.slice(length * 4, length * 5)));
            }
            else if (i < length * 6) {
                $(target).eq(i).css("height", Math.max.apply(null, arry.slice(length * 5, length * 6)));
            }
            else if (i < length * 7) {
                $(target).eq(i).css("height", Math.max.apply(null, arry.slice(length * 6, length * 7)));
            }
            else if (i < length * 8) {
                $(target).eq(i).css("height", Math.max.apply(null, arry.slice(length * 7, length * 8)));
            }
            else if (i < length * 9) {
                $(target).eq(i).css("height", Math.max.apply(null, arry.slice(length * 8, length * 9)));
            }
            else if (i < length * 10) {
                $(target).eq(i).css("height", Math.max.apply(null, arry.slice(length * 9, length * 10)));
            }
        }
	},
	contents : function(){
		// 상단공지 컨텐츠 모바일 물음표 아이콘으로 변경
		$('.ico_tglNoti').on("click", function (e) {
			if ($(this).siblings('.icoBoxNotice').hasClass('on')) {
				$(this).siblings('.icoBoxNotice').removeClass('on')
			} else {
				$(this).siblings('.icoBoxNotice').addClass('on')
			}
		});

		// 모바일 테이블 tr 내 체크박스가 checked일 경우 border 처리
		$('.mbRow2 tr').each(function(){
			// 각 tr의 input 요소에 대한 이벤트 핸들러 추가
			$(this).find('input[type="checkbox"], input[type="radio"]').change(function(){
				// 체크박스 또는 라디오 버튼이 체크되었는지 확인
				if($(this).prop('checked')){
					// 체크박스 또는 라디오 버튼이 체크된 경우 tr에 클래스 추가
					$(this).closest('tr').addClass('checked');
				} else {
					// 체크박스 또는 라디오 버튼이 체크 해제된 경우 tr에서 클래스 제거
					$(this).closest('tr').removeClass('checked');
				}
			});
			// 페이지 로드 시 각 input 요소의 상태 확인 및 클래스 추가
			$(this).find('input[type="checkbox"], input[type="radio"]').each(function(){
				if($(this).prop('checked')){
					$(this).closest('tr').addClass('checked');
				}
			});
		});

		// 날짜 데이터
		$('.inputBase[type="date"]').keyup(function() {
		 });
	},
	//접근성 개별 코드
	accessibility : {
		//레이어 영역내 포커스 루프 이벤트
		focusloop : function(area){

			//console.log(event);
			if(event != undefined){
				$(event.currentTarget).attr("data-retrunFocus","Y");
			} else {
				$("#skip_menu a").eq(0).attr("data-retrunFocus","Y");
			}

			//첫뻔재, 마지막 타겟 셋팅시 예외상태 추가
			var TargetState = "[data-hidden=hidden], [style*='display:none'], [style*='display: none'], [style*='display :none'], [style*='display : none']";

			//첫번째, 마지막 포커스 셋팅 전 css로 display:none 처리 되어있는 타겟 분리
			$(area).find("a, button, input, select").not(TargetState).each(function(e){
				if($(this).is(":visible") == false){
					$(this).attr("data-hidden","hidden");
				}
			});
			
			//팝업 내에 첫번째, 마지막 타겟 지정
			$(area).find("a, button, input, select").not(TargetState).first().attr("data-pop-focus","first");
			$(area).find("a, button, input, select").not(TargetState).last().attr("data-pop-focus","last");
			
			
			$("body *").not(area).not(area + " *").attr({
				"aria-hidden" : true,
				"data-hidden" : "hidden"
			});
			
			//html 깊이 구해서 aria-hidden 처리 삭제
			var targetHtml = $(area);
			var endClass = targetHtml.parent().prop('tagName');
			
			for(var i = 0; i<20; i++){
				if(endClass != "BODY"){
					targetHtml.removeAttr('data-hidden').removeAttr('aria-hidden');

					targetHtml = targetHtml.parent();
					endClass = targetHtml.parent().prop('tagName');
					
					//console.log(endClass)
					
					targetHtml.removeAttr('data-hidden').removeAttr('aria-hidden');
				}
				else {
					break
				}
			}

			//팝업내 버튼이 없을경우 팝업영역을 첫번째 포커스로 잡음
			if($(area).find("[data-pop-focus=first]").length == "0"){
				$(area).attr({"tabindex" : "0", "data-pop-focus":"first"});	
				$(area).focus();
			} else{
				$(area).find('[data-pop-focus=first]').focus();
			}
			
			//접근성 : 첫번째탭에서 shift + tab 경우 마지막버튼으로 (팝업내 포커스 루프)
			$(area).find("[data-pop-focus=first]").on("keydown", function(e){
				if(e.shiftKey == true && e.which == 9){
					$(area).find("[data-pop-focus=last]").focus();
					return false;
				}
			});
			
			//접근성 : 마지막탭에서 tab 경우 첫번째 버튼 (팝업내 포커스 루프)
			$(area).find("[data-pop-focus=last]").on("keydown", function(e){
				if(e.shiftKey == false && e.which == 9){
					$(area).find("[data-pop-focus=first]").focus();
					return false;
				}
			});
		},
		focusloopClose : function(){
			$("[data-retrunFocus=Y]").focus();
			$("[data-hidden=hidden]").removeAttr("data-hidden").removeAttr("aria-hidden");
			$("body *").removeAttr("data-retrunFocus");
		},
		//GNB 키보드 운용
		GNB : function() {
			var TargetState = "[style*='display:none'], [style*='display: none'], [style*='display :none'], [style*='display : none']";
			
			//GNB ON
			$("#header nav>ul>li>a").on('focusin', function(e){
				$(this).trigger('mouseover');
			});

			//GNB OFF
			$("header>nav #gnb>li").not(TargetState).last().on('focusout', function(e){
				if(!$(this).hasClass("child")){
					$(this).trigger('mouseleave');	
				}	
			});
			
			$("header>nav #gnb>li").not(TargetState).last().find(".menuM>li").not(TargetState).last().find(".menuS>li").not(TargetState).last().on('focusout', function(e){
				$(this).trigger('mouseleave');
			});
			
			$("header>nav #gnb>li").not(TargetState).last().find(".menuM>li").not(TargetState).last().on('focusout', function(e){
				if(!$(this).hasClass("child")){
					$(this).trigger('mouseleave');
				}
			});
			
			$("header>nav #gnb>li>a").on('keydown', function(e){				
				if (e.shiftKey == true && e.which == 9) {
					var TargetParentIndex = $(this).parent("li").index()-1;
					if(!$("header>nav #gnb>li").eq(TargetParentIndex).find("li").not(TargetState).last().hasClass("child")){
						setTimeout(function() {
							$("header>nav #gnb>li").eq(TargetParentIndex).find("li").not(TargetState).last().find("a").focus();
						}, 1); 
					} else{
						setTimeout(function() {
							$("header>nav #gnb>li").eq(TargetParentIndex).find("li").not(TargetState).last().find(".menuS li").not(TargetState).last().find("a").focus();
						}, 1);
					}
				}
			});
		},
		SNB : {
			init : function(){
				//snb 포커스이벤트
				$("#snb_nav .snb_area > button").on("keydown", function (e) {
					var focusIndex = $(this).index();
					if (e.shiftKey == true && e.which == 9) {
						ui.accessibility.SNB.SNBfocusout();
					}

					else if (e.shiftKey == false && e.which == 9) {
						if($("#snb").css("display") == "block"){
							//1뎁스
							if(focusIndex == 1){
								setTimeout(function(){
									$("li[data-SnbfirstTargetD1=true] > a").focus();
								},0);
							}
							//2뎁스
							else if(focusIndex == 2){
								setTimeout(function(){
									$("li[data-SnbfirstTargetD2=true] > a").focus();
								},0);
							}
							//3뎁스
							else if(focusIndex == 3){
								setTimeout(function(){
									$("li[data-SnbfirstTargetD3=true] > a").focus();
								},0);
							}
							//4뎁스
							else if(focusIndex == 4){
								setTimeout(function(){
									$("li[data-SnbfirstTargetD4=true] > a").focus();
								},0);
							}
						}
					}
				});
				//SNB 첫번째 / 마지막 포커스 제어 이벤트
				ui.accessibility.SNB.firstFocuseout();
				ui.accessibility.SNB.lastFocuseout();
			},
			//SNB 첫번째 포커스 제어
			firstFocuseout : function(){
				//각 SNB중 CMS에서 display none 처리할경우 해당객체를 제외한 나머지 중 첫번째 타겟 셋팅
				//CMS 에서 display:none << 띄어쓰기가 브라우져 별로 상이해서 2개 타입 추가
				//1뎁스
				$("#snb_nav #snb > li").not("[style*='display:none']").not("[style*='display: none']").first().attr('data-SnbfirstTargetD1',"true");
				//2뎁스
				$("#snb_nav #snb li.on .menuM > li").not("[style*='display:none']").not("[style*='display: none']").first().attr('data-SnbfirstTargetD2',"true");
				//3뎁스
				$("#snb_nav #snb li.on .menuM li.on .menuS > li").not("[style*='display:none']").not("[style*='display: none']").first().attr('data-SnbfirstTargetD3',"true");
				//4뎁스
				$("#snb_nav #snb li.on .menuM li.on .menuS li.on .menuSS > li").first("[style*='display:none']").not("[style*='display: none']").last().attr('data-SnbfirstTargetD4',"true");

				//1뎁스 첫번째포커스 이벤트
				$("li[data-SnbfirstTargetD1=true] > a").on("keydown", function (e) {
					if (e.shiftKey == true && e.which == 9) {
						setTimeout(function () {
							$("#snb_nav .snb_area > button:nth-of-type(1)").focus();
						}, 0);
						ui.accessibility.SNB.SNBfocusout(1);
					}
				});

				//2뎁스 첫번째포커스 이벤트
				$("li[data-SnbfirstTargetD2=true] > a").on("keydown", function (e) {
					if (e.shiftKey == true && e.which == 9) {
						setTimeout(function () {
							$("#snb_nav .snb_area > button:nth-of-type(2)").focus();
						}, 0);
						ui.accessibility.SNB.SNBfocusout(2);
					}
				});

				//3뎁스 첫번째포커스 이벤트
				$("li[data-SnbfirstTargetD3=true] > a").on("keydown", function (e) {
					if (e.shiftKey == true && e.which == 9) {
						setTimeout(function () {
							$("#snb_nav .snb_area > button:nth-of-type(3)").focus();
						}, 0);
						ui.accessibility.SNB.SNBfocusout(3);
					}
				});

				//4뎁스 첫번째포커스 이벤트
				$("li[data-SnbfirstTargetD4=true] > a").on("keydown", function (e) {
					if (e.shiftKey == true && e.which == 9) {
						setTimeout(function () {
							$("#snb_nav .snb_area > button:nth-of-type(4)").focus();
						}, 0);
						ui.accessibility.SNB.SNBfocusout(4);
					}
				});
			},
			//SNB 마지막 포커스 셋팅 후 이벤트 제어
			lastFocuseout : function(){
				//각 SNB중 CMS에서 display none 처리할경우 해당객체를 제외한 나머지 중 마지막 타겟 셋팅
				//CMS 에서 display:none << 띄어쓰기가 브라우져 별로 상이해서 2개 타입 추가
				//1뎁스
				$("#snb_nav #snb > li").not("[style*='display:none']").not("[style*='display: none']").last().attr('data-SnbLastTargetD1',"true");
				//2뎁스
				$("#snb_nav #snb li.on .menuM > li").not("[style*='display:none']").not("[style*='display: none']").last().attr('data-SnbLastTargetD2',"true");
				//3뎁스
				$("#snb_nav #snb li.on .menuM li.on .menuS > li").not("[style*='display:none']").not("[style*='display: none']").last().attr('data-SnbLastTargetD3',"true");
				//4뎁스
				$("#snb_nav #snb li.on .menuM li.on .menuS li.on .menuSS > li").not("[style*='display:none']").not("[style*='display: none']").last().attr('data-SnbLastTargetD4',"true");

				//1뎁스 마지막포커스 이벤트
				$("li[data-SnbLastTargetD1=true] > a").on("keydown", function (e) {
					if (e.shiftKey == false && e.which == 9) {
						setTimeout(function () {
							$("#snb_nav .snb_area > button:nth-of-type(2)").focus();
						}, 0);
						ui.accessibility.SNB.SNBfocusout(1);
					}
				});

				//2뎁스 마지막포커스 이벤트
				$("li[data-SnbLastTargetD2=true] > a").on("keydown", function (e) {
					if (e.shiftKey == false && e.which == 9) {
						if($("#snb_nav .snb_area > button:nth-of-type(3)").index() == "-1"){
							setTimeout(function () {
								$(".typeSub .pageUtil>.btn_print").focus();
							}, 0);
						} else{
							setTimeout(function () {
								$("#snb_nav .snb_area > button:nth-of-type(3)").focus();
							}, 0);
						}
						ui.accessibility.SNB.SNBfocusout(2);
					}
				});

				//3뎁스 마지막포커스 이벤트
				$("li[data-SnbLastTargetD3=true] > a").on("keydown", function (e) {
					if (e.shiftKey == false && e.which == 9) {
						if($("#snb_nav .snb_area > button:nth-of-type(4)").index() == "-1"){
							setTimeout(function () {
								$(".typeSub .pageUtil>.btn_print").focus();
							}, 0);
						} else{
							setTimeout(function () {
								$("#snb_nav .snb_area > button:nth-of-type(4)").focus();
							}, 0);
						}
						ui.accessibility.SNB.SNBfocusout(3);
					}
				});

				//4뎁스 마지막포커스 이벤트
				$("li[data-SnbLastTargetD4=true] > a").on("keydown", function (e) {
					if (e.shiftKey == false && e.which == 9) {
						setTimeout(function () {
							$(".typeSub .pageUtil>.btn_print").focus();
						}, 0);
						ui.accessibility.SNB.SNBfocusout(4);
					}
				});

			},
			SNBfocusout : function(index){
				// $("#snb_nav .snb_area>button").removeClass("active");
				// $("#snb").slideUp(50);
				// $("#dim").removeClass('on').css('top','');
				// $(".sVisual").css("z-index","");

				$("#snb_nav .snb_area>button").eq(index-1).trigger("click");
			}
		}
	},
	//모바일 본문 스크롤 방지
	lockBody : {
		val : {
			mobileBodyLock : "N",						//모바일 body 스크롤 락 여부
			LockEl : 'html, body',						//scroll 타겟
			contWrap : '#container',					//컨텐츠 영역
			LockScrollTop : "", 						//스크롤 락 시도시 현재 스크롤 값
		},
		//잠그기
		lock : function(){
			if(window.pageYOffset) {
				ui.lockBody.val.LockScrollTop = window.pageYOffset;
				$(ui.lockBody.val.contWrap).css({
					top: - (ui.lockBody.val.LockScrollTop)
				});
			}
			$(ui.lockBody.val.LockEl).css({
				height: "100%",
				overflow: "hidden"
			});

			ui.lockBody.val.mobileBodyLock = "Y";
		},
		//해지
		unlock : function(){
			//아이프레임 체크
			if ( self !== top ) {
				$(parent.document).find(ui.lockBody.val.LockEl).css({
					height: "",
					overflow: ""
				});

				var str = $(parent.document).find(ui.lockBody.val.contWrap).css("top");
				var regex = /[^0-9]/g;
				var result = str.replace(regex, "");

				ui.lockBody.val.LockScrollTop = Number(result);

				$(parent.document).find(ui.lockBody.val.contWrap).css({
					top: ""
				});

				parent.window.scrollTo(0, ui.lockBody.val.LockScrollTop);
			}
			else {
				$(ui.lockBody.val.LockEl).css({
					height: "",
					overflow: ""
				});
	
				$(ui.lockBody.val.contWrap).css({
					top: ""
				});

				window.scrollTo(0, ui.lockBody.val.LockScrollTop);
			}

			
			window.setTimeout(function () {
				ui.lockBody.val.LockScrollTop = null;
			}, 0);

			ui.lockBody.val.mobileBodyLock = "N";
		}
	},
	//SNB PC 뎁스별 최대 넓이값 구하기
	snbDept : {
		init  : function(breakPoint){

			onePoint = "";
			if(window.innerWidth <= breakPoint){
				onePoint = "PC";
			} else{
				onePoint = "MOBIE";
			}

			ui.snbDept.set(breakPoint);
			$(window).bind('resize', function(){
				ui.snbDept.set(breakPoint);
			});
		},
		set : function(breakPoint){
			//SNB 각 뎁스별 최대 넓이 갑 구하기
			//+58은 ul의 padding 값 + 보더 양끝 2 더한 값 / 30은 앞에 58값과 버튼 좌 우 패딩 값을 - 한 나머지 값을 + 해줘야 가장 넓은 뎁스가 활성화 되었을때 텍스트가 잘리지 않음
			var margin = 58 + 30;
			if(window.innerWidth <= breakPoint){
				if(onePoint == "PC"){	
					onePoint = "MOBIE";
					$("#snb_nav .snb_area>button").removeAttr("style");
					//console.log("모바일");
				}
			}else{
				if(onePoint == "MOBIE"){
					//1뎁스 			
					$("#snb_nav").removeAttr("class").addClass("active1");
					$("#snb").show().css({"width":"auto","visibility":"hidden"});
					$("#snb_nav .snb_area>button.dep1").css("width", $("#snb>li.on").outerWidth() + margin+"px");

					//2뎁스
					$("#snb_nav").removeAttr("class").addClass("active2");
					$("#snb").show().css("width","auto");
				
					$("#snb_nav .snb_area>button.dep2").css("width", $("#snb>li.on>.menuM").outerWidth() + margin + "px");

					//3뎁스
					$("#snb_nav").removeAttr("class").addClass("active3");
					$("#snb").show().css("width","auto");
					$("#snb_nav .snb_area>button.dep3").css("width", $("#snb>li.on>.menuM>li.on>.menuS").outerWidth() + margin + "px");

					$("#snb_nav").removeAttr("class");
					$("#snb").hide().removeAttr("style");
					//console.log("PC");

					onePoint = "PC";
				}
				
			}
		}
	},

	touchDim: function () {
		$.fn.hasHorizontalScrollBar = function () {
			return this.get(0) ? Math.ceil(this.get(0).scrollWidth) > Math.ceil(this.innerWidth()) : false;
		}
	
		function handleResize() {
			$(".contTable, .limitX").each(function (index) {
				var $table = $(this);
				var $touchArea = $table.find(".tableTouchArea");
	
				if ($table.hasHorizontalScrollBar()) {
					if ($touchArea.length !== 1) {
						var touchHtml = '<div class="tableTouchArea"><button type="button" class="tableScrollTouch"><span>좌,우로 이동 가능합니다.</span></button></div>';
						$table.addClass('typeScroll');
						$table.append(touchHtml);
					}
				} else {
					$table.removeClass('typeScroll');
					$touchArea.remove();
				}
			});
		}
	
		handleResize();
	
		$(window).on("resize", function () {
			handleResize();
		});
	
		$(".contTable, .limitX").on("scroll", function (e) {
			$(this).find(".tableTouchArea").hide();
		});

		$(".contTabBase .tabList>li a").on("click", function (e) {
			handleResize();
		});
	},

	help : function () {
		$("[data-id=help]").each(function(e){

			$(this).find("button").click(function(){
				if($(this).hasClass("on")){
					$(this).removeClass("on");
					$(this).next(".help_cont").fadeOut(300, function(e){
						$(this).removeAttr("style");
					});
				}else{
					$(this).addClass("on");
					$(this).next(".help_cont").fadeIn(300);
					if($(window).innerWidth() <= 768 ){
						$(this).next(".help_cont").css("left", -($(this).next(".help_cont").offset().left - $(".contentsWrap").css("padding-left").match(/\d+/)[0]) +"px");
					}
				}
				return false;
			});

			//리사이즈 초기화
			$(window).bind('resize load', function () {
				$("[data-id=help] button").removeClass("on");
				$("[data-id=help] .help_cont").fadeOut(300, function(e){
					$(this).removeAttr("style");
				});
			});
		});
	}
}


