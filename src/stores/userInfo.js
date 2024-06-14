import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useUserInfoStore = defineStore(
  'userInfo',
  () => {
    const userInfo = reactive({
      id: '',
      name: '',
      orgnztId: '',
      uniqId: '',
      userSe: ''
    })

    return { userInfo }
  },
  {
    persist: true
  }
)
