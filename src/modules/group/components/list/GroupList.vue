<script setup lang="ts">
import PDataTable from 'primevue/datatable'
import PColumn from 'primevue/column'
import PBtn from 'primevue/button'
import { ref } from 'vue'
import { useGroup } from '@modules/group/composable'
import { useDialog } from 'primevue/usedialog'
import EditGroupModal from '@modules/group/components/list/EditGroupModal.vue'
import { IGroup } from '@modules/group/interfaces'
import GroupCreate from '@modules/group/components/create/GroupCreate.vue'

const { groupList, currentGroup, getCoursesOfGroup, getFreeTeachers } = useGroup()
const selectedProduct = ref<any[]>([])
const expandedRows = ref<any[]>([])
const dialog = useDialog()

function openEditModal(group: IGroup) {
  console.log(group.id)
  currentGroup.value = group
  getCoursesOfGroup(group.id)
  getFreeTeachers()
  dialog.open(EditGroupModal, {
    props: {
      modal: true,
      style: 'width: 856px',
      header: 'Изменение данных о группе',
    },
  })
}

function openCreateModal() {
  dialog.open(GroupCreate, {
    props: {
      modal: true,
      style: 'width: 856px',
      header: 'Создание группы',
    },
  })
}
</script>

<template>
  <div>
    <p-data-table
      v-model:expandedRows="expandedRows"
      v-model:selection="selectedProduct"
      :value="groupList"
      paginator
      :rows="5"
      :rows-per-page-options="[5, 10, 20, 50]"
      table-style="min-width: 50rem"
    >
      <template #header>
        <div class="flex align-items-center justify-content-between align-items-center">
          {{ groupList.length }} Групп

          <div class="flex gap-2">
            <p-btn label="Создать группу" outlined icon="pi pi-plus" @click="openCreateModal" />
          </div>
        </div>
      </template>
      <p-column selection-mode="multiple" header-style="width: 3rem" />
      <p-column field="name" header="Название" />
      <p-column field="students" header="Количество учеников">
        <template #body="{ data, field }">
          {{ data[field]?.length }}
        </template>
      </p-column>
      <p-column field="curator" header="Куратор">
        <template #body="{ data, field }">
          {{ data[field]?.lastName + ' ' + data[field]?.firstName + ' ' + data[field]?.patronymicName }}
        </template>
      </p-column>
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
