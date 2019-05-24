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

  addShortComment ({ id, content }) {
    return this.request({
      url: '/book/add/short_comment',
      data: {
        book_id: id,
        content
      },
      method: 'POST'
    })
  }
}

export default BookModel
