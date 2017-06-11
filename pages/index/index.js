// 豆瓣电影API
import DouBanApi from '../../commons/douban.js' 
let app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners:[],
    in_theaters_movielist:[],
    coming_soon_movielist:[],
    top250_movielist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title:'正在加载中...'
    })
    // 正在热映
    let _that=this;
    let _getIn_theaters=DouBanApi.GetMovieList("in_theaters");
    _getIn_theaters.then((res)=>{
      let _newdata=res.data.subjects.slice(0,5);
      let _banners=[]
      _newdata.forEach((item)=>{
        _banners.push({
          id:item.id,
          title:item.title,
          image:item.images.large
        })
      })
      // 标题截取
      res.data.subjects.forEach((item)=>{
        if(item.title.length>5)
          item.title=item.title.substring(0,6)+'..'
      })
      _that.setData({
        banners:_banners,
        in_theaters_movielist:res.data.subjects
      })
      wx.hideLoading()
    }).catch((err)=>{
      console.log(err);
      wx.hideLoading();
    })

    // 即将上映
    let _getComing_soon=DouBanApi.GetMovieList("coming_soon");
    _getComing_soon.then((res)=>{
      // 标题截取
      res.data.subjects.forEach((item)=>{
        if(item.title.length>5)
          item.title=item.title.substring(0,6)+'..'
      })
      _that.setData({
        coming_soon_movielist:res.data.subjects
      })
      wx.hideLoading()
    }).catch((err)=>{
      console.log(err);
      wx.hideLoading();
    })
    
    // top250
    let _getTop250=DouBanApi.GetMovieList("top250");
    _getTop250.then((res)=>{
      // 标题截取
      res.data.subjects.forEach((item)=>{
        if(item.title.length>5)
          item.title=item.title.substring(0,6)+'..'
      })
      _that.setData({
        top250_movielist:res.data.subjects
      })
      wx.hideLoading()
    }).catch((err)=>{
      console.log(err);
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
    
  }
})