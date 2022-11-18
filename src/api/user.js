import request from '@/utils/request'

export function login(user) {
  return request({
    url: '/api/auth/validate_username_password',
    method: "Post",
    data:{
      user:{
        source_type:"Admin",
        username: user.username,
        password: user.password  
      }
      }
  })
}
export function getcamera_captures(params){
  return request({
    url:"/api/camera_captures",
    method:"get",
    params
  })
}

export function getlocation(params){
  return request({
    url:"/api/location_events",
    method:"get",
    params
  })
}
export function getcamera(){
  return request({
    url:"/api/cameras",
    method:"get"
  })
}