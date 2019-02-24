import Taro from '@tarojs/taro'
import { Button, Image, Input, Label, Text, Textarea, View } from '@tarojs/components'
import BaseView from '../base-view'

import orderApi from '../../api/order'
import memberApi from '../../api/member'

import { OrderItemComp } from '../../components/order'
import { STORAGE, QUERY } from '../../constants'

import '../../assets/scss/pages/order/confirm.scss'

export default class OrderConfirmView extends BaseView {
  config = {
    navigationBarTitleText: '订单确认'
  }

  constructor () {
    super()

    this.state = {
      form: {
        idcard: '', // 用户填写的身份证
        remark: '' // 备注信息
      },
      idcard: '', // 已保存的身份证
      invoice: null, // 发票信息
      coupon: null, // 优惠券信息
      model: {
        Address: {}, // 地址信息
        Coupons: [], // 优惠券列表
        Items: [], // 商品信息
        Logistics: {}, // 物流信息
        PrePayment: {} // 支付信息
      }
    }
  }

  componentWillMount () {
    this.checkLogin().then(() => {
      this.getInitData()
    }).catch(() => {})
  }

  /**
   * 从本地存储中获取订单商品列表数据
   */
  getOrderProductsByStorage () {
    const orderProducts = Taro.getStorageSync(STORAGE.ORDER_PRODUCTS)
    return orderProducts.map(item => ({
      Number: item.Number,
      ProductID: item.ProductID,
      Sku: item.SelectedSku
    }))
  }

  /**
   * 获取初始数据（确认订单信息）
   * @return {Promise<void>}
   */
  async getInitData () {
    try {
      const orderProducts = this.getOrderProductsByStorage()
      const params = {
        data: {
          IsFromShoppingCart: this.$router.params.from === QUERY.ORDER_CONFIRM_FROM_CART,
          IsUseSvc: false,
          Items: orderProducts,
          GroupBuyActivityID: 0
        }
      }
      const { data: model } = await orderApi.getOrderConfirm(params)
      this.setState({ model }, () => {
        this.getIdcard()
      })
    } catch (e) {
      this.$util.showToast(e.errmsg)
    }
  }

  /**
   * 获取身份证信息
   * @return {Promise<void>}
   */
  async getIdcard () {
    try {
      const { model } = this.state
      const params = {
        consignee_name: model.Address.Name
      }
      const { buyerIdnumber: idcard } = await memberApi.getIdcard(params, { loading: false })
      this.setState({ idcard })
    } catch (e) {
      this.$util.showToast(e.errmsg)
    }
  }

  /**
   * 验证信息
   * @returns Boolean
   */
  validate () {
    const { form, idcard, model } = this.state
    let valid = true

    if (!model.Address || !model.Address.Name) {
      this.$util.showToast('请选择收货地址')
      valid = false
    } else if (model.IsHadOverSeas && !idcard) {
      const idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
      if (!form.idcard) {
        this.$util.showToast('请填写收件人身份证')
        valid = false
      } else if (!idcardReg.test(form.idcard)) {
        this.$util.showToast('请填写正确的身份证号码')
        valid = false
      }
    }

    return valid
  }

  /**
   * 提交订单
   * @return {Promise<void>}
   */
  async submit () {
    try {
      const { model, invoice } = this.state

    } catch (e) {
      this.$util.showToast(e.errmsg)
    }
  }

  /**
   * 点击物流收货信息
   */
  handleTapLogistics () {
    Taro.navigateTo({
      url: `/pages/order/address-selects`
    })
  }

  /**
   * 点击提交订单
   */
  handleTapSubmit () {
    if (this.validate()) {
      this.submit()
    }
  }

  /**
   * 获取储值卡信息
   */
  getSvcInfo () {
    const { model } = this.state
    let svcInfo = ''
    if (model.InsideSVCValue > 0 || model.CustomerSVCValue > 0) {
      svcInfo += model.InsideSVCValue > 0 ? `-${model.InsideSVCValue}元（内部）` : ''
      svcInfo += model.CustomerSVCValue > 0 ? `-${model.CustomerSVCValue}元` : ''
    } else {
      svcInfo = '未使用'
    }

    return svcInfo
  }

  /**
   * 获取是否可提交状态
   */
  getSubmitable () {
    const { idcard, form, model } = this.state
    let submitable = true
    if (!model.Address || !model.Address.Name) {
      submitable = false
    } else if (model.IsHadOverSeas && !idcard && !form.idcard) {
      submitable = false
    }

    return submitable
  }

  render () {
    const { model, idcard, form, coupon } = this.state
    const {
      Address: address,
      Logistics: logistics,
      Coupons: coupons,
      PrePayment: prePayment
    } = model

    const {
      TotalInfo: totalInfo,
      DiscountData: discountData,
      PaymentInfo: paymentInfo
    } = prePayment

    // 储值卡信息
    let svcInfo = this.getSvcInfo()
    // 是否可提交
    const submitable = this.getSubmitable()

    return (
      <View className='i-page-confirm-order i-page'>
        <View className='co-extra-form'>
          <View className='coef-tips'>
            <Image className='coef-tips-icon' src={require('../../assets/images/icon_warning.png')} />
            <Text className='coef-tips-text'>购买直邮商品，请补充身份证信息，并确保收件人为真实姓名否则商品无法清关。</Text>
          </View>
          <View className='coef-group'>
            <Label className='coef-group-label'>身份证</Label>
            <View className='coef-control-container'>
              <Input className='coef-control' type='idcard' placeholder={idcard || '请填写收件人身份证号码'} maxLength={18} disabled={idcard} value={form.idcard} onInput={this.twoWay.bind(this, 'form.idcard')} />
            </View>
          </View>
          <View className='coef-border-bottom'  />
        </View>
        <View className='co-main-container'>
          {
            address && address.Name ? (
              <View className='co-logistics' style={{ backgroundImage: `url("${require('../../assets/images/line_logistics.png')}")` }} onClick={this.handleTapLogistics}>
                <View className='col-consignee'>
                  <Text className='colc-name'>{address.Name}</Text>
                  <Text className='colc-mobile'>{address.Mobile}</Text>
                </View>
                <Text className='col-address'>{address.Address}</Text>
                {/*<Text className='col-postcode'>510060</Text>*/}
                <Image className='col-edit-icon' src={require('../../assets/images/icon_edit.png')} />
              </View>
            ) : (
              <View className='co-logistics empty' style={{ backgroundImage: `url("${require('../../assets/images/line_logistics.png')}")` }} onClick={this.handleTapLogistics}>
                <View className='col-consignee'>
                  <Text>选择地址</Text>
                </View>
                <Image className='col-edit-icon' src={require('../../assets/images/icon_edit.png')} />
              </View>
            )
          }

          <View className='co-product-list'>
            <OrderItemComp goodsInfo={model.Items} />
          </View>
          <View className='co-groups'>
            <View className='co-group'>
              <Label className='cog-label'>
                <Image className='cog-icon' src={require('../../assets/images/icon_order_payway.png')} />
                支付方式
              </Label>
              <View className='cog-control-container'>
                <Text className='cog-control-static'>{model.PaymentMode === 1 ? '在线支付' : '货到付款'}</Text>
              </View>
            </View>
            <View className='co-group'>
              <Label className='cog-label'>
                <Image className='cog-icon' src={require('../../assets/images/icon_order_car.png')} />
                配送快递
              </Label>
              <View className='cog-control-container'>
                <Text className='cog-control-static'>{(logistics && logistics.LogisticsName) || ''}</Text>
              </View>
            </View>
            <View className='co-group'>
              <Label className='cog-label'>
                <Image className='cog-icon' src={require('../../assets/images/icon_order_invoice.png')} />
                发票信息
              </Label>
              <View className='cog-control-container'>
                <Text className='cog-control-static'>{model.IsHadIverSeas ? '暂不支持发票' : '开票'}</Text>
              </View>
            </View>
            {
              model.IsShowSvc && (
                <View className='co-group'>
                  <Label className='cog-label'>
                    <Image className='cog-icon' src={require('../../assets/images/icon_order_card.png')} />
                    储值卡
                  </Label>
                  <View className='cog-control-container'>
                    <Text className='cog-control-static'>{svcInfo}</Text>
                  </View>
                  <Image className='cog-addon-icon' src={require('../../assets/images/icon_order_angle_right.png')} mode='aspectFit' />
                </View>
              )
            }
            {
              model.IsCanUserCoupon && coupons && coupons.length > 0 && (
                <View className='co-group'>
                  <Label className='cog-label'>
                    <Image className='cog-icon' src={require('../../assets/images/icon_order_coupon.png')} />
                    优惠券
                  </Label>
                  <View className='cog-control-container'>
                    <Text className='cog-control-static'>{coupon.CouponName || '未使用'}</Text>
                  </View>
                  <Image className='cog-addon-icon' src={require('../../assets/images/icon_order_angle_right.png')} mode='aspectFit' />
                </View>
              )
            }
            <View className='co-group'>
              <Label className='cog-label'>
                <Image className='cog-icon' src={require('../../assets/images/icon_order_money.png')} />
                商品金额
              </Label>
              <View className='cog-control-container'>
                <Text className='cog-control-static red'>¥ {totalInfo.Total}{totalInfo.TotalPoints > 0 ? `+${totalInfo.TotalPoints}积分` : ''}</Text>
              </View>
            </View>
            <View className='co-group'>
              <Label className='cog-label'>
                <Image className='cog-icon' src={require('../../assets/images/icon_order_car.png')} />
                运费
              </Label>
              <View className='cog-control-container'>
                <Text className='cog-control-static'>{prePayment.TotalShippingFee > 0 ? `¥ ${prePayment.TotalShippingFee}` : '包邮'}</Text>
              </View>
            </View>
            {
              discountData && discountData.map((item, index) => (
                <View className='co-group' key={`discount_${index}`}>
                  <Label className='cog-label'>{item.DiscountDesc}</Label>
                  <View className='cog-control-container'>
                    <Text className='cog-control-static red'>- ¥{item.DiscountPrice}</Text>
                  </View>
                </View>
              ))
            }
            <View className='co-group'>
              <Label className='cog-label'>
                <Image className='cog-icon' src={require('../../assets/images/icon_order_remark.png')} />
                备注
              </Label>
              <View className='cog-control-container'>
                <Textarea className='cog-control' placeholder='如需备注请输入' autoHeight maxlength={100} value={form.remark} onInput={this.twoWay.bind(this, 'form.remark')} />
              </View>
            </View>
          </View>
        </View>

        <View className='i-footer'>
          <View className='co-footbar'>
            <View className='cof-total'>
              <Text className='cof-total-price'>合计：¥ {paymentInfo.Total}{paymentInfo.TotalPoints > 0 ? `+${paymentInfo.TotalPoints}积分` : ''}</Text>
              <Text className='cof-total-freight'>（含运费 ¥ {prePayment.TotalShippingFee}）</Text>
            </View>
            <View className='cof-btn-container'>
              <Button className='cof-btn-submit i-btn' disabled={!submitable} onClick={this.handleTapSubmit}>提交订单</Button>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
