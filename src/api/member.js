import BaseApi from './index'

class MemberApi extends BaseApi {
  prefix = '/member'

  /**
   * 获取我的会员中心数据
   * @param data
   * @param options
   * @returns {Promise<any>}
   */
  getMyCenter (data = {}, { ...options } = {}) {
    return this.post({
      url: `${this.prefix}/getMyCenter`,
      data,
      ...options
    })
  }

  /**
   * 获取地址列表
   * @param data
   * @param options
   * @returns {Promise<any>}
   */
  getAddressList (data = {}, { ...options } = {}) {
    return this.post({
      url: `${this.prefix}/getAddressList`,
      data,
      ...options
    })
  }

  /**
   * 获取地址详情
   * @param data
   * @param options
   * @returns {Promise<any>}
   */
  getAddress (data = {}, { ...options } = {}) {
    return this.post({
      url: `${this.prefix}/getAddress`,
      data,
      ...options
    })
  }

  /**
   * 保存地址
   * @param data
   * @param options
   * @returns {Promise<any>}
   */
  saveAddress (data = {}, { ...options } = {}) {
    return this.post({
      url: `${this.prefix}/postAddress`,
      data,
      ...options
    })
  }

  /**
   * 删除地址
   * @param data
   * @param options
   * @returns {Promise<any>}
   */
  deleteAddress (data = {}, { ...options } = {}) {
    return this.post({
      url: `${this.prefix}/deleteAddress`,
      data,
      ...options
    })
  }

  /**
   * 获取我的储值卡
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
   * 获取会员身份证
   * @param data
   * @param options
   * @return {Promise<any>}
   */
  getIdcard (data = {}, { ...options } = {}) {
    return this.post({
      url: `${this.prefix}/getMemberIdnumber`,
      data,
      ...options
    })
  }
}

export default new MemberApi()
