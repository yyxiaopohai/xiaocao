import request from '@/utils/request'
const apiPath = '/api/sms'

export default {

  sendMessage(mobile) {
    return request({
      url: `${apiPath}/send/${mobile}`,
      method: 'get'
    })
  }
}
