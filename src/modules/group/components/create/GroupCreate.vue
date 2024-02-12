<template>
  <div class="home">
    <div class="row justify-center">
      <div class="col-12">
        <p-input
          v-model="createGroup.info.groupName"
          class="mb-2 w-full"
          outlined
          placeholder="Название группы"
          clear-icon="fas fa-times"
          clearable
        />
      </div>

      <div class="col-12">
        <p-dropdown
          v-model="groupTeacher"
          class="mb-2 w-full"
          outlined
          :options="freeTeacherList"
          placeholder="Куратор"
          clear-icon="fas fa-times"
          clearable
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
          v-model="createGroup.selectedStudents"
          v-model:editingRows="editingRows"
          :value="createGroup.students"
          paginator
          edit-mode="row"
          data-key="id"
          :rows="5"
          :rows-per-page-options="[5, 10, 20, 50]"
          table-style="min-width: 50rem"
          @row-edit-cancel="rowEditCancel"
        >
          <template #header>
            <div class="flex justify-content-between align-items-center">
              Ученики
              <p-btn
                label="Ученик"
                :disabled="createGroup.students.length === 25"
                outlined
                icon="pi pi-plus"
                @click="addStudentToCreateGroup"
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
                @update:model-value="student => selectedStudentCreateGroup(student)"
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
      <!--      <p-message v-if="isFinish" severity="success" class="col-8">Вы успешно добавили!</p-message>-->
    </div>
    <p-btn label="Сохранить" @click="saveGroup" />
  </div>
</template>

<script setup lang="ts">
import PBtn from 'primevue/button'
import PInput from 'primevue/inputtext'
// import PMessage from 'primevue/message'
import { getFullName } from '@utils/universalFunction'
import PDropdown from 'primevue/dropdown'
import PColumn from 'primevue/column'
import PDataTable, { DataTableRowEditCancelEvent } from 'primevue/datatable'
import { useConfirm } from 'primevue/useconfirm'
import { useCreateGroup } from '@modules/group/composable/create.group'

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
      createGroup.students.splice(index, 1)
    },
  })
}

function rowEditCancel({ index }: DataTableRowEditCancelEvent) {
  createGroup.students.splice(index, 1)
  editingRows.value = []
}

const {
  freeStudentList,
  freeTeacherList,
  editingRows,
  createGroup,
  saveGroup,
  groupTeacher,
  selectedStudentCreateGroup,
  addStudentToCreateGroup,
} = useCreateGroup()
</script>
