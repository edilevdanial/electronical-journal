<template>
  <div class="home">
    <div class="mb-2 p-2">
      <p-input
        v-model="newCourse.name"
        class="mb-3 w-full"
        outlined
        placeholder="Название предмета"
        clear-icon="fas fa-times"
        clearable
      />

      <p-dropdown
        v-model="courseTeacher"
        class="mb-2 w-full"
        outlined
        :options="allTeacherByCourse"
        placeholder="Выберите учителя"
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

      <!--      <p-message v-if="isFinish" severity="success" class="col-8">Вы успешно добавили!</p-message>-->
    </div>
    <p-btn label="Сохранить" class="w-full" @click="saveCourse" />
  </div>
</template>

<script setup lang="ts">
import PBtn from 'primevue/button'
import PInput from 'primevue/inputtext'
// import PMessage from 'primevue/message'
import { getFullName } from '@utils/universalFunction'
import PDropdown from 'primevue/dropdown'
import { useCourse } from '@modules/course/composable'
import { onMounted } from 'vue'

const { saveCourse, getAllTeacherByCourse, allTeacherByCourse, newCourse, courseTeacher } = useCourse()

onMounted(() => {
  getAllTeacherByCourse()
})
</script>
