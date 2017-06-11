import BaiduMap from '../../commons/baidumap.js'
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:"",
    movielist:[],
    pageindex:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let bdpromise= BaiduMap.getLocation();
    bdpromise.then((data)=>{
      console.log(data);
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },

  /**
   * 自定义方法
   */
  //获取电影列表
  getmovielist(type){
    let _start=(this.data.pageindex-1)*app.config.paged.pagesize;
    let _that=this;
    wx.showLoading({
      title:'正在加载中...'
    })
    wx.request({
      url: `${app.config.serverurl}${type}`,
      data:{
        "start": _start,
        "count": app.config.paged.pagesize,
        "city": '杭州'
      },
      header: {
        'content-type': 'json'
      },
      success: function (res) {
        let _pageindex=this.data.pageindex+1;
        _that.setData({
          coming_soon_movielist:res.data.subjects,
          type:type,
          pageindex:_pageindex
        })
        wx.hideLoading()
      },
      fail:function(err){
        console.log(err);
        wx.hideLoading();
      }
    })
  }
})