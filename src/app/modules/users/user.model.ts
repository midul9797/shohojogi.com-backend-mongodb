import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import config from '../../../config';
import bcrypt from 'bcrypt';
const userSchema = new Schema<IUser>(
  {
    contactNo: {
      type: String,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['admin', 'customer'],
    },
    password: {
      type: String,
      required: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },

    address: {
      house: { type: String },
      block: { type: String },
      ward: { type: String },
      road: { type: String },
      zip: { type: String },
      city: { type: String },
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profileImg: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

userSchema.statics.isUserExist = async function (
  value: string,
  field: string
): Promise<Partial<IUser> | null> {
  return await User.findOne(
    { [field]: value },
    { _id: 1, password: 1, role: 1, contactNo: 1 }
  );
};

userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};
const User = model<IUser, UserModel>('User', userSchema);
export default User;
