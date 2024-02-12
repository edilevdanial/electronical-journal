import { app } from '@/main'

export function success(group: string, detail?: string, life?: number) {
  app.config.globalProperties.$toast.add({ severity: 'success', group, detail, life })
}

export function info(group: string, detail?: string, life?: number) {
  app.config.globalProperties.$toast.add({ severity: 'info', group, detail, life })
}
