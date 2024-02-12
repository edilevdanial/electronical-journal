import api from '@services/api'
import { ICreateGroup, ISaveStudent } from '@modules/group/interfaces'

export function fetchAllGroup() {
  return api.get('/api/all/group')
}

export function fetchUserById(userId: number) {
  return api.get('/api/user/' + userId)
}

export function fetchStudentByGroupId(groupId: number) {
  return api.get('/api/student/group', { params: { groupId } })
}

export function fetchFreeStudents() {
  return api.get('/api/get-all-free-student')
}

export function fetchCoursesOfGroup(groupId: number) {
  return api.get('/api/group-course/' + groupId)
}

export function saveStudentToGroup(saveStudentToGroup: ISaveStudent[]) {
  return api.post('/api/add/student', JSON.stringify(saveStudentToGroup))
}

export function deleteStudentFromGroup(studentId: number) {
  return api.delete('/api/delete-from-group/' + studentId)
}

export function saveGroup(group: ICreateGroup) {
  return api.post('/api/create-group', {}, { params: group.info })
}

export function fetchFreeTeachers() {
  return api.get('/api/teachers-all-free')
}
