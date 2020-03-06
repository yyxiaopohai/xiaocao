import request from '@/utils/request'
const apiPath = '/admin/vod/video'

export default {

  removeByVodId(id) {
    return request({
      // 此处暂时设置为8130端口，未来通过微服务网关解决
      baseURL: 'http://127.0.0.1:8130',
      url: `${apiPath}/remove/${id}`,
      method: 'delete'
    })
  }
}
