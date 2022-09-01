import request from '@/utils/request'

// 查询HIS用户列表
export function listMember(query) {
  return request({
    url: '/basic/member/list',
    method: 'get',
    params: query
  })
}

// 查询HIS用户详细
export function getMember(uid) {
  return request({
    url: '/basic/member/' + uid,
    method: 'get'
  })
}

// 新增HIS用户
export function addMember(data) {
  return request({
    url: '/basic/member',
    method: 'post',
    data: data
  })
}

// 修改HIS用户
export function updateMember(data) {
  return request({
    url: '/basic/member',
    method: 'put',
    data: data
  })
}

// 删除HIS用户
export function delMember(uid) {
  return request({
    url: '/basic/member/' + uid,
    method: 'delete'
  })
}
