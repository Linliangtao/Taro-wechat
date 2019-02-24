import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import * as PropTypes from 'prop-types'
import BaseComponent from '../base-component'

import '../../assets/scss/components/order/index.scss'

/**
 * 订单列表项内容
 */
export default class OrderItemComp extends BaseComponent {
  static defaultProps = {
    orderID: 0, // 订单ID
    showHeader: false, // 是否展示头部
    showFooter: false, // 是否展示尾部
    showBorder: false, // 是否显示商品底部的线
    goodsInfo: [], // 订单数据  [{IconPath, Name, SkuDesc, SellPrice, PriceType, Points, Number, IsOverSeas}] 商品图片 商品名 sku描述 购买价格 价格类型 商品积分 商品数量 是否是海外购
    headerData: {}, // 头部数据 {OrderCode, Status, StatusDesc} 订单号 订单状态 订单状态描述
    footerData: {}, // 尾部数据  {Total, TotalPoints, ShippingFee} 总金额 总积分 邮费
    onTap: () => {} // 点击回调 
  }

  static propTypes = {
    orderID: PropTypes.number,
    showHeader: PropTypes.bool,
    showFooter: PropTypes.bool,
    showBorder: PropTypes.bool,
    goodsInfo: PropTypes.array.isRequired,
    headerData: PropTypes.object,
    footerData: PropTypes.object,
    onTap: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * 点击订单回调
   */
  handleTap () {
    const { onTap } = this.props
    onTap && onTap()
  }

  render() {
    const { headerData, footerData, goodsInfo, showHeader, showFooter, showBorder } = this.props
    const { OrderCode, Status, StatusDesc } = headerData
    const { Total, TotalPoints, ShippingFee } = footerData
    const _className = this.$util.getClassName({
        'oi-detail': true,
        'show-border': showBorder
      })
    return (
      <View className='i-order-item' onClick={this.handleTap}>
        {showHeader && <View className='oi-info'>
          <Text className='oi-info-num'>订单号：{OrderCode}</Text>
          <Text className='oi-info-status'>{StatusDesc}</Text>
        </View>}
        <View className='oi-detail-box'>
        {
          goodsInfo && goodsInfo.length > 0 && goodsInfo.map((item, index) => {
            const { IconPath, Name, SkuDesc, SellPrice, PriceType, Points, Number } = item
            return (
              <View className={_className} key={index}>
                <View className='oi-detail-img-box'>
                  <Image className='oi-detail-img' src={IconPath} mode='aspectFill'></Image>
                </View>
                <View className='oi-detail-cont'>
                  <View className='oi-detail-name'>{Name}</View>
                  <View className='oi-detail-type'>{SkuDesc}</View>
                  <View className='oi-detail-price'>
                    <View className='oi-detail-price-num'>
                      ￥{SellPrice}
                      {PriceType === 2 && <Text className='oi-detail-price-point'> +{Points} 积分</Text>}  {/* PriceType === 2 时显示 */}
                    </View>
                    <Text className='oi-detail-goods-num'>x {Number}</Text>
                  </View>
                </View>
              </View>
            )
          })
        }
        </View>
        {showFooter && <View className='oi-total'>
          <View className='oi-total-money'>
            <View className='oi-money-box'>
              合计：￥{Total}
              {TotalPoints > 0 && <Text className='oi-detail-price-point'> +{TotalPoints} 积分</Text>}  {/* TotalPoints > 0 时显示 */}
            </View>
            <View className='oi-total-freight'>（含运费￥{ShippingFee}）</View>
          </View>
          <View className='oi-btn-area'>
            <View className='oi-btn oi-cancel-btn'>取消订单</View>
            <View className='oi-btn oi-pay-btn'>马上付款</View>
          </View>
        </View>}
      </View>
    );
  }
}