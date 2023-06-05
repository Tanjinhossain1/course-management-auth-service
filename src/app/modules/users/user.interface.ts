import { Model } from 'mongoose'

export type IUserType = {
  id: string
  password: string
  role: string

  // createdDate
  // updateDate
  // studentId || adminId || facultyId
}

export type UserModelMethod = Model<IUserType, Record<string, unknown>>
