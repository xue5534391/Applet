
// pages/category/category.js
import httpRequest from '../../utils/http'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: [],
    currentIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 获取分类
  httpCategory(){
    httpRequest({
      url: '/search/?_embed=comments'
    }).then(res => {
      console.log(res);
      this.setData({
        tabList: res
      })
    })
  },
  change(ev){
    this.setData({
      currentIndex: ev.detail.current
    })
  },
  setCurrentIndex(ev){
    this.setData({
      currentIndex: ev.currentTarget.dataset.currentindex
    })
  },
  goPageAction(ev){
    console.log(ev);
    var id = ev.currentTarget.dataset.id
    var name = ev.currentTarget.dataset.title
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}&name=${name}`,
    })
  },
  onLoad(options) {
    this.httpCategory()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

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
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})