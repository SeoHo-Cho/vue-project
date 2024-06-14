<template>
  <div>
    <h3>API 샘플</h3>
    <a @click="onClickProducts">상품목록</a>| <a @click="onClickUserCart">사용자카트</a>|
    <a @click="getProductInfo(false)">상품조회순차</a>|
    <a @click="getProductInfo(true)">상품조회병렬</a>
    <div class="result">
      {{ result }}
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import sampleService from '@/services/sample'
const result = ref()

const onClickProducts = async () => {
  const res = await sampleService.getProducts()
  result.value = res.data
}

const onClickUserCart = async () => {
  const res = await sampleService.getUserCart(1)
  console.log('onClickUserCart', res)
  result.value = res
}

const getProductInfo = async (bool) => {
  const res = await sampleService.getProductInfo(bool ? 1 : 2, bool)
  result.value = res
}
</script>

<style lang="scss" scoped>
.result {
  border: 1px #ccc solid;
  padding: 10px;
}
</style>
