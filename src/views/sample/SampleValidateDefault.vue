<template>
  <h2>Validation 기본 샘플</h2>

  <div class="mainBox">
    <div class="titleBox">기본 Validation</div>
    <div class="ConBox">
      <Form @submit="successAlert" @invalid-submit="FailedAlert" v-slot="{ errors }">
        <div class="flexBox">
          <div class="fl">이름 :</div>
          <div class="fr">
            <Field type="text" class="input_test" name="이름" rules="required" />
          </div>
        </div>
        <p class="error_msg">{{ errors.이름 }}</p>
        <div class="flexBox">
          <div class="fl">나이 :</div>
          <div class="fr">
            <Field type="text" class="input_test" name="나이" rules="required" />
          </div>
        </div>
        <p class="error_msg">{{ errors.나이 }}</p>
        <div class="flexBox">
          <div class="fl">닉네임 :</div>
          <div class="fr">
            <Field type="text" class="input_test" name="닉네임" rules="required" />
          </div>
        </div>
        <p class="error_msg">{{ errors.닉네임 }}</p>
        <button class="submitButton">저장</button>
      </Form>
    </div>
  </div>

  <div class="mainBox">
    <div class="titleBox">기본제공하는 Rule</div>
    <div class="ConBox">
      <Form @submit="successAlert" @invalid-submit="FailedAlert" v-slot="{ errors }">
        <div class="flexBox">
          <div class="fl">이름 :</div>
          <div class="fr">
            <Field type="text" class="input_test" name="이름" rules="required" />
          </div>
        </div>
        <p class="error_msg">{{ errors.이름 }}</p>
        <div class="flexBox">
          <div class="fl">영문이름:</div>
          <div class="fr">
            <Field type="text" class="input_test" name="영문이름" rules="required|alpha" />
          </div>
        </div>
        <p class="error_msg">{{ errors.영문이름 }}</p>
        <div class="flexBox">
          <div class="fl">아이디 :</div>
          <div class="fr">
            <Field type="text" class="input_test" name="아이디" rules="required|alpha_num" />
          </div>
        </div>
        <p class="error_msg">{{ errors.아이디 }}</p>
        <div class="flexBox">
          <div class="fl">나이 :</div>
          <div class="fr">
            <Field type="text" class="input_test" name="나이" rules="required|integer|max_value:150|min_value:1" />
          </div>
        </div>
        <p class="error_msg">{{ errors.나이 }}</p>
        <div class="flexBox">
          <div class="fl">닉네임 :</div>
          <div class="fr">
            <Field type="text" class="input_test" name="닉네임" rules="required" />
          </div>
        </div>
        <p class="error_msg">{{ errors.닉네임 }}</p>
        <div class="flexBox">
          <div class="fl">이메일 :</div>
          <div class="fr">
            <Field type="text" class="input_test" name="이메일" rules="required|email" />
          </div>
        </div>
        <p class="error_msg">{{ errors.이메일 }}</p>
        <div class="flexBox">
          <div class="fl">오늘수입 :</div>
          <div class="fr">
            <Field type="text" class="input_test" name="오늘수입" rules="required|numeric" />
          </div>
        </div>
        <p class="error_msg">{{ errors.오늘수입 }}</p>
        <button class="submitButton">저장</button>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { onDeactivated, onActivated, onMounted, onUnmounted } from 'vue'

onActivated(() => {
  console.log('onActivated')
})

onDeactivated(() => {
  console.log('onDeactivated')
})

onMounted(() => {
  console.log('onMounted')
})

onUnmounted(() => {
  console.log('onUnmounted')
})

const successAlert = () => {
  alert('성공')
}

const FailedAlert = () => {
  alert('실패')
}
</script>

<style scoped>
.mainBox {
  width: 450px !important;
  height: auto !important;
  border: 1px solid black !important;
  padding: 20px !important;
  margin-top: 20px !important;
}

.titleBox {
  width: 80% !important;
  height: 35px !important;
  border: 1px solid #bdbdbd !important;
  border-radius: 10px !important;
  text-align: center !important;
  padding: 5px !important;
}

.ConBox {
  width: auto !important;
  height: auto !important;
  margin-top: 10px !important;
}

.flexBox {
  margin-top: 10px;
  display: flex;
}

.fl {
  width: 19%;
  float: left;
}

.fr {
  width: 81%;
  float: right;
}

th {
  border: 1px solid black !important;
  background-color: #bdbdbd !important;
}

td {
  border: 1px solid black !important;
}

table {
  border-collapse: collapse !important;
}

.error_msg {
  color: #ff0000;
}

.input_test {
  width: 200px;
}

.submitButton {
  width: 50px;
  height: 25px;
  border-radius: 5px;
  background-color: burlywood;
}
</style>
