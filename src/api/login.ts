import request from './request'

/**
 * 登录API接口函数
 * @param params - 登录请求参数
 * @returns 返回请求结果
 */
export function loginApi(params: any){
    return request({
        url: '',    // API请求地址，此处为空，实际使用时需要填写具体地址
        method: 'get',    // 请求方法为GET
        params: params    // 请求参数
    })
}