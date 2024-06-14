<template>
  <Header />
  <QuickMenu />
  <div id="container">
    <div class="contentsWrap">
      <div id="contents">
        <article>
          <div class="pageInfo">
            <History />
            <BreadCrumb />
          </div>
          <ContentsTitle />
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </article>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import Header from '@/components/common/layout/Header.vue'
import QuickMenu from '@/components/common/layout/QuickMenu.vue'
import Footer from '@/components/common/layout/Footer.vue'
import History from '@/components/common/layout/History.vue'
import BreadCrumb from '@/components/common/layout/BreadCrumb.vue'
import ContentsTitle from '@/components/common/layout/ContentsTitle.vue'

onMounted(async () => {
  await nextTick()
  ui.init()
  typeLayout.init()
})
</script>

<style scoped></style>
