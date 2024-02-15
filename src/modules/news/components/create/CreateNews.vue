<script setup lang="ts">
import PInput from 'primevue/inputtext'
import PBtn from 'primevue/button'
import PEditor from 'primevue/editor'
import { useNews } from '@modules/news/composable'
import { inject, Ref } from 'vue'

const dialogRef = inject<Ref>('dialogRef')
const { createNewsModel, createNews } = useNews()
</script>

<template>
  <div class="p-1">
    <p-input v-model="createNewsModel.name" class="mb-2 w-full" placeholder="Название новости" />
    <div class="mb-3">
      <h3 class="m-0 mb-2">Описание новости</h3>
      <p-editor v-model="createNewsModel.description" editor-style="height: 320px" />
    </div>
    <div class="flex gap-3 justify-content-end">
      <p-btn label="Отменить" @click="dialogRef.close" />
      <p-btn outlined label="Сохранить" @click="createNews" />
    </div>
  </div>
</template>

<style scoped></style>
