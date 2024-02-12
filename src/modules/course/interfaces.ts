import { IUser } from '@/interfaces'

export interface ICourse {
  course: {
    id: number
    name: string
  }
  courseTeacherList: number[]
  teacherList: IUser[]
}

export interface ICreateCourse {
  teacherId: number
  name: string
}
