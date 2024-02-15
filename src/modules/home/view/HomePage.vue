<template>
  <div>
    <div class="flex grid justify-between p-2">
      <div class="col-10 grid routes">
        <div v-for="route in routes" :key="route.routeName" class="p-4" :class="route.class">
          <div
            class="cursor-pointer border-1 border-round-xl bg-white flex flex-column align-items-center p-4"
            @click="$router.push({ name: route.routeName })"
          >
            <img width="176" height="139" alt="girl" :src="route.imgName" />
            <h4 class="m-0">{{ route.label }}</h4>
          </div>
        </div>
      </div>

      <div class="col-2 flex flex-column gap-3 justify-content-center align-items-center">
        <p-btn
          label="Добавить Пользователя"
          outlined
          class="w-full border-round-lg"
          icon="pi pi-arrow-right"
          icon-pos="right"
          to="/create/user"
        />
        <p-btn
          label="Создание Группы"
          outlined
          class="w-full border-round-lg"
          icon="pi pi-arrow-right"
          icon-pos="right"
          to="/create/group"
        />
        <p-btn
          label="Создание Расписание"
          outlined
          class="w-full border-round-lg"
          icon="pi pi-arrow-right"
          icon-pos="right"
          to="/create/seminar"
        />
        <!--          <p-btn-->
        <!--            label="Создание вакансий"-->
        <!--            no-caps-->
        <!--            outlined-->
        <!--            class="text-decoration-none"-->
        <!--            icon="pi pi-arrow-right"-->
        <!--            icon-pos="right"-->
        <!--            to="/create/vacancy"-->
        <!--          />-->
        <p-btn
          label="Создание новости"
          outlined
          class="w-full border-round-lg"
          icon="pi pi-arrow-right"
          icon-pos="right"
          to="/create/news"
        />
        <p-btn
          label="Создание предмета"
          outlined
          class="w-full border-round-lg"
          icon="pi pi-arrow-right"
          icon-pos="right"
          to="/create/course"
        />
      </div>
    </div>
  </div>

  <div class="flex gap-2 routes">
    <!--      <p-btn-->
    <!--        label="Вакансий"-->
    <!--        icon="pi pi-arrow-right"-->
    <!--        icon-pos="right"-->
    <!--        color="blue-grey-7"-->
    <!--        text-color="white"-->
    <!--        padding="10px 40px"-->
    <!--      />-->
    <p-btn
      label="Новости"
      icon="pi pi-arrow-right"
      icon-pos="right"
      color="blue-grey-7"
      text-color="white"
      padding="10px 40px"
      @click="$router.push({ name: 'all.news' })"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
// import PCard from 'primevue/card'
import PBtn from 'primevue/button'
import api from '@services/api'
import { useUserStore } from '@stores/userStore'

import Girl1 from '@assets/Girl1.svg'
import Girl3 from '@assets/Girl3.svg'
import Girl2 from '@assets/Girl2.svg'

const routes = [
  {
    class: 'col-4',
    imgName: Girl2,
    routeName: 'all.users',
    label: 'Ученики',
  },
  {
    class: 'col-4',
    imgName: Girl1,
    routeName: 'all.users',
    label: 'Учителя',
  },
  {
    class: 'col-4',
    imgName: Girl3,
    routeName: 'all.seminars',
    label: 'Расписание',
  },
  {
    class: 'col-6',
    imgName: Girl1,
    routeName: 'all.group',
    label: 'Группы',
  },
  {
    class: 'col-6',
    imgName: Girl2,
    routeName: 'all.course',
    label: 'Предметы',
  },
]

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
.routes {
  padding: 1% 3%;

  div div {
    box-shadow: 0 1.850000023841858px 6.25px 0 rgba(0, 0, 0, 0.19);
  }
}

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
