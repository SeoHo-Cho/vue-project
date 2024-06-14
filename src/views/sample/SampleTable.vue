<template>
  <h2>테이블 샘플</h2>

  <div class="mainBox">
    <div class="titleBox">데이터가 없을때<span></span></div>
    <div class="ConBox">
      <div class="contTable auto">
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
            <tr v-if="tableData.length === 0">
              <td colspan="4" class="noArticle">
                <p class="no_article">데이터가 없습니다</p>
              </td>
            </tr>
            <tr v-for="(item, key) in tableData" :key="key">
              <td>{{ item.no }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.age }}</td>
              <td>{{ thousandSeparator(item.salary) }}</td>
            </tr>
          </tbody>
        </table>
        <br />
        <Pagination :pageInfo="pageList" />
      </div>
    </div>
  </div>
  <div class="mainBox">
    <div class="titleBox">데이터가 10개 미만일 때<span></span></div>
    <div class="ConBox">
      <div class="contTable auto">
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
            <tr v-if="tableData2.length === 0">
              <td colspan="4" class="noArticle">
                <p class="no_article">데이터가 없습니다</p>
              </td>
            </tr>
            <tr v-else v-for="(item, key) in tableData2" :key="key">
              <td>{{ key + 1 }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.age }}</td>
              <td>{{ thousandSeparator(item.salary) }}</td>
            </tr>
          </tbody>
        </table>
        <br />
        <Pagination :pageInfo="pageList2" />
      </div>
    </div>
  </div>

  <div class="mainBox">
    <div class="titleBox">데이터가 10개 이상일 때<span></span></div>
    <div class="ConBox">
      <div class="contTable auto">
        <div style="float: right; margin-top: 15px; margin-right: 30px">
          <select v-model="pageList3.recordSize" @change="changePage(pageList3.number)">
            <option value="10">10개씩 보기</option>
            <option value="30">30개씩 보기</option>
            <option value="100">100개씩 보기</option>
          </select>
        </div>
        <br /><br />
        <table>
          <colgroup>
            <col v-for="(item, key) in columnList" :key="key" :style="`width:${item}`" />
          </colgroup>
          <thead>
            <tr>
              <th v-for="(item, key) in columnList" :key="key">{{ key }}</th>
            </tr>
          </thead>
          <tbody v-if="tableData3.data.length === 0">
            <tr>
              <td colspan="4" class="noArticle">
                <p class="no_article">데이터가 없습니다</p>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr v-for="(item, key) in tableData3.temp" :key="key">
              <td>{{ item.no }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.age }}</td>
              <td>{{ thousandSeparator(item.salary) }}</td>
            </tr>
          </tbody>
        </table>
        <br />
        <Pagination :pageInfo="pageList3" @change-page="changePage" />
      </div>
    </div>
  </div>
  <div class="mainBox">
    <div class="titleBox">추가, 삭제, 수정<span></span></div>
    <div class="ConBox">
      <div style="width: 100%; height: 80px; padding: 25px; border: 1px solid #bdbdbd">
        <Form @submit="successAlert" @invalid-submit="FailedAlert" v-slot="{ errors }">
          <Field type="text" name="이름" rules="required" v-model="selectData.name" />&nbsp;&nbsp;
          <Field type="text" name="나이" rules="required|integer" v-model="selectData.age" />&nbsp;&nbsp;
          <Field type="text" name="급여" rules="required|integer" v-model="selectData.salary" />&nbsp;&nbsp;
          <button type="button" class="baseBtn" @click="updateData">
            <span class="base">저장</span>
          </button>
        </Form>
      </div>
      <div class="contTable auto" style="margin-top: 20px">
        <div style="float: right; margin-top: 15px; padding-right: 60px">
          <button type="button" class="baseBtn" @click="addList"><span class="base">추가</span></button>&nbsp;&nbsp;
          <button type="button" class="baseBtn" @click="delClick"><span class="base">삭제</span></button>&nbsp;&nbsp;
          <select v-model="pageList4.recordSize" @change="changePage2(pageList4.number)">
            <option value="10">10개씩 보기</option>
            <option value="30">30개씩 보기</option>
            <option value="100">100개씩 보기</option>
          </select>
        </div>
        <br /><br />
        <table>
          <colgroup>
            <col style="width: 50px" />
            <col v-for="(item, key) in columnList" :key="key" :style="`width:${item}`" />
          </colgroup>
          <thead>
            <tr>
              <th>
                <label class="inputBox only">
                  <input type="checkbox" v-model="checkAll" />
                  <span class="data"></span>
                </label>
              </th>
              <th v-for="(item, key) in columnList" :key="key">{{ key }}</th>
            </tr>
          </thead>
          <tbody v-if="tableData4.data.length === 0">
            <tr>
              <td colspan="5" class="noArticle">
                <p class="no_article">데이터가 없습니다</p>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr v-for="(item, key) in tableData4.temp" :key="key" @click="selectedData(item, key)">
              <td>
                <label class="inputBox only">
                  <input type="checkbox" :value="item" v-model="chkList" />
                  <span class="data"></span>
                </label>
              </td>
              <td>{{ key + 1 }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.age }}</td>
              <td>{{ thousandSeparator(item.salary) }}</td>
            </tr>
          </tbody>
        </table>
        <br />
        <Pagination :pageInfo="pageList4" @change-page="changePage2" />
      </div>
    </div>
  </div>
  <div class="mainBox">
    <div class="titleBox">리얼그리드<span></span></div>
    <div class="ConBox">
      <div id="realgrid"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useAlertStore, useConfirmStore } from '@/stores/modal'
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
import Pagination from '@/components/common/Pagination.vue'

const alert = useAlertStore()
const confirm = useConfirmStore()

const pageList = reactive({
  number: 1,
  totalCount: 0,
  recordSize: 10
})

const pageList2 = reactive({
  number: 1,
  totalCount: 7,
  recordSize: 10
})

const pageList4 = reactive({
  number: 1,
  totalCount: 7,
  recordSize: 10
})

const tableData = []

const tableData2 = [
  { name: '홍길동', age: 20, salary: 5000 },
  { name: '권길동', age: 22, salary: 6000 },
  { name: '박길동', age: 24, salary: 10000 },
  { name: '김길동', age: 26, salary: 15000 },
  { name: '임길동', age: 27, salary: 17000 },
  { name: '전길동', age: 30, salary: 20000 },
  { name: '윤길동', age: 33, salary: 25000 }
]

const tableData4 = reactive({
  data: [
    { no: 1, name: '홍길동', age: 20, salary: 5000 },
    { no: 2, name: '권길동', age: 22, salary: 6000 },
    { no: 3, name: '박길동', age: 24, salary: 10000 },
    { no: 4, name: '김길동', age: 26, salary: 15000 },
    { no: 5, name: '임길동', age: 27, salary: 17000 },
    { no: 6, name: '전길동', age: 30, salary: 20000 },
    { no: 7, name: '윤길동', age: 33, salary: 25000 }
  ],
  temp: []
})

pageList4.totalCount = computed(() => {
  return tableData4.data.length
})

var tableData3 = reactive({
  data: [],
  temp: []
})
var count = 1
for (var i = 0; i < 50; i++) {
  for (var j = 0; j < tableData2.length; j++) {
    tableData3.data.push({
      no: count,
      name: tableData2[j].name,
      age: tableData2[j].age,
      salary: tableData2[j].salary
    })
    count++
  }
}

const pageList3 = reactive({
  number: 1,
  totalCount: 0,
  recordSize: 10
})

pageList3.totalCount = computed(() => {
  return tableData3.data.length
})

const pagingDataPush = (target, recordSize, num) => {
  var startNum = 0
  var temp = []
  for (var i = 0; i < recordSize; i++) {
    startNum = (num - 1) * recordSize + i
    if (!isEmpty(target[startNum])) {
      temp.push(target[startNum])
    }
  }

  return temp
}

const changePage = (number) => {
  console.log(123123123)
  pageList3.number = number
  tableData3.temp = pagingDataPush(tableData3.data, pageList3.recordSize, number)
}

const changePage2 = (number) => {
  pageList4.number = number
  tableData4.temp = pagingDataPush(tableData4.data, pageList4.recordSize, number)
  console.log(tableData4.temp)
}

const columnList = {
  No: '50px',
  이름: '150px',
  나이: '100px',
  급여: '150px'
}

changePage(1)

changePage2(1)

const selectData = reactive({
  key: '',
  name: '',
  age: '',
  salary: ''
})

const selectedData = (item, key) => {
  selectData.key = key
  selectData.name = item.name
  selectData.age = item.age
  selectData.salary = item.salary
}

const updateData = () => {
  tableData4.data[selectData.key].name = selectData.name
  tableData4.data[selectData.key].age = selectData.age
  tableData4.data[selectData.key].salary = selectData.salary
}

const addList = () => {
  pageList4.number = 1

  tableData4.data.unshift({
    no: tableData4.data.length + 1,
    name: '',
    age: '',
    salary: ''
  })

  changePage2(1)

  selectData.key = 0
  selectData.name = ''
  selectData.age = ''
  selectData.salary = ''
}

const chkList = ref([])

const checkAll = computed({
  get() {
    return !(chkList.value.length !== tableData4.data.length || tableData4.data.length === 0)
  },
  set(e) {
    if (e) {
      for (let i = 0; i < tableData4.data.length; i++) {
        chkList.value.push(tableData4.data[i])
      }
    } else {
      chkList.value = []
    }
  }
})

const delList = () => {
  if (chkList.value.length != 0) {
    chkList.value.map((m) => {
      var findRow = tableData4.data.findIndex((v) => v.no === m.no)

      tableData4.data.splice(findRow, 1)

      changePage2(pageList4.number)
    })

    chkList.value = []

    alert.open('삭제되었습니다')
  } else {
    alert.open('삭제 될 데이터를 선택해주세요')
  }
}

const delClick = () => {
  console.log(alert)
  confirm.open('삭제하시겠습니까?', delList)
}

const successAlert = () => {
  alert('성공')
}

const FailedAlert = () => {
  alert('실패')
}

onMounted(() => {
  const container = document.getElementById('realgrid')
  const provider = new RealGrid.LocalDataProvider(false)

  const field = [
    {
      fieldName: 'name',
      dataType: 'text'
    },
    {
      fieldName: 'age',
      dataType: 'number'
    },
    {
      fieldName: 'salary',
      dataType: 'number'
    }
  ]
  const column = [
    {
      name: 'name',
      fieldName: 'name',
      header: { text: '이름' },
      width: 150
    },
    {
      name: 'age',
      fieldName: 'age',
      header: { text: '나이' },
      width: 100
    },
    {
      name: 'salary',
      fieldName: 'salary',
      header: { text: '급여' },
      width: 150
    }
  ]

  const gridView = new RealGrid.GridView(container)
  provider.setFields(field)
  gridView.setColumns(column)
  gridView.setDataSource(provider)
  gridView.displayOptions.fitStyle = 'evenFill'
  provider.fillJsonData(tableData4.data, { fillMode: 'set' })
})
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
  width: 100% !important;
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

.result {
  color: #ff0000;
}

#realgrid {
  width: 100%;
  height: 440px;
}
</style>
