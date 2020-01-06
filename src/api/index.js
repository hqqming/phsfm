import axios from 'axios'
import {geToken} from '../utils/token'
export function info(){
    return axios({
        url:process.env.VUE_APP_BASEURL+'/info',
        method:'get',
        headers:{
            token:geToken()
        }
    })
}
export function logout(){
    return axios({
        url:process.env.VUE_APP_BASEURL+'/logout',
        method:'get',
        headers:{
            token:geToken()
        }
    })
}