import Taro from  '@tarojs/taro'
import { View, Swiper, SwiperItem, Text, Image } from '@tarojs/components'
import BaseView from  '../base-view'
import '../../assets/scss/pages/product/detail.scss'

export default class ProductDetailView extends  BaseView{
  config = {
    navigationBarTitleText:'商品详情'
  }

  render () {
    return (
      <View className='i-page-product-detail i-page'>
        {/*****轮播图****/}
        <Swiper className='container-wrap' duration='300'indicatorColor='#999' indicatorActiveColor='#333' circular indicatorDots autoplay>
          <View className='container'>
            <SwiperItem>
              <View className='demo-box-1'>1</View>
            </SwiperItem>
            <SwiperItem>
              <View className='demo-box-2'>2</View>
            </SwiperItem>
            <SwiperItem>
              <View className='demo-box-3'>3</View>
            </SwiperItem>
          </View>
        </Swiper>
        {/*****产品信息****/}
        <View className='content-wrap'>
          <View className='nav-wrap'>
            <View className='nav-title-inner'>
              <Image className='nav-icon' src={require('../../assets/images/icon_overseas_rec.png')} />
              <View className='nav-title'>
                <Text>BY-HEALTH汤臣倍健 氨糖软骨素钙片120片</Text>
                <Text>美国进口绿瓶</Text>
              </View>
              <View className='nav-money'>
                <Text>148</Text>
                <Text>328</Text>
              </View>
            </View>
          </View>
        </View>
        {/*****信息详情****/}
        <View className='nav-wrap li-item-top'>
          <View className='nav-inner sales-volume-wrap'>
            <Image className='xl-icon' src={require('../../assets/images/icon_nav_sale.png')} />
            <Text className='sales-volume'>
              销量
              <Text className='number'>1811</Text>
            </Text>
            <Text className='address'>广东省 广州市</Text>
          </View>
        </View>
        <View className='nav-wrap li-item-top'>
          <View className='nav-inner sales-volume-wrap'>
            <Image className='xl-icon' src={require('../../assets/images/icon_nav_express.png')} />
            <Text className='sales-volume'>包邮</Text>
          </View>
        </View>
        <View className='nav-wrap li-item-top'>
          <View className='nav-inner sales-volume-wrap sales-volume-flex'>
            <View className='sales-volume-wrap'>
              <Image className='xl-icon' src={require('../../assets/images/icon_nav_selection.png')} />
              <Text className='sales-volume'>选择规格</Text>
            </View>
            {/*<view>></view>*/}
          </View>
        </View>
        <View className='nav-wrap li-item-top'>
          <View className='nav-inner sales-volume-wrap sales-volume-flex'>
            <View className='sales-volume-wrap'>
              <Image className='xl-icon' src={require('../../assets/images/icon_nav_detail.png')} />
              <Text className='sales-volume'>详情介绍</Text>
            </View>
            {/*<view>></view>*/}
          </View>
        </View>
        <View className='nav-wrap li-item-top li-border-b-1'>
          <View className='nav-inner sales-volume-wrap sales-volume-flex'>
            <View className='sales-volume-wrap'>
              <Image className='xl-icon' src={require('../../assets/images/icon_nav_comment.png')} />
              <Text className='sales-volume'>评论</Text>
            </View>
            {/*<view>></view>*/}
          </View>
        </View>
        <View className='item-bg'>
          <View className='nav-inner comment-content li-border-b-2'>
            <Text className='comment-title'>A****</Text>
            <Text className='comment-text'>我是评论君，我是评论君，我是评论君，我是评论君，我是评论君，我是评论君，我是评论君</Text>
          </View>
        </View>
        <View className='item-bg li-border-b-3'>
          <View className='nav-inner comment-content'>
            <Text className='comment-title'>B****</Text>
            <Text className='comment-text'>我是评论君，我是评论君，我是评论君，我是评论君，我是评论君，我是评论君，我是评论君</Text>
          </View>
        </View>
        <View className='item-bg'>
          <View className='all-comment item-bg nav-inner'>
            <Text>所有评价<Text>(1800)</Text></Text>
            <Text>有图评论<Text>(1800)</Text></Text>
          </View>
        </View>
        <View className='nav-wrap li-item-top li-border-b-1'>
          <View className='nav-inner sales-volume-wrap sales-volume-flex'>
            <View className='sales-volume-wrap'>
              <Image className='xl-icon' src={require('../../assets/images/icon_nav_commodity.png')} />
              <Text className='sales-volume'>商品介绍</Text>
            </View>
            {/*<view>></view>*/}
          </View>
        </View>
        <View className='buttom-image'>

        </View>

        {/*****底部****/}
        <View className='footer item-bg '>
          <View className='footer-font'>
            <Image className='footer-icon' src={require('../../assets/images/icon_footer_home.png')} />
            <Text>首页</Text>
          </View>
          <View className='footer-font'>
            <Image className='footer-icon' src={require('../../assets/images/icon_footer_collection.png')} />
            <Text>收藏</Text>
          </View>
          <View className='footer-font'>
            <Image className='footer-icon' src={require('../../assets/images/icon_footer_shoppingcart.png')} />
            <Text>购物车</Text>
          </View>
          <View>
            <View className='footer-btn'>
              <Text>加入购物车</Text>
            </View>
            <View className='footer-btn footer-btn-2'>
              <Text>立即购买</Text>
            </View>
          </View>
        </View>

      </View>

    )
  }

}
