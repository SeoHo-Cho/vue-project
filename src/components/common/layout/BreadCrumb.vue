<template>
  <div class="sLocation">
    <div class="locNav">
      <a href="#none" class="home"><span class="hidden">홈</span></a>
      <a href="#none">{{ selected.depth1?.menuNm }}</a>
      <a href="#none">{{ selected.depth2?.menuNm }}</a>
      <a href="#none">{{ selected.depth3?.menuNm }}</a>
    </div>
  </div>
</template>

<script setup>
import { useMenuStore } from '@/stores/menu.js'
import { storeToRefs } from 'pinia'
const menuStore = useMenuStore()
const { selected } = storeToRefs(menuStore)
</script>

<style lang="scss" scoped></style>
