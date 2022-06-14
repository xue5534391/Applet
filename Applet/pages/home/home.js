// pages/home/home.js
import httpRequest from '../../utils/http'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [],
    commentsList: []
  },
  page: 1,
  limit: 5,
  total: 0,
  getAction(){
    httpRequest({
      url: '/comments?_page=2&_limit=5'
    }).then(res=>{
      console.log(res);
    })
  },
  postAction(){
    httpRequest({
      url: '/user',
      method:'POST',
      data:{
        username: 'hahaha',
        password: '123456'
      }
    }).then(res=>{
      console.log(res);
    })
  },
  putAction(){
    httpRequest({
      url: '/user/3',
      method:"PUT",
      data:{
        username: 'xue'
      }
    })
  },
  delectAction(){
    httpRequest({
      url: '/user/5',
      method: "DELETE"
    })
  },

  bannerRes(){
    httpRequest({
      url: '/banner'
    }).then(res => {
      this.setData({
        bannerList: res
      })
    })
  },
  detailsRes(){
    httpRequest({
      url: `/comments?_page=${this.page}&_limit=${this.limit}`
    },true).then(res => {
      this.total = Number(res.total)
      this.setData({
        commentsList: [...this.data.commentsList, ...res.list]
      })
    })
  },
  detailPage(ev){
    
    var id = ev.currentTarget.dataset.detailid;
    var title = ev.currentTarget.dataset.detailname;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}&name=${title}`
    })
  },
  goSearchPage(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.bannerRes()
    this.detailsRes()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  t: null,
  onPullDownRefresh() {
    console.log("刷新成功");
    clearTimeout(this.t)
    this.t = setTimeout(() => {
      console.log("dd");
      wx.stopPullDownRefresh()
    },1000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    // 数据懒加载
    if(this.total === this.data.commentsList.length){
      return 
    }
    this.page++
    console.log("加载了");
      this.detailsRes()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})