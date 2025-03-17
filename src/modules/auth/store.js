import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const user = ref(null)

  function login(username, password) {
    // Trong thực tế, bạn sẽ gọi API để xác thực
    return new Promise((resolve, reject) => {
      // Giả lập API call
      setTimeout(() => {
        if (username === 'admin' && password === 'admin123') {
          isAuthenticated.value = true
          user.value = {
            id: 1,
            username: username,
            name: 'Admin User'
          }
          // Lưu trạng thái đăng nhập vào localStorage
          localStorage.setItem('isAuthenticated', 'true')
          localStorage.setItem('user', JSON.stringify(user.value))
          resolve(user.value)
        } else {
          reject(new Error('Invalid username or password'))
        }
      }, 500)
    })
  }

  function logout() {
    isAuthenticated.value = false
    user.value = null
    // Xóa trạng thái đăng nhập khỏi localStorage
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('user')
  }

  function checkAuth() {
    const storedAuth = localStorage.getItem('isAuthenticated')
    const storedUser = localStorage.getItem('user')

    if (storedAuth === 'true' && storedUser) {
      isAuthenticated.value = true
      user.value = JSON.parse(storedUser)
    }
  }

  // Kiểm tra trạng thái đăng nhập khi khởi tạo store
  checkAuth()

  return {
    isAuthenticated,
    user,
    login,
    logout,
    checkAuth
  }
})
