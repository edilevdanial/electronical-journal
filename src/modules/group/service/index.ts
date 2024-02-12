import {
  deleteStudentFromGroup,
  fetchAllGroup,
  fetchCoursesOfGroup,
  fetchFreeStudents,
  fetchFreeTeachers,
  fetchStudentByGroupId,
  fetchUserById,
  saveGroup,
  saveStudentToGroup,
} from '@modules/group/http'
import { ICreateGroup, ISaveStudent } from '@modules/group/interfaces'

class GroupService {
  public fetchAllGroup = () => {
    return fetchAllGroup().then(response => {
      console.log(response.data)

      return response.data
    })
  }

  public fetchFreeTeachers = () => {
    return fetchFreeTeachers().then(response => {
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

  public fetchStudentByGroupId = (groupId: number) => {
    return fetchStudentByGroupId(groupId).then(response => {
      console.log(response.data)

      return response.data
    })
  }

  public fetchFreeStudents = () => {
    return fetchFreeStudents().then(response => {
      console.log(response.data)

      return response.data
    })
  }

  public fetchCoursesOfGroup = (groupId: number) => {
    return fetchCoursesOfGroup(groupId).then(response => {
      console.log(response.data)

      return response.data
    })
  }

  public saveStudentToGroup = (saveStudent: ISaveStudent) => {
    return saveStudentToGroup([saveStudent]).then(response => {
      console.log(response.data)

      return response.data
    })
  }

  public deleteStudentFromGroup = (studentId: number) => {
    return deleteStudentFromGroup(studentId).then(response => {
      console.log(response.data)

      return response
    })
  }

  public saveGroup = (group: ICreateGroup) => {
    return saveGroup(group).then(response => {
      console.log(response.data)
      const groupId = response.data.id

      group.students.forEach(student => {
        this.saveStudentToGroup({ groupId, studentId: student.id })
      })
    })
  }
}

export default new GroupService()
