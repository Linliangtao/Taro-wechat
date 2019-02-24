import Taro from '@tarojs/taro'
import { Image, Text, View } from '@tarojs/components'
import * as PropTypes from 'prop-types'
import BaseComponent from '../base-component'

import '../../assets/scss/components/empty/index.scss'

export default class EmptyComp extends BaseComponent {
  static defaultProps = {
    type: 'default', // 类型
    text: '暂无数据'
  }

  static propTypes = {
    type: PropTypes.oneOf(['default', 'cart', 'collect', 'order']),
    text: PropTypes.string
  }

  icons = {
    default: require('../../assets/images/icon_empty_default.png'),
    cart: require('../../assets/images/icon_empty_cart.png'),
    collect: require('../../assets/images/icon_empty_collect.png'),
    order: require('../../assets/images/icon_empty_order.png'),
  }

  constructor (props) {
    super(props)
  }

  render () {
    const { type, text } = this.props

    return (
      <View className='i-empty'>
        <View className='empty-icon'>
          <Image className='ei-image' src={this.icons[type]} mode='aspectFit' />
        </View>
        <View className='empty-tips'>
          <Text className='et-text'>{text}</Text>
        </View>
      </View>
    )
  }
}
