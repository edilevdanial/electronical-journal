import api from '@services/api'
import { ICreateCourse } from '@modules/course/interfaces'

export function fetchAllCourse() {
  return api.get('/api/course/all')
}

export function fetchUserById(userId: number) {
  return api.get('/api/user/' + userId)
}

export function fetchAllTeacherByCourse() {
  return api.get('/api/course/all/teacher')
}

export function createCourse(newCourse: ICreateCourse) {
  return api.post(
    '/api/course/create',
    {},
    {
      params: newCourse,
    },
  )
}
