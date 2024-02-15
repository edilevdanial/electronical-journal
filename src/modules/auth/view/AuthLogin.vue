<template>
  <div class="auth flex full-height gap-8">
    <div class="left flex justify-content-center align-items-center w-full">
      <img class="left__logo" alt="logo" src="@assets/logo2.svg" />
      <img class="left__img w-full" src="@assets/cuate.png" alt="learn" />
    </div>
    <div class="right w-full flex flex-column align-items-center justify-content-between">
      <div class="w-full flex align-items-center justify-content-center">
        <p-card class="right__card h-max">
          <template #title>
            <h5 class="text-white text-center mt-0 mb-4">Вход в учебную систему</h5>
            <p class="text-white text-lg font-normal text-center m-0 mb-5">Чтобы продолжить войдите в аккаунт.</p>
          </template>
          <template #content>
            <div class="flex flex-column mb-2">
              <p-input-mask
                v-model="user.username"
                unmask
                mask="7(999) 999 99-99"
                class="mb-3"
                placeholder="Номер телефона"
              />
              <p-password
                v-model="user.password"
                class="w-full"
                input-class="w-full"
                placeholder="Пароль"
                :feedback="false"
                toggle-mask
                @keyup.enter="authLogin"
              />
            </div>

            <a href="" class="text-white mb-5 flex justify-content-end">Забыли пароль?</a>
            <p-btn class="w-full" severity="contrast" label="Войти" @click="authLogin" />
          </template>
        </p-card>
      </div>

      <div><p class="m-0">Учебное заведения имени Темирлана Руслана</p></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import PCard from 'primevue/card'
import PBtn from 'primevue/button'
import PInputMask from 'primevue/inputmask'
import PPassword from 'primevue/password'
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
  //margin-right: 200px;
  //position: relative;
  //width: max-content;
  //padding: 162px 100px;
  box-sizing: border-box;
  background-color: white;
  border-radius: 0 50px 50px 0;

  &__logo {
    position: absolute;
    top: 15px;
    left: 15px;
  }

  &__img {
    padding: 15% 10%;
  }
}

.right {
  padding-top: 8%;

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
