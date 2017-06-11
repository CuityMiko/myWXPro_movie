import DouBanApi from '../../commons/douban.js'
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
    this.getmovielist(options.type)
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
    let _getMovieList=DouBanApi.GetMovieList(type,this.data.pageindex);
    _getMovieList.then((res)=>{
      let _pageindex=this.data.pageindex+1;
      _that.setData({
        coming_soon_movielist:res.data.subjects,
        type:type,
        pageindex:_pageindex
      })
      wx.hideLoading()
    }).catch((err)=>{
      console.log(err);
      wx.hideLoading();
    })
  }
})