<template>
  <h2>공통 함수 샘플</h2>

  <div class="mainBox">
    <div class="titleBox"><span>isEmpty - 비어있는 값 체크</span></div>
    <div class="ConBox">
      <span>isEmpty('샘플')</span><br /><span> -> </span> <span class="result">{{ isEmptyFalse }}</span
      ><br /><br />
      <span>isEmpty(null)</span><br /><span> -> </span> <span class="result">{{ isEmptyTrue }}</span
      ><br /><br />
    </div>
  </div>
  <div class="mainBox">
    <div class="titleBox"><span>isEmptyReturnHyphen - 빈값이면 '-' 표시</span></div>
    <div class="ConBox">
      <span>isEmptyReturnHyphen('')</span><br /><span> -> </span>
      <span class="result">{{ isEmptyReturnHyphen('') }}</span>
    </div>
  </div>
  <div class="mainBox">
    <div class="titleBox"><span>배열 관련</span></div>
    <div class="ConBox">
      <span>isDuplicateArray(array) 배열 내부값 중복 체크 (array[1, 2, 2, 4, 5])</span><br /><span> -> </span>
      <span class="result">{{ isDuplicateArray(arrayData) }}</span
      ><br /><br />
      <span>isDuplicateArrayPushValue(array, 2) 배열 내부값 중복 체크 (array[1, 2, 3, 4, 5])</span><br /><span> -> </span>
      <span class="result">{{ isDuplicateArrayPushValue(arrayData2, 2) }}</span>
    </div>
  </div>
  <div class="mainBox">
    <div class="titleBox"><span>thousandSeparator - 숫자 3자리 마다 ',' 표시</span></div>
    <div class="ConBox">
      <span>thousandSeparator(1500000)</span><br /><span> -> </span>
      <span class="result">{{ thousandSeparator(1500000) }}</span>
    </div>
  </div>
  <div class="mainBox">
    <div class="titleBox"><span> 날짜 관련 함수</span></div>
    <div class="ConBox">
      <span>getToday() -- 현재날짜</span><br /><span> -> </span> <span class="result">{{ getToday() }}</span
      ><br /><br />
      <span>getFullYear() -- 현재년도</span><br /><span> -> </span> <span class="result">{{ getFullYear() }}</span
      ><br /><br />
      <span>getCurrentMonth() -- 현재년월</span><br /><span> -> </span> <span class="result">{{ getCurrentMonth() }}</span
      ><br /><br />
      <span>getAfterDay(90) -- 현재날짜 기준 90일 이후 날짜</span><br /><span> -> </span> <span class="result">{{ getAfterDay(90) }}</span
      ><br /><br />
      <span>getBeforeDay(90) -- 현재날짜 기준 90일 이전 날짜 </span><br /><span> -> </span> <span class="result">{{ getBeforeDay(90) }}</span
      ><br /><br />
      <span>dateBetween('2024-05-09', '2024-05-30') -- 날짜연산(yyyy-mm-dd)</span><br /><span> -> </span>
      <span class="result">{{ dateBetween('2024-05-09', '2024-05-30') }}</span
      ><br /><br />
      <span>dateOperation('2024-05-09', '2024-05-30', 'day') -- 날짜연산(yyyy-mm-dd) 일 기준</span><br /><span> -> </span>
      <span class="result">{{ dateOperation('2024-05-09', '2024-05-30', 'day') }}</span
      ><br /><br />
      <span>dateOperation('2024-05-09', '2024-06-30', 'month') -- 날짜연산(yyyy-mm-dd) 월 기준</span><br /><span> -> </span>
      <span class="result">{{ dateOperation('2024-05-09', '2024-06-30', 'month') }}</span
      ><br /><br />
      <span>dateOperation('2024-05-09', '2025-05-30', 'year') -- 날짜연산(yyyy-mm-dd) 년 기준</span><br /><span> -> </span>
      <span class="result">{{ dateOperation('2024-05-09', '2025-05-30', 'year') }}</span
      ><br /><br />
    </div>
  </div>
  <div class="mainBox">
    <div class="titleBox"><span>hyphenPhoneString - 전화번호 형식으로 변환</span></div>
    <div class="ConBox">
      <span>hyphenPhoneString('01012341234')</span><br /><span> -> </span>
      <span class="result">{{ hyphenPhoneString('01012341234') }}</span>
    </div>
  </div>
  <div class="mainBox">
    <div class="titleBox"><span>removeHyphen - '-' 제거</span></div>
    <div class="ConBox">
      <span>removeHyphen('010-1234-1234')</span><br /><span> -> </span>
      <span class="result">{{ removeHyphen('010-1234-1234') }}</span>
    </div>
  </div>
  <div class="mainBox">
    <div class="titleBox"><span>엑셀다운로드</span></div>
    <div class="ConBox">
      <button type="button" @click="onClickDownloadExcel" class="baseBtn"><span class="base">엑셀 다운로드</span></button>&nbsp;
      <button type="button" @click="printList(tableData, fieldList)" class="baseBtn"><span class="base">출력하기 (JSON)</span></button>&nbsp;
      <button type="button" @click="printHtml('dataList')" class="baseBtn"><span class="base">출력하기 (HTML)</span></button>&nbsp;<br /><br />
      <div id="dataList">
        <table>
          <colgroup>
            <col v-for="(item, key) in columnList" :key="key" :style="`width:${item}`" />
          </colgroup>
          <thead>
            <tr>
              <th v-for="(item, key) in columnList" :key="key">{{ key }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, key) in tableData" :key="key">
              <td>{{ item.no }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.age }}</td>
              <td>{{ thousandSeparator(item.salary) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="mainBox">
    <div class="titleBox"><span>우편번호 찾기</span></div>
    <div class="ConBox">
      <input type="text" placeholder="우편번호" style="width: 150px" v-model="address.postcode" />&nbsp;
      <button type="button" class="baseBtn" @click="addressPopClick"><span class="base">우편번호 찾기</span></button>&nbsp;
      <input type="text" placeholder="기본주소" style="width: 400px" v-model="address.basicAddr" />&nbsp;
      <input type="text" placeholder="상세주소" id="dtlAddr" style="width: 450px" v-model="address.dtlAddr" />
    </div>
  </div>
  <SearchAddressPop @address-info="addressPopSubmit" />
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import {
  isEmpty,
  isEmptyReturnHyphen,
  thousandSeparator,
  getToday,
  getFullYear,
  getCurrentMonth,
  getAfterDay,
  getBeforeDay,
  hyphenPhoneString,
  removeHyphen,
  dateBetween,
  dateOperation,
  isDuplicateArray,
  isDuplicateArrayPushValue,
  excelFileDownloadByArray,
  printList,
  printHtml
} from '@/assets/js/util.js'

const isEmptyTrue = ref('')
const isEmptyFalse = ref('')
const arrayData = [1, 2, 2, 3, 4, 5]
const arrayData2 = [1, 2, 3, 4, 5]
const popupOpen = ref(false)

isEmptyTrue.value = isEmpty(null)
isEmptyFalse.value = isEmpty('샘플')

const fieldList = [
  { field: 'no', displayName: 'No' },
  { field: 'name', displayName: '이름' },
  { field: 'age', displayName: '나이' },
  { field: 'salary', displayName: '급여' }
]

const tableData = [
  { no: 1, name: '홍길동', age: 20, salary: 5000 },
  { no: 2, name: '권길동', age: 22, salary: 6000 },
  { no: 3, name: '박길동', age: 24, salary: 10000 },
  { no: 4, name: '김길동', age: 26, salary: 15000 },
  { no: 5, name: '임길동', age: 27, salary: 17000 },
  { no: 6, name: '전길동', age: 30, salary: 20000 },
  { no: 7, name: '윤길동', age: 33, salary: 25000 }
]

const columnList = {
  No: '50px',
  이름: '150px',
  나이: '100px',
  급여: '150px'
}

const excelColumnList = {
  no: 'No',
  name: '이름',
  age: '나이',
  salary: '급여'
}

const address = reactive({
  postcode: '',
  basicAddr: '',
  dtlAddr: ''
})

const onClickDownloadExcel = () => {
  excelFileDownloadByArray(tableData, excelColumnList, `테스트`)
}

const addressPopClick = () => {
  ui.LayerPop.Show('#address_popup')
  popupOpen.value = true
}

const addressPopSubmit = (data) => {
  console.log(data)
  ui.LayerPop.Closed('#address_popup')
  address.postcode = data.zonecode
  address.basicAddr = data.address
  document.getElementById('dtlAddr').focus()
  popupOpen.value = false
}
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
