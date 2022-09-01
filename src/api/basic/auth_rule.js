import request from '@/utils/request'

// 查询用户权限列表
export function listAuth_rule(query) {
  return request({
    url: '/basic/auth_rule/list',
    method: 'get',
    params: query
  })
}

// 查询用户权限详细
export function getAuth_rule(id) {
  return request({
    url: '/basic/auth_rule/' + id,
    method: 'get'
  })
}

// 新增用户权限
export function addAuth_rule(data) {
  return request({
    url: '/basic/auth_rule',
    method: 'post',
    data: data
  })
}

// 修改用户权限
export function updateAuth_rule(data) {
  return request({
    url: '/basic/auth_rule',
    method: 'put',
    data: data
  })
}

// 删除用户权限
export function delAuth_rule(id) {
  return request({
    url: '/basic/auth_rule/' + id,
    method: 'delete'
  })
}
