import HTTP from '../utils/http'

class KeywordModel extends HTTP {
  key = 'vue-keyword-q'
  max = 10
  getHot () {
    return this.request({
      url: '/book/hot_keyword'
    })
  }

  getHis () {
    return JSON.parse(window.localStorage.getItem(this.key)) || []
  }

  setHis (value) {
    if (!value) return
    const his = JSON.parse(window.localStorage.getItem(this.key)) || []
    const has = his.includes(value)
    if (!has) {
      if (his.length >= this.max) {
        his.pop()
      }
      his.unshift(value)
      window.localStorage.setItem(this.key, JSON.stringify(his))
    }
  }
}

export default KeywordModel
