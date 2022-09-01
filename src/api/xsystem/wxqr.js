import request from '@/utils/request'

// 查询保存微信永久二维码及用户关系列表
export function listWxqr(query) {
  return request({
    url: '/basic/wxqr/list',
    method: 'get',
    params: query
  })
}

// 查询保存微信永久二维码及用户关系详细
export function getWxqr(id) {
  return request({
    url: '/basic/wxqr/' + id,
    method: 'get'
  })
}

// 新增保存微信永久二维码及用户关系
export function addWxqr(data) {
  return request({
    url: '/basic/wxqr',
    method: 'post',
    data: data
  })
}

// 修改保存微信永久二维码及用户关系
export function updateWxqr(data) {
  return request({
    url: '/basic/wxqr',
    method: 'put',
    data: data
  })
}

// 删除保存微信永久二维码及用户关系
export function delWxqr(id) {
  return request({
    url: '/basic/wxqr/' + id,
    method: 'delete'
  })
}
