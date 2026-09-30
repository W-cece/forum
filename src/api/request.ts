import axios from 'axios';
import { useUserStore } from '../stores/user.ts';


//创建axios实例
const service = axios.create({
    baseURL: '/api', // api的base_url
    timeout: 5000 // 请求超时时间
});

// request拦截器：自动带上token
service.interceptors.request.use(
    (config) => {
        const userStore = useUserStore();
        if (userStore.token) {
            config.headers['Authorization'] = `Bearer ${userStore.token}`;
        }
        return config;
    }
);

//响应拦截器：对响应数据做处理，统一处理返回、401鉴权失败跳转登录
service.interceptors.response.use(
   res =>res.data,
   err => {
        //401鉴权失败,跳转到登录页
       if(err.response.status === 401){
           const userStore = useUserStore();
           userStore.logout(); //清除token

            //导入路由实例跳转，不能直接useRouter，拦截器里不能使用组合式api
            import('../router/index.ts').then(({router})=>{
                router.push('/login');
            })
        
       }
       return Promise.reject(err)
   }
)

export default service;
    