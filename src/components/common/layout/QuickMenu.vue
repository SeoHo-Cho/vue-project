<template>
  <div class="quickMenu">
    <ul>
      <li>
        <a href="#none" class="alarm new"><span class="hidden">알림함</span></a>
      </li>
      <li>
        <a href="#none" class="favorites"><span class="hidden">즐겨찾기</span></a>
      </li>
      <li>
        <a href="#none" class="cart"><span class="hidden">장바구니</span></a>
      </li>
      <li>
        <button type="button" class="setting"><span class="hidden">설정</span></button>
        <div class="themeArea">
          <p class="themeTit">색상 관리</p>
          <div class="themeColorArea">
            <button class="themeBtn purple" value="purpleTheme"><span class="hidden">퍼플</span></button>
            <button class="themeBtn green on" value="greenTheme"><span class="hidden">그린</span></button>
            <button class="themeBtn blue" value="blueTheme"><span class="hidden">블루</span></button>
            <button class="themeBtn orange" value="orangeTheme"><span class="hidden">오렌지</span></button>
          </div>

          <div class="setBtn">
            <button type="button" class="baseBtn grayLine"><span class="base">초기화</span></button>
            <button type="button" class="baseBtn navy"><span class="base">적용</span></button>
          </div>

          <button type="button" class="themeClosed"><span class="hidden">닫기</span></button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
