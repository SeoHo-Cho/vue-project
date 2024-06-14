import { $api } from './api.conf'

export default {
  login: async (payload) => await $api.post('/auth/login-jwt', payload),
  logout: async () => await $api.get('/auth/logout')
}
