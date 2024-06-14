<template>
  <div>
    <h2>v-mask</h2>
    <a href="https://vuejs-tips.github.io/vue-the-mask/" target="_blank">
      라이브러리 example & docs
    </a>

    <pre>
'#': {pattern: /\d/},
'X': {pattern: /[0-9a-zA-Z]/},
'S': {pattern: /[a-zA-Z]/},
'A': {pattern: /[a-zA-Z]/, transform: v => v.toLocaleUpperCase()},
'a': {pattern: /[a-zA-Z]/, transform: v => v.toLocaleLowerCase()},
'!': {escape: true}
    </pre>
    <Form @submit="successAlert" @invalid-submit="FailedAlert" v-slot="{ errors }">
      <div class="flexBox">
        <div class="fl">사업자번호 :</div>
        <div class="fr">
          <Field
            type="text"
            v-model="state.bizNo"
            v-mask="'###-##-#####'"
            placeholder="123-45-67890"
            class="input_test"
            name="사업자번호"
            rules="required"
          /><br />
          v-mask="'###-##-#####'"
        </div>
      </div>
      <div class="flexBox">
        <div class="fl">휴대폰번호 :</div>
        <div class="fr">
          <Field
            type="text"
            v-model="state.hpNo"
            v-mask="'###-####-####'"
            placeholder="010-0000-0000"
            class="input_test"
            name="휴대폰번호"
            rules="required"
          /><br />
          v-mask="'###-####-####'"
        </div>
      </div>
      <div class="flexBox">
        <div class="fl">일련번호 :</div>
        <div class="fr">
          <Field
            type="text"
            v-model="state.serial"
            v-mask="'AAAA-AAAA-AAAA-AAAA'"
            placeholder="ANXI-FANX-ROZW-FFWQ"
            class="input_test"
            name="일련번호"
            rules="required"
          /><br />
          v-mask="'AAAA-AAAA-AAAA-AAAA'"
        </div>
      </div>
    </Form>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
const state = reactive({
  bizNo: '',
  hpNo: '',
  serial: ''
})

const params = reactive({
  bizNo: computed(() => state.bizNo.replaceAll('-', '')),
  hpNo: computed(() => state.hpNo.replaceAll('-', ''))
})
const successAlert = (e) => {
  console.log('성공', e)
}

const FailedAlert = (e) => {
  console.log('실패', e)
}
</script>

<style lang="scss" scoped>
.flexBox {
  margin-top: 10px;
  display: flex;
}

.fl {
  width: 30%;
  float: left;
}

.fr {
  width: 70%;
  float: right;
}
</style>
