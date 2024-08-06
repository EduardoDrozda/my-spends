export type User = {
  id: string;
  name: string;
  email: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserCreateInput = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

export type UserInput = Omit<User, 'password'>;
