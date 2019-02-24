import BaseApi from './index'

class ProductApi extends BaseApi {
  prefix = '/good'

  /**
   * 获取商品分类
   * @param data
   * @param options
   * @returns {Promise<any>}
   */
  getGoodCategory (data = {}, { ...options } = {}) {
    return this.post({
      url: `${this.prefix}/getGoodCategory`,
      data,
      ...options
    })
  }

  /**
   * 获取商品列表
   * @param data
   * @param options
   * @returns {Promise<any>}
   */
  getGoodList (data = {}, { ...options } = {}) {
    return this.post({
      url: `${this.prefix}/getGoodList`,
      data,
      ...options
    })
  }

  /**
   * 获取产品知识接口
   * @param data
   * @param options
   * @returns {Promise<any>}
   */
  GetGoodKnowledgeList (data = {}, { ...options } = {}) {
    return this.post({
      url: `${this.prefix}/GetGoodKnowledgeList`,
      data,
      ...options
    })
  }

  /**
   * 获取产品知识详情接口
   * @param data
   * @param options
   * @returns {Promise<any>}
   */
  GetGoodKnowledgeDetial (data = {}, { ...options } = {}) {
    return this.post({
      url: `${this.prefix}/GetGoodKnowledgeDetial`,
      data,
      ...options
    })
  }

  /**
   * 获取商品评论接口
   * @param data
   * @param options
   * @returns {Promise<any>}
   */
  GetProductCommentList (data = {}, { ...options } = {}) {
    return this.post({
      url: `${this.prefix}/GetProductCommentList`,
      data,
      ...options
    })
  }

  /**
   * 提交商品评论接口
   * @param data
   * @param options
   * @returns {Promise<any>}
   */
  PostAddComment (data = {}, { ...options } = {}) {
    return this.post({
      url: `${this.prefix}/PostAddComment`,
      data,
      ...options
    })
  }

}

export default new ProductApi()
