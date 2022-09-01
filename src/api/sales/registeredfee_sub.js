import request from '@/utils/request'

// 查询挂号费用子列表
export function listRegisteredfee_sub(query) {
  return request({
    url: '/basic/registeredfee_sub/list',
    method: 'get',
    params: query
  })
}

// 查询挂号费用子详细
export function getRegisteredfee_sub(regSubId) {
  return request({
    url: '/basic/registeredfee_sub/' + regSubId,
    method: 'get'
  })
}

// 新增挂号费用子
export function addRegisteredfee_sub(data) {
  return request({
    url: '/basic/registeredfee_sub',
    method: 'post',
    data: data
  })
}

// 修改挂号费用子
export function updateRegisteredfee_sub(data) {
  return request({
    url: '/basic/registeredfee_sub',
    method: 'put',
    data: data
  })
}

// 删除挂号费用子
export function delRegisteredfee_sub(regSubId) {
  return request({
    url: '/basic/registeredfee_sub/' + regSubId,
    method: 'delete'
  })
}
