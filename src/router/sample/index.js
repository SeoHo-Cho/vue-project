import DefaultLayout from '@/views/DefaultLayout.vue'
import sample from './sample'

export default {
  path: '/sample',
  component: DefaultLayout,
  children: [sample]
}
