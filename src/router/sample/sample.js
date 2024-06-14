// import SampleLayout from '@/views/sample/SampleLayout.vue'
import SampleCommonFunction from '@/views/sample/SampleCommonFunction.vue'
// import DefaultLayout from '@/views/DefaultLayout.vue'

export default {
  path: 'sample',
  children: [
    {
      path: 'sample-common-function',
      name: 'SampleCommonFunction',
      component: SampleCommonFunction
    },
    {
      path: 'sample-validate-default',
      name: 'SampleValidateDefault',
      component: () => import('@/views/sample/SampleValidateDefault.vue')
    },
    {
      path: 'sample-validate-custom',
      name: 'SampleValidateCustom',
      component: () => import('@/views/sample/SampleValidateCustom.vue')
    },
    {
      path: 'sample-api',
      name: 'SampleApi',
      component: () => import('@/views/sample/SampleApi.vue')
    },
    {
      path: 'sample-directive',
      name: 'SampleDirective',
      component: () => import('@/views/sample/SampleDirective.vue')
    },
    {
      path: 'sample-async-component',
      component: () => import('@/views/sample/AsyncComponent.vue')
    },
    {
      path: 'sample-async-component2',
      component: () => import('@/views/sample/AsyncComponent2.vue')
    },
    {
      path: 'sample-tree-component',
      component: () => import('@/views/sample/SampleTree.vue')
    },
    {
      path: 'sample-table',
      component: () => import('@/views/sample/SampleTable.vue')
    },
    {
      // 테스트
      path: 'sample-grid',
      component: () => import('@/views/sample/SampleGrid.vue')
    }
  ]
}
