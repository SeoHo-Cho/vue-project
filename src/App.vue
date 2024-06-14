<script setup>
import { onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useAlertStore, useConfirmStore } from './stores/modal'
import Alert from './components/popup/common/Alert.vue'
import Confirm from './components/popup/common/Confirm.vue'

const alert = useAlertStore()
const confirm = useConfirmStore()

onMounted(() => {
  console.log('env', import.meta.env.VITE_ENV)
  // app 로드 전에 skip_menu가 보이는 문제 수정
  document.getElementById('skip_menu').style.display = 'block'

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      alert.close()
      confirm.close()
    }
  })
})
</script>

<template>
  <RouterView />
  <Alert />
  <Confirm />
</template>

<style scoped></style>
