//豆瓣API
import DouBanApi from '../../commons/douban.js'

let app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    guidepages:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _that=this;
    // 向导页面图片使用
    let _getMovieList=DouBanApi.GetMovieList("coming_soon",1,5);
    _getMovieList.then((res)=>{
      let _newdata=[];
      res.data.subjects.forEach((item)=>{
        _newdata.push({
          id:item.id,
          image:item.images.large
        })
      })
      _that.setData({
        guidepages:_newdata
      })
      wx.hideLoading();
    }).catch((err)=>{
      wx.hideLoading();
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
  start () {
    // 跳转到首页  
    // switchTab 该跳转方式可以跳转与tabBar相同的url
    // redirectTo 该跳转方式需要跳转与tabBar不同的url
    wx.switchTab({ url: '../index/index' })
  }
})