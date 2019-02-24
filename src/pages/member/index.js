import Taro from '@tarojs/taro'
import {  View, Text,Image} from '@tarojs/components'
import BaseView from '../base-view'

import memberApi from '../../api/member'
import BgView from '../../assets/images/banner_top.png'
import BgUserView from '../../assets/images/banner_top_user.png'
import NavExpressView from '../../assets/images/icon_nav_express.png'
import '../../assets/scss/pages/member/index.scss'


export default class MemberIndexView extends BaseView {
  config = {
    navigationBarTitleText: '会员中心'
  }

  componentDidShow () {
    this.checkLogin().then(() => {
      this.init()
    })
  }

  /**
   * 初始化
   */
  init () {
    return this.getData()
  }

  /**
   * 获取数据
   * @returns {Promise<void>}
   */
  async getData () {
    try {
      const { data: model } = await memberApi.getMyCenter()
      this.setState({
        model
      })
    } catch (e) {
      this.$util.showToast(e.errmsg)
    }
  }
  /**
   * 跳转到订单列表
   * @returns {Promise<void>}
   * @param {number} ordertype
   * @param {string} url
   */
  goToPage (ordertype, url) {
    Taro.navigateTo({
      url: `${url}?ordertyp=${ordertype}`
    })
  }
  /**
   * 跳转页面
   * @returns {Promise<void>}
   * @param
   */
  goPage (e) {
    Taro.navigateTo({
      url: e.currentTarget.dataset.url
    })
  }

  render () {
    return(

      <View className='i-page-member-index i-page'>

        {/* // top-banner */}
        <View className='top-banner'>
          <Image className='top-banner-bg' mode='widthFix' src={BgView} />
        </View>
        <View className='user'>
          <Image className='user-images' mode='widthFix' src={BgUserView} />
          <View className='message'>
            <View className='name'>某某某</View>
          </View>
        </View>
        {/***图标***/}
        <View className='list nav-bg'>
          <View className='list-li' onClick={this.goToPage.bind(this, '1', '/pages/order/list')}>
            <View className='list-on'>
              <Image className='image-size' src={require('../../assets/images/icon_ob.png')} />
              <Text>待收款</Text>
            </View>
          </View>
          <View className='list-li' onClick={this.goToPage.bind(this, '2', '/pages/order/list')}>
            <View className='list-on'>
              <Image className='image-size' src={require('../../assets/images/icon_fh.png')} />
              <Text>待发货</Text>
            </View>
          </View>
          <View className='list-li' onClick={this.goToPage.bind(this, '3', '/pages/order/list')}>
            <View className='list-on'>
              <Image className='image-size' src={require('../../assets/images/icon_sh.png')} />
              <Text>待收货</Text>
            </View>
          </View>
          <View className='list-li' onClick={this.goToPage.bind(this, '4', '/pages/order/list')}>
            <View className='list-on'>
              <Image className='image-size' src={require('../../assets/images/icon_pj.png')} />
              <Text>待评价</Text>
            </View>
          </View>
          <View className='list-li' onClick={this.goToPage.bind(this, '0', '/pages/order/list')}>
            <View className='list-on'>
              <Image className='image-size'  src={require('../../assets/images/icon_ad.png')} />
              <Text>全部订单</Text>
            </View>
          </View>

        </View>

        {/* // 功能 */}
        <View className='nav-bg'>

          <View className='nav-meu li-border-top li-border-b-1' data-url='/pages/member/address-list' onClick={this.goPage}>
            <View className='nav-inner sales-volume-wrap'>
              <Image className='xl-icon' src={NavExpressView} />
              <Text className='sales-volume'>收货地址</Text>
            </View>
            <View className='xl-icon-left'>
              <Image className='icon-size' src={require('../../assets/images/icon_arrow.png')} />
            </View>
          </View>


          <View className='nav-meu li-border-b-1'>
            <View className='nav-inner sales-volume-wrap'>
              <Image className='xl-icon' src={require('../../assets/images/icon_footer_collection.png')} />
              <Text className='sales-volume'>我的收藏</Text>
            </View>
            <View className='xl-icon-left'>
              <Image className='icon-size' src={require('../../assets/images/icon_arrow.png')} />
            </View>
          </View>


          <View className='nav-meu li-border-b-1'  data-url='/pages/member/coupon-list' onClick={this.goPage}>
            <View className='nav-inner sales-volume-wrap'>
              <Image className='xl-icon' src={require('../../assets/images/icon_discounts.png')} />
              <Text className='sales-volume'>优惠券</Text>
            </View>
            <View className='xl-icon-left'>
              <Image className='icon-size' src={require('../../assets/images/icon_arrow.png')} />
            </View>
          </View>


          <View className='nav-meu li-item-top'>
            <View className='nav-inner sales-volume-wrap'>
              <Image className='xl-icon' src={require('../../assets/images/icon_Storage.png')} />
              <Text className='sales-volume'>储值卡</Text>
            </View>
            <View className='xl-icon-left'>
              <Image className='icon-size' src={require('../../assets/images/icon_arrow.png')} />
            </View>
          </View>


        </View>


      </View>

    )

  }
}
