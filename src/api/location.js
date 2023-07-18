import request from '@/utils/request'

  export function GetLocation(data) {
    return request({
      url: '/mms.Location/getLocation',
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
  }
  export function AddLocation(data) {
    return request({
      url: '/mms.Location/addLocation',
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
  }
  export function RemoveLocation(data) {
    return request({
      url: '/mms.Location/removeLocation',
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
  }
  export function ModifyLocation(data) {
    return request({
      url: '/mms.Location/modifyLocation',
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
  }
  export function AddLocationCamera(data) {
    return request({
      url: '/mms.LocationCamera/addLocationCamera',
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
  }
  export function GetLocationCamera(data) {
    return request({
      url: '/mms.LocationCamera/getLocationCamera',
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
  }
  export function AddLocationModel(data) {
    return request({
      url: '/mms.LocationModel/addLocationModel',
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
  }
  export function GetLocationModel(data) {
    return request({
      url: '/mms.LocationModel/getLocationModel',
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
  }
  export function GetLocationType(data) {
    return request({
      url: '/mms.LocationType/getLocationType',
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
  }
  export function AddLocationType(data) {
    return request({
      url: '/mms.LocationType/addLocationType',
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
  }
  export function ModifyLocationType(data) {
    return request({
      url: '/mms.LocationType/modifyLocationType',
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
  }