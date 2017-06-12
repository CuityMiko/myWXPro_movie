import DouBanApi from '../../commons/douban.js'
import Config from '../../commons/config.js'
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:"",
    movielist:[],
    pageindex:1,
    title:'',
    hasMore:true,
    pagecount:0,
    loading:false
  },

  /**
   * 自定义事件
   */
  toMore:function(e){
    if(!this.data.loading){
      let _pageindex=this.data.pageindex+1;
      if(_pageindex<=this.data.pagecount){
        this.setData({
          hasMore:true,
          loading:true
        })
        this.getmovielist(this.data.type,_pageindex);
      }
      else{
        this.setData({
          hasMore:false
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getmovielist(options.type,1);
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
  getmovielist(type,pageindex){
    let _start=(pageindex-1)*app.config.paged.pagesize;
    let _that=this;
    wx.showLoading({
      title:'正在加载中...'
    })
    let _getMovieList=DouBanApi.GetMovieList(type,pageindex);
    _getMovieList.then((res)=>{
      // 计算总页数
      let _pagecount=Math.ceil(res.data.total/Config.AppConfig.paged.pagesize);
      if(res.data.subjects.length>0){
        _that.setData({
          movielist:_that.data.movielist.concat(res.data.subjects),
          type:type,
          pageindex:pageindex,
          title:res.data.title,
          pagecount:_pagecount,
          hasMore:true,
          loading:false
        })
      }else{
        _that.setData({
          type:type,
          pageindex:pageindex,
          title:res.data.title,
          pagecount:_pagecount,
          hasMore:false,
          loading:false
        })
      }
      wx.hideLoading()
    }).catch((err)=>{
      console.log(err);
      wx.hideLoading();
    })
  }
})