import request from '@/utils/request'

// 查询医院药品关联列表
export function listHospital_medicines_relation(query) {
  return request({
    url: '/basic/hospital_medicines_relation/list',
    method: 'get',
    params: query
  })
}

// 查询医院药品关联详细
export function getHospital_medicines_relation(hmrId) {
  return request({
    url: '/basic/hospital_medicines_relation/' + hmrId,
    method: 'get'
  })
}

// 新增医院药品关联
export function addHospital_medicines_relation(data) {
  return request({
    url: '/basic/hospital_medicines_relation',
    method: 'post',
    data: data
  })
}

// 修改医院药品关联
export function updateHospital_medicines_relation(data) {
  return request({
    url: '/basic/hospital_medicines_relation',
    method: 'put',
    data: data
  })
}

// 删除医院药品关联
export function delHospital_medicines_relation(hmrId) {
  return request({
    url: '/basic/hospital_medicines_relation/' + hmrId,
    method: 'delete'
  })
}
