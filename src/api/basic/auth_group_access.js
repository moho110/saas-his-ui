import request from '@/utils/request'

// 查询用户组与用户关联列表
export function listAuth_group_access(query) {
  return request({
    url: '/basic/auth_group_access/list',
    method: 'get',
    params: query
  })
}

// 查询用户组与用户关联详细
export function getAuth_group_access(uid) {
  return request({
    url: '/basic/auth_group_access/' + uid,
    method: 'get'
  })
}

// 新增用户组与用户关联
export function addAuth_group_access(data) {
  return request({
    url: '/basic/auth_group_access',
    method: 'post',
    data: data
  })
}

// 修改用户组与用户关联
export function updateAuth_group_access(data) {
  return request({
    url: '/basic/auth_group_access',
    method: 'put',
    data: data
  })
}

// 删除用户组与用户关联
export function delAuth_group_access(uid) {
  return request({
    url: '/basic/auth_group_access/' + uid,
    method: 'delete'
  })
}
