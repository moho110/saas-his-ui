import request from '@/utils/request'

// 查询排班时段列表
export function listScheduling_subsection(query) {
  return request({
    url: '/basic/scheduling_subsection/list',
    method: 'get',
    params: query
  })
}

// 查询排班时段详细
export function getScheduling_subsection(schedulingSubsectionId) {
  return request({
    url: '/basic/scheduling_subsection/' + schedulingSubsectionId,
    method: 'get'
  })
}

// 新增排班时段
export function addScheduling_subsection(data) {
  return request({
    url: '/basic/scheduling_subsection',
    method: 'post',
    data: data
  })
}

// 修改排班时段
export function updateScheduling_subsection(data) {
  return request({
    url: '/basic/scheduling_subsection',
    method: 'put',
    data: data
  })
}

// 删除排班时段
export function delScheduling_subsection(schedulingSubsectionId) {
  return request({
    url: '/basic/scheduling_subsection/' + schedulingSubsectionId,
    method: 'delete'
  })
}
