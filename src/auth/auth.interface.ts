export type TRole = "contributor" | "maintainer";

export interface IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  role: TRole;
  created_at?: Date;
  updated_at?: Date;
}
export interface ILogin{
   email:string,
   password:string
}