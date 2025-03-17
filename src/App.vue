<script>
  import { useAuthStore } from './modules/auth/store.js'
  import AppHeader from './components/AppHeader.vue'
  import SideMenu from './components/SideMenu.vue'
  import PopupManager from './components/common/PopupManager.vue'
  import { storeToRefs } from 'pinia'

  export default {
    name: 'App',
    components: {
      AppHeader,
      SideMenu,
      PopupManager
    },
    setup() {
      const authStore = useAuthStore()
      const { isAuthenticated } = storeToRefs(authStore)

      return {
        isAuthenticated
      }
    }
  }
</script>

<template>
  <div id="app">
    <AppHeader v-if="isAuthenticated" />
    <SideMenu v-if="isAuthenticated" />
    <main :class="['content-area', { 'content-with-sidebar': isAuthenticated }]">
      <router-view></router-view>
    </main>
    <!-- Global Popup Manager -->
    <PopupManager />
  </div>
</template>

<style>
  body {
    background-color: #f8f9fa;
    margin: 0;
    padding: 0;
    font-family: 'Meiryo', 'MS PGothic', sans-serif;
    overflow: hidden;
    height: 100vh;
  }

  #app {
    height: 100vh;
    width: 100vw;
    position: relative;
  }

  .content-area {
    position: fixed;
    top: 60px; /* Bắt đầu ngay dưới header */
    right: 0;
    bottom: 0;
    left: 0;
    padding: 15px;
    overflow-y: auto;
    background-color: #f8f9fa;
    transition: left 0.3s;
  }

  .content-with-sidebar {
    left: 250px; /* Bắt đầu từ bên phải của sidebar */
  }

  @media (max-width: 768px) {
    .content-with-sidebar {
      left: 0;
    }
  }
</style>
