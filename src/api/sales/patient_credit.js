import request from '@/utils/request'

// 查询用户免费提问额度列表
export function listPatient_credit(query) {
  return request({
    url: '/basic/patient_credit/list',
    method: 'get',
    params: query
  })
}

// 查询用户免费提问额度详细
export function getPatient_credit(id) {
  return request({
    url: '/basic/patient_credit/' + id,
    method: 'get'
  })
}

// 新增用户免费提问额度
export function addPatient_credit(data) {
  return request({
    url: '/basic/patient_credit',
    method: 'post',
    data: data
  })
}

// 修改用户免费提问额度
export function updatePatient_credit(data) {
  return request({
    url: '/basic/patient_credit',
    method: 'put',
    data: data
  })
}

// 删除用户免费提问额度
export function delPatient_credit(id) {
  return request({
    url: '/basic/patient_credit/' + id,
    method: 'delete'
  })
}
