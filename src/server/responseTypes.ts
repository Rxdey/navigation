/** 接口返回数据 */
export interface ResponseType<T> {
    data?: T,
    msg?: string,
    success?: boolean,
}