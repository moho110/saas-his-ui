import request from '@/utils/request'

// 查询患者用户档案列表
export function listVr_his_patient_file(query) {
  return request({
    url: '/basic/vr_his_patient_file/list',
    method: 'get',
    params: query
  })
}

// 查询患者用户档案详细
export function getVr_his_patient_file(fileId) {
  return request({
    url: '/basic/vr_his_patient_file/' + fileId,
    method: 'get'
  })
}

// 新增患者用户档案
export function addVr_his_patient_file(data) {
  return request({
    url: '/basic/vr_his_patient_file',
    method: 'post',
    data: data
  })
}

// 修改患者用户档案
export function updateVr_his_patient_file(data) {
  return request({
    url: '/basic/vr_his_patient_file',
    method: 'put',
    data: data
  })
}

// 删除患者用户档案
export function delVr_his_patient_file(fileId) {
  return request({
    url: '/basic/vr_his_patient_file/' + fileId,
    method: 'delete'
  })
}
