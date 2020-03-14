import request from '@/utils/request'
const apiPath = '/api/order/auth'

export default {
  createOrder(courseId) {
    return request({
      url: `${apiPath}/save/${courseId}`,
      method: 'post'
    })
  },

  isBuy(courseId) {
    return request({
      url: `${apiPath}/is-buy/${courseId}`,
      method: 'get'

    })
  },

  getById(orderId) {
    return request({
      url: `${apiPath}/get/${orderId}`,
      method: 'get'
    })
  }

}
