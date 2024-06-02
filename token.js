const jwt_decode = require('jwt-decode')

export function getToken(){
    try {
        return localStorage.getItem('admin-token');
    } catch (error) {
        return null;
    }
}

export function readToken(){
    let token = getToken();
    return token? jwt_decode.jwtDecode(token):null;
}