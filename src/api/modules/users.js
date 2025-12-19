import request from "@/api/request.js";

export const login = (params) =>
    request({
        url:'users/login',
        method:'get',
        params
    })
    
