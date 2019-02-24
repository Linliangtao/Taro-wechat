import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import BaseView from '../base-view'

import { MaterialSwiperComp, MaterialScrollViewComp, MaterialColumnComp, MaterialCountdownComp, MaterialTopNavComp } from '../../components/material'
import { ProductListComp } from '../../components/product'
import { PaginationComp } from '../../components/pagination'

import '../../assets/scss/pages/home/index.scss'

export default class HomeIndexView extends BaseView {

  config = {
    navigationBarTitleText: '首页'
  }

  constructor () {
    super()

    this.state = {
      images: [
        {
          src: 'https://tcbjfile.i-mybest.com/Upload/10018/manage/Image/20190220/20190220094951222.jpg',
          url: ''
        },
        {
          src: 'https://tcbjfile.i-mybest.com/Upload/10018/manage/Image/20190220/20190220094951222.jpg',
          url: ''
        },
        {
          src: 'https://tcbjfile.i-mybest.com/Upload/10018/manage/Image/20190220/20190220094951222.jpg',
          url: ''
        },
        {
          src: 'https://tcbjfile.i-mybest.com/Upload/10018/manage/Image/20190220/20190220094951222.jpg',
          url: ''
        },
        {
          src: 'https://tcbjfile.i-mybest.com/Upload/10018/manage/Image/20190220/20190220094951222.jpg',
          url: ''
        }
      ]
    }
  }

  componentDidShow () {}

  render () {
    const { images } = this.state

    return (
      <View className='i-page-home-index i-page'>
        <MaterialTopNavComp />
        <MaterialSwiperComp images={images} />
        {/*<MaterialScrollViewComp images={images} />*/}
        <MaterialColumnComp images={[images[0]]} />
        <MaterialCountdownComp cover={images[0].src} title='我是标题，我是标题。' desc='描述信息。有趣的描述信息' endTime='2019-02-28' />
        <MaterialCountdownComp cover={images[0].src} title='我是标题，我是标题2。' desc='描述信息。有趣的描述信息' endTime='2019-02-28 23:00' />
        <ProductListComp />
        <PaginationComp />
      </View>
    )
  }
}
