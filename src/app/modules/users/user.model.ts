import mongoose, { Schema } from 'mongoose'
import { IUserType, UserModelMethod } from './user.interface'

const userSchema = new Schema<IUserType>(
  {
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

export const UserModel = mongoose.model<IUserType, UserModelMethod>(
  'Users',
  userSchema
)
