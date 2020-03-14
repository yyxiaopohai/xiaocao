import request from '@/utils/request'
const apiPath = '/api/ucenter/member'

export default {

  submitRegister(formItem) {
    return request({
      url: `${apiPath}/register`,
      method: 'post',
      data: formItem
    })
  },

  submitLogin(userInfo) {
    return request({
      url: `${apiPath}/login`,
      method: 'post',
      data: userInfo
    })
  },

  getLoginInfo() {
    return request({
      url: `${apiPath}/auth/get-login-info`,
      method: 'get'
    })
  }
}
