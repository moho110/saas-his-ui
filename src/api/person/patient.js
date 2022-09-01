import request from '@/utils/request'

// 查询患者用户列表
export function listPatient(query) {
  return request({
    url: '/basic/patient/list',
    method: 'get',
    params: query
  })
}

// 查询患者用户详细
export function getPatient(patientId) {
  return request({
    url: '/basic/patient/' + patientId,
    method: 'get'
  })
}

// 新增患者用户
export function addPatient(data) {
  return request({
    url: '/basic/patient',
    method: 'post',
    data: data
  })
}

// 修改患者用户
export function updatePatient(data) {
  return request({
    url: '/basic/patient',
    method: 'put',
    data: data
  })
}

// 删除患者用户
export function delPatient(patientId) {
  return request({
    url: '/basic/patient/' + patientId,
    method: 'delete'
  })
}
