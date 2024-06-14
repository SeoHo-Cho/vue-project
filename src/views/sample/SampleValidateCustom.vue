<template>
  <h2>Validation 커스텀</h2>
  <div class="mainBox">
    <div class="titleBox">셀렉트박스, 체크박스, 라디오버튼, 날짜</div>
    <div class="ConBox">
      <Form @submit="successAlert" @invalid-submit="FailedAlert" v-slot="{ errors }">
        <div class="flexBox">
          <div class="fl">지역 :</div>
          <div class="fr">
            <Field name="지역" as="select" class="input_test" rules="required_select:지역">
              <option value="">선택하세요</option>
              <option value="경기">경기도</option>
              <option value="강원">강원도</option>
              <option value="충청">충청도</option>
              <option value="경상">경상도</option>
              <option value="전라">전라도</option>
              <option value="제주">제주도</option>
            </Field>
          </div>
        </div>
        <p class="error_msg">{{ errors.지역 }}</p>
        <div class="flexBox">
          <div class="fl">과일 :</div>
          <div class="fr">
            <label class="inputBox only">
              <Field type="checkbox" name="과일" value="apple" id="apple" rules="required_check:과일" /><span class="data">사과</span>
            </label>
            <label class="inputBox only">
              <Field type="checkbox" name="과일" value="banana" id="banana" rules="required_check:과일" /><span class="data">바나나</span>
            </label>
          </div>
        </div>
        <p class="error_msg">{{ errors.과일 }}</p>

        <div class="flexBox">
          <div class="fl">성별 :</div>
          <div class="fr">
            <label class="inputBox only">
              <Field type="radio" name="성별" value="male" id="male" rules="required_check:성별" />
              <span class="data">남자</span>
            </label>
            <label class="inputBox only">
              <Field type="radio" name="성별" value="female" id="female" rules="required_check:성별" />
              <span class="data">여자</span>
            </label>
          </div>
        </div>
        <p class="error_msg">{{ errors.성별 }}</p>
        <div class="flexBox">
          <div class="fl">기간 :</div>
          <div class="fr">
            <Field type="date" name="startDay" class="input_test" /> ~
            <Field type="date" name="endDay" class="input_test" rules="date:@startDay" />
          </div>
        </div>
        <p class="error_msg">{{ errors.endDay }}</p>

        <button class="submitButton">저장</button>
      </Form>
    </div>
  </div>

  <div class="mainBox">
    <div class="titleBox">휴대폰번호, 파일 업로드, Textarea</div>
    <div class="ConBox">
      <Form @submit="successAlert" @invalid-submit="FailedAlert" v-slot="{ errors }">
        <div class="flexBox">
          <div class="fl">이름 :</div>
          <div class="fr">
            <Field type="text" name="이름" rules="name" class="input_test" />
          </div>
        </div>
        <p class="error_msg">{{ errors.이름 }}</p>
        <div class="flexBox">
          <div class="fl">휴대폰번호 :</div>
          <div class="fr">
            <Field type="text" name="휴대폰번호" rules="phone" class="input_test" />
          </div>
        </div>
        <p class="error_msg">{{ errors.휴대폰번호 }}</p>
        <div class="flexBox">
          <div class="fl">문서 :</div>
          <div class="fr">
            <label class="inputBox only">
              <Field type="file" name="문서" rules="required" class="baseBtn" />
              <lable class="data">문서</lable>
            </label>
          </div>
        </div>
        <p class="error_msg">{{ errors.문서 }}</p>
        <div class="flexBox">
          <div class="fl">설명(바이트제한) :</div>
          <div class="fr">
            <Field name="설명" as="textarea" rules="required|byte_limit:40" class="input_test" />
          </div>
        </div>
        <p class="error_msg">{{ errors.설명 }}</p>
        <div class="flexBox">
          <div class="fl">설명2 (글자수제한)</div>
          <div class="fr">
            <Field name="설명2" as="textarea" rules="required|max_length_limit:40" class="input_test" />
          </div>
        </div>
        <p class="error_msg">{{ errors.설명2 }}</p>
        <div class="flexBox">
          <div class="fl">설명3 (라인수, 한줄글자수 제한)</div>
          <div class="fr">
            <Field name="설명3" as="textarea" rules="required|max_rows_limit:3|max_Length_per_row_limit:10" />
          </div>
        </div>
        <p class="error_msg">{{ errors.설명3 }}</p>
        <button class="submitButton">저장</button>
      </Form>
    </div>
  </div>

  <div class="mainBox">
    <div class="titleBox">비밀번호</div>
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
  <SampleComponent />
</template>

<script setup>
import SampleComponent from '@/views/sample/SampleComponent.vue'

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
