import Taro from '@tarojs/taro'
import { Text, View } from '@tarojs/components'
import * as PropTypes from 'prop-types'
import BaseComponent from '../base-component'

import '../../assets/scss/components/navbar/index.scss'

export default class NavbarComp extends BaseComponent {
  static defaultProps = {
    activeIndex: 0, // 当前项
    items: [], // 数据列表
    fixed: true, // 是否固定顶部悬浮
    onTapItem: () => {}
  }

  static propTypes = {
    activeIndex: PropTypes.number,
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
    onTapItem: PropTypes.func
  }

  constructor (props) {
    super(props)
  }

  /**
   * 点击项
   * @param index
   * @param item
   */
  handleTapItem (index, item) {
    const { onTapItem } = this.props
    onTapItem && onTapItem(index, item)
  }

  render () {
    const { activeIndex, items, fixed } = this.props

    const _className = this.$util.getClassName({
      'i-navbar': true,
      fixed
    })

    return (
      <View className={_className}>
        <View className='navbar'>
          {
            items && items.length > 0 && items.map((item, index) => {
              const itemClassName = this.$util.getClassName({
                'navbar-item': true,
                active: activeIndex === index
              })

              return (
                <View className={itemClassName} onClick={this.handleTapItem.bind(this, index, item)}>
                  <Text className='ni-text'>{item}</Text>
                </View>
              )
            })
          }
        </View>
      </View>
    )
  }
}
