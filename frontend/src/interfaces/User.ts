export interface User {
  id?: number;
  name: string;
  email: string;
}

export interface CreateUserDto extends User {
  password: string;
}
