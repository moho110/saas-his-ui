import request from '@/utils/request'

// 查询开诊用药明细列表
export function listCare_order_sub(query) {
  return request({
    url: '/basic/care_order_sub/list',
    method: 'get',
    params: query
  })
}

// 查询开诊用药明细详细
export function getCare_order_sub(id) {
  return request({
    url: '/basic/care_order_sub/' + id,
    method: 'get'
  })
}

// 新增开诊用药明细
export function addCare_order_sub(data) {
  return request({
    url: '/basic/care_order_sub',
    method: 'post',
    data: data
  })
}

// 修改开诊用药明细
export function updateCare_order_sub(data) {
  return request({
    url: '/basic/care_order_sub',
    method: 'put',
    data: data
  })
}

// 删除开诊用药明细
export function delCare_order_sub(id) {
  return request({
    url: '/basic/care_order_sub/' + id,
    method: 'delete'
  })
}
