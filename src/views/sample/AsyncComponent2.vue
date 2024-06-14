<template>
  <div>
    <div>
      <button
        type="button"
        @click="
          showComp({
            name: '공통함수',
            title: '공통함수',
            path: '/sample/sample-common-function',
            file: 'SampleCommonFunction'
          })
        "
      >
        공통함수
      </button>
      <button
        type="button"
        @click="
          showComp({
            name: '기본 Validation',
            title: '기본 Validation',
            path: '/sample/sample-validate-default',
            file: 'SampleValidateDefault'
          })
        "
      >
        기본 Validation
      </button>
      <button
        type="button"
        @click="
          showComp({
            name: '커스텀 Validation',
            title: '커스텀 Validation',
            path: '/sample/sample-validate-custom',
            file: 'SampleValidateCustom'
          })
        "
      >
        <span>커스텀 Validation</span>
      </button>
      <br />
      <!-- <RouterLink :to="{ path: '/sample/sample-validate-default' }">기본 Validation</RouterLink><br />
      <RouterLink :to="{ path: '/sample/sample-validate-custom' }">커스텀 Validation</RouterLink
      ><br />
      <RouterLink :to="{ path: '/sample/sample-api' }">샘플api</RouterLink><br />
      <RouterLink :to="{ path: '/sample/sample-directive' }">샘플디렉티브</RouterLink><br /> -->
    </div>
    <br />
    <div class="flexBox">
      <div class="historyBox" :id="`history_${item.name}`" v-for="(item, key) in menus.slice().reverse()" :key="key">
        <span @click="onChange(item.name)">{{ item.name }}</span> &nbsp;
        <button type="button" @click="onDelete(item)">닫기</button>
      </div>
    </div>
    <KeepAlive :include="keepList" v-if="menus.length > 0">
      <component :is="current?.component" />
    </KeepAlive>
  </div>
</template>

<script setup>
import { shallowRef, reactive, defineAsyncComponent, onMounted, computed, watch, defineComponent, markRaw, h, ref } from 'vue'
var count = 0
const current = ref({})
let keepList = []
let excluveList = []
const menus = ref([])

const createUniqueComponent = (component) => {
  var uuid = crypto.randomUUID()
  return markRaw(
    defineComponent({
      name: uuid, // any unique string generation method of your choice
      components: {
        uc: component
      },
      render() {
        return h(this.$.components.uc, null, this.$slots)
      }
    })
  )
}

let menuComponents = menus.value.map((m) => {
  return {
    title: m.name,
    component: createUniqueComponent(defineAsyncComponent(() => import(`./${m.file}.vue`)))
  }
})

const showComp = (data) => {
  var findName = menus.value.findIndex((v) => v.file === data.file)
  if (findName > -1) {
    var count = 0
    menus.value.map((m) => {
      if (m.file === data.file) {
        count++
      }
    })

    data.title = data.title + Number(count + 1)
    data.name = data.title
    menus.value.push(data)
    menuComponents.push({
      title: data.title,
      component: createUniqueComponent(defineAsyncComponent(() => import(`./${data.file}.vue`)))
    })
    data.key = menuComponents.filter((m) => m.title == data.name)[0].component.name
    keepList.push(data.key)
  } else {
    menus.value.push(data)
    menuComponents.push({
      title: data.title,
      component: createUniqueComponent(defineAsyncComponent(() => import(`./${data.file}.vue`)))
    })
    keepList.push(menuComponents.filter((m) => m.title == data.name)[0].component.name)
    data.key = menuComponents.filter((m) => m.title == data.name)[0].component.name
    current.value = menuComponents.filter((m) => m.title == data.name)[0]
  }
}

const onChange = (name) => {
  current.value = menuComponents.filter((m) => m.title == name)[0]
}
const onDelete = (data) => {
  var findRow = keepList.findIndex((v) => v === data.key)
  keepList.splice(findRow, 1)
  var findRow2 = menuComponents.findIndex((v) => v.component.name === data.key)
  menuComponents.splice(findRow2, 1)
  var findRow3 = menus.value.findIndex((v) => v.title === data.title)
  menus.value.splice(findRow3, 1)
  onChange(menus.value[0].name)
}
</script>

<style lang="scss" scoped>
.flexBox {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.historyBox {
  min-width: 150px;
  height: 40px;
  padding: 10px;
  margin: 10px;
  border: 1px solid black;
  border-radius: 10px;
  text-align: center;
}

.on {
  background-color: cadetblue;
}
</style>
