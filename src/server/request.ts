import defaultInstance, { AxiosCustomConfig } from './interceptors';
import { ResponseType } from './responseTypes';
import { BASE_URL } from "./api.config";
import { mergeObjects, getSearchCode } from "@/utils";
import { AxiosResponse } from 'axios';

const BASE_CONFIG: AxiosCustomConfig = {
  method: 'get',
  url: '/',
  timeout: 100000,
  baseURL: BASE_URL,
  withCredentials: false,
  headers: {
    'Content-type': 'application/x-www-form-urlencoded',
  },
};

/**
 * 请求封装
 * @param {Object} config 请求配置
 * @param {Object} data 参数
 */
const request = async <T, P>(config: AxiosCustomConfig<T>, data?: T): Promise<ResponseType<P>> => {

  const optionResult = mergeObjects(config, BASE_CONFIG);
  const { method } = config;
  if (method && method.toUpperCase() === 'GET') {
    optionResult.params = data;
  } else {
    optionResult.data = data;
  }
  const instance = defaultInstance(optionResult);
  try {
    const res: AxiosResponse<ResponseType<P>> = await instance(optionResult);
    return res.data;
  } catch (error: any) {
    // 此处把异常处理掉
    console.error(error);
    return { success: false, msg: '' };
  }
};

export default request;
