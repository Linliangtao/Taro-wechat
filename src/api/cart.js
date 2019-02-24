import BaseApi from './index'

class CartApi extends BaseApi {
  prefix = '/shopCart'

  /**
   * 添加商品到购物车
   * @param data
   * @param options
   * @return {Promise<any>}
   */
  addCart (data = {}, { ...options } = {}) {
    return this.post({
      url: `${this.prefix}/addCart`,
      data,
      ...options
    })
  }

  /**
   * 获取购物车列表
   * @param data
   * @param options
   * @return {Promise<any>}
   */
  getCartList (data = {}, { ...options } = {}) {
    return this.post({
      url: `${this.prefix}/getCartList`,
      data,
      ...options
    })
  }

  /**
   * 更新购物车商品
   * @param data
   * @param options
   * @return {Promise<any>}
   */
  updateCart (data = {}, { ...options } = {}) {
    return this.post({
      url: `${this.prefix}/updateCart`,
      data,
      ...options
    })
  }

  /**
   * 删除购物车商品
   * @param data
   * @param options
   * @return {Promise<any>}
   */
  deleteCart (data = {}, { ...options } = {}) {
    return this.post({
      url: `${this.prefix}/deleteCart`,
      data,
      ...options
    })
  }
}

export default new CartApi()
