<template>
  <div class="auth flex full-height">
    <div class="left">
      <img class="left__logo" alt="logo" src="@assets/logo2.svg" />
      <img width="400px" src="@assets/cuate.png" alt="learn" />
    </div>
    <div class="right flex items-center justify-center">
      <p-card style="width: 380px" class="right__card">
        <template #content>
          <h6 class="text-white text-center q-mt-none q-mb-sm">Вход в учебную систему</h6>
          <p class="text-white text-center mb-7">Чтобы продолжить войдите в аккаунт.</p>
          <p-input-mask
            v-model="user.username"
            bg-color="grey-3"
            standout
            outlined
            unmask
            mask="7(999) 999 99-99"
            class="q-mb-md text-black rounded-lg"
            label-color="black"
            color="black"
            label="Номер телефона"
          />
          <p-input
            v-model="user.password"
            standout
            bg-color="grey-3"
            input-class="border-lg"
            outlined
            label-color="black"
            color="black"
            label="Пароль"
          />
          <a href="" class="text-white q-mb-lg flex justify-end">Забыли пароль?</a>
          <p-btn class="full-width border-lg" flat no-caps label="Войти" color="black" @click="authLogin" />
        </template>
      </p-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import PCard from 'primevue/card'
import PBtn from 'primevue/button'
import PInputMask from 'primevue/inputmask'
import PInput from 'primevue/inputtext'
import api from '@services/api'
import { useRouter } from 'vue-router'

const user = reactive({
  password: '',
  username: '',
  type: 'ADMIN',
})

const router = useRouter()

// const saveUser = ref(false)

function authLogin() {
  user.username = '7' + user.username
  api.post('/api/auth/login', JSON.stringify(user)).then(response => {
    localStorage.setItem('phone', user.username)
    localStorage.setItem('token', response.data.token)
    router.push({ name: 'home' })
  })
}
</script>

<style scoped lang="scss">
.q-field__control {
  border-radius: 10px !important;
}

.login__card {
  min-width: 350px;
}

.left {
  margin-right: 200px;
  position: relative;
  width: max-content;
  padding: 162px 100px;
  box-sizing: border-box;
  background-color: white;
  border-radius: 0 50px 50px 0;

  &__logo {
    position: absolute;
    top: 0;
    left: 0;
  }
}

.right {
  &__card {
    background-color: rgba(69, 90, 100, 1);
    border-radius: 20px;
    box-sizing: border-box;
    padding: 40px 38px 28px 38px;
  }
}

.q-field__control {
  border-radius: 10px !important;
}

.border-lg {
  border-radius: 12px;
  background-color: rgba(232, 241, 255, 1);
}

.login__card {
  min-width: 350px;
}
</style>
