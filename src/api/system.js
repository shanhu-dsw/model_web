import request from '@/utils/request'

export function GetEngineCapture(data) {
    return request({
      url: 'mms.EngineCapture/getEngineCapture',
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
  }
  export function AddEngineCapture(data) {
    return request({
      url: '/mms.EngineCapture/addEngineCapture',
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
  }
  export function ModifyEngineCapture(data) {
    return request({
      url: '/mms.EngineCapture/modifyEngineCapture',
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
  }
  export function RemoveEngineCapture(data) {
    return request({
      url: '/mms.EngineCapture/removeEngineCapture',
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
  }
  export function GetEngineVision(data) {
    return request({
      url: 'mms.EngineVision/getEngineVision',
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
  }
  export function AddEngineVision(data) {
    return request({
      url: '/mms.EngineVision/addEngineVision',
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
  }
  export function ModifyEngineVision(data) {
    return request({
      url: '/mms.EngineVision/modifyEngineVision',
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
  }
  export function RemoveEngineVision(data) {
    return request({
      url: '/mms.EngineVision/removeEngineVision',
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
  }