import Taro from '@tarojs/taro'
import { Image, View } from '@tarojs/components'
import * as PropTypes from 'prop-types'
import BaseComponent from '../base-component'

import '../../assets/scss/components/material/columns.scss'

/**
 * 条形广告位（1X1-1X5）
 */
export default class MaterialColumnComp extends BaseComponent {
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
      <View className='i-material-columns'>
        <View className='mc-row'>
          {
            images.map((image, index) => (
              <View className='mc-col' key={`materialColumn_${index}`}>
                <Image className='mc-image-item' src={image.src} onClick={this.handleTapItem.bind(this, image)} />
              </View>
            ))
          }
        </View>
      </View>
    )
  }
}
