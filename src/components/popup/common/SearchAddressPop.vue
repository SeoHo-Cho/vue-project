<template>
  <div class="pop_wrap" id="address_popup">
    <section class="popLayout popLayer" style="width: 650px; opacity: 1; top: 0px">
      <div class="popTit">우편번호 찾기</div>
      <div class="popConts">
        <div class="popInner limit" style="min-height: 200px; max-height: 350px">
          <VueDaumPostcode
            @complete="onComplete"
            q=""
            :animation="true"
            :noShorthand="true"
            :noAutoMapping="true"
            :pleaseReadGuide="3"
            :pleaseReadGuideTimer="2"
            :maxSuggestItems="3"
            :showMoreHName="true"
            :hideMapBtn="true"
            :hideEngBtn="true"
            :alwaysShowEngAddr="true"
            style="min-height: 200px"
          >
          </VueDaumPostcode>
        </div>
        <div class="contTable auto mT20">
          <table>
            <colgroup>
              <col style="width: 20%" />
              <col style="width: 80%" />
            </colgroup>
            <tbody>
              <tr>
                <th>우편번호</th>
                <td>{{ addressInfo.zonecode }}</td>
              </tr>
              <tr>
                <th>기본주소</th>
                <td>{{ addressInfo.address }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="popBtnArea">
          <button type="button" class="baseBtn" @click.enter="onCloseClick"><span class="base">닫기</span></button>
          <button type="button" class="baseBtn" @click.enter="onSubmitClick"><span class="base">확인</span></button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { VueDaumPostcode } from 'vue-daum-postcode'

const showAddress = ref(true)

const addressInfo = reactive({
  zonecode: '',
  address: '',
  engAddress: '',
  jibunAddress: ''
})

const emit = defineEmits(['addressInfo'])

const onComplete = (result) => {
  Object.assign(addressInfo, {
    zonecode: result.zonecode,
    address: result.address,
    engAddress: result.addressEnglish,
    jibunAddress: result.jibunAddress
  })
}

const onSubmitClick = () => {
  emit('addressInfo', addressInfo)

  Object.assign(addressInfo, {
    zonecode: '',
    address: '',
    engAddress: '',
    jibunAddress: ''
  })

  showAddress.value = false
}

const onCloseClick = () => {
  Object.assign(addressInfo, {
    zonecode: '',
    address: '',
    engAddress: '',
    jibunAddress: ''
  })
  showAddress.value = false
  ui.LayerPop.Closed('#address_popup')
}

onMounted(() => {
  setTimeout(() => {
    showAddress.value = true
  }, 1000)
})
</script>

<style scoped></style>
