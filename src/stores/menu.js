import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useRoute } from 'vue-router'
import { useHistoryStore } from './history'

export const useMenuStore = defineStore('menu', () => {
  const route = useRoute()
  const historyStore = useHistoryStore()

  const menus = ref([])
  const selected = ref({})

  const fetchMenus = async () => {
    // TODO: 메뉴관리 api 완성 후, api로 메뉴 조회
    const result = await fetch('/menu.json')
      .then((response) => response.json())
      .then((json) => json)
    menus.value = result
    setSelected()
  }

  const getMenus = async () => {
    if (menus.value.length === 0) {
      await fetchMenus()
    }
    return menus
  }

  const setSelected = () => {
    const select = menus.value.find((m) => m.url === route.fullPath)
    if (select) {
      selected.value = {}
      const arr = [select]

      // 상위메뉴 탐색 재귀함수
      const upper = (upperMenuId) => {
        if (!upperMenuId) return
        const m = menus.value.find((m) => m.menuId === upperMenuId)
        arr.unshift(m)
        upper(m.upperMenuId)
      }

      upper(select.upperMenuId)

      arr.forEach((m) => {
        selected.value['depth' + m.depth] = m
      })

      if (historyStore.histories.length === 0) {
        historyStore.addHistory(arr.pop())
      }
    }
  }

  watch(
    () => route.path,
    () => {
      setSelected()
    }
  )
  return { menus, selected, getMenus }
})
