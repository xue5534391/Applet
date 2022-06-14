// pages/searchlist/searchlist.js
import httpRequest from '../../utils/http'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    current: 1
  },
  piceSort: false, // 开始正序
  favorableSort: false, //开始正序
  // 价格排序
  usePice_sort() {
    this.piceSort = !this.piceSort
    this.setData({
      current: 1,
      list: this.piceSort? this.data.list.sort((a, b) => {
        return b.pice - a.pice // 倒序
      }) : this.data.list.sort((a, b) => {
        return a.pice - b.pice // 正序
      })
    })
  },
  useFavorable_sort() {
    this.favorableSort = !this.favorableSort //切换排序方式
    this.setData({
      current: 2,
      list: this.favorableSort ? this.data.list.sort((a, b) => {
        return b.Favorable - a.Favorable // 倒序
      }) : this.data.list.sort((a, b) => {
        return a.Favorable - b.Favorable // 正序
      })
    })
  },
  httpSearchList(id) {
    httpRequest({
      url: `/search/${id}?_embed=comments`
    }).then(res => {
      this.setData({
        list: res.comments
      })
    })
  },
  goSearchPage(ev) {
    console.log(ev);
    var id = ev.currentTarget.dataset.id
    var title = ev.currentTarget.dataset.title
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}&name=${title}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: options.name
    })
    this.httpSearchList(options.id)
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