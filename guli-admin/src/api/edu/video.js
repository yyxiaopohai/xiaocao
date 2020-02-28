import request from '@/utils/request'

const apiPath = '/admin/edu/video'

export default {

  save(videoInfo) {
    return request({
      url: `${apiPath}/save`,
      method: 'post',
      data: videoInfo
    })
  },

  getById(id) {
    return request({
      url: `${apiPath}/get/${id}`,
      method: 'get'
    })
  },

  updateById(videoInfo) {
    return request({
      url: `${apiPath}/update`,
      method: 'put',
      data: videoInfo
    })
  },

  removeById(id) {
    return request({
      url: `${apiPath}/delete/${id}`,
      method: 'delete'
    })
  }
}
