import HTTP from '../utils/http'

class BookModel extends HTTP {
  getHoList () {
    return this.request({
      url: 'book/hot_list'
    })
  }
}

export default BookModel
