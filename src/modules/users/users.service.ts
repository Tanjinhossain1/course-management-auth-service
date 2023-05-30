import { UserModel } from './users.model'
import { IUserType } from './users.interface'
import config from '../../config'
import { createUserId } from './users.utils'

export const createUserService = async (
  user: IUserType
): Promise<IUserType | null> => {
  const id = await createUserId()

  user.id = id
  if (!user.password) {
    user.password = config.default_user_password as string
  }

  const createUser = await UserModel.create(user)

  if (!createUser) {
    throw new Error('Failed Create User')
  }

  return createUser
}
