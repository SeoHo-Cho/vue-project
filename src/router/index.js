import { createRouter, createWebHistory } from 'vue-router'
import { useMenuStore } from '@/stores/menu'
import DefaultLayout from '@/views/DefaultLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView,
    // },
    // cm,
    // sample

    {
      path: '',
      name: 'home',
      component: DefaultLayout,
      redirect: '/cm/sys-mng/sys-mng/prgm-mng'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/cm/sysMng/logn/Login.vue')
    }
  ]
})

function kebabToCarmel(str) {
  if (!str) {
    return str
  }

  const paths = str.split('/')
  return paths
    .map((path, i) => {
      if (i === paths.length - 1) {
        return path.charAt(0).toUpperCase() + path.slice(1).replace(/-./g, (x) => x[1].toUpperCase())
      } else {
        return path.replace(/-./g, (x) => x[1].toUpperCase())
      }
    })
    .join('/')
}

router.isReady().then(async () => {
  const menuStore = useMenuStore()
  const menus = await menuStore.getMenus()

  menus.value.forEach((m) => {
    if (m.url) {
      const componentPath = `../views/${kebabToCarmel(m.url)}.vue`
      router.addRoute('home', {
        path: m.url,
        component: () => import(/* @vite-ignore */ componentPath)
      })
    }
  })
  router.push(location.pathname)
})

export default router
