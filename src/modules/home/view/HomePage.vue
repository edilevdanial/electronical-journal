<template>
  <div>
    <div class="flex row justify-between p-2">
      <div class="col-10 grid gap-3">
        <p-card class="cursor-pointer" style="width: 300px" @click="$router.push({ name: 'all.users' })">
          <template #content>
            <div class="flex flex-column align-items-center">
              <img class="q-mb-md" width="176" height="139" alt="girl" src="@assets/Girl2.svg" />
              <h4>Ученики</h4>
            </div>
          </template>
        </p-card>
        <p-card class="cursor-pointer" style="width: 300px" @click="$router.push({ name: 'all.users' })">
          <template #content>
            <div class="flex flex-column align-items-center">
              <img class="q-mb-md" width="176" height="139" alt="girl" src="@assets/Girl1.svg" />
              <h4>Учителя</h4>
            </div>
          </template>
        </p-card>
        <p-card class="cursor-pointer" style="width: 300px" @click="$router.push({ name: 'all.seminars' })">
          <template #content>
            <div class="flex flex-column align-items-center">
              <img class="q-mb-md" width="176" height="139" alt="girl" src="@assets/Girl3.svg" />
              <h4>Расписание</h4>
            </div>
          </template>
        </p-card>
        <p-card class="cursor-pointer" style="width: 300px" @click="$router.push({ name: 'all.group' })">
          <template #content>
            <div class="flex flex-column align-items-center">
              <img class="q-mb-md" width="176" height="139" alt="girl" src="@assets/Girl1.svg" />
              <h4>Группы</h4>
            </div>
          </template>
        </p-card>
        <p-card class="cursor-pointer" style="width: 300px" @click="$router.push({ name: 'all.course' })">
          <template #content>
            <div class="flex flex-column align-items-center">
              <img class="q-mb-md" width="176" height="139" alt="girl" src="@assets/Girl2.svg" />
              <h4>Предметы</h4>
            </div>
          </template>
        </p-card>
      </div>
      <div class="col-2">
        <div class="flex flex-column gap-3 q-gutter-y-md justify-center items-center">
          <p-btn
            label="Добавить Пользователя"
            no-caps
            outlined
            class="text-decoration-none"
            icon="pi pi-arrow-right"
            icon-pos="right"
            to="/create/user"
          />
          <p-btn
            label="Создание Группы"
            no-caps
            outlined
            class="text-decoration-none"
            icon="pi pi-arrow-right"
            icon-pos="right"
            to="/create/group"
          />
          <p-btn
            label="Создание Расписание"
            no-caps
            outlined
            class="text-decoration-none"
            icon="pi pi-arrow-right"
            icon-pos="right"
            to="/create/seminar"
          />
          <p-btn
            label="Создание вакансий"
            no-caps
            outlined
            class="text-decoration-none"
            icon="pi pi-arrow-right"
            icon-pos="right"
            to="/create/vacancy"
          />
          <p-btn
            label="Создание новости"
            no-caps
            outlined
            class="text-decoration-none"
            icon="pi pi-arrow-right"
            icon-pos="right"
            to="/create/news"
          />
          <p-btn
            label="Создание предмета"
            no-caps
            outlined
            class="text-decoration-none"
            icon="pi pi-arrow-right"
            icon-pos="right"
            to="/create/course"
          />
        </div>
      </div>
    </div>

    <div class="flex gap-2">
      <p-btn
        label="Вакансий"
        icon="pi pi-arrow-right"
        icon-pos="right"
        color="blue-grey-7"
        text-color="white"
        padding="10px 40px"
      />
      <p-btn
        label="Новости"
        icon="pi pi-arrow-right"
        icon-pos="right"
        color="blue-grey-7"
        text-color="white"
        padding="10px 40px"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import PCard from 'primevue/card'
import PBtn from 'primevue/button'
import api from '@services/api'
import { useUserStore } from '@stores/userStore'

const userStore = useUserStore()
onMounted(() => {
  let data = JSON.parse(localStorage.getItem('person'))
  if (!data) {
    api.get(`/api/user/me`).then(response => {
      data = response.data
      localStorage.setItem('person', JSON.stringify(response.data))
      userStore.setUser(data)
    })
  } else {
    userStore.setUser(data)
  }
})
</script>

<style scoped lang="scss">
//.rowCard {
//  padding: 20px 90px;
//  box-sizing: border-box;
//}
//
//.cards {
//  display: grid;
//  grid-template-columns: repeat(3, 310px);
//  grid-column-gap: 80px;
//  margin-bottom: 46px;
//}
//
//.second {
//  grid-template-columns: repeat(2, 505px);
//}
</style>
