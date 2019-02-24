import '@tarojs/async-await'
import Taro from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import BaseView from './pages/base-view'

import Index from './pages/home'

import configStore from './store'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends BaseView {

  config = {
    pages: [
      // 商城模块
      'pages/home/index', // 商城首页
      'pages/home/login', // 登录

      // 产品模块
      'pages/product/list', // 产品列表
      'pages/product/detail', // 产品详情

      // 购物车模块
      'pages/cart/list', // 购物车列表

      // 会员中心模块
      'pages/member/index', // 会员中心首页
      'pages/member/address-list', // 地址列表
      'pages/member/address-edit', // 地址编辑
      'pages/member/coupon-list', //




      // 我的优惠券列表

      // 优惠券模块
      'pages/coupon/list',

      // 订单模块
      'pages/order/list',  // 我的订单列表
      'pages/order/detail',  //我的订单详情
      'pages/order/confirm' // 确认订单
    ],
    window: {
      backgroundTextStyle: 'dark',
      backgroundColor: '#f6f6f6',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '汤臣倍健官方旗舰店',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#585858',
      selectedColor: '#6eb92b',
      list: [
        {
          iconPath: './assets/images/icon_tabbar_home.png',
          selectedIconPath: './assets/images/icon_tabbar_home_active.png',
          pagePath: 'pages/home/index',
          text: '商城'
        },
        {
          iconPath: './assets/images/icon_tabbar_product.png',
          selectedIconPath: './assets/images/icon_tabbar_product_active.png',
          pagePath: 'pages/product/list',
          text: '分类'
        },
        {
          iconPath: './assets/images/icon_tabbar_shopping_cart.png',
          selectedIconPath: './assets/images/icon_tabbar_shopping_cart_active.png',
          pagePath: 'pages/cart/list',
          text: '购物车'
        },
        {
          iconPath: './assets/images/icon_tabbar_uc.png',
          selectedIconPath: './assets/images/icon_tabbar_uc_active.png',
          pagePath: 'pages/member/index',
          text: '我的'
        }
      ]
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
