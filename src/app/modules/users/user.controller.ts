import { RequestHandler } from 'express'
import { createUserService } from './user.service'

export const createUserController: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body

    const result = await createUserService(user)

    res.status(200).json({
      success: true,
      message: 'User Create SuccessFully ',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}
