import { UserModel } from './user.model'
import { IUserType } from './user.interface'
import { createUserId } from './user.utils'
import config from '../../../config'

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