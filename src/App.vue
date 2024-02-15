<script setup lang="ts">
import PDynamicDialog from 'primevue/dynamicdialog'
import PConfirmPopup from 'primevue/confirmpopup'
import PToast from 'primevue/toast'
</script>

<template>
  <div class="app_layout">
    <div class="app_layout_header">
      <router-view name="header" />
    </div>
    <p-dynamic-dialog />
    <p-toast position="top-right" />
    <p-confirm-popup />
    <router-view />
  </div>
</template>

<style scoped lang="scss">
.app_layout {
  background-color: rgba(248, 250, 252, 1);
  border-radius: 20px;
  padding: 30px 20px;

  &_header {
    margin-bottom: 20px;
  }
}
</style>
