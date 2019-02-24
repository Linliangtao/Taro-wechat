import Taro from '@tarojs/taro'
import { Image, Label, Text, View } from '@tarojs/components'
import * as PropTypes from 'prop-types'
import BaseComponent from '../base-component'

import { NumberInputComp } from '../../components/input'

import '../../assets/scss/components/cart/cart.scss'

export default class CartItemComp extends BaseComponent {
  static defaultProps = {
    checked: false, // 是否选择
    checkedValue: '', // 选择值
    cover: '', // 封面图
    name: '', // 商品名称
    desc: '', // 商品描述
    price: 0, // 价格
    point: 0, // 积分
    number: 1, // 数量
    onTap: () => {}, // 点击回调
    onCheck: () => {}, // 选择回调
    onNumberChange: () => {}, // 数量改变回调
    onDelete: () => {} // 删除回调
  }

  static propTypes = {
    checked: PropTypes.bool,
    checkedValue: PropTypes.any,
    cover: PropTypes.string,
    name: PropTypes.string,
    desc: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    point: PropTypes.number,
    number: PropTypes.number,
    onCheck: PropTypes.func,
    onNumberChange: PropTypes.func,
    onDelete: PropTypes.func
  }

  // 复选框图片路径
  checkboxes = {
    normal: require('../../assets/images/checkbox_1.png'),
    checked: require('../../assets/images/checkbox_1_checked.png'),
  }

  constructor (props) {
    super(props)
  }

  /**
   * 点击
   */
  handleTap () {
    const { onTap } = this.props
    onTap && onTap()
  }

  /**
   * 点击复选框
   */
  handleTapCheck (e) {
    e.stopPropagation()
    const { checked, checkedValue, onCheck } = this.props
    onCheck && onCheck(!checked, checkedValue)
  }

  /**
   * 数量输入框值发生改变
   * @param value
   */
  handleNumberInputChange (value, e) {
    e.stopPropagation()
    const { onNumberChange } = this.props
    onNumberChange && onNumberChange(value)
  }

  /**
   * 点击删除
   */
  handleTapDelete (e) {
    e.stopPropagation()
    const { checked, checkedValue, onDelete } = this.props
    onDelete && onDelete(checked, checkedValue)
  }

  render () {
    const { checked, cover, name, desc, price, point, number } = this.props

    return (
      <View className='i-cart-item' onClick={this.handleTap}>
        <View className='ci-main'>
          <View className='ci-checkbox-container'>
            <Label class='ci-checkbox' onClick={this.handleTapCheck}>
              <Image className='ci-checkbox-icon' src={this.checkboxes[checked ? 'checked' : 'normal']} mode='aspectFit' />
            </Label>
          </View>
          <View className='ci-cover'>
            <Image className='ci-cover-image' src={cover} mode='aspectFill' />
          </View>
          <View className='ci-info-container'>
            <Text className='cii-name'>{name}</Text>
            <Text className='cii-desc'>{desc}</Text>
            <Text className='cii-price'>¥ {price}{point > 0 ? `+${point}积分` : ``}</Text>
            <View className='cii-number'>
              <NumberInputComp value={number} onChange={this.handleNumberInputChange} />
            </View>
          </View>
        </View>
        <View className='ci-extra'>
          <View className='cie-delete i-btn' onClick={this.handleTapDelete}>
            <Text className='cie-delete-text'>删除</Text>
          </View>
        </View>
      </View>
    )
  }
}
