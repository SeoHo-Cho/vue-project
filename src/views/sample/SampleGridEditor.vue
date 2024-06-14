<template>
  <div class="mainBox">
    <div class="titleBox">그리드 에디터 수정 테스트</div>
    <div class="ConBox">
      <div style="display: flex; gap: 6px; justify-content: flex-end">
        <button type="button" class="baseBtn" @click="addRow">
          <span class="base">추가</span>
        </button>
        <button type="button" class="baseBtn" @click="delRow">
          <span class="base">삭제</span>
        </button>
        <button type="button" class="baseBtn" @click="onSaveData">
          <span class="base">저장</span>
        </button>
        <button type="button" class="baseBtn" @click="onResetData">
          <span class="base">리셋</span>
        </button>
      </div>
      <Grid grid-id="test1" @rendered="onRendered" />
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'

let tableData = [
  { name: '홍길동', age: 20, salary: 5000 },
  { name: '권길동', age: 22, salary: 6000 },
  { name: '박길동', age: 24, salary: 10000 }
]

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

const grid = reactive({
  dataProvider: null,
  gridView: null
})

const onRendered = (data) => {
  grid.dataProvider = data.dataProvider
  grid.gridView = data.gridView
}

const addRow = () => {
  var row = grid.gridView.getCurrent().dataRow
  if (row === -1) row = grid.dataProvider.getRowCount()
  grid.dataProvider.insertRow(row, {})
}

const delRow = () => {
  let curr = grid.gridView.getCurrent()
  grid.dataProvider.removeRow(curr.dataRow)
}

const onSaveData = () => {
  grid.gridView.commit(true)
  const { currentData, modifiedData } = getGridData()
  if (JSON.stringify(currentData) !== JSON.stringify(tableData)) {
    tableData = currentData
    grid.dataProvider.fillJsonData(tableData, { fillMode: 'set' })
    console.log('@@@@ 수정 데이터 @@@@')
    console.table(modifiedData)
  }
}

const onResetData = () => {
  const { currentData } = getGridData()
  if (JSON.stringify(currentData) !== JSON.stringify(tableData)) {
    grid.dataProvider.fillJsonData(tableData, { fillMode: 'set' })
    console.log('@@@@ 리셋 데이터 @@@@')
    console.table(tableData)
  }
}

const getGridData = () => {
  const gridAllData = grid.dataProvider.getJsonRows(0, -1, { rowState: true })
  const currentData = gridAllData.reduce((acc, { __rowState, ...rest }) => {
    if (__rowState !== 'deleted') {
      acc.push(rest)
    }
    return acc
  }, [])
  const modifiedData = gridAllData.filter(({ __rowState }) => __rowState !== 'none')
  return { currentData, modifiedData }
}

onMounted(() => {
  grid.dataProvider.setFields(field)
  grid.gridView.setColumns(column)
  grid.gridView.setDataSource(grid.dataProvider)
  grid.dataProvider.fillJsonData(tableData, { fillMode: 'set' })
  grid.gridView.editOptions.editable = true
  grid.gridView.editOptions.insertable = true
  grid.gridView.editOptions.appendable = true
  grid.dataProvider.softDeleting = true
  grid.dataProvider.deleteCreated = true
  grid.gridView.hideDeletedRows = false
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
  margin-top: 10px;
}
</style>
