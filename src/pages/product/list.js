import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import BaseView from '../base-view'
import '../../assets/scss/pages/product/list.scss'

export default class ProductListView extends BaseView {
  config = {
    navigationBarTitleText: '产品列表'
  }

  render () {
    return (
      <View className='box-left'>
        <View className='pro-box'>
          <View className='pro-box-l'>
            <Text className='na'>
              分类
            </Text>
            <Text className='na'>
              分类
            </Text>
            <Text className='na'>
              分类
            </Text>
            <Text className='na'>
              分类
            </Text>
            <Text className='na'>
              分类
            </Text>
            <Text className='na'>
              分类
            </Text>
            <Text className='na'>
              分类
            </Text>
            <Text className='na'>
              分类
            </Text>
            <Text className='na'>
              分类
            </Text>
          </View>
        </View>
      </View>
    )
  }
}
