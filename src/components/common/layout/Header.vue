<template>
  <div id="header">
    <header>
      <div class="leftMenuArea">
        <ul class="gnbMenuList">
          <li><a href="#none" class="on">중소유통물류</a></li>
          <li><a @click="openSSO('http://172.90.3.234:5173')">SCM수발주</a></li>
          <li><a href="#none">대응관리</a></li>
          <li><a href="#none">내부통계</a></li>
          <li><a href="#none">외부통계</a></li>
        </ul>
      </div>
      <div class="sechArea">
        <div class="sech">
          <input type="text" placeholder="검색어를 입력해주세요" />
          <button type="button" class="sechBtn"><span class="hidden">검색</span></button>
        </div>
      </div>
      <div class="rightMenuArea">
        <div class="utilArea">
          <p class="etc">{{ userInfo.name }} 님</p>
          <p class="etc timeOut">남은 시간 <span class="time">30:12</span></p>
          <button type="button" class="logOut" @click="logoutBtnClick"><span class="hidden">로그아웃</span></button>
        </div>
      </div>

      <Lnb />
    </header>
  </div>
</template>

<script setup>
import Lnb from './Lnb.vue'
import { onMounted, inject } from 'vue'
import { useUserInfoStore } from '@/stores/userInfo'
import { useTokenInfoStore } from '@/stores/tokenInfo'
import { useAlertStore, useConfirmStore } from '@/stores/modal'
import { useRouter } from 'vue-router'
import { isEmpty } from '@/assets/js/util'

const router = useRouter()

const alert = useAlertStore()
const confirm = useConfirmStore()

const { userInfo } = useUserInfoStore()
const tokenInfo = useTokenInfoStore()

const openSSO = inject('openSSO')

const logoutBtnClick = () => {
  confirm.open('로그아웃 하시겠습니까?', logout)
}

const logout = async () => {
  Object.assign(userInfo, {
    id: '',
    name: '',
    orgnztId: '',
    orgnztNm: '',
    uniqId: ''
  })

  Object.assign(tokenInfo, {
    accessToken: '',
    refreshToken: ''
  })
  alert.open('로그아웃 되었습니다.', () => {
    router.push('/login')
  })
}

onMounted(() => {
  if (isEmpty(tokenInfo.refreshToken)) {
    router.push('/login')
  }
})
</script>

<style scoped></style>
