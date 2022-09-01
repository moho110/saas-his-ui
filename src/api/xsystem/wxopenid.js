import request from '@/utils/request'

// 查询绑定微信openid和用户id的关系列表
export function listWxopenid(query) {
  return request({
    url: '/basic/wxopenid/list',
    method: 'get',
    params: query
  })
}

// 查询绑定微信openid和用户id的关系详细
export function getWxopenid(id) {
  return request({
    url: '/basic/wxopenid/' + id,
    method: 'get'
  })
}

// 新增绑定微信openid和用户id的关系
export function addWxopenid(data) {
  return request({
    url: '/basic/wxopenid',
    method: 'post',
    data: data
  })
}

// 修改绑定微信openid和用户id的关系
export function updateWxopenid(data) {
  return request({
    url: '/basic/wxopenid',
    method: 'put',
    data: data
  })
}

// 删除绑定微信openid和用户id的关系
export function delWxopenid(id) {
  return request({
    url: '/basic/wxopenid/' + id,
    method: 'delete'
  })
}
