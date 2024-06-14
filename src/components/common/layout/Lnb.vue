<template>
  <nav>
    <div class="innerCont">
      <div class="gnbTab">
        <button type="button" class="default gnb on" data-id="gnb"><span class="base">중소유통물류</span></button>
        <button type="button" class="default favorites" data-id="favorites"><span class="base">즐겨찾기</span></button>
      </div>

      <div class="gnbTabGroup">
        <ul id="gnb" class="gnbMenu on">
          <li :class="['child', { act: selectedMenu.depth1?.menuId === d1.menuId }]" v-for="d1 in menuTree" :key="d1.menuId">
            <a :class="{ on: selectedMenu.depth1?.menuId === d1.menuId }">{{ d1.menuNm }}</a>
            <ul class="menuM">
              <li
                :class="[{ child: d2.children.length != 0 }, { act: selectedMenu.depth2?.menuId === d2.menuId }]"
                v-for="d2 in d1.children"
                :key="d2.menuId"
              >
                <a
                  :class="{ on: selectedMenu.depth2?.menuId === d2.menuId }"
                  @click="
                    () => {
                      if (d2.children.length === 0) move(d2)
                    }
                  "
                >
                  {{ d2.menuNm }}
                </a>
                <ul class="menuS" v-if="d2.children.length != 0">
                  <li v-for="d3 in d2.children" :key="d3.menuId">
                    <a :class="{ on: !isEmpty(selectedMenu.depth3) && selectedMenu.depth3?.menuId === d3.menuId }" @click="move(d3)">
                      {{ d3.menuNm }}
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>

        <ul id="favorites" class="favoritesList">
          <li>즐겨찾기</li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
// import { useRouter } from 'vue-router'
import { useMenuStore } from '@/stores/menu.js'
import { useHistoryStore } from '@/stores/history.js'
import { isEmpty } from '@/assets/js/util'

// const router = useRouter()

const menuStore = useMenuStore()
const historyStore = useHistoryStore()

const { menus, selected: selectedMenu } = storeToRefs(menuStore)
const menuTree = ref([])

onMounted(async () => {
  // falt to nest
  const nest = (items, menuId = '') =>
    items.filter((item) => item.upperMenuId === menuId).map((item) => ({ ...item, children: nest(items, item.menuId) }))

  // flat 메뉴로 트리생성
  menuTree.value = nest(menus.value)
})

const move = (menu) => {
  historyStore.addHistory(menu)
  // router.push(menu.url)
}

// watch(
//   () => router.options.routes,
//   async () => {
//     // const nest = (items, menuId = '') =>
//     //   items.filter((item) => item.upperMenuId === menuId).map((item) => ({ ...item, children: nest(items, item.menuId) }))
//     // // flat 메뉴로 트리생성
//     // menuTree.value = nest(menus.value)
//     // console.log('LNB마운트', menuTree.value)
//     // await nextTick()
//     // // 디자인 gnb 이벤트 핸들러 등록
//     // typeLayout.gnb.init()
//   },
//   { once: true, deep: true }
// )
</script>

<style scoped>
a {
  cursor: pointer;
}
.on {
  font-weight: bold;
}
</style>
