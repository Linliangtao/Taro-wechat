import Taro from '@tarojs/taro'
import { Image, Label, Text, View } from '@tarojs/components'
import * as PropTypes from 'prop-types'
import BaseComponent from '../base-component'

import '../../assets/scss/components/material/contents.scss'

/**
 * 模板广告位（多行文本）
 */
export default class MaterialContentsComp extends BaseComponent {
  static defaultProps = {}

  static propTypes = {}

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <View className='i-material-contents'>
        <View className='mc-cover'>
          <Image className='mc-cover-image' />
        </View>
        <View className='mc-contents'>
          <View className='mc-content-item'>
            <Label className='mc-content-label'>热门</Label>
            <Text className='mc-content-text'>翻江倒海减肥还是空间的划分兑换积分</Text>
          </View>
        </View>
      </View>
    )
  }
}
