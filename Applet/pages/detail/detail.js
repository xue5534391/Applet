// pages/detail/detail.js
import httpRequest from '../../utils/http'
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		detailImg: [],
		current: 0,
		detailInfo: [],
		shopId: 1
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		wx.setNavigationBarTitle({
			title: options.name
		})
		this.httpDetailImg(options.id)
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	httpDetailImg(id) {
		httpRequest({
			url: `/comments/${id}`
		}).then(res => {
			this.setData({
				detailImg: res.detailImg,
				detailInfo: res.detailInfo,
				shopId: res.id
			})
		})
	},
	// 放大图片
	enlargeImg(ev) {
		console.log(ev);
		wx.previewImage({
			current: ev.currentTarget.dataset.currentimg,
			urls: ev.currentTarget.dataset.urls.map(item => "http://localhost:3000" + item.detailImgUrl),
		})
	},
	// 切换商品列表 / 用户评价
	setCurrent(ev) {
		this.setData({
			current: ev.target.dataset.index
		})
	},
	//进入购物车 
	carListAction() {
		// 有权限
		if (wx.getStorageSync('token')) {
			wx.switchTab({
				url: "/pages/shopcar/shopcar"
			})
		} else {
			wx.getUserProfile({
				desc: '购物车列表',
				success(res) {
					wx.setStorageSync('token', res.userInfo)
					wx.switchTab({
						url: "/pages/shopcar/shopcar"
					})
				}
			})
		}
	},
	// 添加购物车
	addShopCarAction() {
		if (!wx.getStorageSync('token')) {
			wx.getUserProfile({
				desc: '购物车商品添加',
				success(res) {
					wx.setStorageSync('token', res.userInfo)
					wx.showToast({
						title: '微信授权成功',
					})
				}
			})
		} else {
			// 有权限添加商品
			var {
				nickName
			} = wx.getStorageSync('token') // 获取用户
			var commentId = this.data.shopId // 获取购买商品的Id
			httpRequest({
				url: '/userShopCar',
				data: {
					nickName,
					commentId
				}
			}).then((res) => {
				// 等于0表示该用户并未买商品
				if (res.length === 0) {
					httpRequest({
						url: `/userShopCar`,
						method: "post",
						data: {
							id: commentId,
							nickName,
							commentId,
							goodNumber: 1,
							checked: false
						}
					}).then(res => this.shopCarOK())
				} else {
					// 该用户买过该商品
					httpRequest({
						url: `/userShopCar/${commentId}`,
						method: "put",
						data: {
							...res[0],
							goodNumber: res[0].goodNumber + 1
						}
					}).then(res => this.shopCarOK())
				}
			})
		}
	},
	// 添加购物车成功的信息弹窗
	shopCarOK() {
		wx.showToast({
			title: '添加购物车成功',
		})
	},
	onReady() {
		// this.httpDetailImg()
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