import { createUser, fetchListUser, fetchUserByType } from '@modules/users/http'
import { TUser } from '@/interfaces'
import { ICreateUser } from '@modules/users/interfaces'

class UserListService {
  public fetchAllUser = () => {
    return fetchListUser().then(response => {
      console.log(response.data)

      return response.data
    })
  }

  public fetchUserByType = (typeUser: TUser) => {
    return fetchUserByType(typeUser).then(response => {
      console.log(response.data)

      return response.data
    })
  }

  public createUser = (user: ICreateUser) => {
    return createUser(user).then(response => {
      console.log(response.data)

      return response
    })
  }
}

export default new UserListService()
