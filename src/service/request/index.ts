import axios from "axios";
import type { AxiosResponse, AxiosInstance } from "axios";
import { MyRequestConfig, MyRequestInterceptor } from "./type";
import { ElLoading } from 'element-plus'

const DEFAULT_LOADING = true;

class MyRequest {
  instance: AxiosInstance;
  MyReuestInterceptor?: MyRequestInterceptor
  showLoading?: boolean
  loading?: any // element-plus模块loading组件实例

  constructor(config: MyRequestConfig) {
    this.instance = axios.create(config);
    this.MyReuestInterceptor = config.MyRequsetInterceptor
    this.showLoading = config.showLoading === undefined ? DEFAULT_LOADING : config.showLoading;

    this.instance.interceptors.request.use(
      this.MyReuestInterceptor?.MyRequestInterceprtUseFunction,
      this.MyReuestInterceptor?.MyRequestInterceprtUseReject
    )
    this.instance.interceptors.response.use(
      this.MyReuestInterceptor?.MyResponseInterceptorUseFunction,
      this.MyReuestInterceptor?.MyResponseInterceptorReject
    )

    this.instance.interceptors.request.use(
      (config) => {
        console.log('通用拦截器生效，请求成功拦截')
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: 'My_Custom_Loading...',
            background: 'rgba(0, 0, 0, 0.2)',
            fullscreen: true
          })
        }
        return config;
      },
      (err) => {
        console.log('通用拦截器生效，请求拦截失败');
        return;
      }
    )

    this.instance.interceptors.response.use((res) => {
      console.log('通用拦截器生效，响应成功拦截')
      this.loading?.close()
      return res.data
      },
      (err) => {
        this.loading?.close() // 将loading移除
        if (err.response.status === 404) {
          console.log('404错误')
        }
        return err
      }
    )
  }

  request(config: MyRequestConfig): Promise<any> {
    return new Promise((resolve, reject) => {
        // 判断某个请求是否需要显示loading
        if (config.showLoading === false) {
          this.showLoading = config.showLoading;
        }
        this.instance.request(config)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err)
            return err
          })
          .finally(() => {
            // 将showLoading设置为true，如此便不会影响下一个请求
            this.showLoading = DEFAULT_LOADING
          })
    }).then((res) => {
      console.log('服务器回传部分内容：', res);
    })
  }

  get(config: MyRequestConfig): Promise<any> {
    return this.request({...config, method: 'GET'})
  }
  post(config: MyRequestConfig): Promise<any> {
    return this.request({...config, method: 'POST'})
  }
  delete(config: MyRequestConfig): Promise<any> {
    return this.request({...config, method: 'DELETE'})
  }
  patch(config: MyRequestConfig): Promise<any> {
    return this.request({...config, method: 'patch'})
  }
}

export default MyRequest;