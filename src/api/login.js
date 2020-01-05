import axios from 'axios'

export function login(data){
    return axios({
        url: process.env.VUE_APP_BASEURL + "/login",
        method: "post",
        withCredentials: true, //跨域携带cookie
        data
      })
}