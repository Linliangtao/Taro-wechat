import Taro from '@tarojs/taro'
import { Image, Input, View } from '@tarojs/components'
import * as PropTypes from 'prop-types'
import BaseComponent from '../base-component'

import '../../assets/scss/components/input/number-input.scss'

export default class NumberInputComp extends BaseComponent {
  static defaultProps = {
    value: 1, // 当前值
    min: 1, // 最小值
    max: Infinity, // 最大值
    step: 1, // 跨度
    size: 'normal', // 大小
    onChange: () => {} // 数据发生改变回调
  }

  static propTypes = {
    value: PropTypes.number.isRequired,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    size: PropTypes.oneOf(['normal', 'small']),
    onChange: PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props)
  }

  /**
   * 更新value
   * @param newVal
   */
  update (newVal) {
    const { value, min, max, onChange } = this.props
    if (value !== newVal && newVal >= min && newVal <= max) {
      onChange && onChange(newVal)
    }
  }

  /**
   * 点击加减按钮
   * @param type
   */
  handleCalculate (type, e) {
    e.stopPropagation()
    const { value, min, max, step } = this.props
    if (type === 'minus' && value > min) {
      this.update(value - step)
    } else if (type === 'plus' && value < max) {
      this.update(value + step)
    }
  }

  /**
   * input框失去焦点
   * @param e
   */
  handleInputBlur (e) {
    e.stopPropagation()
    let { value } = e.detail
    value = parseFloat(value)
    const { min, max } = this.props
    if (Number.isNaN(value) || value < min) {
      value = min
    } else if (value > max) {
      value = max
    }

    this.update(value)
  }

  /**
   * 点击input框
   * @param e
   */
  handleTapInput (e) {
    e.stopPropagation()
  }

  render () {
    const { value, min, max, size } = this.props

    const _className = this.$util.getClassName(['i-number-input', size])

    const minusButtonClassName = this.$util.getClassName({
      'ni-minus': true,
      'ni-btn': true,
      'i-btn': true,
      disabled: value <= min
    })

    const plusButtonClassName = this.$util.getClassName({
      'ni-plus': true,
      'ni-btn': true,
      'i-btn': true,
      disabled: value >= max
    })

    return (
      <View className={_className}>
        <View className='number-input-container'>
          <View className={minusButtonClassName} onClick={this.handleCalculate.bind(this, 'minus')}>
            <Image className='ni-btn-icon' src={require('../../assets/images/icon_number_input_minus.png')} />
          </View>
          <View className='ni-control-container'>
            <Input className='ni-control' type='number' placeholder='' value={value} onClick={this.handleTapInput} onBlur={this.handleInputBlur} />
          </View>
          <View className={plusButtonClassName} onClick={this.handleCalculate.bind(this, 'plus')}>
            <Image className='ni-btn-icon' src={require('../../assets/images/icon_number_input_plus.png')} />
          </View>
        </View>
      </View>
    )
  }
}
