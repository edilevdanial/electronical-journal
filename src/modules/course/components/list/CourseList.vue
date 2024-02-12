<script setup lang="ts">
import { ref } from 'vue'
import PDataTable from 'primevue/datatable'
import PColumn from 'primevue/column'
import PBtn from 'primevue/button'
import { useCourse } from '@modules/course/composable'
import PTag from 'primevue/tag'
import { useDialog } from 'primevue/usedialog'
import CourseCreate from '@modules/course/components/create/CourseCreate.vue'

const { courseList, teacherList } = useCourse()
console.log(teacherList)
const selectedProduct = ref<any[]>([])
const expandedRows = ref<any[]>([])
const dialog = useDialog()

function openCreateCourse() {
  dialog.open(CourseCreate, {
    props: {
      modal: true,
      style: 'width: 856px',
      header: 'Создание предмета',
    },
  })
}
</script>

<template>
  <div>
    <p-data-table
      v-model:expandedRows="expandedRows"
      v-model:selection="selectedProduct"
      :value="courseList"
      paginator
      :rows="5"
      :rows-per-page-options="[5, 10, 20, 50]"
      table-style="min-width: 50rem"
    >
      <template #header>
        <div class="flex align-items-center justify-content-between">
          {{ courseList.length }} предметов

          <div class="flex gap-2">
            <p-btn label="Создать предмет" outlined icon="pi pi-plus" @click="openCreateCourse" />
          </div>
        </div>
      </template>
      <p-column selection-mode="multiple" header-style="width: 3rem" />

      <template #expansion="slotProps">
        <p-data-table :value="slotProps.data.teacherList" paginator :rows="5" table-style="min-width: 50rem">
          <template #header>
            <div class="flex align-items-center justify-content-between">
              {{ slotProps.data.teacherList?.length }} учителей

              <div class="flex gap-2">
                <p-btn label="Добавить учителя" outlined icon="pi pi-plus" />
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
              <p-tag>{{ data[field] }}</p-tag>
            </template>
          </p-column>
          <p-column>
            <template #body>
              <p-btn icon="pi pi-pencil" class="text-gray-900" text />
              <p-btn class="text-red-500" text icon="pi pi-trash" />
            </template>
          </p-column>
        </p-data-table>
      </template>

      <template #rowgrouptogglericon="{ expanded }">
        <i class="pi" :class="expanded ? 'pi-chevron-left' : 'pi-chevron-down'" />
      </template>
      <p-column expander style="width: 5rem" />
      <p-column field="course.name" header="Название" />
      <p-column>
        <template #body>
          <p-btn icon="pi pi-pencil" class="text-gray-900" text />
          <p-btn class="text-red-500" text icon="pi pi-trash" />
        </template>
      </p-column>
    </p-data-table>
  </div>
</template>

<style scoped></style>
