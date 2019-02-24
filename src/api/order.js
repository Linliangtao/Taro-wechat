import BaseApi from './index'

class OrderApi extends BaseApi {
  prefix = '/order'
  refundPrefix = '/orderRefund'

  /**
   * 获取订单确认信息
   * @param data
   * @param options
   * @returns {Promise<any>}
   */
  getOrderConfirm (data = {}, { ...options } = {}) {
    return this.post({
      url: `${this.prefix}/getOrderConfirm`,
      data,
      ...options
    })
  }

  /**
   * 获取订单确认修改信息
   * @param data
   * @param options
   * @returns {Promise<any>}
   */
  getOrderChangeConfirm (data = {}, { ...options } = {}) {
    return this.post({
      url: `${this.prefix}/getOrderChangeConfirm`,
      data,
      ...options
    })
  }

  /**
   * 获取储值卡列表
   * @param data
   * @param options
   * @returns {Promise<any>}
   */
  getSvcList (data = {}, { ...options } = {}) {
    return this.post({
      url: `${this.prefix}/getSvcList`,
      data,
      ...options
    })
  }

  /**
   * 兑换储值卡
   * @param data
   * @param options
   * @returns {Promise<any>}
   */
  fetchSvc (data = {}, { ...options } = {}) {
    return this.post({
      url: `${this.prefix}/fetchSvc`,
      data,
      ...options
    })
  }

  /**
   * 创建订单
   * @param data
   * @param options
   * @returns {Promise<any>}
   */
  createOrder (data = {}, { ...options } = {}) {
    return this.post({
      url: `${this.prefix}/createOrder`,
      data,
      ...options
    })
  }

  /**
   * 获取订单列表
   * @param data
   * @param options
   * @returns {Promise<any>}
   */
  getOrderList (data = {}, { ...options } = {}) {
    return this.post({
      url: `${this.prefix}/GetOrderList`,
      data,
      ...options
    })
  }

  /**
   * 获取订单详情
   * @param data
   * @param options
   * @returns {Promise<any>}
   */
  getOrderDetail (data = {}, { ...options } = {}) {
    return this.post({
      url: `${this.prefix}/GetOrderDetail`,
      data,
      ...options
    })
  }

  /**
   * 取消订单
   * @param data
   * @param options
   * @returns {Promise<any>}
   */
  cancelOrder (data = {}, { ...options } = {}) {
    return this.post({
      url: `${this.prefix}/cancelOrder`,
      data,
      ...options
    })
  }

  /**
   * 确认收货
   * @param data
   * @param options
   * @returns {Promise<any>}
   */
  confirmReceipt (data = {}, { ...options } = {}) {
    return this.post({
      url: `${this.prefix}/comfirmOrder`,
      data,
      ...options
    })
  }

  /**
   * 提醒发货
   * @param data
   * @param options
   * @returns {Promise<any>}
   */
  remindShipping (data = {}, { ...options } = {}) {
    return this.post({
      url: `${this.prefix}/remindShipping`,
      data,
      ...options
    })
  }

  /**
   * 获取订单支付信息
   * @param data
   * @param options
   * @returns {Promise<any>}
   */
  getOrderPay (data = {}, { ...options } = {}) {
    return this.post({
      url: `${this.prefix}/getOrderPay`,
      data,
      ...options
    })
  }

  /**
   * 订单支付返回接口
   * @param data
   * @param options
   * @returns {Promise<any>}
   */
  getOrderPayResult (data = {}, { ...options } = {}) {
    return this.post({
      url: `${this.prefix}/orderPayResult`,
      data,
      ...options
    })
  }

  /**
   * 订单物流信息
   * @param data
   * @param options
   * @returns {Promise<any>}
   */
  getOrderLogisticsInfo (data = {}, { ...options } = {}) {
    return this.post({
      url: `${this.prefix}/getOrderLogisticsInfo`,
      data,
      ...options
    })
  }

  /* ---- 订单退款部分 ---- */

  /**
   * 获取订单退款信息
   * @param data
   * @param options
   * @return {Promise<any>}
   * @constructor
   */
  getOrderRefundUpdateInfo (data = {}, { ...options } = {}) {
    return this.post({
      url: `${this.refundPrefix}/GetOrderRefundUpdateInfo`,
      data,
      ...options
    })
  }

  /**
   * 获取订单退款金额信息
   * @param data
   * @param options
   * @return {Promise<any>}
   * @constructor
   */
  getOrderRefundAmountInfo (data = {}, { ...options } = {}) {
    return this.post({
      url: `${this.refundPrefix}/GetOrderRefundAmountInfo`,
      data,
      ...options
    })
  }

  /**
   * 申请/更新 退款
   * @param data
   * @param options
   * @return {Promise<any>}
   * @constructor
   */
  processOrderRefund (data = {}, { ...options } = {}) {
    return this.post({
      url: `${this.refundPrefix}/ProcessOrderRefund`,
      data,
      ...options
    })
  }

  /**
   * 退款/退货提交快递信息
   * @param data
   * @param options
   * @return {Promise<any>}
   * @constructor
   */
  postsOrderRefundLogistics (data = {}, { ...options } = {}) {
    return this.post({
      url: `${this.refundPrefix}/PostsOrderRefundLogistics`,
      data,
      ...options
    })
  }

  /**
   * 获取申请退款结果
   * @param data
   * @param options
   * @return {Promise<any>}
   * @constructor
   */
  getOrderRefundResultInfo (data = {}, { ...options } = {}) {
    return this.post({
      url: `${this.refundPrefix}/GetOrderRefundResultInfo`,
      data,
      ...options
    })
  }

  /**
   * 取消退款
   * @param data
   * @param options
   * @return {Promise<any>}
   * @constructor
   */
  deleteOrderRefund (data = {}, { ...options } = {}) {
    return this.post({
      url: `${this.refundPrefix}/DeleteOrderRefund`,
      data,
      ...options
    })
  }
}

export default new OrderApi()
