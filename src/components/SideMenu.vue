<template>
  <div class="sidebar bg-dark text-white">
    <div class="sidebar-sticky">
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link to="/" class="nav-link text-white">
            <i class="bi bi-house-door me-2"></i>
            ホーム
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/product-master" class="nav-link text-white">
            <i class="bi bi-box me-2"></i>
            商品マスタ
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/customer-product-master" class="nav-link text-white">
            <i class="bi bi-people me-2"></i>
            得意先商品マスタ
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
  import { defineOptions } from 'vue'

  // Định nghĩa tên component
  defineOptions({
    name: 'SideMenu'
  })
</script>

<style scoped>
  .sidebar {
    position: fixed;
    top: 60px;
    left: 0;
    bottom: 0;
    width: 250px;
    z-index: 100;
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
    overflow-y: auto;
  }

  .sidebar-sticky {
    padding-top: 1rem;
    height: 100%;
  }

  .nav-link {
    padding: 0.75rem 1.25rem;
    font-weight: 500;
    transition: all 0.2s;
  }

  .nav-link:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .nav-link.active {
    background-color: rgba(255, 255, 255, 0.2);
  }
</style>
