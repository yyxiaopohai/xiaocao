import request from '@/utils/request'
const apiPath = '/api/order/weixin-pay'
export default {
  createNative(orderNo) {
    return request({
      url: `${apiPath}/create-native/${orderNo}`,
      method: 'get'
    })
  },
  queryPayStatus(out_trade_no) {
    return request({
      url: `${apiPath}/queryPayStatus/${out_trade_no}`,
      method: 'get'
    })
  }
}
