import request from '@/utils/request'

// 查询openid跨域名获取列表
export function listWxopenid_cache(query) {
  return request({
    url: '/basic/wxopenid_cache/list',
    method: 'get',
    params: query
  })
}

// 查询openid跨域名获取详细
export function getWxopenid_cache(id) {
  return request({
    url: '/basic/wxopenid_cache/' + id,
    method: 'get'
  })
}

// 新增openid跨域名获取
export function addWxopenid_cache(data) {
  return request({
    url: '/basic/wxopenid_cache',
    method: 'post',
    data: data
  })
}

// 修改openid跨域名获取
export function updateWxopenid_cache(data) {
  return request({
    url: '/basic/wxopenid_cache',
    method: 'put',
    data: data
  })
}

// 删除openid跨域名获取
export function delWxopenid_cache(id) {
  return request({
    url: '/basic/wxopenid_cache/' + id,
    method: 'delete'
  })
}
