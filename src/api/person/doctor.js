import request from '@/utils/request'

// 查询医生基本信息列表
export function listDoctor(query) {
  return request({
    url: '/basic/doctor/list',
    method: 'get',
    params: query
  })
}

// 查询医生基本信息详细
export function getDoctor(id) {
  return request({
    url: '/basic/doctor/' + id,
    method: 'get'
  })
}

// 新增医生基本信息
export function addDoctor(data) {
  return request({
    url: '/basic/doctor',
    method: 'post',
    data: data
  })
}

// 修改医生基本信息
export function updateDoctor(data) {
  return request({
    url: '/basic/doctor',
    method: 'put',
    data: data
  })
}

// 删除医生基本信息
export function delDoctor(id) {
  return request({
    url: '/basic/doctor/' + id,
    method: 'delete'
  })
}
