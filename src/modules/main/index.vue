<template>
  <div class="main-container">
    <router-view></router-view>
  </div>
</template>

<script>
  import { useAuthStore } from '../auth/store'

  export default {
    name: 'MainDashboard',
    setup() {
      const authStore = useAuthStore()

      return {
        user: authStore.user
      }
    }
  }
</script>

<style scoped>
  .main-container {
    width: 100%;
    height: 100%;
  }
</style>
