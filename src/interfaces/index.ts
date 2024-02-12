export type TUser = 'ADMIN' | 'TEACHER' | 'STUDENT'

export interface IUser {
  id: number
  firstName: string
  lastName: string
  patronymicName: string
  phoneNumber: string
  type: TUser
  active: boolean
}

export interface IUserStoreState {
  user: IUser
}
