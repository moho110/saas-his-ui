import request from '@/utils/request'

// 查询排班星期列表
export function listScheduling_week(query) {
  return request({
    url: '/basic/scheduling_week/list',
    method: 'get',
    params: query
  })
}

// 查询排班星期详细
export function getScheduling_week(schedulingWeekId) {
  return request({
    url: '/basic/scheduling_week/' + schedulingWeekId,
    method: 'get'
  })
}

// 新增排班星期
export function addScheduling_week(data) {
  return request({
    url: '/basic/scheduling_week',
    method: 'post',
    data: data
  })
}

// 修改排班星期
export function updateScheduling_week(data) {
  return request({
    url: '/basic/scheduling_week',
    method: 'put',
    data: data
  })
}

// 删除排班星期
export function delScheduling_week(schedulingWeekId) {
  return request({
    url: '/basic/scheduling_week/' + schedulingWeekId,
    method: 'delete'
  })
}
