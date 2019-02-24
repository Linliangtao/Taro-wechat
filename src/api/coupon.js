import BaseApi from './index'

class CouponApi extends BaseApi {
  prefix = '/coupon'

  /**
   * 获取优惠券列表
   * @param data
   * @param options
   * @returns {Promise<any>}
   */
  getCouponList (data = {}, { ...options } = {}) {
    return this.post({
      url: `${this.prefix}/getCouponList`,
      data,
      ...options
    })
  }

  /**
   * 获取我的优惠券列表
   * @param data
   * @param options
   * @returns {Promise<any>}
   */
  getMyCouponList (data = {}, { ...options } = {}) {
    return this.post({
      url: `${this.prefix}/getMyCouponList`,
      data,
      ...options
    })
  }

  /**
   * 领取优惠券
   * @param data
   * @param options
   * @returns {Promise<any>}
   */
  fetchCoupon (data = {}, { ...options } = {}) {
    return this.post({
      url: `${this.prefix}/fetchCoupon`,
      data,
      ...options
    })
  }
}

export default new CouponApi()
