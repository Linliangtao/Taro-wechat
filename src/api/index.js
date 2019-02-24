import Taro from '@tarojs/taro'
import util from '../utils'
import { API_ROOT, STORAGE } from '../constants'

/**
 * 基础api类
 */
export default class BaseApi {
  $util = util

  /**
   * 通用请求函数
   * @param url 服务器地址
   * @param data 请求数据
   * @param method 请求方法
   * @param options 其他配置
   * @param options.loading 是否开启loading，默认true
   * @return {Promise<any>}
   */
  request ({ url, data = {}, method = 'POST', ...options } = {}) {
    url = API_ROOT + url
    data = data || {}

    const sessionKey = Taro.getStorageSync(STORAGE.SESSION_KEY)
    if (sessionKey) data.sessiong_key = sessionKey

    const loading = options.loading === undefined ? true : options.loading
    options.loading !== undefined && delete options.loading

    if (loading) this.$util.showLoading()

    return new Promise((resolve, reject) => {
      Taro.request({
        url,
        data,
        method,
        ...options
      }).catch(e => {
        reject({ ...e, desc: e.desc || '网络不太好，请稍后再试' })
      }).then((response) => {
        let { data: resData } = response

        if (typeof resData === 'string') {
          resData = JSON.parse(resData || '{}')
        }

        const code  = parseInt(resData.code)
        if (resData.success) {
          this.$util.hideLoading()
          resolve(resData || {})
        } else if (code === 10002) {
          Taro.navigateTo({
            url: '/pages/home/login'
          })
        }

        this.$util.hideLoading()
        reject(resData)
      }).catch(e => {
        this.$util.hideLoading()
        reject(e)
      })
    })
  }

  /**
   * 上传文件
   * @param url 服务器地址
   * @param filePath 微信文件路径
   * @param formData 附加数据
   * @param name 表单name
   * @param options 其他配置
   * @param options.loading 是否开启loading，默认true
   * @param options.progress 是否展示进度，默认true
   * @return {Promise<Taro.uploadFile.Promised | never>}
   */
  upload ({ url, filePath, formData = {}, name = 'file', ...options } = {}) {
    url = API_ROOT + url
    const loading = options.loading === undefined ? true : options.loading
    const progress = options.progress === undefined ? true : options.progress
    options.loading !== undefined && delete options.loading
    options.progress !== undefined && delete options.progress

    if (loading) this.$util.showLoading('上传中...')

    console.log('url: ', url)
    console.log('filePath: ', filePath)
    console.log('formData: ', formData)

    const uploadTask = Taro.uploadFile({
      url,
      filePath,
      name,
      formData,
      ...options
    })

    uploadTask.progress(res => {
      if (progress) {
        this.$util.showLoading(`上传中(${res.progress}%)`)
      }
      options.onProgress && options.onProgress(res.progress)
    })

    return uploadTask.catch(e => {
      return Promise.reject({ ...e, desc: '网速不太好，请稍候再试' })
    }).then(response => {
      if (response.statusCode !== 200) {
        return Promise.reject({ ...response, desc: '网络连接错误' })
      }

      let { data: resData } = response
      if (typeof resData === 'string') {
        resData = JSON.parse(resData || '{}')
      }

      if (resData.success) {
        this.$util.hideLoading(loading)
        return Promise.resolve(resData || {})
      } else {
        // const code = parseInt(resData.code)
      }

      this.$util.hideLoading(loading)
      return Promise.reject(resData)
    }).catch(e => {
      this.$util.hideLoading(loading)
      return Promise.reject(e)
    })
  }

  /**
   * post请求
   * @param url
   * @param data
   * @param options
   * @return {Promise<any>}
   */
  post ({ url, data, ...options } = {}) {
    return this.request({
      method: 'POST',
      url,
      data,
      ...options
    })
  }

  /**
   * get请求
   * @param url
   * @param data
   * @param options
   * @return {Promise<any>}
   */
  get ({ url, data, ...options } = {}) {
    return this.request({
      method: 'GET',
      url,
      data,
      ...options
    })
  }
}
