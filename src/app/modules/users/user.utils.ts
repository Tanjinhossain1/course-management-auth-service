import { UserModel } from './user.model'

export const findLastUserId = async () => {
  const lastUser = await UserModel.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()

  return lastUser?.id
}

export const createUserId = async () => {
  const userId = (await findLastUserId()) || (0).toString().padStart(5, '0')
  // increment id by 1
  const incrementUserId = (parseInt(userId) + 1).toString().padStart(5, '0')
  return incrementUserId
}
