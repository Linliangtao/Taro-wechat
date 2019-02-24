import Taro from '@tarojs/taro'
import { Image, ScrollView, Text, View } from '@tarojs/components'
import * as PropTypes from 'prop-types'
import BaseComponent from '../base-component'

import '../../assets/scss/components/material/top-nav.scss'

/**
 * 浮动顶部栏
 */
export default class MaterialTopNavComp extends BaseComponent {
  static defaultProps = {}

  static propTypes = {}

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <View className='i-material-top-nav'>
        <View className='mtn-wrapper'>
          <View className='mtn-search'>
            <Image className='mtn-search-icon' src={require('../../assets/images/icon_topnav_search.png')} />
          </View>
          <View className='mtn-navs'>
            <ScrollView className='mtn-navs-wrapper' scrollX>
              <Text className='mtn-navs-item active'>首页</Text>
              <Text className='mtn-navs-item'>活动</Text>
              <Text className='mtn-navs-item'>宝贝</Text>
            </ScrollView>
          </View>
        </View>
      </View>
    )
  }
}
