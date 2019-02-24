import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import BaseView from '../base-view'

import { CouponListComp, CouponItemComp } from '../../components/coupon'
import { EmptyComp } from '../../components/empty'
import { PaginationComp } from '../../components/pagination'

import couponApi from '../../api/coupon'

import '../../assets/scss/pages/coupon/list.scss'

export default class MemberCouponListView extends BaseView {
  config = {
    navigationBarTitleText: '优惠券列表',
    enablePullDownRefresh: true
  }

  constructor () {
    super()

    this.state = {
      list: [], // 数据列表
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
    this.checkLogin().then(() => {
      this.init()
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
    const { pagination } = this.state

    if (pagination.busy && pagination.end) {
      return Promise.resolve()
    }

    try {
      const params = {
        pageIndex: pageIndex || pagination.pageIndex || 1,
        pageSize: pageSize || pagination.pageSize
      }

      pagination.busy = true
      const res = await couponApi.getCouponList(params, { loading: params.pageIndex <= 1 })

      // 更新分页器信息
      pagination.pageIndex = res.pageIndex
      pagination.pageCount = res.totalPage
      pagination.end = pagination.pageCount === 0 || pagination.pageIndex === pagination.pageCount

      this.setState({
        pagination,
        list: res.coupons || []
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
   * 点击优惠券列表
   * @param index
   */
  handleTapItem (index) {
    const { list } = this.state
    if (!list[index].isGet) {
      this.fetchCoupon(index)
    }
  }

  render () {
    const { list, pagination } = this.state

    return (
      <View className='i-page-coupon-list i-page'>
        {
          (list && list.length > 0) ? (
            <CouponListComp>
              {
                list.map((item, index) => {
                  const type = item.discountType === 2 ? 'discount' : (
                    item.discountNum >= 50 ? 'main' : 'normal'
                  )
                  const name = item.discountType === 2 ? `${item.discountNum}折优惠券` : `${item.discountNum}元优惠券`
                  const condition = item.minOrderPrice > 0 ? `满${item.minOrderPrice}元即可使用` : '无门槛'
                  const range = item.couponUseTypeDesc
                  const time = item.end
                  const value = item.discountNum
                  const buttonText = item.isGet ? '已领取' : '马上领取'

                  return (
                    <CouponItemComp key={item.couponId} type={type} name={name} condition={condition} range={range} time={time} value={value} buttonText={buttonText} onTapButton={this.handleTapItem.bind(this, index)} />
                  )
                })
              }
            </CouponListComp>
          ) : (
            <EmptyComp text='没有优惠券？\n参与活动也可以领取优惠券哦~' />
          )
        }

        {
          list && list.length > 0 && (
            <PaginationComp busy={pagination.busy} end={pagination.end} />
          )
        }
      </View>
    )
  }
}
