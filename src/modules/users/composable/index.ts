import { onMounted, reactive, ref } from 'vue'
import ListUserService from '@modules/users/service'
import { IUser, TUser } from '@/interfaces'
import { ICreateUser } from '@modules/users/interfaces'

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
const isFinish = ref<boolean>(false)

export function useUserList() {
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
    userCreate.phoneNumber = '7' + userCreate.phoneNumber
    ListUserService.createUser(userCreate).then(response => {
      console.log(response)
      if (response.status === 201) {
        isFinish.value = true
      }
    })
  }

  return {
    isFinish,
    userList,
    getByType,
    userCreate,
    saveUser,
  }
}
