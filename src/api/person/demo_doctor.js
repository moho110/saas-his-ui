import request from '@/utils/request'

// 查询公示信息--医生列表
export function listDemo_doctor(query) {
  return request({
    url: '/basic/demo_doctor/list',
    method: 'get',
    params: query
  })
}

// 查询公示信息--医生详细
export function getDemo_doctor(id) {
  return request({
    url: '/basic/demo_doctor/' + id,
    method: 'get'
  })
}

// 新增公示信息--医生
export function addDemo_doctor(data) {
  return request({
    url: '/basic/demo_doctor',
    method: 'post',
    data: data
  })
}

// 修改公示信息--医生
export function updateDemo_doctor(data) {
  return request({
    url: '/basic/demo_doctor',
    method: 'put',
    data: data
  })
}

// 删除公示信息--医生
export function delDemo_doctor(id) {
  return request({
    url: '/basic/demo_doctor/' + id,
    method: 'delete'
  })
}
