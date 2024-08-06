export const JWT_SERVICE = Symbol('JWT_SERVICE');

export interface IJwtService {
  sign(payload: any): Promise<string>;
  verify(token: string): Promise<any>;
}
