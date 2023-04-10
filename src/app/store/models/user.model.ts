export interface IUser {
  [key: string]: User;
}
export interface User {
  id: string;
  name: string;
  avatarURL: string;
  answers: { [key: string]: string };
  questions: string[];
}
