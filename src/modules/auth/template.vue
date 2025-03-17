<template>
  <div class="login-container d-flex justify-content-center align-items-center min-vh-100 bg-light">
    <div class="card shadow-sm" style="max-width: 400px; width: 100%">
      <div class="card-header bg-primary text-white">
        <h4 class="text-center mb-0">ログイン</h4>
      </div>
      <div class="card-body p-4">
        <form @submit.prevent="$emit('login')">
          <div class="mb-3">
            <label for="username" class="form-label">ユーザーID</label>
            <input
              type="text"
              class="form-control"
              id="username"
              :value="username"
              @input="$emit('update:username', $event.target.value)"
              placeholder="ユーザーIDを入力してください"
              required
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">パスワード</label>
            <input
              type="password"
              class="form-control"
              id="password"
              :value="password"
              @input="$emit('update:password', $event.target.value)"
              placeholder="パスワードを入力してください"
              required
            />
          </div>
          <div class="alert alert-danger" v-if="errorMessage">
            {{ errorMessage }}
          </div>
          <button type="submit" class="btn btn-primary w-100">ログイン</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LoginTemplate',
    props: {
      username: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      errorMessage: {
        type: String,
        default: ''
      }
    },
    emits: ['update:username', 'update:password', 'login']
  }
</script>
