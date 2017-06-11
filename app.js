// 配置文件
import Config from './commons/config.js'
//豆瓣API
import DouBanApi from './commons/douban.js'

App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    wx.showLoading({
      title:'正在加载中...'
    })
    let _that=this;
    // 向导页面图片使用
    let _getMovieList=DouBanApi.GetMovieList("coming_soon",1,5);
    _getMovieList.then((res)=>{
      res.data.subjects.forEach((item)=>{
        _that.config.guidepages.push({
          id:item.id,
          image:item.images.large
        })
      })
    })
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  },
  /**
   * 全局属性
   */
  config:Config.AppConfig
})
