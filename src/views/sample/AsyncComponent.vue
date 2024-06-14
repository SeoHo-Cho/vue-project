<template>
  <div>
    <pre>
"화면정의서-공통"에 존재하는 (열어본 메뉴)히스토리 탭 구현 테스트
메뉴목록을 클릭하면 히스토리에 쌓인다.
히스토리를 클릭하면 해당 메뉴로 이동하고, 상태가 기억된다.
히스토리에 있는 동일한 메뉴를 열면, 히스토리에 중복으로 쌓이고 초기화 된 상태로 열린다.
  </pre
    >
    <h2>메뉴목록</h2>
    <div>
      <ul>
        <li v-for="menu in menus" :key="menu.path">
          <a @click="onClickMenu(menu)">{{ menu.name }}</a>
        </li>
      </ul>
    </div>
    <br />
    <h2>히스토리 (왼쪽이 최신)</h2>
    <div class="hist">
      <a
        :class="{ active: comp.component.name === currentComponent.name }"
        v-for="comp in keepComponents"
        :key="comp.name"
        @click="onClickHist(comp)"
      >
        {{ comp.menu }}
        <em v-if="comp.component != currentComponent" @click="onClickClose(comp)">X</em>
      </a>
    </div>
    <div class="contents">
      <h2>컨텐츠 영역</h2>
      <KeepAlive :include="keepNames" :max="10" v-if="Object.keys(currentComponent).length > 0">
        <component :is="currentComponent" />
      </KeepAlive>
    </div>
  </div>
</template>

<script setup>
import { ref, shallowRef, reactive, computed, defineAsyncComponent, onMounted, markRaw, defineComponent, h } from 'vue'

const menus = [
  {
    name: '사용자정의 유효성검사 샘플',
    path: '/sample/sample-validate-custom'
  },
  {
    name: '기본 유효성검사 샘플',
    path: '/sample/sample-validate-default'
  },
  {
    name: 'API 호출 샘플',
    path: '/sample/sample-api'
  },
  {
    name: '디렉티브 샘플',
    path: '/sample/sample-directive'
  }
]

// keep-alive가 컴포넌트 name 기반으로 캐시되므로, 동일 메뉴를 히스토리에 추가하기 위해서는 컴포넌트 name속성을 유니크하게 입력해야한다.
const createUniqueComponent = (component) => {
  return markRaw(
    defineComponent({
      name: crypto.randomUUID(), // any unique string generation method of your choice
      components: {
        uc: component
      },
      render() {
        return h(this.$.components.uc, null, this.$slots)
      }
    })
  )
}

// 현재 렌더링 된 컴포넌트
const currentComponent = shallowRef({})
//
const keepComponents = ref([])

const keepNames = computed(() => keepComponents.value.map((k) => k.component.name))

onMounted(() => {
  onClickMenu(menus[0])
})

const onClickMenu = (menu) => {
  const lastPath = menu.path.split('/').pop()
  // path로 부터 파일명 추출.. kebab-case to CarmelCase
  const fileName = lastPath.charAt(0).toUpperCase() + lastPath.slice(1).replace(/-./g, (x) => x[1].toUpperCase())

  currentComponent.value = createUniqueComponent(defineAsyncComponent(() => import(`./${fileName}.vue`)))
  keepComponents.value.unshift({
    menu: menu.name,
    component: currentComponent.value
  })
}

const onClickHist = (keep) => {
  currentComponent.value = keep.component
}

const onClickClose = (keep) => {
  keepComponents.value = keepComponents.value.filter((c) => c.component.name != keep.component.name)
}
</script>

<style lang="scss" scoped>
a {
  cursor: pointer;
}
.hist {
  margin: 10px;
  text-decoration: underline;
  a {
    margin-right: 15px;
  }
  .active {
    font-weight: bold;
    color: red;
  }
}
.contents {
  padding: 10px;
  border: 1px solid #c0c0c0;
}
</style>
