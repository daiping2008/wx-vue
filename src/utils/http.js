import axios from 'axios'

class HTTP {
  request ({ url, data = {}, method = 'GET' }) {
    return new Promise((resolve, reject) => {
      axios({
        url,
        data,
        method,
        headers: {
          'content-type': 'application/json',
          'appkey': 'RdshydjBvcYZhMZC'
        }
      }).then(res => {
        const { data, status } = res
        if (status.toString().startsWith('2')) {
          resolve(data)
        } else {
          alert(data.error_code)
          reject(new Error(data.error_code))
        }
      }).catch(err => {
        console.log(err)
        reject(err)
      })
    })
  }
}

export default HTTP
