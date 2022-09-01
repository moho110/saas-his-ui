import request from '@/utils/request'

// 查询诊所系统操作记录列表
export function listOperation_log(query) {
  return request({
    url: '/basic/operation_log/list',
    method: 'get',
    params: query
  })
}

// 查询诊所系统操作记录详细
export function getOperation_log(oid) {
  return request({
    url: '/basic/operation_log/' + oid,
    method: 'get'
  })
}

// 新增诊所系统操作记录
export function addOperation_log(data) {
  return request({
    url: '/basic/operation_log',
    method: 'post',
    data: data
  })
}

// 修改诊所系统操作记录
export function updateOperation_log(data) {
  return request({
    url: '/basic/operation_log',
    method: 'put',
    data: data
  })
}

// 删除诊所系统操作记录
export function delOperation_log(oid) {
  return request({
    url: '/basic/operation_log/' + oid,
    method: 'delete'
  })
}
