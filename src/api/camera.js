import request from '@/utils/request'

export function GetCamera(data) {
    return request({
      url: '/mms.Camera/getCamera',
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
  }
  export function AddCamera(data) {
    return request({
      url: '/mms.Camera/addCamera',
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
  }
  export function ModifyCamera(data) {
    return request({
      url:'/mms.Camera/modifyCamera',
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
  }
  export function RemoveCamera(data) {
    return request({
      url: '/mms.Camera/removeCamera',
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
  }