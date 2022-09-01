import request from '@/utils/request'

// 查询字典列表
export function listDictionary(query) {
  return request({
    url: '/basic/dictionary/list',
    method: 'get',
    params: query
  })
}

// 查询字典详细
export function getDictionary(did) {
  return request({
    url: '/basic/dictionary/' + did,
    method: 'get'
  })
}

// 新增字典
export function addDictionary(data) {
  return request({
    url: '/basic/dictionary',
    method: 'post',
    data: data
  })
}

// 修改字典
export function updateDictionary(data) {
  return request({
    url: '/basic/dictionary',
    method: 'put',
    data: data
  })
}

// 删除字典
export function delDictionary(did) {
  return request({
    url: '/basic/dictionary/' + did,
    method: 'delete'
  })
}
