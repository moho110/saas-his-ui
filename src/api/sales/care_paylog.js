import request from '@/utils/request'

// 查询支付收费记录列表
export function listCare_paylog(query) {
  return request({
    url: '/basic/care_paylog/list',
    method: 'get',
    params: query
  })
}

// 查询支付收费记录详细
export function getCare_paylog(id) {
  return request({
    url: '/basic/care_paylog/' + id,
    method: 'get'
  })
}

// 新增支付收费记录
export function addCare_paylog(data) {
  return request({
    url: '/basic/care_paylog',
    method: 'post',
    data: data
  })
}

// 修改支付收费记录
export function updateCare_paylog(data) {
  return request({
    url: '/basic/care_paylog',
    method: 'put',
    data: data
  })
}

// 删除支付收费记录
export function delCare_paylog(id) {
  return request({
    url: '/basic/care_paylog/' + id,
    method: 'delete'
  })
}
