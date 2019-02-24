import Taro from '@tarojs/taro'
import { Image, ScrollView, View } from '@tarojs/components'
import * as PropTypes from 'prop-types'
import BaseComponent from '../base-component'

import '../../assets/scss/components/material/scroll-view.scss'

/**
 * 横向滑动广告位
 */
export default class MaterialScrollViewComp extends BaseComponent {
  static defaultProps = {
    images: [] // 图片列表
  }

  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired
    }))
  }

  constructor (props) {
    super(props)
  }

  /**
   * 点击图片
   * @param item
   */
  handleTapItem (item) {
    if (item && item.url) {
      Taro.navigateTo({
        url: item.url
      })
    }
  }

  render () {
    const { images } = this.props

    return (
      <View className='i-material-scroll-view'>
        <ScrollView className='msv-scroll-view' scrollX>
          {
            images.map((image, index) => (
              <Image className='msv-image-item' key={`materialScrollView_${index}`} src={image.src} mode='widthFix' onClick={this.handleTapItem.bind(this, image)} />
            ))
          }
        </ScrollView>
      </View>
    )
  }
}
