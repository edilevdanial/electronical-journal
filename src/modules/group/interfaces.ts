import { IUser } from '@/interfaces'
import { ICourse } from '@modules/course/interfaces'

export interface IGroup {
  id: number
  name: string
  teacherId: number
  students: IUser[]
  curator: IUser
  courses?: ICourse[]
}

export interface ISaveStudent {
  groupId: number
  studentId: number
}

export interface ICreateGroup {
  info: {
    teacherId: number | IUser
    groupName: string
  }
  students: IUser[]
  selectedStudents: IUser[]
}
