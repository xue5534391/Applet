function httpRequest(parmise, isHearderRes = false){
  wx.showLoading({
    title: '加载中',
  })
  return new Promise((resolve, reject)=>{
    wx.request({
      ...parmise,
      url:"http://localhost:3000"+parmise.url,
      success:(res)=>{
        if(isHearderRes === true){
          wx.hideLoading({
            success: () => {
              resolve({
                list: res.data,
                total: res.header['X-Total-Count']
              })
            },
          })
        }else{
          wx.hideLoading({
          success: () => {
            resolve(res.data)
          },
        })
        }
        
      },
      fail:(err)=>{
        reject(err)
      },
      complete:()=>{
        
      }
    })
  })
}

export default httpRequest