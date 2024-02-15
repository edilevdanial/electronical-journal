<script setup lang="ts">
import PDataTable from 'primevue/datatable'
import PColumn from 'primevue/column'
import PBtn from 'primevue/button'
import PTag from 'primevue/tag'
import { useUserList } from '@modules/users/composable'
import { ref } from 'vue'
import { IUser } from '@/interfaces'
import { useDialog } from 'primevue/usedialog'
import UserCreate from '@modules/users/components/create/UserCreate.vue'

const { userList } = useUserList()
const dialog = useDialog()
const selectedUser = ref<any[]>([])

function openUser() {
  dialog.open(UserCreate, {
    props: {
      header: 'Создание пользователя',
      style: 'width:30%',
    },
  })
}

function openEditUser(user: IUser) {
  console.log(user)
  dialog.open(UserCreate, {
    props: {
      header: 'Создание пользователя',
      style: 'width:30%',
    },
  })
}
</script>

<template>
  <div>
    <p-data-table
      v-model:selection="selectedUser"
      :value="userList"
      paginator
      :rows="5"
      :rows-per-page-options="[5, 10, 20, 50]"
      table-style="min-width: 50rem"
    >
      <template #header>
        <div class="flex justify-content-between align-items-center">
          {{ userList.length }} Пользователей

          <div class="flex gap-2">
            <p-btn label="Добавить" outlined icon="pi pi-plus" @click="openUser" />
            <!--             <p-btn label="Добавить ученика"-->
            <!--             outlined icon="pi pi-plus" @click="$router.push({ name: 'create.user' })" />-->
          </div>
        </div>
      </template>
      <p-column selection-mode="multiple" header-style="width: 3rem" />
      <p-column header="ФИО">
        <template #body="{ data }">
          {{ data['lastName'] + ' ' + data['firstName'] + ' ' + data['patronymicName'] }}
        </template>
      </p-column>
      <p-column field="phoneNumber" header="Номер телефона" />
      <p-column field="email" header="Электронная почта" />
      <p-column field="type" header="Статус">
        <template #body="{ data, field }">
          <p-tag :severity="data[field] === 'STUDENT' ? 'info' : data[field] === 'TEACHER' ? 'warning' : 'primary'">
            {{ data[field] }}
          </p-tag>
        </template>
      </p-column>
      <p-column>
        <template #body="{ data }">
          <p-btn icon="pi pi-pencil" class="text-gray-900" text @click="openEditUser(data)" />
          <p-btn class="text-red-500" text icon="pi pi-trash" />
        </template>
      </p-column>
    </p-data-table>
  </div>
</template>

<style scoped></style>
