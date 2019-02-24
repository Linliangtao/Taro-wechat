import BaseApi from './index'

class GroupBuyApi extends BaseApi {
  prefix = '/GroupBuyActivity'

  /**
   * 拼团列表
   * @param data
   * @param options
   * @returns {Promise<any>}
   */
  getGroupBuyList (data = {}, { ...options } = {}) {
    return this.post({
      url: `${this.prefix}/GetGroupbuyList`,
      data,
      ...options
    })
  }

  /**
   * 拼团详情
   * @param data
   * @param options
   * @returns {Promise<any>}
   */
  getGroupBuyActivityInfo (data = {}, { ...options } = {}) {
    return this.post({
      url: `${this.prefix}/GetGroupBuyActivityInfo`,
      data,
      ...options
    })
  }

  /**
   * 拼团商品详情
   * @param data
   * @param options
   * @returns {Promise<any>}
   */
  getGroupBuyGoodsInfo (data = {}, { ...options } = {}) {
    return this.post({
      url: `${this.prefix}/GetGroupBuyGoodsInfo`,
      data,
      ...options
    })
  }

  /**
   * 验证拼团信息（提交订单确认前验证）
   * @param data
   * @param options
   * @returns {Promise<any>}
   */
  checkGroupBuyInfo (data = {}, { ...options } = {}) {
    return this.post({
      url: `${this.prefix}/CheckGroupBuyInfo`,
      data,
      ...options
    })
  }

  /**
   * 获取拼团组页面信息
   * @param data
   * @param options
   * @returns {Promise<any>}
   */
  getGroupBuyActivityTeamInfo (data = {}, { ...options } = {}) {
    return this.post({
      url: `${this.prefix}/GetGroupBuyActivityTeamInfo`,
      data,
      ...options
    })
  }

}

export default new GroupBuyApi()
