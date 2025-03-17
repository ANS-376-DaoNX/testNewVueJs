<template>
  <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand fw-bold" href="#">{{ pageTitle }}</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <button @click="logout" class="btn btn-light">ログアウト</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
  import { useRouter, useRoute } from 'vue-router'
  import { useAuthStore } from '../modules/auth/store.js'
  import { computed } from 'vue'

  export default {
    name: 'AppHeader',
    setup() {
      const router = useRouter()
      const route = useRoute()
      const authStore = useAuthStore()

      const pageTitle = computed(() => {
        // Xác định tiêu đề dựa trên route hiện tại
        const path = route.path
        if (path === '/') {
          return 'ホームページ'
        } else if (path.includes('/product-master')) {
          return '商品マスタ'
        } else if (path.includes('/customer-product-master')) {
          return '得意先商品マスタ'
        } else {
          return 'ホームページ'
        }
      })

      const logout = () => {
        authStore.logout()
        router.push('/login')
      }

      return {
        logout,
        pageTitle
      }
    }
  }
</script>

<style scoped>
  .navbar {
    height: 60px;
    z-index: 1030;
    background-color: #0066cc;
    font-family: 'Meiryo', 'MS PGothic', sans-serif;
  }

  .navbar-brand {
    font-size: 1.5rem;
    letter-spacing: 1px;
  }
</style>
