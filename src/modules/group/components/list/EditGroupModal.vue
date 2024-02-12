<script setup lang="ts">
import PInput from 'primevue/inputtext'
import PBtn from 'primevue/button'
import PDropdown from 'primevue/dropdown'
import PColumn from 'primevue/column'
import PDataTable, { DataTableRowEditCancelEvent } from 'primevue/datatable'
import { useGroup } from '@modules/group/composable'
import { getFullName } from '@utils/universalFunction'
import { useConfirm } from 'primevue/useconfirm'
import { info, success } from '@/plugins/showToastMessages'

const {
  currentGroup,
  addStudentToGroup,
  freeTeacherList,
  editingRows,
  freeStudentList,
  selectedStudent,
  deleteStudentFromGroup,
} = useGroup()

const confirm = useConfirm()

function deleteStudent(event: any, index: number) {
  confirm.require({
    target: event.currentTarget,
    message: 'Вы точно хотите удалить студента?',
    icon: 'pi pi-info-circle',
    rejectClass: 'p-button-secondary p-button-outlined p-button-sm',
    acceptClass: 'p-button-danger p-button-sm',
    rejectLabel: 'Отменить',
    acceptLabel: 'Удалить',
    accept: () => {
      deleteStudentFromGroup(index).then(response => {
        console.log(response.status)
        if (response.status === 200) {
          console.log('yes')
          success('Подтверждено', 'Студент удалён из группы')
        } else {
          info('Подтверждено', 'Студент удалён из группы')
        }
      })
    },
  })
}

function onRowEditCancel({ index }: DataTableRowEditCancelEvent) {
  currentGroup.value?.students.splice(index, 1)
  editingRows.value = []
}
</script>

<template>
  <div v-if="currentGroup" class="p-1">
    <p-input v-model="currentGroup.name" class="mb-2 w-full" placeholder="Название группы" />
    <div class="mb-4">
      <h3>Информация о кураторе</h3>
      <p-dropdown
        v-model="currentGroup.curator"
        :options="freeTeacherList"
        class="w-full"
        option-label="firstName"
        placeholder="Куратор"
      >
        <template #option="{ option }">
          {{ getFullName(option) }}
        </template>

        <template #value="slotProps">
          <div v-if="slotProps.value" class="flex align-items-center">
            <div>{{ getFullName(slotProps.value) }}</div>
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
      </p-dropdown>
    </div>

    <div class="m-2">
      <p-data-table
        v-model:editingRows="editingRows"
        :value="currentGroup.students"
        paginator
        edit-mode="row"
        data-key="id"
        :rows="5"
        :rows-per-page-options="[5, 10, 20, 50]"
        table-style="min-width: 50rem"
        @row-edit-cancel="onRowEditCancel"
      >
        <template #header>
          <div class="flex justify-content-between align-items-center">
            Ученики
            <p-btn
              label="Ученик"
              :disabled="currentGroup.students.length === 25"
              outlined
              icon="pi pi-plus"
              @click="addStudentToGroup"
            />
          </div>
        </template>
        <p-column header="ФИО">
          <template #body="{ data }">
            {{ getFullName(data) }}
          </template>

          <template #editor>
            <p-dropdown
              class="w-full"
              placeholder="Выберите студента"
              :options="freeStudentList"
              @update:model-value="student => selectedStudent(student)"
            >
              <template #option="{ option }">
                {{ getFullName(option) }}
              </template>

              <template #value="slotProps">
                <div v-if="slotProps.value" class="flex align-items-center">
                  <div>{{ getFullName(slotProps.value) }}</div>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
            </p-dropdown>
          </template>
        </p-column>

        <p-column :row-editor="true" style="width: 10%; min-width: 8rem" body-style="text-align:center" />
        <p-column>
          <template #body="{ index }">
            <p-btn class="text-red-500" text icon="pi pi-trash" @click="deleteStudent($event, index)" />
          </template>
        </p-column>
      </p-data-table>
    </div>

    <p-data-table
      :value="currentGroup.courses"
      paginator
      :rows="5"
      :rows-per-page-options="[5, 10, 20, 50]"
      table-style="min-width: 50rem"
    >
      <template #header>
        <div class="flex align-items-center justify-content-between">
          {{ currentGroup.courses?.length }} предметов

          <div class="flex gap-2">
            <p-btn
              label="Добавить предмет"
              outlined
              icon="pi pi-plus"
              @click="$router.push({ name: 'create.course' })"
            />
          </div>
        </div>
      </template>
      <!--      <p-column selection-mode="multiple" header-style="width: 3rem" />-->

      <!--      <template #expansion="slotProps">-->
      <!--        <p-data-table :value="slotProps.data.teacherList" paginator 
                                                                           :rows="5" table-style="min-width: 50rem">-->
      <!--          <template #header>-->
      <!--            <div class="flex align-items-center justify-content-between">-->
      <!--              {{ slotProps.data.teacherList?.length }} учителей-->
      <!--            </div>-->
      <!--          </template>-->
      <!--          <p-column selection-mode="multiple" header-style="width: 3rem" />-->
      <!--          <p-column header="ФИО">-->
      <!--            <template #body="{ data }">-->
      <!--              {{ data['lastName'] + ' ' + data['firstName'] + ' ' + data['patronymicName'] }}-->
      <!--            </template>-->
      <!--          </p-column>-->
      <!--          <p-column field="phoneNumber" header="Номер телефона" />-->
      <!--          <p-column field="email" header="Электронная почта" />-->
      <!--          <p-column field="type" header="Статус">-->
      <!--            <template #body="{ data, field }">-->
      <!--              <p-tag>{{ data[field] }}</p-tag>-->
      <!--            </template>-->
      <!--          </p-column>-->
      <!--          <p-column>-->
      <!--            <template #body>-->
      <!--              <p-btn icon="pi pi-pencil" class="text-gray-900" text />-->
      <!--              <p-btn class="text-red-500" text icon="pi pi-trash" />-->
      <!--            </template>-->
      <!--          </p-column>-->
      <!--        </p-data-table>-->
      <!--      </template>-->

      <p-column field="name" header="Название" />
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
