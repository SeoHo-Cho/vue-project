<template>
  <div class="mainBox">
    <div class="titleBox">비밀번호 (컴포넌트)</div>
    <div class="ConBox">
      <Form @submit="successAlert" @invalid-submit="FailedAlert" v-slot="{ errors }">
        <div class="flexBox">
          <div class="fl">비밀번호 :</div>
          <div class="fr"><Field type="password" name="비밀번호" rules="password_rule" /></div>
        </div>
        <p class="error_msg">{{ errors.비밀번호 }}</p>
        <div class="flexBox">
          <div class="fl">비밀번호확인 :</div>
          <div class="fr">
            <Field type="password" name="비밀번호확인" rules="confirm_password:@비밀번호" />
          </div>
        </div>
        <p class="error_msg">{{ errors.비밀번호확인 }}</p>
        <button class="submitButton">저장</button>
      </Form>
    </div>
  </div>
</template>

<script setup>
const successAlert = () => {
  alert('성공')
}

const FailedAlert = () => {
  alert('실패')
}
</script>

<style scoped>
.mainBox {
  width: 650px !important;
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
  width: 30%;
  float: left;
}

.fr {
  width: 70%;
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
