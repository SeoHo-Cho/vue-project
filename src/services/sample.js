import { $api, $sample } from './api.conf'

export default {
  /**
   * 로직이 필요 없는경우 예시
   * 상품 목록을 조회한다.
   */
  getProducts: async () => await $api.get('/products'),

  /**
   * 로직이 필요한 경우 예시
   * 사용자 카트 조회
   * @param {Number} userSn
   */
  getUserCart: async (userSn) => {
    const { data: userInfo } = await $api.get(`/users/${userSn}`)
    const { data: cartInfo } = await $api.get(`/carts/user/${userSn}`)

    return {
      userInfo,
      cartInfo
    }
  },

  /**
   * 병렬 조회 예시
   *
   * 상품정보를 조회한다.
   * @param {Number} productNo
   * @param {Boolean} isParallel
   * @returns { 상품정보, 카테고리정보 }
   */
  getProductInfo: async (productNo, isParallel = true) => {
    // 순차적으로 조회
    const concurrency = async () => {
      // 상품일련번호로 상품 상세정보 조회
      const { data: productInfo } = await $api.get(`/products/${productNo}`)

      // 카테고리 목록 조회
      const { data: categories } = await $api.get(`/products/categories`)

      return {
        productInfo,
        categories
      }
    }

    // 병렬로 조회 (데이터 간 상관관계가 없는경우)
    const parallel = async () => {
      const [{ data: productInfo }, { data: categories }] = await Promise.all([$api.get(`/products/${productNo}`), $api.get(`/products/categories`)])

      return {
        productInfo,
        categories
      }
    }

    return isParallel ? parallel() : concurrency()
  },

  fetchList: async (payload) => {
    return $sample.get('/user', { params: payload })
  }
}
