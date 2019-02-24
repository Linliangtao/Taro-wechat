import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import BaseComponent from '../base-component'

import '../../assets/scss/components/coupon/index.scss'

/**
 * 商品列表
 */
export default class CouponListComp extends BaseComponent {
  static defaultProps = {}

  static propTypes = {}

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <View className='i-coupon-list'>{this.props.children}</View>
    )
  }
}
