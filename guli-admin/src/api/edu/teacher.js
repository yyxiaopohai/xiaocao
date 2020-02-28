import request from '@/utils/request'

const apiPath = '/admin/edu/teacher'
export default{
  getList() {
    return request({
      url: `${apiPath}/list`,
      method: 'get'
    })
  },
  list() {
    return request({
      url: `${apiPath}/list`,
      method: 'get'
    })
  },
  getPageList(page, limit, searchObj) {
    return request({
      url: `${apiPath}/list/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },
  save(teacher) {
    return request({
      url: `${apiPath}/save`,
      method: 'post',
      data: teacher
    })
  },
  removeById(id) {
    return request({
      url: `${apiPath}/delete/${id}`,
      method: 'delete'
    })
  },
  batchRemove(idList) {
    return request({
      url: `${apiPath}/batch-delete`,
      method: 'delete',
      data: idList
    })
  },
  getById(id) {
    return request({
      url: `${apiPath}/get/${id}`,
      method: 'get'
    })
  },
  updateById(teacher) {
    return request({
      url: `${apiPath}/put`,
      method: 'put',
      data: teacher
    })
  },
  selectNameListByKey(key) {
    return request({
      url: `${apiPath}/list/name/${key}`,
      method: 'get'
    })
  }
}
