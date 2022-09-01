import request from '@/utils/request'

// 查询微信扫码登录列表
export function listWxqrlogin(query) {
  return request({
    url: '/basic/wxqrlogin/list',
    method: 'get',
    params: query
  })
}

// 查询微信扫码登录详细
export function getWxqrlogin(id) {
  return request({
    url: '/basic/wxqrlogin/' + id,
    method: 'get'
  })
}

// 新增微信扫码登录
export function addWxqrlogin(data) {
  return request({
    url: '/basic/wxqrlogin',
    method: 'post',
    data: data
  })
}

// 修改微信扫码登录
export function updateWxqrlogin(data) {
  return request({
    url: '/basic/wxqrlogin',
    method: 'put',
    data: data
  })
}

// 删除微信扫码登录
export function delWxqrlogin(id) {
  return request({
    url: '/basic/wxqrlogin/' + id,
    method: 'delete'
  })
}
