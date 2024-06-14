import { ref } from 'vue'
import { thousandSeparator } from '@/assets/js/util'
export const column = ref([
  {
    name: 'title',
    fieldName: 'title',
    header: { text: '타이틀' },
    width: 150,
    dataType: 'text'
  },
  {
    name: 'firstName',
    fieldName: 'firstName',
    header: { text: '성' },
    width: 100,
    footers: [{ text: '현재 페이지' }, { text: '총 갯수' }],
    dataType: 'text'
  },
  {
    name: 'lastName',
    fieldName: 'lastName',
    header: { text: '이름' },
    width: 150,
    dataType: 'text'
  }
])

export const column2 = ref([
  {
    name: 'transDate',
    fieldName: 'transDate',
    header: { text: '거래일자' },
    width: 100,
    dataType: 'text'
  },
  {
    name: 'foodSalesRev',
    fieldName: 'foodSaleRev',
    header: { text: '판매매출' },
    width: 100,
    dataType: 'number',
    numberFormat: '#,###'
  },
  {
    name: 'foodDeposit',
    fieldName: 'foodDeposit',
    header: { text: '보증금' },
    width: 100,
    dataType: 'number',
    numberFormat: '#,###'
  },
  {
    name: 'foodReturn',
    fieldName: 'foodReturn',
    header: { text: '매출반품' },
    width: 100,
    dataType: 'number',
    numberFormat: '#,###'
  },
  {
    name: 'foodReturnDeposit',
    fieldName: 'foodReturnDeposit',
    header: { text: '매출반품\n보증금', styleName: 'multi-line-css' },
    width: 150,
    dataType: 'number',
    numberFormat: '#,###'
  },
  {
    name: 'foodCollectDeposit',
    fieldName: 'foodCollectDeposit',
    header: { text: '회수보증금' },
    width: 100,
    dataType: 'number',
    numberFormat: '#,###'
  },
  {
    name: 'foodSaleTotal',
    fieldName: 'foodSaleTotal',
    header: { text: '매출합계' },
    width: 100,
    dataType: 'number',
    numberFormat: '#,###'
  },
  {
    name: 'foodReturnTotal',
    fieldName: 'foodReturnTotal',
    header: { text: '매출반품\n합계', styleName: 'multi-line-css' },
    width: 100,
    dataType: 'number',
    numberFormat: '#,###'
  },
  {
    name: 'foodTotal',
    fieldName: 'foodTotal',
    header: { text: '총금액' },
    width: 100,
    dataType: 'number',
    numberFormat: '#,###'
  },
  {
    name: 'foodHarp',
    fieldName: 'foodHarp',
    header: { text: '수금' },
    width: 100,
    dataType: 'number',
    numberFormat: '#,###'
  },
  {
    name: 'foodPayout',
    fieldName: 'foodPayout',
    header: { text: '지불금' },
    width: 100,
    dataType: 'number',
    numberFormat: '#,###'
  },
  {
    name: 'foodPeriodOut',
    fieldName: 'foodPeriodOut',
    header: { text: '기간미수' },
    width: 100,
    dataType: 'number',
    numberFormat: '#,###'
  },
  {
    name: 'foodOutTotal',
    fieldName: 'foodOutTotal',
    header: { text: '미수금 총액' },
    width: 100,
    dataType: 'number',
    numberFormat: '#,###'
  },
  {
    name: 'drinkSalesRev',
    fieldName: 'drinkSaleRev',
    header: { text: '판매매출' },
    width: 100,
    dataType: 'number',
    numberFormat: '#,###'
  },
  {
    name: 'drinkDeposit',
    fieldName: 'drinkDeposit',
    header: { text: '보증금' },
    width: 100,
    dataType: 'number',
    numberFormat: '#,###'
  },
  {
    name: 'drinkReturn',
    fieldName: 'drinkReturn',
    header: { text: '매출반품' },
    width: 100,
    dataType: 'number',
    numberFormat: '#,###'
  },
  {
    name: 'drinkReturnDeposit',
    fieldName: 'drinkReturnDeposit',
    header: { text: '매출반품\n보증금', styleName: 'multi-line-css' },
    width: 100,
    dataType: 'number',
    numberFormat: '#,###'
  },
  {
    name: 'drinkCollectDeposit',
    fieldName: 'drinkCollectDeposit',
    header: { text: '회수보증금' },
    width: 100,
    dataType: 'number',
    numberFormat: '#,###'
  },
  {
    name: 'drinkSaleTotal',
    fieldName: 'drinkSaleTotal',
    header: { text: '매출합계' },
    width: 100,
    dataType: 'number',
    numberFormat: '#,###'
  },
  {
    name: 'drinkReturnTotal',
    fieldName: 'drinkReturnTotal',
    header: { text: '매출반품\n합계', styleName: 'multi-line-css' },
    width: 100,
    dataType: 'number',
    numberFormat: '#,###'
  },
  {
    name: 'drinkTotal',
    fieldName: 'drinkTotal',
    header: { text: '총금액' },
    width: 100,
    dataType: 'number',
    numberFormat: '#,###'
  },
  {
    name: 'drinkHarp',
    fieldName: 'drinkHarp',
    header: { text: '수금' },
    width: 100,
    dataType: 'number',
    numberFormat: '#,###'
  },
  {
    name: 'drinkPayout',
    fieldName: 'drinkPayout',
    header: { text: '지불금' },
    width: 100,
    dataType: 'number',
    numberFormat: '#,###'
  },
  {
    name: 'drinkPeriodOut',
    fieldName: 'drinkPeriodOut',
    header: { text: '기간미수' },
    width: 100,
    dataType: 'number',
    numberFormat: '#,###'
  },
  {
    name: 'drinkOutTotal',
    fieldName: 'drinkOutTotal',
    header: { text: '미수금 총액' },
    width: 100,
    dataType: 'number',
    numberFormat: '#,###'
  }
])

export const columnLayout = ref([
  'transDate',

  {
    name: 'foodGroup',
    direction: 'horizontal',
    items: [
      {
        name: 'foodSaleGroup',
        direction: 'horizontal',
        items: [
          'foodSalesRev',
          'foodDeposit',
          'foodReturn',
          'foodReturnDeposit',
          'foodCollectDeposit',
          'foodSaleTotal',
          'foodReturnTotal',
          'foodTotal'
        ],
        header: { text: '매출 및 매출반품 현황' }
      },
      {
        name: 'foodHarpGroup',
        direction: 'horizontal',
        items: ['foodHarp', 'foodPayout'],
        header: { text: '수금 현황' }
      },
      {
        name: 'foodPeriodGroup',
        direction: 'horizontal',
        items: ['foodPeriodOut', 'foodOutTotal'],
        header: { text: '미수 현황' }
      }
    ],
    header: { text: '매출결산 집계(주류+식잡,공산품)' }
  },
  {
    name: 'drinkGroup',
    direction: 'horizontal',
    items: [
      {
        name: 'drinkSaleGroup',
        direction: 'horizontal',
        items: [
          'drinkSalesRev',
          'drinkDeposit',
          'drinkReturn',
          'drinkReturnDeposit',
          'drinkCollectDeposit',
          'drinkSaleTotal',
          'drinkReturnTotal',
          'drinkTotal'
        ],
        header: { text: '매출 및 매출반품 현황' }
      },
      {
        name: 'drinkHarpGroup',
        direction: 'horizontal',
        items: ['drinkHarp', 'drinkPayout'],
        header: { text: '수금 현황' }
      },
      {
        name: 'drinkPeriodGroup',
        direction: 'horizontal',
        items: ['drinkPeriodOut', 'drinkOutTotal'],
        header: { text: '미수 현황' }
      }
    ],
    header: { text: '매출결산 집계(주류+식잡,공산품)' }
  }
])

export const column3 = ref([
  {
    name: 'maker',
    fieldName: 'maker',
    header: { text: '메이커' },
    width: 200,
    dataType: 'text',
    footers: [{ text: '주류 1건' }, { text: '일반 1건' }, { text: '총 2건' }]
  },
  {
    name: 'purchaser',
    fieldName: 'purchaser',
    header: { text: '매입처' },
    dataType: 'text',
    width: 200
  },
  {
    name: 'goodsCd',
    fieldName: 'goodsCd',
    header: { text: '상품코드' },
    width: 100,
    dataType: 'text'
  },
  {
    name: 'barcode',
    fieldName: 'barcode',
    header: { text: '바코드' },
    width: 200,
    dataType: 'text'
  },
  {
    name: 'goods',
    fieldName: 'goods',
    header: { text: '상품' },
    width: 250,
    dataType: 'text'
  },
  {
    name: 'getBx',
    fieldName: 'getBx',
    header: { text: 'BX' },
    width: 100,
    dataType: 'number',
    numberFormat: '#,###',
    footers: [{ text: '주류합계' }, { text: '일반합계' }, { text: '총 합계' }]
  },
  {
    name: 'getCs',
    fieldName: 'getCs',
    header: { text: 'CS' },
    width: 100,
    dataType: 'number',
    numberFormat: '#,###'
  },
  {
    name: 'orderBx',
    fieldName: 'orderBx',
    header: { text: 'BX' },
    width: 100,
    dataType: 'number',
    numberFormat: '#,###',
    footers: [{ text: 10 }, { text: 5 }, { text: 15 }]
  },
  {
    name: 'orderCs',
    fieldName: 'orderCs',
    header: { text: 'CS' },
    width: 100,
    dataType: 'number',
    numberFormat: '#,###',
    footers: [{ text: 2 }, { text: 1 }, { text: 3 }]
  },
  {
    name: 'orderEa',
    fieldName: 'orderEa',
    header: { text: 'EA' },
    width: 100,
    dataType: 'number',
    numberFormat: '#,###',
    footers: [{ text: 4 }, { text: 2 }, { text: 6 }]
  },
  {
    name: 'orderSupply',
    fieldName: 'orderSupply',
    header: { text: '주문공급가' },
    width: 150,
    dataType: 'number',
    numberFormat: '#,###',
    footers: [{ text: thousandSeparator(2500) }, { text: thousandSeparator(1000) }, { text: thousandSeparator(3500) }]
  },
  {
    name: 'orderVat',
    fieldName: 'orderVat',
    header: { text: '주문부가세' },
    width: 150,
    dataType: 'number',
    numberFormat: '#,###',
    footers: [{ text: 500 }, { text: 100 }, { text: 600 }]
  }
])

export const columnLayout2 = ref([
  'maker',
  {
    name: 'purchaser',
    header: { visible: false },
    direction: 'horizental',
    items: [{ column: 'purchaser', footerUserSpans: [{ colspan: 4 }, { colspan: 4 }, { colspan: 4 }] }]
  },
  'goodsCd',
  'barcode',
  'goods',
  {
    name: 'getGroup',
    direction: 'horizontal',
    items: [{ column: 'getBx', footerUserSpans: [{ colspan: 2 }, { colspan: 2 }, { colspan: 2 }] }, 'getCs'],
    header: { text: '입수' }
  },
  {
    name: 'orderGroup',
    direction: 'horizontal',
    items: ['orderBx', 'orderCs', 'orderEa'],
    header: { text: '주문수량' }
  },
  'orderSupply',
  'orderVat'
])
