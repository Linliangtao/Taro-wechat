import Taro from '@tarojs/taro'
import { Image, Swiper, SwiperItem, View } from '@tarojs/components'
import * as PropTypes from 'prop-types'
import BaseComponent from '../base-component'

import '../../assets/scss/components/material/swiper.scss'

/**
 * 轮播广告位
 */
export default class MaterialSwiperComp extends BaseComponent {

  static defaultProps = {
    autoplay: true, // 是否自动切换
    interval: 4000, // 自动切换间隔时长
    circular: true, // 是否衔接滑动（循环）
    images: [] // 图片列表
  }

  static propTypes = {
    autoplay: PropTypes.bool,
    interval: PropTypes.number,
    circular: PropTypes.bool,
    images: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired
    }))
  }

  constructor (props) {
    super(props)
  }

  /**
   * 点击轮播项
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
    const { autoplay, interval, circular, images } = this.props

    return (
      <View className='i-material-swiper'>
        <Swiper className='ms-swiper' indicatorDots indicatorColor='rgba(255, 255, 255, .5)' indicatorActiveColor='#fff' duration={300} autoplay={autoplay} interval={interval} circular={circular}>
          {
            images.map((image, index) => (
              <SwiperItem className='ms-swiper-item' key={`materialSwiper_${index}`}>
                <Image className='ms-image-item' src={image.src} mode='aspectFit' onClick={this.handleTapItem.bind(this, image)} />
              </SwiperItem>
            ))
          }
        </Swiper>
      </View>
    )
  }
}
