// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    motto: 'Hello World',
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
    },
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
    currentStyle: '',
    weatherData: {
      city: '北京市',
      temperature: 25,
      description: '晴朗',
      humidity: 61,
      rainfall: 4
    },
    forecast: [
      {
        date: '周五, 3月15日',
        emoji: '🌤️',
        temperature: 22
      },
      {
        date: '周六, 3月16日',
        emoji: '🌧️',
        temperature: 19
      },
      {
        date: '周日, 3月17日',
        emoji: '☀️',
        temperature: 25
      }
    ],
    styles: [
      '韩系简约风',
      '运动休闲风',
      '学院风',
      '复古文艺风'
    ]
  },
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    const { nickName } = this.data.userInfo
    this.setData({
      "userInfo.avatarUrl": avatarUrl,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    })
  },
  onInputChange(e) {
    const nickName = e.detail.value
    const { avatarUrl } = this.data.userInfo
    this.setData({
      "userInfo.nickName": nickName,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  onLoad() {
    this.updateDateTime();
    // 每分钟更新一次时间
    setInterval(() => {
      this.updateDateTime();
    }, 60000);
  },
  updateDateTime() {
    const now = new Date();
    const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const dayOfWeek = days[now.getDay()];
    const month = now.getMonth() + 1;
    const date = now.getDate();
    
    this.setData({
      currentDate: `${dayOfWeek}, ${month}月${date}日`
    });
  },
  selectStyle(e) {
    const style = e.currentTarget.dataset.style;
    this.setData({
      currentStyle: style
    });
  },
  generateOutfit() {
    if (!this.data.currentStyle) {
      wx.showToast({
        title: '请先选择穿搭风格',
        icon: 'none'
      });
      return;
    }

    wx.showLoading({
      title: '生成穿搭中...',
    });

    // 模拟生成穿搭的延迟
    setTimeout(() => {
      wx.hideLoading();
      wx.navigateTo({
        url: '/pages/outfit/outfit'
      });
    }, 1500);
  },
  navigateToProfile() {
    wx.navigateTo({
      url: '/pages/profile/profile'
    });
  }
})
