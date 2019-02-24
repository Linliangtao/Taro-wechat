import Taro from '@tarojs/taro'
import { Image, Text, View } from '@tarojs/components'
import * as PropTypes from 'prop-types'
import BaseComponent from '../base-component'

import '../../assets/scss/components/pagination/pagination.scss'

export default class PaginationComp extends BaseComponent {
  static defaultProps = {
    busy: false, // 是否处于加载中
    end: false, // 是否没有更多数据
    defaultText: '点击加载更多', // 默认文本
    loadingText: '正在加载中...', // 加载中文本
    endText: '我是有底线滴～', // 没有数据文本
    onTap: () => {} // 点击回调
  }

  static propTypes = {
    busy: PropTypes.bool,
    end: PropTypes.bool,
    defaultText: PropTypes.string,
    loadingText: PropTypes.string,
    endText: PropTypes.string,
    onTap: PropTypes.func
  }

  icons = {
    default: require('../../assets/images/icon_angle_down.png'),
    loading: require('../../assets/images/icon_loading.jpg')
  }

  constructor (props) {
    super(props)

    this.state = {
      status: this.getStatus(props) // 当前状态 default | loading | end
    }
  }

  componentWillReceiveProps (nextProps) {
    const status = this.getStatus(nextProps)
    this.setState({ status })
  }

  /**
   * 更新page
   */
  getStatus (props) {
    const { busy, end } = props
    return end ? 'end' : (
      busy ? 'loading' : 'default'
    )
  }

  /**
   * 点击回调
   */
  handleTap () {
    const { onTap } = this.props
    onTap && onTap()
  }

  render () {
    const { status } = this.state

    const _className = this.$util.getClassName({
      'i-pagination': true,
      loading: status === 'loading'
    })

    const text = this.props[`${status}Text`]

    return (
      <View className={_className} onClick={this.handleTap}>
        { status !== 'end' && <Image className='pagination-icon' src={this.icons[status]} mode='aspectFit' /> }
        <Text className='pagination-text'>{text}</Text>
      </View>
    )
  }
}
