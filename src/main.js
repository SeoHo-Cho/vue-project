import './assets/css/common.css'
import './assets/css/layout.css'
import './assets/css/custom.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import SearchAddressPop from './components/popup/common/SearchAddressPop.vue'
import CKEditor from '@ckeditor/ckeditor5-vue'
//vee-validate
import '@/assets/js/validation'
import * as rules from '@vee-validate/rules'
import { Field, Form, configure, defineRule } from 'vee-validate'
import { localize } from '@vee-validate/i18n'
import ko from '@vee-validate/i18n/dist/locale/ko.json'
import { mask } from 'vue-the-mask'
import Grid from './components/common/Grid.vue'
import Editor from './components/common/Editor.vue'
import Pagination from '@/components/common/Pagination.vue'
// import { nokor, uppercase } from '@/assets/js/directives'
import { defaultConfig } from './assets/js/grid.config'

// primevue
import PrimeVue from 'primevue/config'

import { ssoPlugin } from './assets/js/plugins'

var gridLicense = import.meta.env.VITE_REALGRID_LICENSE_KEY
RealGrid.setLicenseKey(gridLicense)
RealGrid.setDefault(defaultConfig)

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(PrimeVue)
app.use(CKEditor)
app.use(ssoPlugin)

app.component('Field', Field)
app.component('Form', Form)
app.component('SearchAddressPop', SearchAddressPop)
app.component('Grid', Grid)
app.component('Pagination', Pagination)
app.component('Editor', Editor)

//// vee validation ::: START
// validation Rules binding
Object.keys(rules).forEach((rule) => {
  defineRule(rule, rules[rule])
})

// validation config setting
configure({
  generateMessage: localize({
    ko
  }),
  validateOnChange: true,
  validateOnModelUpdate: true
})

localize('ko')

//// vee validation ::: END

app.directive('mask', mask)
// app.directive('nokor', nokor)
// app.directive('uppercase', uppercase)

app.mount('#app')

app.config.errorHandler = (err, instance, info) => {
  console.error('Global Error Handler', err, instance, info)
}
