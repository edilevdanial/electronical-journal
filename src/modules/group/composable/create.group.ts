import { IUser } from '@/interfaces'
import { reactive, ref, watch, onMounted } from 'vue'
import GroupService from '@modules/group/service'
import { ICreateGroup } from '@modules/group/interfaces'
import { useGroup } from '@modules/group/composable/index'

const createGroup = reactive<ICreateGroup>({
  info: {
    groupName: '',
    teacherId: -1,
  },
  students: [],
  selectedStudents: [],
})
const editingRows = ref<any[]>([])

const freeTeacherList = ref<IUser[]>([])
const freeStudentList = ref<IUser[]>([])

const groupTeacher = ref<IUser>()
const { getFreeStudents } = useGroup()

export function useCreateGroup() {
  async function addStudentToCreateGroup() {
    freeStudentList.value = await getFreeStudents()
    createGroup.students.push({
      id: -1,
      firstName: '',
      lastName: '',
      active: true,
      patronymicName: '',
      phoneNumber: '',
      type: 'STUDENT',
    })

    editingRows.value.push(createGroup.students[createGroup.students.length - 1])
  }

  function selectedStudentCreateGroup(student: IUser) {
    createGroup.students[createGroup.students.length - 1] = student
  }

  watch(groupTeacher, newValue => {
    if (!newValue) return

    createGroup.info.teacherId = newValue.id
  })

  function getFreeTeachers() {
    GroupService.fetchFreeTeachers().then(freeTeachers => {
      console.log(freeTeacherList)
      freeTeacherList.value = freeTeachers
    })
  }

  function saveGroup() {
    return GroupService.saveGroup(createGroup)
  }

  onMounted(() => {
    getFreeTeachers()
  })

  return {
    getFreeTeachers,
    saveGroup,
    selectedStudentCreateGroup,
    addStudentToCreateGroup,
    getFreeStudents,
    freeTeacherList,
    freeStudentList,
    editingRows,
    createGroup,
    groupTeacher,
  }
}
