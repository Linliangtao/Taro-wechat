import Taro from '@tarojs/taro'
import moment from 'moment'

moment.locale('zh-cn')

const status = {
  taroLoading: false
}

/**
 * 工具栏
 */
class Util {
  /**
   * 获取变量数据类型
   * @param x
   * @return {string}
   */
  getType (x) {
    return Object.prototype.toString.call(x).match(/^\[object (.*)\]$/)[1]
  }

  /**
   * 显示toast
   * @param msg
   * @param icon
   * @param duration
   * @param options
   */
  showToast (msg = '', { icon = 'none', duration = 1500, ...options } = {}) {
    if (!msg) return
    const callback = options.callback
    delete options.callback

    setTimeout(() => {
      Taro.showToast({
        title: msg,
        icon,
        duration,
        ...options
      })
      setTimeout(() => {
        callback && callback()
      }, duration)
    }, 0)
  }

  /**
   * 显示loading
   * @param msg
   */
  showLoading (msg = '加载中...') {
    return Taro.showLoading({
      title: msg,
      mask: true
    }).then(() => {
      status.taroLoading = true
    })
  }

  /**
   * 隐藏loading
   */
  hideLoading () {
    if (status.taroLoading) {
      Taro.hideLoading()
    }
  }

  /**
   * 组装组件className
   * @param classes
   * @return {*|string}
   */
  getClassName (classes) {
    let className = ''
    if (this.getType(classes) === 'Array') {
      className = classes.join(' ');
    } else if (this.getType(classes) === 'Object') {
      const _classes = []
      for (let [key, value] of Object.entries(classes)) {
        if (value) {
          _classes.push(key)
        }
      }
      className = _classes.join(' ')
    } else {
      className = classes
    }

    return className
  }

  /**
   * 日期格式化
   * @param value
   * @param format 格式
   * @return {string}
   */
  dateFilter (value, format = 'YYYY-MM-DD HH:mm:ss') {
    return moment(value).format(format)
  }

  /**
   * 计算时差
   * @param endTime
   * @param unit
   */
  calculateDiff (endTime, unit = 'days') {
    const now = moment()
    const end = moment(endTime)

    if (!end.isValid()) {
      console.warn('无效时间(endTime)：', endTime)
    }

    return Math.ceil(end.diff(now, unit, true))
  }

  /**
   * 过滤转换数据对象
   * @param src
   * @param keys 对象key转换规则，形如{ aB: 'AB' }
   * @param filterEmpty 是否过滤空值
   * @param filterKeys 过滤掉的key数组，形如[ 'a' ]
   * @param filter 值过滤器
   * @param isFormData 是否转换为FormData对象
   */
  transformData (src = {}, { keys = {}, filterEmpty = true, filterKeys = [], filter, isFormData = false } = {}) {
    const formData = isFormData ? new FormData() : {}
    for (let [key, value] of Object.entries(src)) {
      const k = keys[key] || key
      // 属于过滤掉的key、空值并且需要过滤空值 的情况下，跳过此次循环
      if (filterKeys.includes(key) || (filterEmpty && !value)) continue
      const v = this.getType(filter) === 'Function' ? (filter(value, key) || value) : value
      if (isFormData) {
        formData.append(k, v)
      } else {
        formData[k] = v
      }
    }

    return formData
  }

  /**
   * 字符数据校验
   * @param {string} str 
   * @param {string} type 
   */
  checkStr (str, type) {
    switch (type) {
      case 'phone':   //手机号码
        return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
      case 'tel':     //座机
        return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
      case 'card':    //身份证
        return /^\d{15}|\d{18}$/.test(str);
      case 'pwd':     //密码以字母开头，长度在6~20之间，只能包含字母、数字和下划线
        return /^[a-zA-Z]\w{5,19}$/.test(str)
      case 'tc':     //tool-cipher 工具密码 6位数字或字母
        return /^[a-zA-Z\d]{5}$/.test(str)
      case 'postal':  //邮政编码
        return /[1-9]\d{5}(?!\d)/.test(str);
      case 'qq':      //QQ号
        return /^[1-9][0-9]{4,9}$/.test(str);
      case 'email':   //邮箱
        return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
      case 'money':   //金额(小数点2位)
        return /^\d*(?:\.\d{0,2})?$/.test(str);
      case 'url':     //网址
        return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str)
      case 'ip':      //IP
        return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str);
      case 'date':    //日期时间
        return /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) || /^(\d{4})\-(\d{2})\-(\d{2})$/.test(str)
      case 'number':  //数字
        return /^[0-9]$/.test(str);
      case 'english': //英文
        return /^[a-zA-Z]+$/.test(str);
      case 'chinese': //中文
        return /^[\u4E00-\u9FA5]+$/.test(str);
      case 'name':    //中文、数字、英文+空格
        return /^[\u4E00-\u9FA5A-Za-z0-9 ]+$/.test(str);
      case 'lower':   //小写
        return /^[a-z]+$/.test(str);
      case 'upper':   //大写
        return /^[A-Z]+$/.test(str);
      case 'html':    //HTML标记
        return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
      case 'addr':    //匹配地区  省/市/自治区 -> 区/县/市/自治州/盟/地区 -> 市/县/旗/区 -> 
        return /([^省]+省|.+自治区)?([^自治州]+自治州|[^市]+市|[^盟]+盟|[^地区]+地区)?([^市]+市|[^县]+县|[^旗]+旗|.+区)?(.*)+$/.test(str);
      case 'local':   //切割地区  省/市/自治区 -> 区/县/市/自治州/盟/地区 -> 市/县/旗/区 -> 
        return str.match('^([^省]+省|.+自治区)?([^自治州]+自治州|[^市]+市|[^盟]+盟|[^地区]+地区)?([^市]+市|[^县]+县|[^旗]+旗|.+区)?(.*)+$');
      default:
        return true;
    }
  }
}

export default new Util()
