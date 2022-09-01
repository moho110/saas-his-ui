import request from '@/utils/request'

// 查询用户收支记录列表
export function listTransaction_record(query) {
  return request({
    url: '/basic/transaction_record/list',
    method: 'get',
    params: query
  })
}

// 查询用户收支记录详细
export function getTransaction_record(id) {
  return request({
    url: '/basic/transaction_record/' + id,
    method: 'get'
  })
}

// 新增用户收支记录
export function addTransaction_record(data) {
  return request({
    url: '/basic/transaction_record',
    method: 'post',
    data: data
  })
}

// 修改用户收支记录
export function updateTransaction_record(data) {
  return request({
    url: '/basic/transaction_record',
    method: 'put',
    data: data
  })
}

// 删除用户收支记录
export function delTransaction_record(id) {
  return request({
    url: '/basic/transaction_record/' + id,
    method: 'delete'
  })
}
