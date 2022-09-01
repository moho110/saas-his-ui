import request from '@/utils/request'

// 查询医生与医院关联列表
export function listHospital_doctor_relation(query) {
  return request({
    url: '/basic/hospital_doctor_relation/list',
    method: 'get',
    params: query
  })
}

// 查询医生与医院关联详细
export function getHospital_doctor_relation(rid) {
  return request({
    url: '/basic/hospital_doctor_relation/' + rid,
    method: 'get'
  })
}

// 新增医生与医院关联
export function addHospital_doctor_relation(data) {
  return request({
    url: '/basic/hospital_doctor_relation',
    method: 'post',
    data: data
  })
}

// 修改医生与医院关联
export function updateHospital_doctor_relation(data) {
  return request({
    url: '/basic/hospital_doctor_relation',
    method: 'put',
    data: data
  })
}

// 删除医生与医院关联
export function delHospital_doctor_relation(rid) {
  return request({
    url: '/basic/hospital_doctor_relation/' + rid,
    method: 'delete'
  })
}
