import request from '@/utils/request'

export function GetmodelType(data) {
    return request({
      url: '/mms.ModelType/getModelType',
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
  }
  export function AddmodelType(data) {
    return request({
      url: '/mms.ModelType/addModelType',
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
  }
  export function RemoveModelType(data) {
    return request({
      url: '/mms.ModelType/removeModelType',
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
  }
  export function GetmodelList(data) {
    return request({
      url: '/mms.Model/getModel',
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
  }
  export function GetModelAttach(data) {
    return request({
      url: '/mms.ModelAttach/getModelAttach',
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
  }
  export function AddmodelList(data) {
    return request({
      url: '/mms.Model/addModel',
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
  }
  export function ModifyModel(data) {
    return request({
      url: '/mms.Model/modifyModel',
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
  }
  export function RemoveModel(data) {
    return request({
      url: '/mms.Model/removeModel',
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
  }