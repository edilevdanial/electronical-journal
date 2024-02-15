<script setup lang="ts">
import PInput from 'primevue/inputtext'
import PBtn from 'primevue/button'
import PEditor from 'primevue/editor'
import { inject, Ref } from 'vue'
import { useNews } from '@modules/news/composable'

const dialogRef = inject<Ref>('dialogRef')
const { currentNews, updateNewsById } = useNews()
</script>

<template>
  <div v-if="currentNews" class="p-1">
    <p-input v-model="currentNews.name" class="mb-2 w-full" placeholder="Название новости" />
    <p-input v-model="currentNews.preview" class="mb-2 w-full" placeholder="Название новости" />
    <div class="mb-3">
      <h3 class="m-0 mb-2">Описание новости</h3>
      <p-editor v-model="currentNews.description" editor-style="height: 320px" />
    </div>
    <div class="flex gap-3 justify-content-end">
      <p-btn label="Отменить" @click="dialogRef.close" />
      <p-btn outlined label="Сохранить" @click="updateNewsById" />
    </div>
  </div>
</template>

<style scoped></style>