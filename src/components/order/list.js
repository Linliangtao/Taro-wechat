import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import BaseComponent from '../base-component'

import '../../assets/scss/components/order/index.scss'

/**
 * 订单列表
 */
export default class OrderListComp extends BaseComponent {
  static defaultProps = {}

  static propTypes = {}

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <View className='i-order-list'>{this.props.children}</View>
    )
  }
}
