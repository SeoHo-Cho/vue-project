import DefaultLayout from '@/views/DefaultLayout.vue'
import sysMng from './sysMng'

export default {
  path: '/cm',
  component: DefaultLayout,
  children: [sysMng]
}
