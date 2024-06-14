<template>
  <div :id="props.gridId" class="realgrid"></div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { setContextMenu } from '@/assets/js/grid.config.js'
const emit = defineEmits(['rendered', 'onCellClick', 'onCellDblClick'])
const props = defineProps({
  gridId: {
    type: String
  },
  column: {
    type: Array,
    default: () => []
  },
  columnLayout: {
    type: Array,
    default: () => []
  },
  hasContextMenu: {
    type: Boolean,
    default: true
  }
})

const gridSetting = reactive({
  dataProvider: null,
  gridView: null
})

onMounted(() => {
  const container = document.getElementById(props.gridId)
  gridSetting.dataProvider = new RealGrid.LocalDataProvider(false)
  gridSetting.gridView = new RealGrid.GridView(container)

  if (props.column.length != 0) {
    gridSetting.dataProvider.setFields(props.column)
    gridSetting.gridView.setColumns(props.column)
  }
  if (props.columnLayout.length != 0) {
    gridSetting.gridView.setColumnLayout(props.columnLayout)
  }
  gridSetting.gridView.setDataSource(gridSetting.dataProvider)

  gridSetting.gridView.onCellClicked = (grid, clickData) => {
    emit('onCellClick', grid, clickData)
  }

  gridSetting.gridView.onCellDblClicked = (grid, clickData) => {
    emit('onCellDblClick', grid, clickData)
  }

  emit('rendered', gridSetting)

  props.hasContextMenu && setContextMenu(gridSetting)
})
</script>

<style lang="scss" scoped>
.realgrid {
  width: 100%;
  min-height: 440px;
}
</style>
