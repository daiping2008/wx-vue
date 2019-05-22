import HTTP from '../utils/http'

class ClassicModel extends HTTP {
  latestKey = 'vue-latest'
  getClassicLatest () {
    return this.request({
      url: '/classic/latest'
    }).then(res => {
      // 缓存最新期刊
      this._saveLatestIndex(res.index)
      // 缓存数据
      this._saveClassic(res)
      return Promise.resolve(res)
    })
  }
  getCurrentClassic (index, nextOrPrev) {
    const isNext = nextOrPrev === 'next' ? 'next' : 'previous'
    const classic = nextOrPrev === 'next' ? this._getClassic(index + 1) : this._getClassic(index - 1)
    if (!classic) {
      return this.request({
        url: `/classic/${index}/${isNext}`
      }).then(res => {
        this._saveClassic(res)
        return Promise.resolve(res)
      })
    } else {
      return Promise.resolve(classic)
    }
  }
  isFirst (index) {
    return index === 1
  }
  isLatest (index) {
    return index === parseInt(this._getLatestIndex())
  }
  _getLatestIndex () {
    return window.localStorage.getItem(this.latestKey)
  }
  _saveLatestIndex (index) {
    window.localStorage.setItem(this.latestKey, index)
  }
  _saveClassic (payload) {
    window.localStorage.setItem(this._getKey(payload.index), JSON.stringify(payload))
  }
  _getClassic (index) {
    return JSON.parse(window.localStorage.getItem(this._getKey(index)))
  }
  _getKey (index) {
    return `wx-classic-${index}`
  }
}

export default ClassicModel
