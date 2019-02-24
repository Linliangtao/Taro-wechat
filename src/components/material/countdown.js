import Taro from '@tarojs/taro'
import { Image, Label, Text, View } from '@tarojs/components'
import * as PropTypes from 'prop-types'
import BaseComponent from '../base-component'

import '../../assets/scss/components/material/countdown.scss'

/**
 * 模板广告位（计时）
 */
export default class MaterialCountdownComp extends BaseComponent {
  static defaultProps = {
    cover: '', // 封面图片路径
    title: '', // 标题
    label: '', // 标签
    desc: '', // 描述
    endTime: new Date() // 结束时间
  }

  static propTypes = {
    cover: PropTypes.string,
    title: PropTypes.string,
    label: PropTypes.string,
    desc: PropTypes.string,
    endTime: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string, PropTypes.number]).isRequired
  }

  constructor (props) {
    super(props)

    this.state = {
      residue: this.$util.calculateDiff(props.endTime) // 剩余时间
    }
  }

  componentWillReceiveProps (nextProps) {
    const { endTime } = nextProps
    this.setState({
      residue: this.$util.calculateDiff(endTime)
    })
  }

  render () {
    const { cover, title, label, desc } = this.props
    const { residue } = this.state

    return residue && residue > 0 ? (
      <View className='i-material-countdown'>
        <View className='mc-dialog'>
          <View className='mc-cover'>
            <Image className='mc-cover-image' src={cover} />
          </View>
          <View className='mc-bt-container'>
            <View className='mc-bt-contents'>
              <Text className='mc-bt-title'>{title}</Text>
              <View className='mc-bt-subtitle'>
                { label && <Label className='mc-bt-label'>#{label}#</Label> }
                <Text className='mc-bt-desc'>{desc}</Text>
              </View>
            </View>
            <View className='mc-bt-addon'>
              <View className='mc-bt-tag'>
                <Image className='mc-bt-tag-icon' src={require('../../assets/images/icon_countdown.png')} mode='aspectFit' />
                <Text className='mc-bt-tag-text'>剩{residue}天</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    ) : null
  }
}
