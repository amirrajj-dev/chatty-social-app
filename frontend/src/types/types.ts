
export interface IUser extends Document {
  email: string;
  password: string;
  fullname: string;
  profilePic?: string;
  gender?: "male" | "female";
  createdAt: Date;
  updatedAt: Date;
}

export interface IMessage extends Document {
  sender: IUser;
  receiver: IUser;
  content?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}