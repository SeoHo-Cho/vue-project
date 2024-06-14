<template>
  <div class="pageTab">
    <div :class="['item', { on: hist.active }]" v-for="(hist, i) in historyStore.histories" :key="i">
      <a @click="moveHistory(hist)">{{ hist.menuNm }}</a>
      <button type="button" class="del" @click="removeHistory(hist)"><span class="hidden">삭제</span></button>
    </div>
  </div>
</template>

<script setup>
import { useHistoryStore } from '@/stores/history'
const historyStore = useHistoryStore()

const moveHistory = (hist) => {
  historyStore.addHistory(hist)
}

const removeHistory = (hist) => {
  historyStore.removeHistory(hist)
}
</script>

<style lang="scss" scoped>
a {
  cursor: pointer;
}
</style>
