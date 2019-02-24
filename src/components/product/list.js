import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import BaseComponent from '../base-component'

import ProductItemComp from './item'

import '../../assets/scss/components/product/index.scss'

/**
 * 商品列表
 */
export default class ProductListComp extends BaseComponent {
  static defaultProps = {}

  static propTypes = {}

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <View className='i-product-list'>
        <View className='pl-item'>
          <ProductItemComp cover='https://tcbjfile.i-mybest.com/Upload/10018/manage/Image/20181219/20181219105136752.jpg' title='汤臣倍健 蛋白粉礼盒装 450g/罐+150g/罐' subtitle='产品描述，比较长比较长比较长比较长比较长' price={219} originalPrice={298} />
        </View>
        <View className='pl-item'>
          <ProductItemComp cover='https://tcbjfile.i-mybest.com/Upload/10018/manage/Image/20181219/20181219105136752.jpg' title='汤臣倍健 蛋白粉礼盒装 450g/罐+150g/罐' subtitle='产品描述，比较长比较长比较长比较长比较长' price={219} originalPrice={298} />
        </View>
        <View className='pl-item'>
          <ProductItemComp cover='https://tcbjfile.i-mybest.com/Upload/10018/manage/Image/20181219/20181219105136752.jpg' title='汤臣倍健 蛋白粉礼盒装 450g/罐+150g/罐' subtitle='产品描述，比较长比较长比较长比较长比较长' price={219} originalPrice={298} />
        </View>
        <View className='pl-item'>
          <ProductItemComp cover='https://tcbjfile.i-mybest.com/Upload/10018/manage/Image/20181219/20181219105136752.jpg' title='汤臣倍健 蛋白粉礼盒装 450g/罐+150g/罐' subtitle='产品描述，比较长比较长比较长比较长比较长' price={219} originalPrice={298} />
        </View>
        <View className='pl-item'>
          <ProductItemComp cover='https://tcbjfile.i-mybest.com/Upload/10018/manage/Image/20181219/20181219105136752.jpg' title='汤臣倍健 蛋白粉礼盒装 450g/罐+150g/罐' subtitle='产品描述，比较长比较长比较长比较长比较长' price={219} originalPrice={298} />
        </View>
      </View>
    )
  }
}
