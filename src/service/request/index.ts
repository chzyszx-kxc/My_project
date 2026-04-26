import axios from "axios";
import type { AxiosResponse, AxiosInstance } from "axios";
import { MyRequestConfig, MyRequestInterceptor } from "./type";


class MyRequest {
  instance: AxiosInstance;
  MyReuestInterceptor?: MyRequestInterceptor

  constructor(config: MyRequestConfig) {
    this.instance = axios.create(config);
    this.MyReuestInterceptor = config.MyRequsetInterceptor

    this.instance.interceptors.request.use(
      this.MyReuestInterceptor?.MyRequestInterceprtUseFunction,
      this.MyReuestInterceptor?.MyRequestInterceprtUseReject
    )
    this.instance.interceptors.response.use(
      this.MyReuestInterceptor?.MyResponseInterceptorUseFunction,
      this.MyReuestInterceptor?.MyResponseInterceptorReject
    )
  }

    request(config: MyRequestConfig) {
      return new Promise((resolve, reject) => {

      })
    }
}

export default MyRequest;