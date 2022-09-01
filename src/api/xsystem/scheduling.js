import request from '@/utils/request'

// 查询我的排班列表
export function listScheduling(query) {
  return request({
    url: '/basic/scheduling/list',
    method: 'get',
    params: query
  })
}

// 查询我的排班详细
export function getScheduling(schedulingId) {
  return request({
    url: '/basic/scheduling/' + schedulingId,
    method: 'get'
  })
}

// 新增我的排班
export function addScheduling(data) {
  return request({
    url: '/basic/scheduling',
    method: 'post',
    data: data
  })
}

// 修改我的排班
export function updateScheduling(data) {
  return request({
    url: '/basic/scheduling',
    method: 'put',
    data: data
  })
}

// 删除我的排班
export function delScheduling(schedulingId) {
  return request({
    url: '/basic/scheduling/' + schedulingId,
    method: 'delete'
  })
}
