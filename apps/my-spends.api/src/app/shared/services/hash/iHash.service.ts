export const HASH_SERVICE = Symbol('HASH_SERVICE');

export interface IHashService {
  hash(value: string): Promise<string>;
  compare(value: string, hash: string): Promise<boolean>;
}
