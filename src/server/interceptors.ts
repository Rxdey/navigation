import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ResponseType } from './responseTypes';

axios.defaults.withCredentials = true;

export type ActionType = {
  [key: string]: string
}

export interface AxiosCustomConfig<D = any> extends AxiosRequestConfig<D> {
  type?: string
}

const defaultInstance = <D>(config: AxiosCustomConfig<D>) => {
  const instance: AxiosInstance = axios.create(config);
  instance.interceptors.request.use((request: InternalAxiosRequestConfig<AxiosCustomConfig<D>>) => {
    // request.headers['token'] = Cookies.get('token');
    return request;
  });

  instance.interceptors.response.use((response: AxiosResponse<ResponseType<any>, AxiosCustomConfig<D>>) => response, (error) => {
    const status: number = error.request ? error.request.status : 0;
    const action: Record<string, string> = {
      404: '找不到请求地址',
      500: '服务器异常',
      504: '请求超时',
      401: '登录认证过期或失败，请重新登录'
    };
    console.error(`接口:${error.config.url}  异常 --- ${error.message} status: ${status}`);
    // showToast(`ERROR: ${status} - ${action[status] || '系统异常'} >_<`);
    return error;
  });
  return instance;
};

export default defaultInstance;
