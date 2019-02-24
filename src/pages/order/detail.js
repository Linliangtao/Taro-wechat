import Taro from '@tarojs/taro'
import { View, Image, Button, Input } from '@tarojs/components'
import BaseView from '../base-view'

import { OrderItemComp } from '../../components/order'

import '../../assets/scss/pages/order/detail.scss'

const icon_car = require('../../assets/images/icon_car.png')
const icon_order_angle_right = require('../../assets/images/icon_order_angle_right.png')
const icon_order_payway = require('../../assets/images/icon_order_payway.png')
const icon_order_money = require('../../assets/images/icon_order_money.png')
const icon_order_car = require('../../assets/images/icon_order_car.png')
const icon_edit = require('../../assets/images/icon_edit.png')
const line_logistics = require('../../assets/images/line_logistics.png')
const icon_custom = require('../../assets/images/icon_custom.png')

class OrderDetailView extends BaseView {
  constructor(props) {
    super(props);
    this.state = {
      orderID: 0, //订单ID
      isEditID: false,  //是否在编辑身份证
    };
  }

  componentDidShow () {
    const { orderID } = this.$router.params
    this.checkLogin().then(() => {
      this.setState({
        orderID: orderID
      },() => {
        this.init()
      })
    })
  }

  /**
   * 初始化
   */
  init () {
    const { orderID } = this.state
    this.getOrderDetail()
  }

  /**
   * 获取订单详情
   * @param {number} orderID
   */
  async getOrderDetail () {
    
  }

  /**
   * 编辑身份证
   */
  editIDCard () {
    const { isEditID } = this.state
    this.setState({
      isEditID: !isEditID
    })
  }

  /**
   * 检查身份证的有效性
   */
  handleCheckIDCard (e) {
    const newID = e.detail.value
    const isCheck = this.$util.checkStr(newID, 'card')
    if (newID && !isCheck) {
      this.$util.showToast("身份证号码有误，请重新输入")
    }
    // 与之前的身份证信息 IDNUm 对比
    // else if (newID === IDNum) {  }
    else {
      Taro.showModal({
        title: '确定要修改身份证吗？',
        success: (res) => {
          const { isEditID } = this.state
          this.setState({
            IDNum: newID,
            isEditID: !isEditID
          })
        }
      })
    }
  }

  render() {
    const { isEditID } = this.state
    return (
      <View className='i-page-order-detail i-page'>
        <View className='od-container'>
          <View className='od-info'>
            <Text className='od-info-num'>订单号：30654489654112365</Text>
            <Text className='od-info-status'>已发货</Text>
          </View>
          <View className='od-addr' style={{ backgroundImage: `url(${line_logistics})` }}>
            <View className='od-addr-name'>小米呀小米粒</View>
            <View className='od-addr-phone'>13480000091</View>
            <View className='od-addr-cont'>广东省 深圳市 宝安区 银城二路一方天地互联网产业园632</View>
            <View className='od-addr-zip-code'>510060</View>
          </View>
          <View className='od-logistics' style={{ backgroundImage: `url(${line_logistics})` }}>
            <Image className='od-logistics-icon-car' src={icon_car}></Image>
            <View className='od-logistics-cont'>韵达快递 3714260481477</View>
            <Image className='od-logistics-icon-angle' src={icon_order_angle_right}></Image>
          </View>
          <View className='od-IDCard'>
            <View className='od-IDCard-title'>身份证</View>
            {
              !isEditID
              ? <View className='od-IDCard-num'>440102198305129682</View>
              : <Input className='od-IDCard-input' type='number' placeholder='身份证号码' value='' focus={isEditID} onBlur={this.handleCheckIDCard} ></Input>
            }
            <Image className='od-IDCard-icon-edit' src={icon_edit} onClick={this.editIDCard}></Image>
          </View>

          <View className='od-goods'>
            <OrderItemComp></OrderItemComp>
          </View>

          <View className='od-others'>
            <View className='od-others-options'>
              <Image className='od-options-icon' src={icon_order_payway}></Image>
              <View className='od-options-text'>支付方式</View>
              <Text>在线支付</Text>
            </View>
            <View className='od-others-options'>
              <Image className='od-options-icon' src={icon_order_car}></Image>
              <View className='od-options-text'>邮费</View>
              <Text>￥0</Text>
            </View>
            <View className='od-others-options'>
              <Image className='od-options-icon' src={icon_order_money}></Image>
              <View className='od-options-text'>商品总额</View>
              <Text className='od-total-pay-text'>￥89.8</Text>
            </View>
          </View>

          <View className='od-actual-pay'>
            <View className='od-pay-money'>实付款：￥89.8 <Text className='od-pay-freight'>( 含运费 ￥0 )</Text></View>
            <View className='od-pay-time'>下单时间：2019.01.16 19:18:00</View>
            <View className='od-pay-refund-btn'>申请退款</View>
          </View>

          <Button className='od-custom' openType='contact' sessionFrom='weapp' sendMessageTitle={`订单号：`} hoverClass='none'>
            <Image className='od-custom-icon' src={icon_custom} mode='aspectFill'></Image>
          </Button>
          <View className='od-confirm'>
            <View className='od-confirm-btn'>确认收货</View>
          </View>
        </View>
      </View>
    );
  }
}

export default OrderDetailView;