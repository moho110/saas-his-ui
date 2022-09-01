import request from '@/utils/request'

// 查询检查项目费用列表
export function listInspectionfee(query) {
  return request({
    url: '/basic/inspectionfee/list',
    method: 'get',
    params: query
  })
}

// 查询检查项目费用详细
export function getInspectionfee(insId) {
  return request({
    url: '/basic/inspectionfee/' + insId,
    method: 'get'
  })
}

// 新增检查项目费用
export function addInspectionfee(data) {
  return request({
    url: '/basic/inspectionfee',
    method: 'post',
    data: data
  })
}

// 修改检查项目费用
export function updateInspectionfee(data) {
  return request({
    url: '/basic/inspectionfee',
    method: 'put',
    data: data
  })
}

// 删除检查项目费用
export function delInspectionfee(insId) {
  return request({
    url: '/basic/inspectionfee/' + insId,
    method: 'delete'
  })
}
