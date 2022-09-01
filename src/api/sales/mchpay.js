import request from '@/utils/request'

// 查询提现付款记录，微信企业付款记录列表
export function listMchpay(query) {
  return request({
    url: '/basic/mchpay/list',
    method: 'get',
    params: query
  })
}

// 查询提现付款记录，微信企业付款记录详细
export function getMchpay(id) {
  return request({
    url: '/basic/mchpay/' + id,
    method: 'get'
  })
}

// 新增提现付款记录，微信企业付款记录
export function addMchpay(data) {
  return request({
    url: '/basic/mchpay',
    method: 'post',
    data: data
  })
}

// 修改提现付款记录，微信企业付款记录
export function updateMchpay(data) {
  return request({
    url: '/basic/mchpay',
    method: 'put',
    data: data
  })
}

// 删除提现付款记录，微信企业付款记录
export function delMchpay(id) {
  return request({
    url: '/basic/mchpay/' + id,
    method: 'delete'
  })
}
