import request from '@/utils/request'

// 查询药品信息列表
export function listMedicines(query) {
  return request({
    url: '/basic/medicines/list',
    method: 'get',
    params: query
  })
}

// 查询药品信息详细
export function getMedicines(medicinesId) {
  return request({
    url: '/basic/medicines/' + medicinesId,
    method: 'get'
  })
}

// 新增药品信息
export function addMedicines(data) {
  return request({
    url: '/basic/medicines',
    method: 'post',
    data: data
  })
}

// 修改药品信息
export function updateMedicines(data) {
  return request({
    url: '/basic/medicines',
    method: 'put',
    data: data
  })
}

// 删除药品信息
export function delMedicines(medicinesId) {
  return request({
    url: '/basic/medicines/' + medicinesId,
    method: 'delete'
  })
}
