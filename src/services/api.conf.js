import axios, { HttpStatusCode } from 'axios'
import { parse, stringify } from 'qs'
import { useTokenInfoStore } from '@/stores/tokenInfo'
import { useUserInfoStore } from '@/stores/userInfo'
import { useAlertStore } from '@/stores/modal'
// import { useRouter } from 'vue-router'

// FIXME: test
const BASE_API_URL = import.meta.env.VITE_BASE_API_URL
const LOGIN_URL = ['/auth/login-jwt', '/auth/token/refresh']

const isLoginRequest = (url) => LOGIN_URL.includes(url)

const refreshToken = async () => {
  const tokenInfo = useTokenInfoStore()
  const { userInfo } = useUserInfoStore()

  const { httpStatus, data } = await $api.post('/auth/token/refresh', {
    id: userInfo.id,
    refreshToken: tokenInfo.refreshToken,
    userSe: userInfo.userSe
  })

  if (httpStatus.code === HttpStatusCode.Ok) {
    tokenInfo.accessToken = data.accessToken
    Object.assign(userInfo, {
      name: data.resultVO.name,
      orgnztId: data.resultVO.orgnztId,
      orgnztNm: data.resultVO.orgnztNm
    })

    return true
  }
  return false
}

export const $api = (() => {
  const instance = axios.create({
    baseURL: BASE_API_URL,
    // withCredentials: true,
    paramsSerializer: {
      encode: parse,
      serialize: (params) => {
        // sort property 가공
        if (params.sort) {
          // camelCase to snake_case
          params.sort = params.sort.map((str) => {
            let [property, direction] = str.split(',')
            property = property.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`)
            return property + ',' + direction
          })
        }
        return stringify(params, { arrayFormat: 'repeat' })
      }
    }
  })

  // request interceptor
  instance.interceptors.request.use(
    (config) => {
      // 새로고침 요청이 아니라면
      if (!isLoginRequest(config.url)) {
        // api 호출 시, Authorization 헤더 추가
        const tokenInfo = useTokenInfoStore()
        config.headers['Authorization'] = `Bearer ${tokenInfo.accessToken}`
      }
      return config
    },
    (error) => {
      console.error('REQUEST-ERROR', error)
      return Promise.reject(error)
    }
  )

  // response interceptor
  instance.interceptors.response.use(
    (response) => {
      const resolve = {
        data: response.data.result || response.data, // 응답 결과 데이터
        status: {
          // 서버 응답 결과 (비지니스 상태코드)
          code: response.data.resultCode,
          message: response.data.resultMessage
        },
        httpStatus: {
          // http status
          code: response.status,
          text: response.statusText
        }
      }
      console.group('API')
      console.log('RAW RES: ', response.config.url, response)
      console.table('DATA: ', resolve.data.result)
      console.groupEnd('API')
      return resolve
    },
    async (error) => {
      if (!error.response) {
        console.error('ERROR', error)
        return
      }
      console.error('ERROR', error.response)
      const { data, status, statusText, config } = error.response

      if (status === HttpStatusCode.Unauthorized) {
        if (!isLoginRequest(config.url)) {
          console.groupCollapsed('REFRESH-TOKEN')
          const isRefreshSuccess = await refreshToken()
          console.log('성공: ', isRefreshSuccess)
          if (isRefreshSuccess) {
            console.log('API RETRY: ', config.url)
            config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`
            const retryResult = await instance.request(config)
            console.log('API RETRY RESULT: ', retryResult)
            console.groupEnd('REFRESH-TOKEN')
            return retryResult
          } else {
            const { open } = useAlertStore()
            open('세션이 종료되었습니다.\n로그인페이지로 이동합니다.', () => {
              // useRouter().push('/login')
              location.href = '/login'
            })
          }
        }
      }

      const resolve = {
        data: data,
        status: {
          code: data.code,
          message: data.message
        },
        httpStatus: {
          code: status,
          text: statusText
        }
      }

      // 공통 에러 메세지 처리, 메세지가 있는경우 출력
      // if (data.message && !isLoginRequest) {
      // 	useAlertStore().open(data.message)
      // }

      // api에서 catch를 쓸거면 reject, 아니면 resolve
      return Promise.resolve(resolve)
    }
  )
  return instance
})()

const BASE_DUMMY_URL = import.meta.env.VITE_DUMMYAPI_URL
export const $sample = (() => {
  const instance = axios.create({
    baseURL: BASE_DUMMY_URL,
    // withCredentials: true,
    paramsSerializer: {
      encode: parse,
      serialize: (params) => {
        // sort property 가공
        if (params.sort) {
          // camelCase to snake_case
          params.sort = params.sort.map((str) => {
            let [property, direction] = str.split(',')
            property = property.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`)
            return property + ',' + direction
          })
        }
        console.log('params', params)
        return stringify(params, { arrayFormat: 'repeat' })
      }
    }
  })

  // request interceptor
  instance.interceptors.request.use(
    (config) => {
      config.headers['app-id'] = import.meta.env.VITE_DUMMNYAPI_KEY
      return config
    },
    (error) => {
      console.error('REQUEST-ERROR', error)
      return Promise.reject(error)
    }
  )

  // response interceptor
  instance.interceptors.response.use(
    (response) => {
      console.log(response)
      const resolve = {
        data: response.data.result || response.data, // 응답 결과 데이터
        status: {
          // 서버 응답 결과 (비지니스 상태코드)
          code: response.data.resultCode,
          message: response.data.resultMessage
        },
        httpStatus: {
          // http status
          code: response.status,
          text: response.statusText
        }
      }
      console.group('API')
      console.log('RAW RES: ', response.config.url, response)
      console.table('DATA: ', resolve.data.result)
      console.groupEnd('API')
      return resolve
    },
    async (error) => {
      if (!error.response) {
        console.error('ERROR', error)
        return
      }
      console.error('ERROR', error.response)
      const { data, status, statusText, config } = error.response

      const resolve = {
        data: data,
        status: {
          code: data.code,
          message: data.message
        },
        httpStatus: {
          code: status,
          text: statusText
        }
      }

      // 공통 에러 메세지 처리, 메세지가 있는경우 출력
      // if (data.message && !isLoginRequest) {
      // 	useAlertStore().open(data.message)
      // }

      // api에서 catch를 쓸거면 reject, 아니면 resolve
      return Promise.resolve(resolve)
    }
  )
  return instance
})()

export const $otherApi = (() => {
  // 다른 api...
  return null
})()
