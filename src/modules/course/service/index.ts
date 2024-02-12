import {createCourse, fetchAllCourse, fetchAllTeacherByCourse, fetchUserById} from '@modules/course/http'
import { ICreateCourse } from '@modules/course/interfaces'

class CourseService {
  public fetchAllCourse = () => {
    return fetchAllCourse().then(response => {
      console.log(response.data)

      return response.data
    })
  }

  public fetchUserById = (userId: number) => {
    return fetchUserById(userId).then(response => {
      console.log(response.data)

      return response.data
    })
  }

  public saveCourse = (newCourse: ICreateCourse) => {
    return createCourse(newCourse).then(response => {
      console.log(response.data)

      return response.data
    })
  }

  public fetchAllTeacher = () => {
    return fetchAllTeacherByCourse().then(response => {
      console.log(response.data)

      return response.data
    })
  }
}

export default new CourseService()
