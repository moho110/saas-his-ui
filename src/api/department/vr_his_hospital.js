import request from '@/utils/request'

// 查询HIS医院基本信息列表
export function listVr_his_hospital(query) {
  return request({
    url: '/basic/vr_his_hospital/list',
    method: 'get',
    params: query
  })
}

// 查询HIS医院基本信息详细
export function getVr_his_hospital(id) {
  return request({
    url: '/basic/vr_his_hospital/' + id,
    method: 'get'
  })
}

// 新增HIS医院基本信息
export function addVr_his_hospital(data) {
  return request({
    url: '/basic/vr_his_hospital',
    method: 'post',
    data: data
  })
}

// 修改HIS医院基本信息
export function updateVr_his_hospital(data) {
  return request({
    url: '/basic/vr_his_hospital',
    method: 'put',
    data: data
  })
}

// 删除HIS医院基本信息
export function delVr_his_hospital(id) {
  return request({
    url: '/basic/vr_his_hospital/' + id,
    method: 'delete'
  })
}
