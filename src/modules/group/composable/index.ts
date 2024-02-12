import { onMounted, ref } from 'vue'
import GroupService from '@modules/group/service'
import { IGroup } from '@modules/group/interfaces'
import { IUser } from '@/interfaces'

const groupList = ref<IGroup[]>([])
const freeStudentList = ref<IUser[]>([])
const freeTeacherList = ref<IUser[]>([])
const isCallInMount = ref<boolean>(false)
const currentGroup = ref<IGroup | null>(null)
const editingRows = ref<any[]>([])

export function useGroup() {
  function getCurator(curatorId: number) {
    return GroupService.fetchUserById(curatorId).then(curator => {
      console.log(curator)
      return curator
    })
  }

  function getStudent(groupId: number) {
    return GroupService.fetchStudentByGroupId(groupId).then(studentList => {
      console.log(studentList)
      return studentList
    })
  }

  function getAll() {
    GroupService.fetchAllGroup().then(listUser => {
      console.log(listUser)
      groupList.value = listUser

      groupList.value.forEach(async group => {
        group.curator = await getCurator(group.teacherId)
        group.students = await getStudent(group.id)
      })
    })
  }

  onMounted(() => {
    if (!isCallInMount.value) {
      getAll()
    }
  })

  function getCoursesOfGroup(groupId: number) {
    GroupService.fetchCoursesOfGroup(groupId).then(courseList => {
      console.log(courseList)
      if (!currentGroup.value) return

      currentGroup.value.courses = courseList
    })
  }

  function getFreeStudents() {
    return GroupService.fetchFreeStudents().then(freeStudents => {
      console.log(freeStudents)
      return freeStudents
    })
  }

  async function addStudentToGroup() {
    if (!currentGroup.value) return
    freeStudentList.value = await getFreeStudents()
    currentGroup.value?.students.push({
      id: -1,
      firstName: '',
      lastName: '',
      active: true,
      patronymicName: '',
      phoneNumber: '',
      type: 'STUDENT',
    })

    editingRows.value.push(currentGroup.value.students[currentGroup.value.students.length - 1])
  }

  function selectedStudent(student: IUser) {
    if (!currentGroup.value) return

    currentGroup.value.students[currentGroup.value.students.length - 1] = student

    GroupService.saveStudentToGroup({ groupId: currentGroup.value.id, studentId: student.id }).then()
  }

  function deleteStudentFromGroup(index: number) {
    if (!currentGroup.value) return
    return GroupService.deleteStudentFromGroup(currentGroup.value.students[index].id)
  }

  function getFreeTeachers() {
    GroupService.fetchFreeTeachers().then(freeTeachers => {
      console.log(freeTeacherList)
      freeTeacherList.value = [...freeTeachers, currentGroup.value?.curator]
    })
  }

  return {
    groupList,
    addStudentToGroup,
    currentGroup,
    getFreeStudents,
    getCoursesOfGroup,
    editingRows,
    freeStudentList,
    selectedStudent,
    deleteStudentFromGroup,
    getFreeTeachers,
    freeTeacherList,
  }
}
