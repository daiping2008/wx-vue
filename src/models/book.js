import HTTP from '../utils/http'

class BookModel extends HTTP {
  getHoList () {
    return this.request({
      url: '/book/hot_list'
    })
  }

  getBookDetail (id) {
    return this.request({
      url: `/book/${id}/detail`
    })
  }

  getBookComment (id) {
    return this.request({
      url: `/book/${id}/short_comment`
    })
  }

  getBookFavor (id) {
    return this.request({
      url: `/book/${id}/favor`
    })
  }
}

export default BookModel
