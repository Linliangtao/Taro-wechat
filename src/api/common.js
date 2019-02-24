import BaseApi from './index'

class CommonApi extends BaseApi {

  /**
   * 授权
   * @param data
   * @param options
   * @return {Promise<any>}
   */
  authorize (data = {}, ...options) {
    return this.post({
      url: `/authorize/authorize`,
      data,
      ...options
    })
  }
}

export default new CommonApi()
