import request from '~/utils/request'
const apiPath = '/api/vod/video'

export default {

  getPlayAuth(vid) {
    return request({
      url: `${apiPath}/get-play-auth/${vid}`,
      method: 'get'
    })
  }
}
