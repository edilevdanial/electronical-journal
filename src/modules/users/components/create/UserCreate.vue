<template>
  <div class="home">
    <div class="pt-1 pb-3">
      <p-input
        v-model="userCreate.firstName"
        class="col-12 mb-2"
        outlined
        placeholder="Имя"
        clear-icon="fas fa-times"
        clearable
      />
      <p-input
        v-model="userCreate.lastName"
        class="col-12 mb-2"
        outlined
        placeholder="Фамилия"
        clear-icon="fas fa-times"
        clearable
      />
      <p-input
        v-model="userCreate.patronymicName"
        class="col-12 mb-2"
        outlined
        placeholder="Отчество"
        clear-icon="fas fa-times"
        clearable
      />
      <p-input-mask
        v-model="userCreate.phoneNumber"
        class="col-12 mb-2"
        outlined
        mask="+7(999) 999-99-99"
        type="tel"
        unmask
        clear-icon="fas fa-times"
        placeholder="Номер телефона"
        clearable
      />
      <p-input
        v-model="userCreate.email"
        class="col-12 mb-3"
        outlined
        type="email"
        clear-icon="fas fa-times"
        placeholder="Электронная почта"
        clearable
      />
      <div class="flex mb-3 gap-2">
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
      <p-password
        v-model="userCreate.password"
        placeholder="Пароль"
        class="w-full"
        input-class="w-full"
        :feedback="false"
        toggle-mask
      />
    </div>
    <div class="flex gap-3 justify-content-end">
      <p-btn label="Отменить" outlined @click="dialogRef.close()" />
      <p-btn label="Сохранить" @click="saveUser" />
    </div>
  </div>
</template>

<script setup lang="ts">
import PBtn from 'primevue/button'
import PInput from 'primevue/inputtext'
import PInputMask from 'primevue/inputmask'
import PRadio from 'primevue/radiobutton'
import PPassword from 'primevue/password'
import { useUserList } from '@modules/users/composable'
import { inject, Ref } from 'vue'

const dialogRef = inject<Ref>('dialogRef')

const { userCreate, saveUser } = useUserList(dialogRef?.value)
</script>
