<script setup lang="ts">
import { useNews } from '@modules/news/composable'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const { fetchNewsById, currentNews } = useNews()
const route = useRoute()
onMounted(() => {
  fetchNewsById(+route.params.id)

  // fetchNewsById(route.params.id)
})
</script>

<template>
  <div>
    <h4>{{ currentNews?.name }}</h4>
    <h4>{{ currentNews?.preview }}</h4>
    <div v-html="currentNews?.description" />
  </div>
</template>

<style scoped></style>
