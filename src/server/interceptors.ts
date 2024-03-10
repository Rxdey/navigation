import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ResponseType } from './responseTypes';
import qs from 'qs';

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

/**
 * jsonp请求
 * @param url
 * @param obj
 * @returns
 */
export const jsonp = <T>(url: string, obj: ActionType): Promise<T> => {
  const data = qs.stringify(obj);
  return new Promise((resolve, reject) => {
    window.jsonCallBack = (result: T) => {
      resolve(result);
    };
    const JSONP = document.createElement('script');
    JSONP.type = 'text/javascript';
    JSONP.src = `${url}?${data}&cb=jsonCallBack`;
    document.getElementsByTagName('head')[0].appendChild(JSONP);
    JSONP.onerror = (e) => {
      reject(e);
    };
    setTimeout(() => {
      document.getElementsByTagName('head')[0].removeChild(JSONP);
    }, 500);
  });
};
export default defaultInstance;
