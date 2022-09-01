import request from '@/utils/request'

// 查询采购信息列表
export function listPurchase(query) {
  return request({
    url: '/basic/purchase/list',
    method: 'get',
    params: query
  })
}

// 查询采购信息详细
export function getPurchase(purchaseId) {
  return request({
    url: '/basic/purchase/' + purchaseId,
    method: 'get'
  })
}

// 新增采购信息
export function addPurchase(data) {
  return request({
    url: '/basic/purchase',
    method: 'post',
    data: data
  })
}

// 修改采购信息
export function updatePurchase(data) {
  return request({
    url: '/basic/purchase',
    method: 'put',
    data: data
  })
}

// 删除采购信息
export function delPurchase(purchaseId) {
  return request({
    url: '/basic/purchase/' + purchaseId,
    method: 'delete'
  })
}
