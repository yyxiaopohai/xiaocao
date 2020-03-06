import request from '~/utils/request'

const apiPath = '/api/edu/teacher'
export default{

  getList() {
    return request({
      url: `${apiPath}/list`,
      method: 'get'
    })
  },

  getById(id) {
    return request({
      url: `${apiPath}/get/${id}`,
      method: 'get'
    })
  },
  getPageList(page, limit) {
    return request({
      url: `${apiPath}/page-list`,
      method: 'get',
      params: {
        page,
        limit
      }
    })
  }
}
