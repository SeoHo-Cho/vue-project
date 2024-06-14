import { useUserInfoStore } from '@/stores/userInfo'
import { useTokenInfoStore } from '@/stores/tokenInfo'

export const ssoPlugin = {
  install: (app, options) => {
    // 부모창이 있는경우 (타 시스템으로부터 app이 열린경우)
    if (window.opener) {
      // 토큰정보 수신 이벤트 리스너 등록
      window.addEventListener(
        'message',
        (evt) => {
          const evtUrl = new URL(evt.origin)
          const openerUrl = new URL(document.referrer)

          if (evt.data.message !== 'setToken') return
          if (evtUrl.origin !== openerUrl.origin) return

          const data = JSON.parse(evt.data.data)
          localStorage.setItem('userInfo', JSON.stringify({ userInfo: data.userInfo }))
          localStorage.setItem('tokenInfo', JSON.stringify(data.tokenInfo))
        },
        { once: true }
      )

      // 부모창으로 토큰조회 메시지 전송
      window.opener.postMessage(
        {
          message: 'getToken',
          data: {}
        },
        document.referrer
      )
    }

    const openSSO = (url) => {
      const { userInfo } = useUserInfoStore()
      const tokenInfo = useTokenInfoStore()

      // 시스템 새탭에 open
      const child = window.open(url, '_blank')

      // 토큰 발송 postmessage 리스너 등록 (1회용)
      window.addEventListener(
        'message',
        (evt) => {
          if (evt.origin !== url) return
          if (evt.data.message !== 'getToken') return // "getToken" 메시지만 수신
          child.postMessage(
            {
              message: 'setToken',
              data: JSON.stringify({
                userInfo: userInfo,
                tokenInfo: tokenInfo
              })
            },
            url
          )
        },
        { once: true }
      )
    }

    app.provide('openSSO', openSSO)
  }
}
