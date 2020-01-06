const key ='token'

export function seToken(token){
    return window.localStorage.setItem(key,token)
}
export function geToken(){
    return window.localStorage.getItem(key)
}
export function removeToken(){
    return window.localStorage.removeItem(key)
}