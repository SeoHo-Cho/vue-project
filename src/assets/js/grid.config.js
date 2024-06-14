// Footer 속성 false시 푸터가 다중 row일시 visible : true속성이 안먹힘
// 리얼그리드 개발사 문의 결과 리얼그리드 자체 내 버그로 판단되어 개발팀에 검토 요청 함
// 리얼그리드 기술지원팀에서 대안으로 default 값을 true로 해서 사용하라는 문의받음
// Footer 부분을 visible을 false로 하고자 할때 gridView.setFooter({visible: false})
// https://support.realgrid.com/tickets/no/23053
export const defaultConfig = {
  copy: {
    enabled: true
  },
  paste: {
    enabled: false
  },
  edit: {
    editable: false,
    commitByCell: false,
    commitWhenLeave: false,
    columnEditableFirst: false
  },
  rowIndicator: {
    visible: false
  },
  stateBar: {
    visible: false
  },
  // row 앞에 체크박스 표시여부
  // 필요한 그리드에서 gridView.setCheckBar({visible: true})로 사용
  checkBar: {
    visible: false
  },
  header: {
    height: 40
  },
  // footer: {
  //   visible: false
  // },
  display: {
    rowHeight: 40,
    rowResizable: true,
    eachRowResizable: true,
    fitStyle: 'fill',
    editItemMerging: true //셀 편집시 병합되어 있는 셀이 분리되어 보이는 것을 방지하고 싶을때
  }
}

let toggle
export function setContextMenu({ gridView, dataProvider }) {
  gridView.onContextMenuItemClicked = function (grid, item, clickData) {
    var cell = grid.getCurrent()
    var col = grid.columnByName(cell.column)

    if (item.tag == 'excel') {
      grid.exportGrid({
        type: 'excel',
        target: 'local',
        fileName: 'gridExport.xlsx'
      })
    } else if (item.tag == 'filterTrue' && clickData.column) {
      let fieldName = grid.getColumnProperty(clickData.column, 'fieldName')
      grid.setColumnProperty(fieldName, 'autoFilter', true)
    } else if (item.tag == 'filterFalse' && clickData.column) {
      let fieldName = grid.getColumnProperty(clickData.column, 'fieldName')
      grid.setColumnProperty(fieldName, 'autoFilter', false)
    } else if (item.tag == 'visibleTrue') {
      let columns = grid.getColumns()

      for (let i in columns) {
        grid.setColumnProperty(columns[i].name, 'visible', true)
      }
      toggle = false
      setHeaderCellContextMenu(grid, toggle)
    } else if (item.tag == 'visibleFalse') {
      grid.setColumnProperty(clickData.column, 'visible', false)

      toggle = true
      setHeaderCellContextMenu(grid, toggle)
    } else if (item.tag == 'fixedCol') {
      grid.setFixedOptions({ colCount: col.index + 1 })
    } else if (item.tag == 'fixedRow') {
      grid.setFixedOptions({ rowCount: cell.itemIndex + 1 })
    } else if (item.tag == 'fixedCancel') {
      grid.setFixedOptions({ colCount: 0, rowCount: 0 })
    }
  }

  gridView.onContextMenuPopup = function (grid, x, y, elementName) {
    if (elementName.cellType == 'header') {
      setHeaderCellContextMenu(grid, toggle)
    } else if (elementName.cellType == 'data') {
      setDataCellContextMenu(grid)
    } else {
      return false
    }
  }

  setDataCellContextMenu(gridView)
}

function setHeaderCellContextMenu(grid, val) {
  var contextMenu = [
    {
      label: '엑셀 내보내기',
      tag: 'excel'
    },
    {
      label: '-'
    },
    {
      label: '필터 만들기',
      tag: 'filterTrue'
    },
    {
      label: '필터 삭제',
      tag: 'filterFalse'
    },
    {
      label: '-'
    },
    {
      label: '컬럼 숨기기',
      tag: 'visibleFalse'
    },
    {
      label: '컬럼 모두 보이기',
      tag: 'visibleTrue',
      enabled: val
    }
  ]

  grid.setContextMenu(contextMenu)
}

function setDataCellContextMenu(grid) {
  var contextMenu = [
    {
      label: '엑셀 내보내기',
      tag: 'excel'
    },
    {
      label: '-'
    },
    {
      label: '열 고정',
      tag: 'fixedCol'
    },
    {
      label: '행 고정',
      tag: 'fixedRow'
    },
    {
      label: '고정 취소',
      tag: 'fixedCancel'
    }
  ]

  grid.setContextMenu(contextMenu)
}
