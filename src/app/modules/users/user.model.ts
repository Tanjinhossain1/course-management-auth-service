import mongoose, { Schema } from 'mongoose';
import { IUserMethod, IUserType, UserModelMethod } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../../config';

const userSchema = new Schema<IUserType, Record<string, never>, IUserMethod>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    needPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangeAt: {
      type: Date,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.statics.isUserExist = async function (
  id: string
): Promise<Pick<
  IUserType,
  'id' | 'password' | 'role' | 'needPasswordChange'
> | null> {
  return await UserModel.findOne(
    { id },
    { id: 1, password: 1, role: 1, needsPasswordChange: 1 }
  );
};

// userSchema.methods.isUserExist = async function (id:string): Promise<Partial<IUserType | null> > {
//   const user = await UserModel.findOne({id},{id: 1,password: 1,role: 1, needPasswordChange: 1});

//   return user;
// }
userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

// userSchema.methods.isPasswordMatched = async function (givenPassword:string, savePassword: string): Promise<boolean> {
//   const isPasswordMatch = await bcrypt.compare(givenPassword,savePassword)

//   return isPasswordMatch;
// }

userSchema.pre('save', async function (next) {
  // hashing user password
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

export const UserModel = mongoose.model<IUserType, UserModelMethod>(
  'MyUsers',
  userSchema
);
