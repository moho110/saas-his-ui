import request from '@/utils/request'

// 查询用户组列表
export function listAuth_group(query) {
  return request({
    url: '/basic/auth_group/list',
    method: 'get',
    params: query
  })
}

// 查询用户组详细
export function getAuth_group(id) {
  return request({
    url: '/basic/auth_group/' + id,
    method: 'get'
  })
}

// 新增用户组
export function addAuth_group(data) {
  return request({
    url: '/basic/auth_group',
    method: 'post',
    data: data
  })
}

// 修改用户组
export function updateAuth_group(data) {
  return request({
    url: '/basic/auth_group',
    method: 'put',
    data: data
  })
}

// 删除用户组
export function delAuth_group(id) {
  return request({
    url: '/basic/auth_group/' + id,
    method: 'delete'
  })
}
