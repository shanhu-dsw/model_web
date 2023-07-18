import request from '@/utils/request'

export function login(params) {
  return request({
    url: '/security.Admin/adminLogin',
    method: "get",
    params
  })
}

export function refreshAdminToken() {
return request({
  url: '/security.Admin/refreshAdminToken',
  method: "post",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
})
}