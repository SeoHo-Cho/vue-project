import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useRouter, useRoute } from 'vue-router'

export const useHistoryStore = defineStore('history', () => {
  const router = useRouter()
  const route = useRoute()

  const MAX_SIZE = 10

  const histories = ref([])

  const addHistory = (hist) => {
    const hasHistory = histories.value.find((h) => h.menuId === hist.menuId)

    // 앞에 추가
    if (!hasHistory) {
      histories.value.unshift(hist)
    }
    // max size를 넘으면 자르기
    if (histories.value.length > MAX_SIZE) {
      histories.value.length = MAX_SIZE
    }
    // 추가된 메뉴 활성화
    setActive(hist)
  }

  const removeHistory = (hist) => {
    histories.value = histories.value.filter((h) => h.menuId != hist.menuId)
    if (hist.active) {
      setActive(histories.value[0])
    }
  }

  const setActive = (hist) => {
    histories.value.forEach((h) => (h.active = false))
    hist.active = true
    router.push(hist.url)
  }

  watch(
    () => route.path,
    () => {
      const hasHistory = histories.value.find((h) => h.url === route.path)
      if (hasHistory) {
        setActive(hasHistory)
      }
    },
    { immediate: true }
  )

  return {
    histories,
    addHistory,
    removeHistory,
    setActive
  }
})
