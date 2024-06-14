import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { isEmpty } from '@/assets/js/util'

export const useModalStore = defineStore('modal', () => {})

export const useConfirmStore = defineStore('confirm', () => {
  const confirmInfo = reactive({
    text: '',
    closeFunction: () => {},
    approveFunction: () => {}
  })

  const open = (text, approvFn, closeFn) => {
    if (!isEmpty(text)) confirmInfo.text = text
    if (!isEmpty(closeFn)) confirmInfo.closeFunction = closeFn
    if (!isEmpty(approvFn)) confirmInfo.approveFunction = approvFn

    ui.LayerPop.Show('#confirm_popup')
  }

  const close = () => {
    if (!isEmpty(confirmInfo.closeFunction)) confirmInfo.closeFunction()
    ui.LayerPop.Closed('#confirm_popup')
  }

  const approve = () => {
    if (!isEmpty(confirmInfo.approveFunction)) confirmInfo.approveFunction()
    ui.LayerPop.Closed('#confirm_popup')
  }

  return { open, close, approve, confirmInfo }
})

export const useAlertStore = defineStore('alert', () => {
  const alertInfo = reactive({
    text: '',
    closeFunction: () => {}
  })

  const open = (text, closeFn) => {
    if (!isEmpty(text)) alertInfo.text = text
    if (!isEmpty(closeFn)) alertInfo.closeFunction = closeFn

    ui.LayerPop.Show('#alert_popup')
  }

  const close = () => {
    if (!isEmpty(alertInfo.closeFunction)) alertInfo.closeFunction()
    ui.LayerPop.Closed('#alert_popup')
  }

  return { open, close, alertInfo }
})
