import axios from 'axios'
import { geToken } from '../utils/token'

const subject = axios.create({
    baseURL: process.env.VUE_APP_BASEURL
})

subject.interceptors.request.use(function (config) {
    config.headers.token = geToken()
    return config;
}, function (error) {
    return Promise.reject(error);
});

subject.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return Promise.reject(error);
});

export function subjectList(params) {
    return subject({
        url: "/subject/list",
        method: "get",
        params
    })
}
export function subjectAdd(data) {
    return subject({
        url: "/subject/add",
        method: "post",
        data
    })
}
export function subjectStatus(data) {
    return subject({
        url: "/subject/status",
        method: "post",
        data
    })
}
export function subjectEdit(data) {
    return subject({
        url: "/subject/edit",
        method: "post",
        data
    })
}
export function subjectRemove(data) {
    return subject({
        url: "/subject/remove",
        method: "post",
        data
    })
}
