import api from '@services/api'
import { TUser } from '@/interfaces'
import { ICreateUser } from '@modules/users/interfaces'

export function fetchListUser() {
  return api.get('/api/users')
}

export function fetchUserByType(type: TUser) {
  return api.get('/api/userByType?type=' + type)
}

export function createUser(user: ICreateUser) {
  return api.post('/api/user', JSON.stringify(user))
}
