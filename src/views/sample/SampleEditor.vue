<template>
  <div class="mainBox">
    <div class="titleBox"><span>에디터</span></div>
    <div class="ConBox">
      <Editor
        :contentData="editorData.data == null ? '' : editorData.data"
        v-model="editorData.data"
        @change-data="(data) => (editorData.data = data)"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
const editorData = reactive({
  data: '<p>안녕하세요</p><br/><p>에디터 샘플입니다</p>'
})
</script>

<style lang="scss" scoped>
.mainBox {
  width: 100% !important;
  height: auto !important;
  border: 1px solid black !important;
  padding: 20px !important;
  margin-top: 20px !important;
}

.titleBox {
  width: 80% !important;
  height: 35px !important;
  border: 1px solid #bdbdbd !important;
  border-radius: 10px !important;
  text-align: center !important;
  padding: 5px !important;
}

.ConBox {
  width: auto !important;
  height: auto !important;
  margin-top: 10px !important;
}

th {
  border: 1px solid black !important;
  background-color: #bdbdbd !important;
}

td {
  border: 1px solid black !important;
}

table {
  border-collapse: collapse !important;
}

.result {
  color: #ff0000;
}
</style>
