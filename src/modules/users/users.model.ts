import mongoose, { Model, Schema } from 'mongoose'
import { IUserType } from './users.interface'

type UserModelMethod = Model<IUserType, object>

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
  'User',
  userSchema
)
