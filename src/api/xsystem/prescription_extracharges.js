import request from '@/utils/request'

// 查询处方附加费用列表
export function listPrescription_extracharges(query) {
  return request({
    url: '/basic/prescription_extracharges/list',
    method: 'get',
    params: query
  })
}

// 查询处方附加费用详细
export function getPrescription_extracharges(preId) {
  return request({
    url: '/basic/prescription_extracharges/' + preId,
    method: 'get'
  })
}

// 新增处方附加费用
export function addPrescription_extracharges(data) {
  return request({
    url: '/basic/prescription_extracharges',
    method: 'post',
    data: data
  })
}

// 修改处方附加费用
export function updatePrescription_extracharges(data) {
  return request({
    url: '/basic/prescription_extracharges',
    method: 'put',
    data: data
  })
}

// 删除处方附加费用
export function delPrescription_extracharges(preId) {
  return request({
    url: '/basic/prescription_extracharges/' + preId,
    method: 'delete'
  })
}
