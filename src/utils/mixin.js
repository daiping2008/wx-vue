
// 分页代码
export const paginationMixin = {
  data () {
    return {
      data: [],
      lock: false,
      total: 0,
      isEmpty: false,
      done: false
    }
  },
  methods: {
    // 设置数据
    setData (data) {
      this.done = true
      if (!data) return
      this.data = this.data.concat(data)
    },
    // 设置总数据
    setTotal (total) {
      if (total === 0) {
        this.isEmpty = true
      }
      this.total = total
    },
    // 是否为空
    hasEmpty () {
      return this.isEmpty
    },
    // 是否还有更多数据
    hasMore () {
      return this.data.length !== this.total
    },
    // 获得开始查询index
    getCurrentStart () {
      return this.data.length
    },
    // 是否锁住
    hasLock () {
      return this.lock
    },
    // 解锁
    unLock () {
      this.lock = false
    },
    // 加锁
    locked () {
      this.lock = true
    },
    // 初始化
    init () {
      this.data = []
      this.lock = false
      this.total = 0
      this.isEmpty = false
      this.done = false
    }
  }
}

export const scrollMixin = {
  data () {
    return {}
  },
  mounted () {
    window.addEventListener('scroll', () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      const windowHeight = document.documentElement.clientHeight || document.body.clientHeight
      if (scrollTop + windowHeight + 20 >= scrollHeight) {
        console.log(1)
      }
    })
  }

}
