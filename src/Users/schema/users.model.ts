import { Schema, Document } from 'mongoose';

export interface User extends Document {
  
  firstName: string;
  lastName: string;
  mobileNo: string;
  email: string;
  password: string;
}

export const UserSchema = new Schema<User>(
  {
    
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    mobileNo: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);