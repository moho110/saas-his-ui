import request from '@/utils/request'

// 查询挂号费用列表
export function listRegisteredfee(query) {
  return request({
    url: '/basic/registeredfee/list',
    method: 'get',
    params: query
  })
}

// 查询挂号费用详细
export function getRegisteredfee(regId) {
  return request({
    url: '/basic/registeredfee/' + regId,
    method: 'get'
  })
}

// 新增挂号费用
export function addRegisteredfee(data) {
  return request({
    url: '/basic/registeredfee',
    method: 'post',
    data: data
  })
}

// 修改挂号费用
export function updateRegisteredfee(data) {
  return request({
    url: '/basic/registeredfee',
    method: 'put',
    data: data
  })
}

// 删除挂号费用
export function delRegisteredfee(regId) {
  return request({
    url: '/basic/registeredfee/' + regId,
    method: 'delete'
  })
}
