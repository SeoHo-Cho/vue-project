import { $api } from '@/services/api.conf'

/**
 * 시스템관리>시스템관리
 */

// 프로그램 관리
export const prgmMng = {
  list: async () => await $api.get('/common/system-manage/program/list')
}
// 메뉴 관리
export const menuMng = {}

export default {
  prgmMng,
  menuMng
}
