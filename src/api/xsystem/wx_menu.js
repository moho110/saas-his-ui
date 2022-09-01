import request from '@/utils/request'

// 查询保存微信公众平台菜单列表
export function listWx_menu(query) {
  return request({
    url: '/basic/wx_menu/list',
    method: 'get',
    params: query
  })
}

// 查询保存微信公众平台菜单详细
export function getWx_menu(id) {
  return request({
    url: '/basic/wx_menu/' + id,
    method: 'get'
  })
}

// 新增保存微信公众平台菜单
export function addWx_menu(data) {
  return request({
    url: '/basic/wx_menu',
    method: 'post',
    data: data
  })
}

// 修改保存微信公众平台菜单
export function updateWx_menu(data) {
  return request({
    url: '/basic/wx_menu',
    method: 'put',
    data: data
  })
}

// 删除保存微信公众平台菜单
export function delWx_menu(id) {
  return request({
    url: '/basic/wx_menu/' + id,
    method: 'delete'
  })
}
