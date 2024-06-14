import dayjs from 'dayjs'
import { read, utils, writeFileXLSX } from 'xlsx'
import printJS from 'print-js'

export const isLoading = (order, msg) => {
  const loadingNode = document.getElementById('loading_component')
  if (order === 'show') {
    loadingNode.classList.replace('hide', 'show')
    loadingNode.getElementsByTagName('span')[0].innerHTML = msg
  } else {
    loadingNode.classList.replace('show', 'hide')
    loadingNode.getElementsByTagName('span')[0].innerHTML = ''
  }
}

// 빈값인지 체크 ( 빈값 이면 true, 아니면 false )
export function isEmpty(value) {
  return value === undefined || value === null || value === ''
}

// 빈값이면 '-' 표시
export function isEmptyReturnHyphen(value) {
  return isEmpty(value) ? '-' : value
}

// 숫자 3자리 마다 ',' 표시
export function thousandSeparator(amount) {
  if (isEmpty(amount)) return
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

//현재 날짜 구하기
export function getToday(delimiter = '-') {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')

  return [year, month, day].join(delimiter)
}

// 현재 년도 가져오기
export function getFullYear(delimiter = '-') {
  var today = new Date()
  const year = today.getFullYear()
  return year
}

// 현재 년월 가져오기
export function getCurrentMonth(delimiter = '-') {
  const now = new Date()
  const year = now.getFullYear()
  let month = now.getMonth() + 1
  if (month < 10) {
    month = String(now.getMonth() + 1).padStart(2, '0')
  }
  //(now.getMonth() + 1).length === 1 ? (now.getMonth() + 1).padStart(2, "0") : now.getMonth() + 1
  return [year, month].join(delimiter)
}

// 휴대폰번호 형식으로 변환,
export function hyphenPhoneString(phone) {
  if (isEmpty(phone)) return

  if (typeof phone === 'string') {
    if (phone.includes('*')) {
      if (phone.length === 8) {
        return phone.replace(/^(\d{4})(\D{4})$/, `$1-$2`)
      } else {
        return phone.replace(/^(\d{2,3})(\D{3,4})(\d{4})$/, `$1-$2-$3`)
      }
    } else {
      if (phone.length === 8) {
        return phone.replace(/^(\d{4})(\d{4})$/, `$1-$2`)
      } else {
        return phone.replace(/(^02.{0}|^\d{2,3})(\d{3,4})(\d{4})/, `$1-$2-$3`)
      }
    }
  } else if (typeof phone === 'number') {
    return phone.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)
  }
}

// 현재날짜 기준 N일 이후 날짜 계산
export const getAfterDay = (days) => {
  const now = new Date()
  now.setDate(new Date().getDate() + days)

  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')

  return [year, month, day].join('-')
}

// 현재날짜 기준 N일 이전 날짜 계산
export const getBeforeDay = (days) => {
  const now = new Date()
  now.setDate(new Date().getDate() - days)

  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')

  return [year, month, day].join('-')
}

//'-' 문자 제거
export const removeHyphen = (str) => {
  return str.replace(/[^0-9]/g, '')
}

// JSON 형태의 엑셀 변환후 다운로드
export const excelFileDownloadByArray = (jsonData, excelColumns, fileName = 'excel', convertFnObj = null, isCountNo = true, merge = null) => {
  let convertFnKeyList = []
  if (isEmpty(convertFnObj)) {
    convertFnObj = (value) => {
      return value
    }
  } else {
    convertFnKeyList = Object.keys(convertFnObj)
  }
  const mergeTable = []

  if (merge?.length > 0) {
    for (let i = merge[0].s.r; i < jsonData.length; i = i + merge[0].e.r) {
      mergeTable.push({
        s: { r: i, c: merge[0].e.c },
        e: { r: i + merge[0].e.r - 1, c: merge[0].e.c }
      })
    }
  }

  let sliceFileName = fileName
  if (fileName.length > 31) {
    sliceFileName = fileName.substring(0, 31)
  }

  if (isCountNo) {
    setRownumber(jsonData)
  }

  if (jsonData?.length <= 0) {
    // 빈파일일 경우
    const emptyArrayColumns = []
    for (const value in excelColumns) {
      emptyArrayColumns.push(excelColumns[value])
    }

    const columnWidths = []
    const cellIncoder = []
    emptyArrayColumns.map((col, index) => {
      columnWidths.push({ wch: 30 })
      cellIncoder.push()
    })

    const ws = utils.json_to_sheet(jsonData)
    const wb = utils.book_new()
    utils.sheet_add_aoa(ws, [emptyArrayColumns], { origin: 'A1' })
    ws['!cols'] = columnWidths
    utils.book_append_sheet(wb, ws, sliceFileName)
    writeFileXLSX(wb, sliceFileName + '.xlsx')
    return
  }
  let newData = []
  for (const row of jsonData) {
    let pushObj = []
    for (const colum in excelColumns) {
      // colum 추가
      if (!convertFnKeyList.includes(colum)) {
        pushObj = {
          ...pushObj,
          [colum]: isEmpty(row[colum]) ? '-' : row[colum]
        }
      } else {
        for (const property in convertFnObj) {
          if (colum === property) {
            // 컨버팅을 거쳐야하는 columns
            pushObj = {
              ...pushObj,
              [colum]: convertFnObj[property](row)
            }
          }
        }
      }
    }
    newData.push(pushObj)
  }

  const firstRows = newData[0]
  const editedColumnNames = Object.getOwnPropertyNames(firstRows)
  const finalColumns = []

  let findGbn = 0
  editedColumnNames.map((column, index) => {
    findGbn = 0
    for (const gridColumn in excelColumns) {
      if (gridColumn === column) {
        findGbn += 1
        finalColumns.push(excelColumns[gridColumn])
      }
      if (excelColumns.length - 1 === gridColumn && findGbn <= 0) {
        finalColumns.push(column)
      }
    }
  })

  const columnWidths = []
  finalColumns.map((col, index) => {
    columnWidths.push({ wch: 30 })
  })

  const ws = utils.json_to_sheet(newData)
  const wb = utils.book_new()
  utils.sheet_add_aoa(ws, [finalColumns], { origin: 'A1' })
  ws['!cols'] = columnWidths
  if (merge?.length > 0) ws['!merges'] = mergeTable
  utils.book_append_sheet(wb, ws, sliceFileName)
  writeFileXLSX(wb, sliceFileName + '.xlsx')
}

export function setRownumber(items, asc) {
  if (isEmpty(items)) return

  if (asc == true) {
    let rowNumber = 1
    for (const item of items) {
      item.id = rowNumber++
    }
  } else {
    let rowNumber = items?.length
    for (const item of items) {
      item.id = rowNumber--
    }
  }

  return items
}

export function setPagingRownumber(items, totalCount, offset, page, asc) {
  if (isEmpty(items) || isEmpty(totalCount) || isEmpty(offset) || isEmpty(page)) return

  if (asc == true) {
    let rowNumber = 1 + offset * (page - 1)
    for (const item of items) {
      item.id = rowNumber++
    }
  } else {
    let rowNumber = totalCount - offset * (page - 1)
    for (const item of items) {
      item.id = rowNumber--
    }
  }

  return items
}

// Array 내부 값 중복체크
export function isDuplicateArray(array) {
  const isDuplication = array.some(function (x) {
    if (isEmpty(x)) return

    return array.indexOf(x) !== array.lastIndexOf(x)
  })

  return isDuplication
}

// Array 에 value push전 중복되는 값이 있는지 확인
export function isDuplicateArrayPushValue(array, value) {
  if (isEmpty(array)) return
  if (isEmpty(value)) return
  if (isDuplicateArray(array)) return

  const newArray = [...array, value]

  return new Set(newArray).size !== newArray.length
}
// 날짜연산 (yyyy-mm-dd)
export function dateBetween(beginDate, endDate) {
  // date 에 '-' 가 있으면 '' 처리
  if (isEmpty(beginDate)) {
    return 0
  }
  if (isEmpty(endDate)) {
    return 0
  }

  beginDate = beginDate.replace(/-/gi, '').replace(/T/gi, '').replace(/:/gi, '')
  endDate = endDate.replace(/-/gi, '').replace(/T/gi, '').replace(/:/gi, '')

  return endDate - beginDate
}

// 날짜연산 (yyyy-mm-dd)
export function dateOperation(beginDate, endDate, type) {
  // date 에 '-' 가 있으면 '' 처리
  if (isEmpty(beginDate)) {
    return 0
  }
  if (isEmpty(endDate)) {
    return 0
  }
  var startDateArr = beginDate.split('-')
  var endDateArr = endDate.split('-')
  var dat1 = new Date(startDateArr[0], startDateArr[1], startDateArr[2])
  var dat2 = new Date(endDateArr[0], endDateArr[1], endDateArr[2])
  beginDate = beginDate.replace(/-/gi, '').replace(/T/gi, '').replace(/:/gi, '')
  endDate = endDate.replace(/-/gi, '').replace(/T/gi, '').replace(/:/gi, '')
  // 날짜 차이 알아 내기
  var diff = dat2 - dat1
  var currDay = 24 * 60 * 60 * 1000 // 시 * 분 * 초 * 밀리세컨
  var currMonth = currDay * 30 // 월 만듬
  var currYear = currMonth * 12 // 년 만듬

  switch (type) {
    case 'day':
      return parseInt(diff / currDay)
    case 'month':
      return parseInt(diff / currMonth)
    case 'year':
      return parseInt(diff / currYear)
    default:
      return
  }

  //document.write("* 일수 차이 : " + parseInt(diff / currDay) + " 일<br/>")
  // document.write("* 월수 차이 : " + parseInt(diff / currMonth) + " 월<br/>")
  // document.write("* 년수 차이 : " + parseInt(diff / currYear) + " 년<br/><br/>")
}

export function compareDateTime(firstDateTime, secondDateTime) {
  if (isEmpty(firstDateTime) || isEmpty(secondDateTime)) return
  const startDateTime = new Date(convertDateYYYYMMDDHH24MISS(firstDateTime)).getTime()
  const endDateTime = new Date(convertDateYYYYMMDDHH24MISS(secondDateTime)).getTime()

  return endDateTime - startDateTime
}

export function convertDateYYYYMMDDHH24MISS(isoFormatDateString) {
  if (isEmpty(isoFormatDateString)) return
  const date = dayjs(isoFormatDateString).format('YYYY-MM-DD HH:mm:ss')

  return date
}

//byte 계산함수
export const byteCal = (str) => {
  const LINE_FEED = 10 // '\n'

  function getByteLength(decimal) {
    return decimal >> 7 || LINE_FEED === decimal ? 2 : 1
  }

  function getByte(str) {
    return str
      .split('')
      .map((s) => s.charCodeAt(0))
      .reduce((prev, unicodeDecimalValue) => prev + getByteLength(unicodeDecimalValue), 0)
  }
  return getByte(str)
}

// textarea 줄바꿈 제외
export const removeLineBreak = (str) => {
  const result = str.split('\n').join('')
  return result
}

export const printList = (item, field) => {
  printJS({ printable: item, properties: field, type: 'json' })
}

export const printHtml = (target) => {
  printJS({
    printable: target,
    type: 'html',
    targetStyles: ['*'],
    style: `
          @media print {
              @page { margin: 30px; }
              body { margin: 20px; }
          }
        `
  })
}
