export const JWT_SERVICE = Symbol('JWT_SERVICE');

export type VerifyOptions = {
  secret: string;
};

export interface IJwtService {
  sign(payload: any): Promise<string>;
  verify(token: string, options?: VerifyOptions): Promise<any>;
}
