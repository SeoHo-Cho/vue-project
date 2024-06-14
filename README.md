# Version

NODE: 20.13.1 (개발당시 최신 LTS 버전)

NPM: 10.5.2

VUE: 3.4.21

# semas-smdc-front

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Path Alias

`./` 이나 `../` 은 `Path` 구조가 복잡하면 경로가 혼란스럽기 때문에 `Path Alias` 를 사용

사용예제

```javascript
import Header from '@/components/common/Header.vue'
import SideMenu from '@/components/common/SideMenu.vue'
```

//FIXME 해당 건은 이번 프로젝트에 맞게 조정 필요함 (현재는 왔어울산 프로젝트 기반)

# 파일명명 규칙

- views, layouts, components 는 Pascal Casing (appletree -> AppleTree) 으로 이름을 생성함.
  - 파일명 : NoticeList.vue, NoticeRegist.vue (패키지명 + 서비스).vue

# 변수,함수 명명 규칙

- 모든 변수명은 Camel Casing 로 생성함.
- 상수(final 변수)를 표현하는 이름은 반드시 모두 대문자로 지정하되 '\_' 를 사용하여 단어들을 구분한다.
- 메소드의 이름은 대소문자를 혼용할 수 있지만 반드시 "동사"를 사용하며 소문자로 시작한다.
- 존재여부 체크 함수,변수는 is로 시작한다.
- 축약형(Abbreviation) 과 두문자어형(頭文字語: Acronym)을 이름에 사용할 경우에는 전부 대문자로 지정하지 않는다.
  - exportHtmlSource(); // exportHTMLSource(); 가 아님
  - openDvdPlayer(); // openDVDPlayer(); 가 아님

## 통일 변수명

- postsList - 테이블 리스트 호출변수
- posts - 디테일 API 변수
- filterData - fileter reactive 변수

## 통일 함수명

- searchFilter - 필터를 거친 목록 조회
- initFilter - 필터를 거친 목록 초기화

## CRUD API호출 함수명 ( views 폴더 )

1. 전체 조회 처리 경우
   - 필터를 거친 목록 조회
     - searchFilterList
   - 필터를 거치지 않는 목록 조회
     - get + 패키지명 + List
     - 사용예시 : getNoticeList ( 필터를 거치지않는 목록 조회 )
2. 단건 조회 처리 경우
   - get + 패키지명 + detail
   - 사용예시 : getNoticeDetail, getCsDetail
3. 삭제 처리 경우
   - delete + 패키지명
   - 사용예시 : deleteNotice, deleteCs
4. 수정 처리 경우
   - update + 패키지명
   - 사용예시 : updateNotice
5. 등록 처리 경우
   - insert + 패키지명 + 함수명
   - 사용예시 : insertNotice, insertCustomerName

## CRUD API호출 함수명 ( services 폴더 )

1. 등록 처리 경우
   - regist + 패키지명 + 함수명
   - 사용예시 : registUserInfo, registCustomerName
2. 조회 처리 경우
   - fetch + 패키지명 + 함수명
   - 사용예시 : fetchNotice, fetchNoticeList
3. 삭제 처리 경우
   - remove + 패키지명 + 함수명
   - 사용예시 : removeUserInfo, removeCustomerName
4. 수정 처리 경우
   - modify + 패키지명 + 함수명
   - 사용예시 : modifyUserInfo, modifyCustomInfo

## 그 외 함수명 규칙

1. 초기화 함수 규칙

   1. init + 함수명(첫글자는 대문자)
   2. 사용예시 : initFilter, initMemberList

2. 페이지 이동 함수 규칙

   1. go + 페이지명(첫글자는 데문자)
   2. 사용예시 : goNoticeList, goNoticeDetail

3. 존재여부 체크 함수 규칙
   1. is + 함수명(첫글자는 대문자)
   2. 사용예시 : isMemberId, isUserInfo
4. 이벤트 처리 함수 규칙
   1. on + event명 + 함수명
   2. ex) @change="onChangeFileInfo" ,@click="onClickInitBtn" ...

# Vue Rules

- API Styles 은 Composition API 생성한다.
- Script 는 Setup 필수

```javascript
<script setup>...</script>
```

- Bind, Event, Class, Style, href 문법같이 Shorthand 가 지원되는 모든 항목은 Shorthand 로 처리한다.

## Reactivity: Core

Object 나 Array 인 경우 아래와 같이 선언 ( reactive )

```javascript
const state = reactive({ count: 0 })
```

String, Number, Boolean .. 등은 아래와 같이 선언 ( ref )

```javascript
const value = ref('variable')
const value = ref(1234)
const isNumber = ref(true)
```

computed 예시

```javascript
const count = ref(1)
const plusOne = computed(() => count.value + 1)

console.log(plusOne.value)
```

watch 예시

```javascript
// **_ 최대한 지양 _**
watch(data, (data) => {
  console.log(data)
})
```

## Lifecycle Hooks

## Vue 3 Composition API에서 Vue 수명 주기 후크 사용

beforeCreateand created(메서드 자체로 대체됨 )

- onBeforeMount– 마운팅이 시작되기 전에 호출
- onMounted– 컴포넌트가 마운트될 때 호출
- onBeforeUpdate– 반응형 데이터가 변경될 때와 다시 렌더링하기 전에 호출됩니다.
- onUpdated– 다시 렌더링 후 호출
- onBeforeUnmount– Vue 인스턴스가 파괴되기 전에 호출
- onUnmounted– 인스턴스가 소멸된 후 호출
- onActivated– keep-alive 구성 요소가 활성화될 때 호출됩니다.
- onDeactivated– keep-alive 구성 요소가 비활성화될 때 호출됩니다.
- onErrorCaptured– 하위 구성 요소에서 오류가 캡처될 때 호출됩니다.

# 변수 용어 통일

## props

- props 호출 (Camel Casing)

```javascript
const props = defineProps({
  headTitle: {
    type: String,
    required: true,
    default: ''
  }
})
```

- 바인딩 (Pascal Casing)

```html
<!-- 상수 바인딩시 -->
<div head-title="example"></div>
<!-- 변수 바인딩시-->
<div :head-title="example"></div>
```

## emit

- emit 선언

```javascript
const emit = defineEmits(['getChecked'])

emit('getChecked', result)
```

- emit 호출 (Pascal Casing)

```javascript
function getLog(result) {
  console.log(result)
}
```

```html
<Component @get-checked="(result) => getLog(result)"></div>
```

# Routing 사용 (vue-router)

Route 는 모두 소문자를 사용하고 단어는 붙이지 않고 분리함.

- board/notice
- board/notice/detail
- board/notice/regist

## router 선언

- 페이지가 추가되면 router/sample.js 처럼 파일 생성후 index.js에 추가
- 컴포넌트명을 제외한 path 값은 모두 소문자로 사용

```javascript
// index.js
import Sample from '@/router' // 추가할 router

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/DefaultLayout.vue'),
      children: [
        {
          path: '/',
          component: Home
        }
      ]
    },
    {
      path: '/login',
      component: () => import('@/layouts/EmptyLayout.vue'),
      children: [
        {
          path: '',
          component: () => import('@/views/Login.vue')
        }
      ]
    },
    ...Sample // 추가할 router
  ]
})
```

```javascript
// sample.js
export default [
  {
    // 샘플
    path: '/sample',
    component: () => import('@/layouts/DefaultLayout.vue'),
    children: [
      {
        // 샘플목록
        path: 'list',
        component: () => import('@/views/sample/SampleList.vue')
      },
      {
        // 샘플상세
        path: 'detail/:sampleParam',
        component: () => import('@/views/sample/SampleDetail.vue')
      }
    ]
  }
]
```

## Routing navigate 사용

useRouter : 페이지이동시 사용

- push : URL 이동. 히스토리 스택에 추가되므로 뒤로가기 버튼 동작시 이전 URL 로 이동
- replace : URL 이동. 현재 URL 을 대체하기 때문에 히스토리 스택 쌓지 않음
- go : 숫자만큼 뒤로가기 또는 앞으로 가기 (음수:backward, 양수: forward)

```javascript
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const onLogin = () => {
  router.replace({ path: '/' })
  // router.push({ path: "/" });
  // router.go({ path: "/" });
}
```

```html
<button @click="onLogin" class="btn btn_primary full md">로그인</button>
```

`<a> tag` 와 같은 링크는 `<router-link> Tag` 사용

```html
<router-link :to="`/board/notice">
  <span>목록</span>
</router-link>
```

## Routing params 사용

useRoute : params, query를 호출할때 사용

```javascript
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
const sampleParam = route.params.sampleParam
console.log(sampleParam)
```

# Pinia (Global State 관리)

- 선언

```javascript
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
```

-호출;

```javascript
import { useCounterStore } from '@/stores/pinia.js'

const counter = useCounterStore()
console.log(counter.count)
```

# validation

- Form으로 감싸주고, input은 Field로 대체
- 기본적으로 rules는 라이브러리에 내장된 validation을 쓴다.
- 기본 rules에 없는 rule은 validation.js에서 추가. 아래 추가하는 법 참고
- 내장된 rule

  - "\_default": "{field} 항목의 값이 유효하지 않습니다"
  - "alpha": "{field} 항목에는 영문자만 사용할 수 있습니다"
  - "alpha*dash": "{field} 항목에는 영문자, 숫자, 대시(-)와 언더스코어(*)만 사용할 수 있습니다"
  - "alpha_num": "{field} 항목에는 영문자와 숫자만 사용할 수 있습니다"
  - "alpha_spaces": "{field} 항목에는 영문자와 공백만 사용할 수 있습니다"
  - "between": "{field} 항목의 값은 0:{min}에서 1:{max} 사이여야 합니다"
  - "confirmed": "{field} 항목의 값이 일치하지 않습니다"
  - "digits": "{field} 항목의 값은 0:{length}자리의 숫자여야 합니다"
  - "dimensions": "{field} 항목의 크기는 가로 0:{width}픽셀, 세로 1:{height}픽셀이어야 합니다"
  - "email": "{field} 항목의 값은 유효한 이메일 형식이어야 합니다"
  - "not_one_of": "{field} 항목의 값이 유효하지 않습니다"
  - "ext": "{field} 항목은 유효한 파일이 아닙니다"
  - "image": "{field} 항목은 이미지 파일이어야 합니다"
  - "integer": "{field} 항목의 값은 정수여야 합니다"
  - "length": "{field} 항목의 길이는 0:{length}글자여야 합니다"
  - "max_value": "{field} 항목의 값은 0:{max} 이하여야 합니다"
  - "max": "{field} 항목은 최대 0:{length}글자 이하여야 합니다"
  - "mimes": "{field} 항목은 유효한 파일 형식이 아닙니다"
  - "min_value": "{field} 항목의 값은 0:{min} 이상이어야 합니다"
  - "min": "{field} 항목은 최소 0:{length}글자 이상이어야 합니다"
  - "numeric": "{field} 항목에는 숫자만 사용할 수 있습니다"
  - "one_of": "{field} 항목의 값이 유효하지 않습니다"
  - "regex": "{field} 항목은 형식에 맞지 않습니다"
  - "required": "{field} 항목은 필수 입력 항목입니다"
  - "required_if": "{field} 항목은 필수 입력 항목입니다"
  - "size": "{field} 항목의 크기는 0:{size}KB보다 작아야 합니다"
  - "url": "{field} 항목은 유효한 URL이 아닙니다"

- 내장된 rule 사용시 ko.json기준으로 {field}는 name값과 매칭된다.
- rules 여러개 적용시 |로 구분해주며, 순서대로 적용된다.
- main.js에서 global 컴포넌트로 선언

```javascript

<Form @submit="onSubmit" v-slot="{ errors }">
    <div>
      <p>휴대폰번호</p>
      <Field name="휴대폰번호" rules="required|numeric|length:11" />
      {/* 내장된 rule 사용시 Field name과 맞춰주면 매칭된다. 위치는 무관 */}
      {{ errors.휴대폰번호 }}
    </div>
    <div>
      <p>나이</p>
      <Field name="나이" rules="numeric" />
      {{ errors.나이 }}
    </div>

    <button>Submit</button>
</Form>
```

2. `select`의 경우 (추가한 rule 사용 예)

```javascript
<Form @submit="onSubmit" v-slot="{ errors }">
{/* as="select" 추가 */}
{/* rules="rule명:rule에 넘겨줄 값" */}
    <Field name="select" as="select" rules="required_select:구분">
      <option value="">test1</option>
      <option value="test2">test2</option>
      <option value="test3">test3</option>
    </Field>
    {{ errors.select }}
  <button>Submit</button>
</Form>
```

3. type이 다를 경우에는 input 사용법과 같이 Field 태그 안에 type을 바꿔서 사용한다.  
   태그가 다른 경우에는 Field 태그 안에 as 속성을 추가해준다.

```javascript
<Form @submit="onSubmit" v-slot="{ errors }">
{/* type이 다른 경우 */}
  <Field
    name="drink"
    type="checkbox"
    value="커피"
    // 추가한 rule을 사용한 예시입니다.
    rules="required_check:음료"
  />
  <Field
    name="drink"
    type="checkbox"
    value="물"
    rules="required_check:음료"
  />
  {{ errors.drink }}

{/* as속성 사용한 경우 */}
  <Field name="소개글"
  // 라이브러리 기본 내장 rule을 사용한 예시입니다.
    rules="required"
    as="textarea"
    rows="2"
  />
  {{errors.소개글}}

  <button>Submit</button>
</Form>
```

4. `두 가지 필드를 비교`해서 validation 해야하는 경우 (추가한 rule 사용 예)  
   ex) 시작날짜, 종료날짜 비교

```javascript
<Form @submit="onSubmit" v-slot="{ errors }">
<Field name="startDay" type="date">

  {/* rules="date:@startDay"
   => date룰을 사용하되, startDay를 target으로 한다 */}
    <Field name="endDay" type="date" rules="date:@startDay">
    {{ errors.endDay }}
    <button>Submit</button>
</Form>
```

## rule 추가

- validation.js에서 추가한다

1. enum.js에서 error text 추가

```javascript
export const emptySelectErrorMsg = (field) => `${field} 항목은 필수 선택 항목입니다`
```

2. validation.js에서 rule 추가

```javascript
import { defineRule } from 'vee-validate'
import { emptySelectErrorMsg } from '@/assets/js/morning/enum'
import { isEmpty } from '@/assets/js/morning/utils'

// field는 받아올 변수명
defineRule('required_select', (value, [field]) => {
  if (isEmpty(value)) {
    return emptySelectErrorMsg(field)
  }
  return true
})
```

- 위 4번과 같은 경우

```javascript
import { startDayExcessErrorMsg, emptyDateErrorMsg } from '@/assets/js/morning/enum'

// value가 endDay의 value,
// field가 target인 startDay의 value가 된다
defineRule('date', (value, [field]) => {
  if (field > value) {
    return startDayExcessErrorMsg
  }
  if ((isEmpty(field) && value) || (isEmpty(value) && field)) {
    return emptyDateErrorMsg
  }
  return true
})
```

# 출력하기 (print-js)

## JSON Array 방식

### 간단한 테이블구조와 Footer가 없는 경우 사용

```javascript
import { printList } from '@/assets/js/util'

### data - 조회 데이터, fieldList 헤더 {field : '변수명', fieldName : 표시될 헤더명}
const data = [
  { no: 1, name: '홍길동', age: 20, salary: 5000 },
  { no: 2, name: '권길동', age: 22, salary: 6000 },
  { no: 3, name: '박길동', age: 24, salary: 10000 },
  { no: 4, name: '김길동', age: 26, salary: 15000 },
  { no: 5, name: '임길동', age: 27, salary: 17000 },
  { no: 6, name: '전길동', age: 30, salary: 20000 },
  { no: 7, name: '윤길동', age: 33, salary: 25000 }
]

const fieldList = [
  { field: 'no', displayName: 'No' },
  { field: 'name', displayName: '이름' },
  { field: 'age', displayName: '나이' },
  { field: 'salary', displayName: '급여' }
]


printList(data, fieldList)


```

## HTML 방식

### 복잡한 테이블 구조와 Footer 데이터가 있는 경우

## FIXME 해당 함수는 로직 수정이 필요함

```javascript
import { printHtml } from '@/assets/js/util'

### 출력할 영역의 id 값
printHtml('printArea')
```

# 공통 팝업 (Alert, Confirm, SearchAddressInfo)

## Alert

```javascript
import { useAlertStore } from '@/stores/modal'

const alert = useAlertStore()

//alert.open(alert 메시지, 콜백함수)
//콜백함수, 타이틀 옵션은 생략 가능

alert.open('저장되었습니다', () => {})
```

## Confirm

```javascript
import { useConfirmStore } from '@/stores/modal'

const confirm = useConfirmStore()

//confirm.confirmOpen(메시지, 확인 콜백함수, 닫기 콜백함수)
//확인, 닫기 콜백함수 생략 가능
confirm.open(
  '저장하시겠습니까?',
  () => {
    save()
  },
  () => {}
)
```

## 우편번호 찾기

### FIXME 현재 다음우편번호 기반으로 개발 ( 추후에 다음 주소 API 사용 안할시 변경 필요함)

<SearchAddressPop @address-info="addressPopSubmit" />

### 팝업 열기

```javascript
ui.LayerPop.Show('#address_popup')
```

### 우편번호 및 주소 불러오기

```javascript
// data.zonecode : 우편번호, data.address : 한글도로명주소,
// data.engAddress : 영문도로명주소
const addressPopSubmit = (data) => {
  ui.LayerPop.Closed('#address_popup')
  address.postcode = data.zonecode
  address.basicAddr = data.address
  document.getElementById('dtlAddr').focus()
}
```

## Pagination

```javascript

// number : 현재 페이지 넘버
// totalCount : 데이터 총 갯수
// recordSize : n개씩 보기
const pageList3 = reactive({
  number: 1,
  totalCount: 150,
  recordSize: 10
})

//@change-page : 해당 페이지 넘버 및 다음, 이전 버튼 클릭시 발생
<Pagination :pageInfo="pageList3" @change-page="changePage" />
```

# FIXME ckeditor.js 이미지 업로드 관련 API나오면 수정이 필요함 (현재 이미지 업로드 불가)

## Editor

```javascript
import Editor from '@/components/common/Editor.vue'

 <Editor
    :contentData="editorData.data == null ? '' : editorData.data"
    v-model="editorData.data"
    @change-data="(data) => (editorData.data = data)"
  />

```
