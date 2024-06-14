export default {
  path: 'sys-mng', // depth1 시스템관리
  children: [
    {
      path: 'sys-mng', // depth2 시스템관리
      children: [
        {
          path: 'prgm-mng',
          component: () => import('@/views/cm/sysMng/sysMng/PrgmMng.vue')
        },
        {
          path: 'menu-mng',
          component: () => import('@/views/cm/sysMng/sysMng/MenuMng.vue')
        }
      ]
    },
    {
      path: 'hist-mng', // depth2 이력관리
      children: []
    },
    {
      path: 'basc-data', // depth2 기초자료
      children: []
    },
    {
      path: 'code-mng', // depth2 코드관리
      children: []
    }
  ]
}
