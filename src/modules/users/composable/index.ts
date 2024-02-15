import { onMounted, reactive, ref } from 'vue'
import ListUserService from '@modules/users/service'
import { IUser, TUser } from '@/interfaces'
import { ICreateUser } from '@modules/users/interfaces'
// import { useToast } from 'primevue/usetoast'
// import { usePVToast } from '@/plugins/showToastMessages'

const userList = ref<IUser[]>([])
const userType = ref<TUser>()
const isInit = ref<boolean>(false)
const userCreate = reactive<ICreateUser>({
  lastName: '',
  firstName: '',
  patronymicName: '',
  phoneNumber: '',
  type: '',
  password: '',
  email: '',
})

// const { success } = usePVToast()

export function useUserList(dialogRef?: any) {
  onMounted(() => {
    if (!isInit.value) {
      getAll()
    }
  })

  function getAll() {
    ListUserService.fetchAllUser().then(listUser => {
      console.log(listUser)
      userList.value = listUser
    })
  }

  function getByType() {
    if (!userType.value) return

    ListUserService.fetchUserByType(userType.value).then(listUser => {
      console.log(listUser)
      userList.value = listUser
    })
  }

  function saveUser() {
    if (!userCreate.phoneNumber) return

    userCreate.phoneNumber = '7' + userCreate.phoneNumber
    ListUserService.createUser(userCreate).then(response => {
      console.log(response)
      if (response.status === 201) {
        dialogRef?.close()
        userList.value.push(response.data)
      }
    })
  }

  return {
    userList,
    getByType,
    userCreate,
    saveUser,
  }
}
