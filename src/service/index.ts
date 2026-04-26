import  MyRequest from 'src/service/request/index';
import { BASE_URL} from 'src/service/request/config'

const myRequest = new MyRequest({
  MyRequsetInterceptor: {
    MyRequestInterceprtUseFunction: (config) => {
        console.log('实例请求拦截器触发，拦截成功')
        return config;
    },
    MyRequestInterceprtUseReject: (error: any ) => {
      console.log('实例请求拦截器触发，拦截成功')
      return error;
    },
    MyResponseInterceptorUseFunction: (config) => {
      console.log('实例响应拦截器触发，拦截成功')
      return config;
    },
    MyResponseInterceptorReject: (error: any ) => {
      console.log('实例响应拦截器触发，拦截失败')
      return error;
    }
  }
})