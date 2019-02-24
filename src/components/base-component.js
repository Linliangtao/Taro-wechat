import Taro, { Component } from '@tarojs/taro'
import util from '../utils'

/**
 * 组件基础类
 */
export default class BaseComponent extends Component {
  static options = {
    addGlobalClass: true
  }

  $util = util

  constructor (props) {
    super(props)
  }
}
