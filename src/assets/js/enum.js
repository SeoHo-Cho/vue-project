// validation에 사용되는 상수
export const isEmptySelectErrorMsg = (field) => `${field} 항목은 필수 선택 항목입니다.`
export const isEmptyContentMsg = (field) => `${field} 항목은 필수 입력 항목입니다.`
export const emptySelectErrorMsg = (field) => `${field} 항목은 필수 선택 항목입니다.`
export const startDayExcessErrorMsg = '시작일자가 종료일자보다 클 수 없습니다'
export const startTimeExcessErrorMsg = '시작시간가 종료시간보다 클 수 없습니다'
export const emptyDateErrorMsg = '날짜를 모두 입력해주세요'
export const phoneErrorMsg = '휴대폰번호를 정확히 입력해주세요'

export const maxByteErrorMsg = (maxByte) => `글자수는 ${maxByte}byte 이내로 제한됩니다`
export const maxStrLengthErrorMsg = (maxLength) => `글자수는 ${maxLength}자 이내로 제한됩니다`
export const lineBreakExcessLimitErrorMsg = (field) => `${field}줄을 초과할 수 없습니다`
export const excessLimitInLineErrorMsg = (field) => `한 줄 당 ${field}자를 초과할 수 없습니다`
export const limitedSpecialCharactersMsg = (field) => `특수부호는 ${field}만 허용됩니다`
export const requiredAllInputsMsg = (field) => `${field}을 모두 입력해주세요.`

export const isYN = {
  Y: 'Y',
  N: 'N'
}
