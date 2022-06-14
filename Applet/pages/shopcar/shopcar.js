// pages/shopcar/shopcar.js
import httpRequest from '../../utils/http'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buttonsList:[
      {type: 'warn', text: "删除"}
    ],
    shopCarShowList: []
  },

  // 获取用户授权信息
  getUserInfo(){
    if(!wx.getStorageSync('token')){
      wx.showModal({
        title: '未授权',
        content: '您的微信号是否授权登录',
        success (res) {
          if (res.confirm) {
            wx.getUserProfile({
              desc: '授权购物车',
              success(res){
                wx.setStorageSync('token', res.userInfo)
              },
              fail(){
                wx.switchTab({
                  url: '/pages/home/home',
                })
              }
            })
          } else if (res.cancel) {
            wx.switchTab({
              url: '/pages/home/home',
            })
          }
        }
      })
    }
  },
  // 购物车的信息
  shopCarInfo(){
    var {nickName} = wx.getStorageSync('token')
    httpRequest({
      url: `/userShopCar?_expand=comment&nickName=${nickName}`
    }).then(res => {
      console.log(res);
        this.setData({
          shopCarShowList: res
        })
    })
  },
  setChecked(ev){
    var item = ev.currentTarget.dataset.item   //获取当前点击的商品
    item.checked = !item.checked         // 修改商品的状态
    this.newShopCarShowList(item)      //更新商品
  },
  newShopCarShowList(item){
    this.setData({
      shopCarShowList: this.data.shopCarShowList.map(data => {
        // 要更新商品的数据
        if(item.id === data.id){
          return item
        }
        return data
      })
    })
  },
  // 减少商品数量
  reduceAction(ev){
    var item = ev.currentTarget.dataset.item
    if(item.goodNumber > 1){
      item.goodNumber--
    }else{
      item.goodNumber = 1
    }
    this.newShopCarShowList(item)
  },
  // 增加商品数量
  increaseAction(ev){
    var item = ev.currentTarget.dataset.item
    item.goodNumber++
    this.newShopCarShowList(item)
  },
  checkChangeAction(ev){
    var AllChecked = ev.detail.value   // 当前全选的状态
    if(AllChecked.length>0){      // 勾选
      this.setData({
        shopCarShowList: this.data.shopCarShowList.map(item => ({
          ...item,
          checked: true
        }))
      })
    }else{
      // 未勾选
      this.setData({
        shopCarShowList: this.data.shopCarShowList.map(item => ({
          ...item,
          checked: false
        }))
      })
    }
  },
  delectAction(ev){
    var id = ev.currentTarget.dataset.delectid
    this.setData({
      shopCarShowList: this.data.shopCarShowList.filter(item => {
        return item.id !== id
      })
    })
    httpRequest({
      url: `/userShopCar/${id}`,
      method: 'delete'
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
    
     
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getUserInfo()
    this.shopCarInfo()
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