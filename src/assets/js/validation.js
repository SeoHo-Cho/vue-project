import { defineRule } from 'vee-validate'
import { isEmpty, compareDateTime, getToday, byteCal, removeLineBreak } from '@/assets/js/util.js'
import {
  emptySelectErrorMsg,
  startDayExcessErrorMsg,
  emptyDateErrorMsg,
  phoneErrorMsg,
  maxByteErrorMsg,
  maxStrLengthErrorMsg,
  lineBreakExcessLimitErrorMsg,
  excessLimitInLineErrorMsg
} from '@/assets/js/enum'
// select box 선택 필수
defineRule('required_select', (value, [field]) => {
  if (isEmpty(value)) {
    return emptySelectErrorMsg(field)
  }
  return true
})

// 검색필터에 사용되는 시작일, 종료일 validation
defineRule('date', (value, [field]) => {
  if (isEmpty(value) || isEmpty(field)) {
    return emptyDateErrorMsg
  }

  if (compareDateTime(field, value) < 0) return startDayExcessErrorMsg
  return true
})

// file 필수 체크
defineRule('file_required', (value, [field]) => {
  if (isEmpty(value)) {
    return emptySelectErrorMsg(field)
  }
  return true
})

defineRule('required_check', (value, [field]) => {
  if (isEmpty(value?.[0])) {
    return emptySelectErrorMsg(field)
  }
  return true
})

// // 휴대폰번호 유효성검사
defineRule('phone', (value) => {
  var regExp = /(01[016789])([1-9]{1}[0-9]{2,3})([0-9]{4})$/
  if (regExp.test(value)) {
    return true
  } else {
    return phoneErrorMsg
  }
})

// // 패스워드 확인
//FIXME 패스워드 유효성 검사 조건 확인 후 수정 필요함
defineRule('password_rule', (value, [field]) => {
  var check = /(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[~!@#$%^&*()_+|<>?:{}])/.test(value)
  var cntCheck = /(.)\1{2,}/.test(value)
  var numCheck = /(\d)\1{2,}/.test(value)

  if (isEmpty(value)) {
    return '비밀번호를 입력해 주세요'
  }
  if (value.length < 8 || value.length > 20) {
    return '비밀번호는 8자~20자 이내여야 합니다.'
  }
  if (!check || /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(value)) {
    return '비밀번호는 영문+숫자+특수문자 3가지 조합해야 합니다.'
  }
  if (/\s/.test(value)) {
    return '공백없이 입력해주세요.'
  }
  if (cntCheck || numCheck) {
    return '동일한 문자 및 숫자 3번 이상 반복되었습니다'
  }

  return true
})

// // 두 입력이 같은지 확인
defineRule('confirm_password', (value, [target]) => {
  if (!isEmpty(target) && isEmpty(value)) {
    return '비밀번호를 한 번 더 입력해주세요.'
  }
  if (target !== value) {
    return '비밀번호가 일치하지 않습니다.'
  }
  return true
})

defineRule('byte_limit', (value, [maxByte]) => {
  if (byteCal(value) > maxByte) {
    return maxByteErrorMsg(maxByte)
  }
  return true
})

// 줄바꿈 제거한 글자수 체크
defineRule('max_length_limit', (value, [maxLength]) => {
  if (removeLineBreak(value).length > maxLength) {
    return maxStrLengthErrorMsg(maxLength)
  }
  return true
})

// 최대 line 수 초과
defineRule('max_rows_limit', (value, [line]) => {
  if (!isEmpty(value)) {
    if (value.split('\n').length > parseInt(line)) {
      return lineBreakExcessLimitErrorMsg(line)
    }
  }
  return true
})

// textarea에서 한 줄 글자수 체크
defineRule('max_Length_per_row_limit', (value, [maxLength]) => {
  if (!isEmpty(value)) {
    const splitArr = value.split('\n')
    for (const item of splitArr) {
      if (item.length > maxLength) {
        return excessLimitInLineErrorMsg(maxLength)
      }
    }
  }
  return true
})

defineRule('name', (value, field) => {
  if (!isEmpty(value)) {
    if (value.indexOf('$') != -1 || value.indexOf('\\') != -1) {
      return `이름의 형식이 맞지 않습니다`
    }
  }

  return true
})
