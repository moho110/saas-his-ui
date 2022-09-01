import request from '@/utils/request'

// 查询微信公众平台信息列表
export function listWxmp(query) {
  return request({
    url: '/basic/wxmp/list',
    method: 'get',
    params: query
  })
}

// 查询微信公众平台信息详细
export function getWxmp(id) {
  return request({
    url: '/basic/wxmp/' + id,
    method: 'get'
  })
}

// 新增微信公众平台信息
export function addWxmp(data) {
  return request({
    url: '/basic/wxmp',
    method: 'post',
    data: data
  })
}

// 修改微信公众平台信息
export function updateWxmp(data) {
  return request({
    url: '/basic/wxmp',
    method: 'put',
    data: data
  })
}

// 删除微信公众平台信息
export function delWxmp(id) {
  return request({
    url: '/basic/wxmp/' + id,
    method: 'delete'
  })
}
