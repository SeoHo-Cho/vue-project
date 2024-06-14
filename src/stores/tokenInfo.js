import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useTokenInfoStore = defineStore(
  'tokenInfo',
  () => {
    // const tokenInfo = reactive({
    //   accessToken: '',
    //   refreshToken: ''
    // })

    const accessToken = ref('')

    const refreshToken = ref('')

    return { accessToken, refreshToken }
  },
  {
    persist: true
  }
)
