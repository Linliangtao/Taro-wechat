import Taro from '@tarojs/taro'
import { Button, Image, Text, View } from '@tarojs/components'
import BaseView from '../base-view'

import { CartItemComp } from '../../components/cart'
import { EmptyComp } from '../../components/empty'

import CartApi from '../../api/cart'

import { QUERY, STORAGE } from '../../constants'

import '../../assets/scss/pages/cart/list.scss'

export default class CartListView extends BaseView {
  config = {
    navigationBarTitleText: '购物车'
  }

  constructor () {
    super()

    this.state = {
      list: [], // 数据列表
      cartList: [], // 购物车列表（用于界面展示）
      checks: [], // 选择的购物车商品索引
      busy: false // 页面是否处于接口请求状态
    }
  }

  timers = []

  // 图片路径
  images = {
    checkAll: require('../../assets/images/checkbox_2.png'),
    checkAllChecked: require('../../assets/images/checkbox_2_checked.png')
  }

  componentDidShow () {
    this.checkLogin().then(() => {
      this.init()
    }).catch(() => {})
  }

  /**
   * 初始化
   */
  init () {
    return this.getList()
  }

  /**
   * 获取数据
   * @return {Promise<void>}
   */
  async getList () {
    try {
      const params = {
        pageIndex: 1,
        pageSize: 200000
      }
      const { list } = await CartApi.getCartList(params)
      this.setState({ list }, () => {
        this.analyzeCartList()
      })
    } catch (e) {
      this.$util.showToast(e.errmsg)
    }
  }

  /**
   * 更新单个购物车商品
   * @param index
   * @param number
   * @return {Promise<void>}
   */
  async updateCart (index, number) {
    try {
      const { cartList, list } = this.state
      const item = cartList[index]
      const params = {
        carts: [
          {
            SelectedSku: item.sku,
            ShoppingCartID: item.cartId,
            Number: number
          }
        ]
      }
      await CartApi.updateCart(params, { loading: false})
      list[index].Number = number

      this.setState({ list })
    } catch (e) {
      this.$util.showToast(e.errmsg)
    }
  }

  /**
   * 删除购物车商品
   * @param cartIds
   * @return {Promise<void>}
   */
  async deleteCart (cartIds) {
    try {
      const params = {
        cartIds
      }
      await CartApi.deleteCart(params, { loading: false})
    } catch (e) {
      this.$util.showToast(e.errmsg)
    }
  }

  /**
   * 解析购物车列表
   * @return {*}
   */
  analyzeCartList () {
    const { list, checks } = this.state
    const cartList = list.map((item, index) => ({
      checked: checks.indexOf(index) >= 0,
      checkedValue: index,
      cover: item.IconPath,
      name: item.Name,
      desc: item.SkuDesc,
      price: item.PriceInfo.SellPrice,
      point: item.PriceInfo.PriceType === 2 ? item.PriceInfo.Points : 0,
      number: item.Number,
      cartId: item.ShoppingCartID,
      sku: item.SelectedSku
    }))

    this.setState({ cartList })
  }

  /**
   * 通过
   * @param value
   * @return {number}
   */
  findChecksIndexByValue (value) {
    const { checks } = this.state
    return checks.findIndex(item => item === value)
  }

  /**
   * 全选
   * @param willCheckAll 是否选择全部
   */
  checkAllItems (willCheckAll) {
    const { cartList } = this.state
    const checks = []
    cartList.forEach(item => {
      item.checked = willCheckAll
      checks.push(item.checkedValue)
    })

    this.setState({
      cartList,
      checks
    })
  }

  /**
   * 获取所有已选择的商品
   * @return {Array}
   */
  getAllChecked () {
    const { list, checks } = this.state
    const selects = []
    checks.forEach(checkIndex => {
      selects.push(list[checkIndex])
    })

    return selects
  }

  /**
   * 验证购物车勾选商品是否合格
   * @param selects 选择的商品列表
   */
  validate (selects = []) {
    let valid = true
    let hasOverseas = false // 是否包含跨境商品
    let hasInline = false // 是否包含境内商品

    for (let [, item] of selects.entries()) {
      if (item.isOverSeas) {
        hasOverseas = true
      } else {
        hasInline = true
      }

      if (hasOverseas && hasInline) {
        this.$util.showToast('不能同时购买海外购商品和境内商品')
        valid = false
        break
      }
    }

    return selects.length > 0 && valid
  }

  /**
   * 勾选项
   */
  handleItemCheck (index, checked, checkedValue) {
    const { cartList, checks } = this.state
    if (checked) {
      checks.push(checkedValue)
    } else {
      const checksIndex = this.findChecksIndexByValue(checkedValue)
      checks.splice(checksIndex, 1)
    }
    cartList[index].checked = checked

    this.setState({
      cartList,
      checks
    })
  }

  /**
   * 改变项数量
   */
  handleItemNumberChange (index, number) {
    const timers = this.timers
    const { cartList } = this.state
    if (timers[index]) clearTimeout(timers[index])

    cartList[index].number = number
    this.setState({ cartList })

    timers[index] = setTimeout(() => {
      this.updateCart(index, number)
    }, 500)
  }

  /**
   * 删除项
   */
  handleItemDelete (index, checked, checkedValue) {}

  /**
   * 点击项
   */
  handleTapItem (index) {
    console.log(index)
  }

  /**
   * 点击全选
   */
  handleTapCheckAll () {
    const { checkAll } = this.state
    this.checkAllItems(!checkAll)
  }

  /**
   * 点击提交
   */
  handleTapSubmit () {
    const selects = this.getAllChecked()
    if (selects.length <= 0) {
      this.$util.showToast('请选择要购买的商品')
      return
    }

    if (this.validate(selects)) {
      Taro.setStorageSync(STORAGE.ORDER_PRODUCTS, selects)
      Taro.navigateTo({
        url: `/pages/order/confirm?from=${QUERY.ORDER_CONFIRM_FROM_CART}`
      })
    }
  }

  /**
   * 获取全选按钮状态
   */
  getCheckAllStatus () {
    const { cartList } = this.state
    const uncheckIndex = cartList.findIndex(item => !item.checked)

    return uncheckIndex < 0
  }

  /**
   * 获取选择商品总价
   */
  getTotalPrice () {
    const { cartList } = this.state
    let total = 0
    cartList.forEach(item => {
      if (item.checked) {
        total += (item.price * item.number)
      }
    })

    return total
  }

  render () {
    const { cartList } = this.state

    const checkAll = this.getCheckAllStatus()
    const totalPrice = this.getTotalPrice()

    return (
      <View className='i-page-cart-list i-page'>
        {
          (cartList && cartList.length > 0) ? (
            <View className='cart-list'>
              {
                cartList.map((item, index) => (
                  <CartItemComp
                    key={`cart_${index}`}
                    checked={item.checked}
                    checkedValue={item.checkedValue}
                    cover={item.cover} name={item.name}
                    desc={item.desc} price={item.price}
                    number={item.number}
                    onTap={this.handleTapItem.bind(this, index)}
                    onCheck={this.handleItemCheck.bind(this, index)}
                    onNumberChange={this.handleItemNumberChange.bind(this,index)}
                    onDelete={this.handleItemDelete.bind(this, index)}
                  />
                ))
              }
            </View>
          ) : (
            <EmptyComp type='cart' text='购物车里神马都木有\n解开封印买买买~' />
          )
        }

        <View className='i-footer'>
          {
            totalPrice && (
              <View className='cl-total-bar'>
                <Text className='cltb-text'>合计：¥ {totalPrice}</Text>
              </View>
            )
          }
          <View className='cl-footbar'>
            <View className='clf-checkbox-group'>
              <View className='clf-checkbox' onClick={this.handleTapCheckAll}>
                <Image className='clf-checkbox-icon' src={this.images[checkAll ? 'checkAllChecked' : 'checkAll']} />
                <Text className='clf-checkbox-text'>全选</Text>
              </View>
            </View>
            <View className='clf-btn-container'>
              <Button className='clf-delete clf-btn i-btn'>删除</Button>
              <Button className='clf-submit clf-btn i-btn' onClick={this.handleTapSubmit}>完成</Button>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
