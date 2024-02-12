import { IUser } from '@/interfaces'

export function getFullName(user: IUser) {
  return user.lastName + ' ' + user.firstName + ' ' + user.patronymicName
}
