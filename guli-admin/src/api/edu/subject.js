import request from '@/utils/request'

const apiPath = '/admin/edu/subject'
export default{
  getNestedList() {
    return request({
      url: `${apiPath}/nested-list`,
      method: 'get'
    })
  }
}
