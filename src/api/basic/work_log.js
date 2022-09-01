import request from '@/utils/request'

// 查询重要操作记录列表
export function listWork_log(query) {
  return request({
    url: '/basic/work_log/list',
    method: 'get',
    params: query
  })
}

// 查询重要操作记录详细
export function getWork_log(id) {
  return request({
    url: '/basic/work_log/' + id,
    method: 'get'
  })
}

// 新增重要操作记录
export function addWork_log(data) {
  return request({
    url: '/basic/work_log',
    method: 'post',
    data: data
  })
}

// 修改重要操作记录
export function updateWork_log(data) {
  return request({
    url: '/basic/work_log',
    method: 'put',
    data: data
  })
}

// 删除重要操作记录
export function delWork_log(id) {
  return request({
    url: '/basic/work_log/' + id,
    method: 'delete'
  })
}
