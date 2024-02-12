<template>
  <div class="home">
    <h3 class="q-mb-md">Создание Пользователя</h3>
    <div class="row justify-center">
      <div class="col-8">
        <p-input
          v-model="userCreate.firstName"
          class="mb-2"
          outlined
          placeholder="Имя"
          clear-icon="fas fa-times"
          clearable
        />
      </div>
      <div class="col-8">
        <p-input
          v-model="userCreate.lastName"
          class="mb-2"
          outlined
          placeholder="Фамилия"
          clear-icon="fas fa-times"
          clearable
        />
      </div>
      <div class="col-8">
        <p-input
          v-model="userCreate.patronymicName"
          class="mb-2"
          outlined
          placeholder="Отчество"
          clear-icon="fas fa-times"
          clearable
        />
      </div>
      <div class="col-8">
        <p-input-mask
          v-model="userCreate.phoneNumber"
          class="mb-3"
          outlined
          mask="+9(999) 999-99-99"
          type="tel"
          unmask
          clear-icon="fas fa-times"
          placeholder="Номер телефона"
          clearable
        />
      </div>
      <div class="col-8">
        <p-input
          v-model="userCreate.email"
          class="mb-2"
          outlined
          type="email"
          clear-icon="fas fa-times"
          placeholder="Электронная почта"
          clearable
        />
      </div>
      <div class="col-8 flex mb-3 gap-2">
        <div class="flex align-items-center">
          <p-radio v-model="userCreate.type" input-id="ingredient1" name="admin" value="ADMIN" />
          <label for="ingredient1" class="ml-2">Админ</label>
        </div>
        <div class="flex align-items-center">
          <p-radio v-model="userCreate.type" input-id="ingredient1" name="student" value="STUDENT" />
          <label for="ingredient1" class="ml-2">Студент</label>
        </div>

        <div class="flex align-items-center">
          <p-radio v-model="userCreate.type" input-id="ingredient1" name="teacher" value="TEACHER" />
          <label for="ingredient1" class="ml-2">Преподователь</label>
        </div>
      </div>
      <div class="col-8">
        <p-password v-model="userCreate.password" :feedback="false" toggle-mask />
      </div>
      <p-message v-if="isFinish" severity="success" class="col-8">Вы успешно добавили!</p-message>
    </div>
    <p-btn label="Отправить" @click="saveUser" />
  </div>
</template>

<script setup lang="ts">
import PBtn from 'primevue/button'
import PInput from 'primevue/inputtext'
import PInputMask from 'primevue/inputmask'
import PRadio from 'primevue/radiobutton'
import PMessage from 'primevue/message'
import PPassword from 'primevue/password'
import { useUserList } from '@modules/users/composable'

const { userCreate, saveUser, isFinish } = useUserList()
</script>
