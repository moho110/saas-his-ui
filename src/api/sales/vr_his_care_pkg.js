import request from '@/utils/request'

// 查询收费总列表
export function listVr_his_care_pkg(query) {
  return request({
    url: '/basic/vr_his_care_pkg/list',
    method: 'get',
    params: query
  })
}

// 查询收费总详细
export function getVr_his_care_pkg(id) {
  return request({
    url: '/basic/vr_his_care_pkg/' + id,
    method: 'get'
  })
}

// 新增收费总
export function addVr_his_care_pkg(data) {
  return request({
    url: '/basic/vr_his_care_pkg',
    method: 'post',
    data: data
  })
}

// 修改收费总
export function updateVr_his_care_pkg(data) {
  return request({
    url: '/basic/vr_his_care_pkg',
    method: 'put',
    data: data
  })
}

// 删除收费总
export function delVr_his_care_pkg(id) {
  return request({
    url: '/basic/vr_his_care_pkg/' + id,
    method: 'delete'
  })
}
