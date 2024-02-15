<script setup lang="ts">
import PDataTable from 'primevue/datatable'
import PColumn from 'primevue/column'
import PBtn from 'primevue/button'
import { defineAsyncComponent, ref } from 'vue'
import { useDialog } from 'primevue/usedialog'
import { useNews } from '@modules/news/composable'
import { INews } from '@modules/news/interfaces'
import { router } from '@router/main'

const EditNewsModal = defineAsyncComponent(() => import('@modules/news/components/list/EditNewsModal.vue'))
const CreateNews = defineAsyncComponent(() => import('@modules/news/components/create/CreateNews.vue'))

const { newsList, currentNews } = useNews()
const selectedProduct = ref<any[]>([])
const expandedRows = ref<any[]>([])
const dialog = useDialog()

function openEditModal(news: INews) {
  currentNews.value = news
  dialog.open(EditNewsModal, {
    props: {
      modal: true,
      style: 'width: 856px',
      header: 'Изменение новости',
    },
  })
}

function openCreateModal() {
  dialog.open(CreateNews, {
    props: {
      modal: true,
      style: 'width: 856px',
      header: 'Создание новости',
    },
  })
}

function openNews({ data }: any) {
  router.push({ name: 'get.news', params: { id: data['id'] } })
}
</script>

<template>
  <div>
    <p-data-table
      v-model:expandedRows="expandedRows"
      v-model:selection="selectedProduct"
      :value="newsList"
      paginator
      :rows="5"
      :rows-per-page-options="[5, 10, 20, 50]"
      table-style="min-width: 50rem"
      @row-dblclick="openNews"
    >
      <template #header>
        <div class="flex align-items-center justify-content-between align-items-center">
          {{ newsList.length }} новости

          <div class="flex gap-2">
            <p-btn label="Создать новость" outlined icon="pi pi-plus" @click="openCreateModal" />
          </div>
        </div>
      </template>
      <p-column field="name" header="Название" />
      <p-column>
        <template #body="{ data }">
          <p-btn icon="pi pi-pencil" class="text-gray-900" text @click="openEditModal(data)" />
          <p-btn class="text-red-500" text icon="pi pi-trash" />
        </template>
      </p-column>
    </p-data-table>
  </div>
</template>

<style scoped></style>
