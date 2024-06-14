<template>
  <div style="margin-top: 250px; margin-left: 300px">
    <Form @submit="login" @invalid-submit="FailedAlert" v-slot="{ errors }">
      아이디 : <Field type="text" name="아이디" v-model="loginInfo.id" rules="required" /><br />
      <p class="error_msg">{{ errors.아이디 }}</p>
      비밀번호 : <Field type="password" name="비밀번호" v-model="loginInfo.password" rules="required" /><br />
      <p class="error_msg">{{ errors.비밀번호 }}</p>
      <button class="baseBtn"><span class="base">로그인</span></button>
    </Form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAlertStore } from '@/stores/modal'
import { useTokenInfoStore } from '@/stores/tokenInfo'
import { useUserInfoStore } from '@/stores/userInfo'
import loginService from '@/services/login'
const alert = useAlertStore()

const router = useRouter()

const tokenInfo = useTokenInfoStore()
const { userInfo } = useUserInfoStore()

const loginInfo = reactive({
  id: 'admin',
  password: '1',
  userSe: 'USR'
})

const FailedAlert = () => {
  alert.open('로그인 정보를 입력해주세요')
}

const login = async () => {
  const { data } = await loginService.login(loginInfo)
  const { resultCode, resultMessage, resultVO, accessToken, refreshToken } = data
  if (resultCode === '200') {
    Object.assign(tokenInfo, {
      accessToken: accessToken,
      refreshToken: refreshToken
    })

    Object.assign(userInfo, {
      id: resultVO.id,
      name: resultVO.name,
      orgnztId: resultVO.orgnztId,
      orgnztNm: resultVO.orgnztNm,
      userSe: resultVO.userSe,
      uniqId: resultVO.uniqId
    })

    router.push('/cm/sys-mng/sys-mng/prgm-mng')
  } else {
    alert.open(resultMessage)
  }
}
</script>

<style lang="scss" scoped>
.error_msg {
  color: #ff0000;
  font-weight: 600;
}
</style>
