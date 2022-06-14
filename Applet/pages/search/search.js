import httpRequest from "../../utils/http"

// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchList: [],
    searchValue: ''
  },
  t: null,
  clearSearch(){
    this.setData({
      searchList: [],
      searchValue: ''
    })
  },
  inputSearch(ev) {
    var value = ev.detail.value
    clearTimeout(this.t)
    this.t = setTimeout(() => {
      Promise.all([
        httpRequest({
          url: `/comments?title_like=${value}`
        }),
        httpRequest({
          url: `/search?title_like=${value}`
        })
      ]).then(res => {
        if(value.length === 0){
          this.clearSearch()
        }else {
          this.setData({
            searchList: [
              ...res[0].map(item => ({
                ...item,
                type: 1
              })),
              ...res[1].map(item => ({
                ...item,
                type: 2
              }))
            ]
          })
        }
      })
    }, 500)
  },
  searchPageAction(e){
    var type = e.currentTarget.dataset.type
    var id = e.currentTarget.dataset.id
    var title = e.currentTarget.dataset.title
    if(type === 1){
      wx.navigateTo({
        url: `/pages/detail/detail?id=${id}&name=${title}`,
      })
    }else if(type === 2){
      wx.navigateTo({
        url: `/pages/searchlist/searchlist?id=${id}&name=${title}`,
      })
    }
    console.log("跳转");
    
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