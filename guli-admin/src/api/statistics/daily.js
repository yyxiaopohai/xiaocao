import request from '@/utils/request'

const apiPath = '/admin/statistics/daily'
export default {

  createStatistics(day) {
    return request({
      url: `${apiPath}/create/${day}`,
      method: 'post'
    })
  },
  showChart(searchObj) {
    return request({
      url: `${apiPath}/show-chart/${searchObj.begin}/${searchObj.end}/${searchObj.type}`,
      method: 'get'
    })
  }
}
