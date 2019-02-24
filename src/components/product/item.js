import Taro from '@tarojs/taro'
import { Image, Text, View } from '@tarojs/components'
import * as PropTypes from 'prop-types'
import BaseComponent from '../base-component'

import '../../assets/scss/components/product/index.scss'

/**
 * 商品列表项
 */
export default class ProductItemComp extends BaseComponent {
  static defaultProps = {
    cover: '', // 封面图片路径
    title: '', // 商品标题
    subtitle: '', // 商品副标题
    price: 0, // 商品售价
    originalPrice: 0 // 商品原价
  }

  static propTypes = {
    cover: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    price: PropTypes.number,
    originalPrice: PropTypes.number,
  }

  constructor (props) {
    super(props)
  }

  render () {
    const { cover, title, subtitle, price, originalPrice } = this.props

    return (
      <View className='i-product-item'>
        <View className='pi-cover'>
          <Image className='pi-cover-image' src={cover} mode='aspectFit' />
        </View>
        <View className='pi-bt-container'>
          <Text className='pi-title'>{title}</Text>
          <Text className='pi-subtitle'>{subtitle}</Text>
          <View className='pi-ft'>
            <Text className='pi-price'>¥ {price}</Text>
            <Text className='pi-original-price'>原价:{originalPrice}</Text>
            <Text className='buy-btn i-btn'>购买</Text>
          </View>
        </View>
      </View>
    )
  }
}
