import Taro from '@tarojs/taro'
import { Image, Text, View } from '@tarojs/components'
import * as PropTypes from 'prop-types'
import BaseComponent from '../base-component'

import '../../assets/scss/components/coupon/index.scss'

/**
 * 优惠券列表项
 */
export default class CouponItemComp extends BaseComponent {
  static defaultProps = {
    type: 'normal', // 优惠券类型
    name: '', // 优惠券名称
    condition: '无门槛', // 优惠券使用条件
    range: '全场通用', // 优惠券使用范围
    time: '', // 优惠券有效期
    value: 0, // 优惠券价值
    buttonText: '', // 按钮文本，空字符串为不现实
    onTapButton: () => {} // 点击按钮回调
  }

  static propTypes = {
    type: PropTypes.oneOf(['normal', 'main', 'discount']),
    name: PropTypes.string.isRequired,
    condition: PropTypes.string,
    range: PropTypes.string,
    time: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string, PropTypes.number]).isRequired,
    value: PropTypes.number.isRequired,
    buttonText: PropTypes.string,
    onTapButton: PropTypes.func
  }

  // 背景图片
  bgImages = {
    normal: require('../../assets/images/bg_coupon_deduction_normal.png'),
    main: require('../../assets/images/bg_coupon_deduction_main.png'),
    discount: require('../../assets/images/bg_coupon_discount.png'),
  }

  constructor (props) {
    super(props)
  }

  /**
   * 点击按钮回调
   */
  handleTapButton () {
    const { onTapButton } = this.props
    onTapButton && onTapButton()
  }

  render () {
    const { type, name, condition, range, time, value, buttonText } = this.props
    const _className = this.$util.getClassName(['i-coupon-item', type])

    return (
      <View className={_className} style={{ backgroundImage: `url("${this.bgImages[type]}")` }}>
        <View className='ci-info'>
          <Text className='ci-name'>{name}</Text>
          { condition && <Text className='ci-condition'>{condition}</Text> }
        </View>
        <View className='ci-sub-info'>
          <Text className='ci-range'>使用范围：{range || '无门槛'}</Text>
          <Text className='ci-time'>{this.$util.dateFilter(time, 'YYYY年MM月DD日')}前有效</Text>
        </View>
        <View className='ci-value'>
          {
            type === 'discount' ? (
              <Text className='ci-value-text'>
                {value * 100}
                <Text className='ci-value-unit'>%</Text>
                <Text className='ci-value-addon'>OFF</Text>
              </Text>
            ) : (
              <Text className='ci-value-text'>
                {value}
                <Text className='ci-value-unit'>元</Text>
              </Text>
            )
          }
        </View>
        { buttonText && <Text className='ci-btn i-btn' onClick={this.handleTapButton}>{buttonText}</Text> }
      </View>
    )
  }
}
