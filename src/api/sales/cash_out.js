import request from '@/utils/request'

// 查询用户提现申请列表
export function listCash_out(query) {
  return request({
    url: '/basic/cash_out/list',
    method: 'get',
    params: query
  })
}

// 查询用户提现申请详细
export function getCash_out(id) {
  return request({
    url: '/basic/cash_out/' + id,
    method: 'get'
  })
}

// 新增用户提现申请
export function addCash_out(data) {
  return request({
    url: '/basic/cash_out',
    method: 'post',
    data: data
  })
}

// 修改用户提现申请
export function updateCash_out(data) {
  return request({
    url: '/basic/cash_out',
    method: 'put',
    data: data
  })
}

// 删除用户提现申请
export function delCash_out(id) {
  return request({
    url: '/basic/cash_out/' + id,
    method: 'delete'
  })
}
