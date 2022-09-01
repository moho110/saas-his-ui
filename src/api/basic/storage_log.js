import request from '@/utils/request'

// 查询入库操作log日志列表
export function listStorage_log(query) {
  return request({
    url: '/basic/storage_log/list',
    method: 'get',
    params: query
  })
}

// 查询入库操作log日志详细
export function getStorage_log(logId) {
  return request({
    url: '/basic/storage_log/' + logId,
    method: 'get'
  })
}

// 新增入库操作log日志
export function addStorage_log(data) {
  return request({
    url: '/basic/storage_log',
    method: 'post',
    data: data
  })
}

// 修改入库操作log日志
export function updateStorage_log(data) {
  return request({
    url: '/basic/storage_log',
    method: 'put',
    data: data
  })
}

// 删除入库操作log日志
export function delStorage_log(logId) {
  return request({
    url: '/basic/storage_log/' + logId,
    method: 'delete'
  })
}
