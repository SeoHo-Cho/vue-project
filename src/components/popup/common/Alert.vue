<template>
  <div class="pop_wrap type2" id="alert_popup">
    <section class="popLayout popLayer" style="width: 450px; opacity: 1; top: 0px">
      <div class="popConts">
        <div class="popInner">
          <div class="txtG" style="text-align: center">
            <p class="msg" v-html="alert.alertInfo.text"></p>
          </div>
        </div>
        <div class="popBtnArea">
          <button type="button" class="baseBtn" @click.enter="alert.close"><span class="base">확인</span></button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useAlertStore } from '@/stores/modal'

const alert = useAlertStore()
</script>

<style lang="scss" scoped></style>
