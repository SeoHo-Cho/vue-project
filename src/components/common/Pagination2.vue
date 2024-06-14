<template>
  <div class="numberPagination">
    <button type="button" class="first end" name="first" @click="onClickPagingArrow"><span class="scHdn">처음</span></button>
    <button type="button" class="prev end" name="prev" @click="onClickPagingArrow"><span class="scHdn">이전</span></button>
    <ul class="paging">
      <li v-for="(item, key) in pageList" :key="key">
        <button type="button" :class="{ on: item === props.pageInfo.number }" @click="emit('changePage', item)">{{ item }}</button>
      </li>
    </ul>
    <button type="button" class="next" name="next" @click="onClickPagingArrow"><span class="scHdn">다음</span></button>
    <button type="button" class="last" name="end" @click="onClickPagingArrow"><span class="scHdn">끝</span></button>
  </div>
</template>

<script setup>
// import { ref, reactive, onMounted } from 'vue'
import { computed } from 'vue'
// const recordSize = 10
const emit = defineEmits(['changePage'])
const props = defineProps({
  pageInfo: {
    type: Object,
    default: () => {
      return {
        number: 1,
        totalCount: 0,
        recordSize: 10
      }
    }
  }
})

console.log(props.pageInfo)
let pagingNumber = 1
const pageList = computed(() => {
  const pageList = []
  const maxLength = Math.ceil(props.pageInfo.totalCount / props.pageInfo.recordSize)
  let startNumber = props.pageInfo.number

  pagingNumber = startNumber
  // 페이지에 리스트가 하나도 없을시
  if (props.pageInfo.totalCount === 0) {
    console.log(123)
    pagingNumber = 1
    pageList.push(1)
    return pageList
  }

  // recordSize 가 작은값에서 큰값으로 늘어났을때 max값 체크
  if (startNumber > maxLength && maxLength >= 1) {
    pagingNumber = maxLength
    startNumber = maxLength
    emit('changePage', pagingNumber)
  }

  // startNumber(시작 페이지 넘버) 조회 ex) (17 => 11),(28 => 21),(33 => 31)
  if (startNumber % 10 > 0) {
    for (let count = startNumber % 10; count >= 2; count--) {
      startNumber--
    }
  } else {
    startNumber = startNumber - 9
  }

  // endNumber(마지막 페이지 넘버) 조회
  let endNumber
  if (startNumber === 1 && maxLength === 0) {
    endNumber = 1
  } else if (startNumber >= maxLength - (maxLength % 10) && maxLength !== 0) {
    endNumber = maxLength
  } else {
    endNumber = startNumber + 9
  }

  // startNumber, endNumber에 따른 pageList setting [1,,,10], [21,,,30]
  for (let pageNum = startNumber; pageNum <= endNumber; pageNum++) {
    pageList.push(pageNum)
    if (pageNum === maxLength) {
      return pageList
    }
  }
  return pageList
})

const pageChange = (pageNum, e) => {
  emit('changePage', pageNum)
}

const onClickPagingArrow = (e) => {
  const maxLength = Math.ceil(props.pageInfo.totalCount / props.pageInfo.recordSize)

  switch (e.target.name) {
    case 'first':
      pagingNumber = 1
      break
    case 'prev':
      if (pagingNumber > 1) pagingNumber--
      break
    case 'next':
      if (pagingNumber < maxLength) pagingNumber++
      break
    case 'end':
      pagingNumber = maxLength
      break
  }
  console.log(pagingNumber)
  pageChange(pagingNumber, e)
}
</script>

<style lang="scss" scoped></style>
