<template>
  <!-- pageTitle -->
  <div class="pageTitleArea">
    <div class="titleInfo">
      <h2 class="pageTit">{{ menuStore.selected.depth3?.menuNm }}</h2>

      <p class="txtEx">
        안내문구 적용 영역 입니다.
        <span>(최종변경일 2024.01.01 11:11:11)</span>
      </p>
    </div>
    <div class="utilBtn">
      <button type="button" class="baseBtn small grayLine"><span class="base">업무요청</span></button>
      <button type="button" class="baseBtn small grayLine"><span class="base">업무메뉴얼</span></button>
      <button type="button" class="baseBtn small grayLine"><span class="base">즐겨찾기</span></button>

      <!-- 
							sbdc/type/common/js/designJs/layout.js
							이벤트 스크립트 있음 
						-->
      <div class="fontSizeArea">
        <button type="button" data-id="fontSize" class="baseBtn small grayLine"><span class="base">글자크기</span></button>

        <div class="sizeBox">
          <p class="tit">글자크기 설정</p>
          <ul>
            <li class="lv1">
              <button type="button" class="btn_plus">
                <span class="ico">가</span>
                <span class="txt">작게</span>
              </button>
            </li>
            <li class="lv2">
              <button type="button" class="btn_plus on">
                <span class="ico">가</span>
                <span class="txt">보통</span>
              </button>
            </li>
            <li class="lv3">
              <button type="button" class="btn_plus">
                <span class="ico">가</span>
                <span class="txt">크게</span>
              </button>
            </li>
            <li class="lv4">
              <button type="button" class="btn_plus">
                <span class="ico">가</span>
                <span class="txt">아주크게</span>
              </button>
            </li>
            <li class="lv5">
              <button type="button" class="btn_plus">
                <span class="ico">가</span>
                <span class="txt">최대크게</span>
              </button>
            </li>
          </ul>
          <button type="button" class="btn_close" title="닫기"><span class="hidden">닫기</span></button>
        </div>
      </div>

      <button type="button" class="baseBtn small grayLine"><span class="base">프린트</span></button>
    </div>
  </div>
  <!-- //pageTitle -->
</template>

<script setup>
import { useMenuStore } from '@/stores/menu.js'
const menuStore = useMenuStore()
</script>

<style lang="scss" scoped></style>
