import { Knex } from 'knex';

declare module 'knex/types/tables' {
  interface Tables {
    users: {
      id: string;
      name: string;
      email: string;
      password: string;
      createdAt: Date;
      updatedAt: Date;
    };
  }
}
