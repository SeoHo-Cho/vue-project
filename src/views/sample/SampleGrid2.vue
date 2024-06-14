<template>
  <div class="mainBox">
    <div class="titleBox">커스텀 랜더러</div>
    <div class="ConBox">
      <div style="display: flex; float: right">
        <select v-model="pageList.recordSize" @change="changeSize">
          <option value="10">10개씩 보기</option>
          <option value="30">30개씩 보기</option>
          <option value="50">50개씩 보기</option>
        </select>
      </div>
      <Grid grid-id="sample1" :column="column" @rendered="onRendered" />
      <Pagination :pageInfo="pageList" @change-page="changePage" />
    </div>
  </div>

  <div class="mainBox">
    <div class="titleBox">헤더 병합(정산 - 매출결산조회 상세)</div>
    <div class="ConBox">
      <div style="float: right">
        <button type="button" class="baseBtn" @click="excelDownload"><span class="base">엑셀 다운로드</span></button>
      </div>
      <br /><br />
      <Grid grid-id="sample2" :column="column2" :columnLayout="columnLayout" @rendered="onRendered2" />
    </div>
  </div>

  <!-- TODO 출력하기 기능 확인 필요함  -->
  <!-- printJS 리얼그리드 출력 불가 (화면이 깨짐) -->
  <div class="mainBox">
    <div class="titleBox">푸터 병합(주문관리 - 주문서출력)</div>
    <div class="ConBox">
      <div style="float: right">
        <button type="button" class="baseBtn" @click="excelDownload2"><span class="base">엑셀 다운로드</span></button>&nbsp;&nbsp;
      </div>
      <br /><br />
      <div id="gridArea">
        <Grid
          grid-id="sample3"
          :column="column3"
          :column-layout="columnLayout2"
          @rendered="onRendered3"
          @on-cell-click="cellClick"
          @on-cell-dbl-click="cellDblClick"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useAlertStore } from '@/stores/modal'
import sampleService from '@/services/sample'
import { column, column2, column3, columnLayout, columnLayout2 } from '@/assets/column/sample/sampleGrid2'
import { printHtml } from '@/assets/js/util'

const alert = useAlertStore()

const sampleGrid = reactive({
  dataProvider: null,
  gridView: null
})

const sampleGrid2 = reactive({
  dataProvider: null,
  gridView: null
})

const sampleGrid3 = reactive({
  dataProvider: null,
  gridView: null
})

const postsList = reactive({
  data: [],
  totalCount: 0,
  recordSize: 10
})

const cellClick = (grid, clickData) => {
  console.log('clickData!!!', clickData)
  console.log('gridData!!!', grid)

  if (clickData.cellType != 'footer') {
    // 클릭한 rowIndex
    var row = clickData.dataRow
    //한 row 데이터 가져오기
    var rowData = sampleGrid3.dataProvider.getJsonRow(row)
    console.log('rowData', rowData)
    //한 row 데이터의 특정 컬럼 데이터 가져오기
    var maker = sampleGrid3.dataProvider.getValue(row, 'maker')
    console.log('maker ==> ', maker)
  }
}

const cellDblClick = (grid, clickData) => {
  console.log('clickDblData!!!')
}

const changeSize = () => {
  pageList.number = 1

  fetchData()
}

const excelDownload = () => {
  sampleGrid2.gridView.exportGrid({
    type: 'excel',
    target: 'local',
    fileName: 'GridSample.xlsx',
    indicator: true,
    header: true,
    footer: true,
    compatibility: true,
    done: function () {
      //내보내기 완료 후 실행되는 함수
      alert.open('done excel export')
    }
  })
}

const excelDownload2 = () => {
  sampleGrid3.gridView.exportGrid({
    type: 'excel',
    target: 'local',
    fileName: 'GridSample.xlsx',
    indicator: true,
    header: true,
    footer: true,
    compatibility: true,
    done: function () {
      //내보내기 완료 후 실행되는 함수
      alert.open('done excel export')
    }
  })
}

const onRendered = (data) => {
  Object.assign(sampleGrid, data)
}

const onRendered2 = (data) => {
  Object.assign(sampleGrid2, data)
}

const onRendered3 = (data) => {
  Object.assign(sampleGrid3, data)
}

const pageList = reactive({
  number: 1,
  recordSize: 10,
  totalCount: 0
})

const changePage = (number) => {
  pageList.number = number
  fetchData()
}

const fetchData = async () => {
  var param = {
    page: pageList.number - 1,
    limit: pageList.recordSize
  }

  const response = await sampleService.fetchList(param)
  Object.assign(postsList, {
    data: response.data.data,
    totalCount: response.data.total,
    recordSize: 10
  })

  pageList.totalCount = postsList.totalCount

  sampleGrid.dataProvider.fillJsonData(postsList.data, { fillMode: 'set' })

  sampleGrid.gridView.columnByName('lastName').setFooters([
    {
      text: pageList.number
    },
    { text: pageList.totalCount }
  ])
}

var tableData = [
  {
    transDate: '이월 미수',
    foodSalesRev: null,
    foodDeposit: null,
    foodReturn: null,
    foodReturnDeposit: null,
    foodCollectDeposit: null,
    foodSaleTotal: null,
    foodReturnTotal: null,
    foodTotal: null,
    foodHarp: null,
    foodPayout: null,
    foodPeriodOut: null,
    foodOutTotal: 15400829,
    drinkSaleRev: null,
    drinkDeposit: null,
    drinkReturn: null,
    drinkReturnDeposit: null,
    drinkCollectDeposit: null,
    drinkSaleTotal: null,
    drinkReturnTotal: null,
    drinkTotal: null,
    drinkHarp: null,
    drinkPayout: null,
    drnkPeriodOut: null,
    drinkOutTotal: 15400829
  },
  {
    transDate: '2024-01-05',
    foodSalesRev: 120000,
    foodDeposit: 12000,
    foodReturn: null,
    foodReturnDeposit: null,
    foodCollectDeposit: null,
    foodSaleTotal: 132000,
    foodReturnTotal: 0,
    foodTotal: null,
    foodHarp: 0,
    foodPayout: null,
    foodPeriodOut: 132000,
    foodOutTotal: 15532829,
    drinkSaleRev: 120000,
    drinkDeposit: 12000,
    drinkReturn: null,
    drinkReturnDeposit: null,
    drinkCollectDeposit: null,
    drinkSaleTotal: 132000,
    drinkReturnTotal: 0,
    drinkTotal: null,
    drinkHarp: 0,
    drinkPayout: null,
    drnkPeriodOut: 132000,
    drinkOutTotal: 15532829
  }
]

var tableData2 = [
  {
    maker: '농심',
    purchaser: '한국슈퍼마켓',
    goodsCd: 'N0001',
    barcode: '00010001',
    goods: '농심 새우깡',
    getBx: 10,
    getCs: 1,
    orderBx: 5,
    orderCs: 1,
    orderEa: 2,
    orderSupply: 1000,
    orderVat: 100
  },
  {
    maker: '하이트진로',
    purchaser: '한국슈퍼마켓',
    goodsCd: 'H0001',
    barcode: '00050005',
    goods: '진로',
    getBx: 20,
    getCs: 10,
    orderBx: 10,
    orderCs: 2,
    orderEa: 4,
    orderSupply: 2500,
    orderVat: 500
  }
]

const init = async () => {
  sampleGrid.gridView.setFooters({
    visible: true,
    items: [
      {
        height: 20
      },
      { height: 20 }
    ]
  })

  sampleGrid2.gridView.displayOptions.fitStyle = 'none'
  sampleGrid2.gridView.setFixedOptions({
    colCount: 1
  })
  sampleGrid2.gridView.header.heights = [25, 25, 50]
  sampleGrid2.dataProvider.fillJsonData(tableData, { fillMode: 'set' })

  sampleGrid2.gridView.setFooter({ visible: false })
  sampleGrid3.gridView.setFooters({
    visible: true,
    items: [
      {
        //styleName: "orange-column",   //개별 css 스타일 적용 필요시
        height: 40
      },
      {
        height: 40
      },
      {
        height: 40
      }
    ]
  })
  sampleGrid3.dataProvider.fillJsonData(tableData2, { fillMode: 'set' })
}

onMounted(() => {
  init()
  fetchData()
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

.footerStyle {
  height: 30px;
}

.footerStyle2 {
  height: 30px;
}
</style>
