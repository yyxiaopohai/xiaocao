<template>
  <div>

    <!-- 阿里云视频播放器样式 -->
    <link rel="stylesheet" href="https://g.alicdn.com/de/prismplayer/2.8.2/skins/default/aliplayer-min.css" >
    <!-- 启用私有加密的防调式：生产环境使用 -->
    <script src="https://g.alicdn.com/de/prismplayer/2.8.0/hls/aliplayer-vod-anti-min.js" />
    <!-- 阿里云视频播放器脚本 -->
    <script charset="utf-8" type="text/javascript" src="https://g.alicdn.com/de/prismplayer/2.8.2/aliplayer-min.js" />

    <!-- 阿里云视频播放器组件 -->
    <script type="text/javascript" charset="utf-8" src="https://player.alicdn.com/aliplayer/presentation/js/aliplayercomponents.min.js"/>
    <!-- 定义播放器dom -->
    <div id="player-con" class="prism-player"/>
  </div>
</template>
<script>
import vodApi from '~/api/vod'
export default {
  async asyncData({ params }) {
    const response = await vodApi.getPlayAuth(params.vid)
    return {
      vid: params.vid,
      playAuth: response.data.data.playAuth
    }
  },
  mounted() {
    /* 关闭广告的自定义事件, 可自行修改代码从而满足不同的功能, 参数为视频广告组件本身 */
    var videoAdClose = function(videoAd) {
    /* 调用视频广告组件的暂停事件来暂停广告 */
      videoAd.pauseVideoAd()
      var result = confirm('确定开通会员关闭广告吗？')
      if (result) {
        /* 调用视频广告组件关闭事件来关闭广告 */
        videoAd.closeVideoAd()
      } else {
        /* 调用视频广告组件的播放事件来播放广告 */
        videoAd.playVideoAd()
      }
    }
    var danmukuList = [{
      'mode': 1,
      'text': '哈哈',
      'stime': 1000,
      'size': 25,
      'color': 0xffffff
    }, {
      'mode': 1,
      'text': '前方高能',
      'stime': 2000,
      'size': 25,
      'color': 0xff0000
    }, {
      'mode': 1,
      'text': '灵魂歌手',
      'stime': 30000,
      'size': 25,
      'color': 0xff0000
    }, {
      'mode': 1,
      'text': '顺手一划',
      'stime': 10000,
      'size': 25,
      'color': 0x00c1de
    }]
    /* eslint-disable no-undef */
    /* const player = */new Aliplayer({
      id: 'player-con',
      width: '100%',
      height: '500px',
      autoplay: true, // 默认自动播放

      // 播放方式二：加密视频的播放：首先获取播放凭证
      encryptType: '1', // 如果播放加密视频，则需设置encryptType=1，非加密视频无需设置此项
      vid: this.vid,
      playauth: this.playAuth,
      components: [{
        name: 'BulletScreenComponent', // 跑马灯组件
        type: AliPlayerComponent.BulletScreenComponent,
        /** 跑马灯组件三个参数 text, style, bulletPosition
       * text: 跑马灯文字内容
       * style: 跑马灯样式
       * bulletPosition: 跑马灯位置, 可选的值为 'top' (顶部), 'bottom' (底部), 'random' (随机), 不传值默认为 'random'
       */
        args: ['欢迎来到谷粒学院', { fontSize: '16px', color: '#00c1de' }, 'random']
      },
      {
        name: 'AliplayerDanmuComponent', // 弹幕组件
        type: AliPlayerComponent.AliplayerDanmuComponent,
        args: [danmukuList]
      },
      {
        name: 'VideoADComponent', // 视频广告组件
        type: AliPlayerComponent.VideoADComponent,
        /* 视频广告四个参数 adVideoSource, adLink, adCloseFunction, closeText
       * adVideoSource {@String 广告视频的视频地址 必须参数}
       * adLink {@String 广告视频的链接地址 必须参数}
       * adCloseFunction {@Function 关闭广告的点击事件处理函数, 可选参数, 不传则默认关闭广告视频}
       * closeText {@String 关闭广告的文字内容, 可选参数, 不传则默认为 '关闭广告'}
       */
        args: ['http://player.alicdn.com/ad/citybrain.mp4', 'https://et.aliyun.com/brain/city', videoAdClose, 'VIP关闭广告']
      }]
    }, function(player) {
      console.log('播放器创建成功')
    })
  }
}
</script>
