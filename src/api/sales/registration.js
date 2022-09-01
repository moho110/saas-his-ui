import request from '@/utils/request'

// 查询门诊挂号列表
export function listRegistration(query) {
  return request({
    url: '/basic/registration/list',
    method: 'get',
    params: query
  })
}

// 查询门诊挂号详细
export function getRegistration(registrationId) {
  return request({
    url: '/basic/registration/' + registrationId,
    method: 'get'
  })
}

// 新增门诊挂号
export function addRegistration(data) {
  return request({
    url: '/basic/registration',
    method: 'post',
    data: data
  })
}

// 修改门诊挂号
export function updateRegistration(data) {
  return request({
    url: '/basic/registration',
    method: 'put',
    data: data
  })
}

// 删除门诊挂号
export function delRegistration(registrationId) {
  return request({
    url: '/basic/registration/' + registrationId,
    method: 'delete'
  })
}
