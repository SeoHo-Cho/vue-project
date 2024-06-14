<template>
  <div class="mainBox">
    <div class="titleBox">그리드 기본</div>
    <div class="ConBox">
      <Grid grid-id="test1" @rendered="onRendered" />
      <!-- <div id="realgrid" class="realgrid"></div> -->
    </div>
  </div>

  <div class="mainBox">
    <div class="titleBox">추가, 수정, 삭제</div>
    <div class="ConBox">
      <div style="display: flex; float: right">
        <button type="button" class="baseBtn" @click="addRow">
          <span class="base">추가</span></button
        >&nbsp;
        <button type="button" class="baseBtn" @click="delRow">
          <span class="base">삭제</span>
        </button>
      </div>
      <br /><br />
      <Grid grid-id="test2" @rendered="onRendered2" />
      <!-- <div id="realgrid" class="realgrid"></div> -->
    </div>
  </div>

  <div class="mainBox">
    <div class="titleBox">그리드 셀 병합</div>
    <div class="ConBox">
      <Grid grid-id="test3" @rendered="onRendered3" />
      <!-- <div id="realgrid" class="realgrid"></div> -->
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue'

const tableData = [
  { name: '홍길동', age: 20, salary: 5000 },
  { name: '권길동', age: 22, salary: 6000 },
  { name: '박길동', age: 24, salary: 10000 },
  { name: '김길동', age: 26, salary: 15000 },
  { name: '임길동', age: 27, salary: 17000 },
  { name: '전길동', age: 30, salary: 20000 },
  { name: '윤길동', age: 33, salary: 25000 }
]

const tableData2 = [
  { name: '홍길동', age: 20, salary: 5000 },
  { name: '권길동', age: 22, salary: 6000 },
  { name: '박길동', age: 24, salary: 10000 },
  { name: '김길동', age: 26, salary: 15000 },
  { name: '임길동', age: 27, salary: 17000 },
  { name: '전길동', age: 30, salary: 20000 },
  { name: '윤길동', age: 33, salary: 25000 }
]

const tableData3 = [
  { name: '홍길동', age: 20, salary: 5000 },
  { name: '권길동', age: 22, salary: 6000 },
  { name: '박길동', age: 24, salary: 10000 },
  { name: '김길동', age: 26, salary: 15000 },
  { name: '임길동', age: 27, salary: 17000 },
  { name: '전길동', age: 30, salary: 20000 },
  { name: '윤길동', age: 33, salary: 25000 }
]

const tempSum = 99999

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
    // footer: { expression: 'sum' },
    footer: { expression: `${tempSum}` },
    width: 150
  }
]

const footerCellLayout = [
  {
    name: 'cellGroup',
    // footer의 cell은 header를 바라봄 -> header에 셀을 병합하여 만들고 visible: false로 가려줌
    header: { visible: false },
    direction: 'horizontal',
    items: [{ column: 'name', footerUserSpans: [{ rowspan: 2, colspan: 2 }] }, 'age']
  },
  'salary'
]

const grid1 = reactive({
  dataProvider: null,
  gridView: null
})

const grid2 = reactive({
  dataProvider: null,
  gridView: null
})

const grid3 = reactive({
  dataProvider: null,
  gridView: null
})

const onRendered = (data) => {
  grid1.dataProvider = data.dataProvider
  grid1.gridView = data.gridView
}

const onRendered2 = (data) => {
  grid2.dataProvider = data.dataProvider
  grid2.gridView = data.gridView
}
const onRendered3 = (data) => {
  grid3.dataProvider = data.dataProvider
  grid3.gridView = data.gridView
}

const addRow = () => {
  var row = grid2.gridView.getCurrent().dataRow
  grid2.dataProvider.insertRow(row, {})
}

const delRow = () => {
  let curr = grid2.gridView.getCurrent()
  grid2.dataProvider.removeRow(curr.dataRow)
}

onMounted(() => {
  grid1.dataProvider.setFields(field)
  grid1.gridView.setColumns(column)
  grid1.gridView.setDataSource(grid1.dataProvider)
  grid1.dataProvider.fillJsonData(tableData, { fillMode: 'set' })

  grid2.dataProvider.setFields(field)
  grid2.gridView.setColumns(column)
  grid2.gridView.setDataSource(grid2.dataProvider)
  grid2.dataProvider.fillJsonData(tableData, { fillMode: 'set' })
  grid2.gridView.setFooter({ visible: false })
  grid2.gridView.editOptions.insertable = true
  grid2.gridView.editOptions.appendable = true
  grid2.dataProvider.softDeleting = true
  grid2.dataProvider.deleteCreated = true
  grid2.gridView.hideDeletedRows = false

  grid3.dataProvider.setFields(field)
  grid3.gridView.setColumns(column)
  grid3.gridView.setDataSource(grid1.dataProvider)
  grid3.dataProvider.fillJsonData(tableData, { fillMode: 'set' })

  // 셀병합
  grid3.gridView.setColumnLayout(footerCellLayout)
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

.realgrid {
  width: 100%;
  height: 440px;
}
</style>
