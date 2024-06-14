<template>
  <div class="pop_wrap type2" id="confirm_popup">
    <section class="popLayout popLayer" style="width: 640px; opacity: 1; top: 0px">
      <div class="popConts">
        <div class="popInner">
          <div class="txtG" style="text-align: center">
            <p class="msg" v-html="confirm.confirmInfo.text"></p>
          </div>
        </div>
        <div class="popBtnArea">
          <button type="button" class="baseBtn grayLine" @click.enter="confirm.close"><span class="base">닫기</span></button>
          <button type="button" class="baseBtn" @click.enter="confirm.approve"><span class="base">확인</span></button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useConfirmStore } from '@/stores/modal.js'

const confirm = useConfirmStore()
</script>

<style lang="scss" scoped></style>
