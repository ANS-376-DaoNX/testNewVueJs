<template>
  <LoginTemplate
    :username="username"
    :password="password"
    :errorMessage="errorMessage"
    @update:username="updateUsername"
    @update:password="updatePassword"
    @login="handleLogin"
  />
</template>

<script>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from './store'
  import LoginTemplate from './template.vue'
  import './style.css'

  export default {
    name: 'LoginView',
    components: {
      LoginTemplate
    },
    setup() {
      const username = ref('')
      const password = ref('')
      const errorMessage = ref('')
      const router = useRouter()
      const authStore = useAuthStore()

      const updateUsername = (value) => {
        username.value = value
      }

      const updatePassword = (value) => {
        password.value = value
      }

      const handleLogin = async () => {
        if (!username.value || !password.value) {
          errorMessage.value = 'ユーザーIDとパスワードを入力してください。'
          return
        }

        try {
          await authStore.login(username.value, password.value)
          router.push('/')
        } catch (error) {
          errorMessage.value = 'ログイン処理中にエラーが発生しました。'
          console.error(error)
        }
      }

      return {
        username,
        password,
        errorMessage,
        updateUsername,
        updatePassword,
        handleLogin
      }
    }
  }
</script>
