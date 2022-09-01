import request from '@/utils/request'

// 查询历史病历列表
export function listCare_history(query) {
  return request({
    url: '/basic/care_history/list',
    method: 'get',
    params: query
  })
}

// 查询历史病历详细
export function getCare_history(id) {
  return request({
    url: '/basic/care_history/' + id,
    method: 'get'
  })
}

// 新增历史病历
export function addCare_history(data) {
  return request({
    url: '/basic/care_history',
    method: 'post',
    data: data
  })
}

// 修改历史病历
export function updateCare_history(data) {
  return request({
    url: '/basic/care_history',
    method: 'put',
    data: data
  })
}

// 删除历史病历
export function delCare_history(id) {
  return request({
    url: '/basic/care_history/' + id,
    method: 'delete'
  })
}
