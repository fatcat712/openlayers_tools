import axios from 'axios';

let instance = axios.create({
    timeout: 10000
});

instance.interceptors.request.use(config => {
    return config
}, err => {
    //一般请求错误的状态码是以4开头的，常见：401（超时）、404（找不到）
    //在这里统一添加toast或者提示弹窗
    return Promise.reject(err);
});
instance.interceptors.response.use(response => {
    const res = response;
    if (res.status === 200) {
        return {
            data: res.data.data,
            status: true,
            error: res.data.error,
            msg: res.data.message
        };
    }
    return {
        data: res.data.data,
        status: false
    };
}, err => {
    //一般响应错误的状态码是以5开头的，常见：502（重启）、500（系统崩溃）
    //在这里统一添加toast或者提示弹窗
    return Promise.reject(err);
});

export default instance;