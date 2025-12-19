import axios from 'axios'
import { ElMessage } from 'element-plus'   // 如用其他 UI 库换成对应提示即可

// 创建实例
const service = axios.create({
  baseURL: 'http://localhost:8080/library/', // 在 .env 文件里配：VITE_BASE_API = '/api'
  timeout: 6000
})

// 请求拦截：统一带上 token，前端给后端发送数据
service.interceptors.request.use(
  config => {
    // const token = localStorage.getItem('token')
    // if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  error => Promise.reject(error)
)

// 响应拦截：统一弹错 + 登录过期跳转，后端给前端返回数据
service.interceptors.response.use(
  response => {
    const { status, data } = response
    // 与后端约定：code === 200 为成功
    if ( status === 200 ) return data
    ElMessage.error(data.msg || '服务器异常')
    return Promise.reject(new Error(data.msg || 'Error'))
  },
  error => {
    const { response } = error
    if (response?.status === 401) {
      localStorage.clear()
      location.reload()          // 回到登录页
    }
    ElMessage.error(response?.data?.msg || '网络错误')
    return Promise.reject(error)
  }
)

export default service