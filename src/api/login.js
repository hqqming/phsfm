import axios from 'axios'

export function login(data) {
  return axios({
    url: process.env.VUE_APP_BASEURL + "/login",
    method: "post",
    withCredentials: true, //跨域携带cookie
    data
  })
}

export function register(data) {
  return axios({
    url: process.env.VUE_APP_BASEURL + "/register",
    method: "post",
    withCredentials: true,
    data
  })
}

export function sendsms(data) {
  return axios({
    url: process.env.VUE_APP_BASEURL + "/sendsms",
    method: "post",
    withCredentials: true,
    data
  })
}