import request from '@/utils/request'

// 查询短信发送记录列表
export function listSms_log(query) {
  return request({
    url: '/basic/sms_log/list',
    method: 'get',
    params: query
  })
}

// 查询短信发送记录详细
export function getSms_log(id) {
  return request({
    url: '/basic/sms_log/' + id,
    method: 'get'
  })
}

// 新增短信发送记录
export function addSms_log(data) {
  return request({
    url: '/basic/sms_log',
    method: 'post',
    data: data
  })
}

// 修改短信发送记录
export function updateSms_log(data) {
  return request({
    url: '/basic/sms_log',
    method: 'put',
    data: data
  })
}

// 删除短信发送记录
export function delSms_log(id) {
  return request({
    url: '/basic/sms_log/' + id,
    method: 'delete'
  })
}
