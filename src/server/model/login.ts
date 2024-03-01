import request from '../request';
import { ResponseType } from '../responseTypes';

export type LoginParams = {
    userCode: string;
    password: string;
    verifyCode: string;
};
type LoginResponse = {
    token?: string;
    userId?: string;
};
export const Login = (params: LoginParams): Promise<ResponseType<LoginResponse>> =>
    request(
        {
            url: '/login/login',
            method: 'post',
        },
        params
    );