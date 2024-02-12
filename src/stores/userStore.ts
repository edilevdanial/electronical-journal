import { defineStore } from 'pinia'
import { IUser, IUserStoreState } from '@/interfaces'

export const useUserStore = defineStore('user', {
  state: (): IUserStoreState => ({
    user: {
      id: '',
      firstName: '',
      lastName: '',
      patronymicName: '',
      phoneNumber: '',
      type: '',
      active: false
    },
  }),

  actions: {
    setUser(user: IUser) {
      this.user = user
    },
  },
})
