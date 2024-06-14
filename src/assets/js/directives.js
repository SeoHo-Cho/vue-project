const functions = {
  uppercase: (evt) => {
    const regexp = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/gi
    evt.target.value = evt.target.value.replace(regexp, '').toUpperCase()
  },
  nokor: (evt) => {
    const regexp = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/gi
    evt.target.value = evt.target.value.replace(regexp, '')
  }
}

export const nokor = {
  mounted: (el) => el.addEventListener('input', functions.nokor),
  beforeUnmount: (el) => el.removeEventListener('input', functions.nokor)
}
export const uppercase = {
  mounted: (el) => el.addEventListener('input', functions.uppercase),
  beforeUnmount: (el) => el.removeEventListener('input', functions.uppercase)
}
