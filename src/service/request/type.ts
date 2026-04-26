
import type { AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse} from "axios";

export interface MyRequestInterceptor<T = InternalAxiosRequestConfig, R = AxiosResponse > {
  MyRequestInterceprtUseFunction?: ( config: T ) => T | Promise<T>;
  MyRequestInterceprtUseReject?: ( error: any ) => any;
  MyResponseInterceptorUseFunction?: ( config: R) => R | Promise<R>;
  MyResponseInterceptorReject?: ( error: any ) => any;
}

// 定一个 `extend` 于 AxiosRequestConfig 的扩展接口
export interface MyRequestConfig extends AxiosRequestConfig {
  // 这里是自定义的扩展类型
  MyRequsetInterceptor?: MyRequestInterceptor;
}