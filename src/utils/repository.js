import axios from 'axios'

// Tạo một instance của axios với cấu hình mặc định
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'
const timeout = parseInt(import.meta.env.VITE_API_TIMEOUT || '10000')

// Tạo instance của axios với cấu hình từ biến môi trường
const axiosInstance = axios.create({
  baseURL,
  timeout,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

// Thêm interceptor cho request
axiosInstance.interceptors.request.use(
  (config) => {
    // Lấy token từ localStorage nếu có
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Thêm interceptor cho response
axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Xử lý lỗi response
    if (error.response) {
      // Lỗi server trả về (status code không phải 2xx)
      const { status } = error.response

      // Xử lý lỗi 401 Unauthorized
      if (status === 401) {
        // Xóa token và chuyển hướng đến trang đăng nhập
        localStorage.removeItem('auth_token')
        window.location.href = '/login'
      }

      // Xử lý lỗi 403 Forbidden
      if (status === 403) {
        console.error('Bạn không có quyền truy cập tài nguyên này')
      }

      // Xử lý lỗi 404 Not Found
      if (status === 404) {
        console.error('Tài nguyên không tồn tại')
      }

      // Xử lý lỗi 500 Internal Server Error
      if (status >= 500) {
        console.error('Lỗi server, vui lòng thử lại sau')
      }
    } else if (error.request) {
      // Không nhận được response
      console.error('Không thể kết nối đến server')
    } else {
      // Lỗi khi thiết lập request
      console.error('Lỗi:', error.message)
    }

    return Promise.reject(error)
  }
)

// Các phương thức CRUD cơ bản
export default {
  // GET request
  get(url, config = {}) {
    return axiosInstance.get(url, config)
  },

  // POST request
  post(url, data = {}, config = {}) {
    return axiosInstance.post(url, data, config)
  },

  // PUT request
  put(url, data = {}, config = {}) {
    return axiosInstance.put(url, data, config)
  },

  // PATCH request
  patch(url, data = {}, config = {}) {
    return axiosInstance.patch(url, data, config)
  },

  // DELETE request
  delete(url, config = {}) {
    return axiosInstance.delete(url, config)
  },

  // Phương thức để cập nhật token
  setAuthToken(token) {
    localStorage.setItem('auth_token', token)
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`
  },

  // Phương thức để xóa token
  clearAuthToken() {
    localStorage.removeItem('auth_token')
    delete axiosInstance.defaults.headers.common.Authorization
  }
}
