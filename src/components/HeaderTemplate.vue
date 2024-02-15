<script setup lang="ts">
import PBtn from 'primevue/button'
import { useUserStore } from '@stores/userStore'
import { useRoute, useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

function logout() {
  localStorage.clear()
  userStore.$reset()
  router.push({ name: 'auth.login' })
}

const obj = {
  home: 'Кабинет администратора',
  'all.course': 'Главная/Предметы',
  'all.group': 'Главная/Группы',
  'all.users': 'Главная/Пользователи',
  'all.news': 'Главная/Новости',
  'get.news': 'Главная/Новость',
}
</script>

<template>
  <div class="flex justify-content-between">
    <div class="flex align-items-center">
      <p-btn v-if="route.fullPath !== '/'" text icon="pi pi-arrow-left" @click="$router.back()" />
      <p class="m-0" :class="{ 'text-2xl font-medium': route.name === 'home' }">{{ obj[route.name] }}</p>
    </div>

    <div class="flex align-items-center gap-2">
      <h4 class="m-0">{{ userStore.user.firstName }} {{ userStore.user.lastName }}</h4>
      <p-btn outlined icon="pi pi-sign-out" @click="logout" />
    </div>
  </div>
</template>

<style scoped></style>
