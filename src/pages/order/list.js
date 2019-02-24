import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import BaseView from '../base-view'

import { NavbarComp } from '../../components/navbar'
import { OrderListComp, OrderItemComp } from '../../components/order'
import { EmptyComp } from '../../components/empty'
import { PaginationComp } from '../../components/pagination'

import orderApi from '../../api/order'

import '../../assets/scss/pages/order/list.scss'

export default class OrderListView extends BaseView {
  config = {
    navigationBarTitleText: '我的订单',
    enablePullDownRefresh: true
  }

  constructor () {
    super()

    this.state = {
      list: [], // 数据列表
      tabList: ['全部', '待付款', '待发货', '待收货', '待评价'],  //导航栏选项列表
      tabIndex: '0',  // 导航栏当前索引
      // 分页信息
      pagination: {
        pageIndex: 0, // 当前页数
        pageSize: 20, // 每页数量
        pageCount: 0, // 总页数
        busy: false,
        end: false // 是否最后一页
      }
    }
  }

  componentDidShow () {
    const { ordertyp } = this.$router.params
    this.checkLogin().then(() => {
      this.setState({ 
        tabIndex: ordertyp 
      }, () => {
        this.init()
      })
    })
  }

  onPullDownRefresh () {
    this.init()
  }

  /**
   * 初始化
   */
  init () {
    this.resetStatus().then(() => {
      this.getList({
        pageIndex: 1
      })
    })
  }

  /**
   * 重置状态
   */
  resetStatus () {
    return new Promise(resolve => {
      const { pagination } = this.state
      pagination.busy = false
      pagination.end = false

      this.setState({ pagination }, () => {
        resolve()
      })
    })
  }


  /**
   * 加载下一页
   */
  loadNext () {
    const { pagination } = this.state

    return this.getList({
      pageIndex: pagination.pageIndex + 1,
    })
  }

  /**
   * 获取数据列表
   * @param pageIndex
   * @param pageSize
   * @returns {Promise<any>}
   */
  async getList ({ pageIndex, pageSize } = {}) {
    const { pagination, tabIndex } = this.state

    if (pagination.busy && pagination.end) {
      return Promise.resolve()
    }

    try {
      const params = {
        ordertype: tabIndex || '0',
        pageIndex: pageIndex || pagination.pageIndex || 1,
        pageSize: pageSize || pagination.pageSize
      }

      pagination.busy = true
      const res = await orderApi.getOrderList(params, { loading: params.pageIndex <= 1 })

      // 更新分页器信息
      pagination.pageIndex = res.pageIndex
      pagination.pageCount = res.totalPage
      pagination.end = pagination.pageCount === 0 || pagination.pageIndex === pagination.pageCount

      this.setState({
        pagination,
        list: res.orders || []
      })
    } catch (e) {
      this.$util.showToast(e.errmsg)
    } finally {
      pagination.busy = false
      this.setState({ pagination })
      Taro.stopPullDownRefresh()
    }
  }

  /**
   * 点击导航栏选项卡
   * @param index
   * @param item
   */
  handleTapTab (index, item) {
    const { pagination } = this.state
    this.getList({
      ordertype: index,
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize
    })
    this.setState({ tabIndex: index })
  }

  /**
   * 领取优惠券
   * @param index
   * @return {Promise<void>}
   */
  async fetchCoupon (index) {
    try {
      const { list } = this.state
      const params = {
        couponId: list[index].couponId
      }
      await couponApi.fetchCoupon(params)
      this.$util.showToast('领取成功')

      // 手动更新该优惠券的领取状态
      list[index].isGet = true
      this.setState({
        list
      })
    } catch (e) {
      this.$util.showToast(e.errmsg)
    }
  }

  /**
   * 点击订单列表  跳转到订单详情
   * @param index
   */
  handleTapItem (index) {
    const { list } = this.state
    Taro.navigateTo({
      url: `/pages/order/detail?orderID=${list[index].OrderID}`
    })
  }

  render () {
    const { list, tabList, tabIndex, pagination } = this.state
    return (
      <View className='i-page-order-list i-page'>
        <NavbarComp active-index={tabIndex} items={tabList} onTapItem={this.handleTapTab}></NavbarComp>
        {
          (list && list.length > 0) ? (
            <OrderListComp>
              {
                list.map((item, index) => {
                  const { OrderID, OrderCode, Status, StatusDesc, Items, Total, TotalInfo, ShippingFee } = item
                  const goodsInfo = []
                  const headerData = { OrderCode: OrderCode, Status: Status, StatusDesc: StatusDesc } // 订单号 订单状态 订单状态描述
                  const footerData = { Total: Total, TotalPoints: TotalInfo.TotalPoints, ShippingFee: ShippingFee } // 总金额 总积分 邮费
                  Items.forEach(( n )=>{
                    goodsInfo.push({ 
                      IconPath: n.IconPath, // 商品图片
                      Name: n.Name, // 商品名
                      SkuDesc: n.SkuDesc, // sku描述
                      SellPrice: n.SellPrice, // 购买价格
                      PriceType: n.PriceInfo.PriceType, // 价格类型
                      Points: n.PriceInfo.Points, // 商品积分
                      Number: n.Number,  // 商品数量
                      IsOverSeas: n.IsOverSeas  //是否是海外购
                    })
                  })
                  return (
                    <OrderItemComp key={index} orderID={OrderID} showHeader={true} showFooter={true} showBorder={true} headerData={headerData} footerData={footerData} goodsInfo={goodsInfo} onTap={this.handleTapItem.bind(this, index)}></OrderItemComp>
                  )
                })
              }
            </OrderListComp>
          ) : (
            <EmptyComp text='暂时没有订单哦，快去下单吧~' />
          )
        }

        {
          list && list.length > 0 && (
            <PaginationComp busy={pagination.busy} end={pagination.end} onTap={this.loadNext}/>
          )
        }
      </View>
    )
  }
}
