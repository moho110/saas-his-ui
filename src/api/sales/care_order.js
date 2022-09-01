import request from '@/utils/request'

// 查询处方列列表
export function listCare_order(query) {
  return request({
    url: '/basic/care_order/list',
    method: 'get',
    params: query
  })
}

// 查询处方列详细
export function getCare_order(id) {
  return request({
    url: '/basic/care_order/' + id,
    method: 'get'
  })
}

// 新增处方列
export function addCare_order(data) {
  return request({
    url: '/basic/care_order',
    method: 'post',
    data: data
  })
}

// 修改处方列
export function updateCare_order(data) {
  return request({
    url: '/basic/care_order',
    method: 'put',
    data: data
  })
}

// 删除处方列
export function delCare_order(id) {
  return request({
    url: '/basic/care_order/' + id,
    method: 'delete'
  })
}
