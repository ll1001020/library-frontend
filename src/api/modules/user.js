import request from "@/api/request.js";

export const login = (params) =>
    request({
        url:'users/login',
        method:'get',
        params
    })

export const getUser = (data) =>
    request({
        url: 'users/getUser',
        method: 'post',
        data
    })

export const searchUser = (data,params) =>
    request({
        url: 'users/searchUser',
        method: 'post',
        data,
        params
    })

export const addUser = (data) =>
    request({
        url: 'users/addUser',
        method: 'post',
        data
    })

export const addBatchUser = (data) =>
    request({
        url: 'users/addBatchUser',
        method: 'post',
        data
    })

export const editSelectUser = (data) =>
    request({
        url: 'users/editSelectUser',
        method: 'post',
        data
    })
    
export const deleteSelectUser = (params) =>
    request({
        url: 'users/deleteSelectUser',
        method: 'get',
        params
    })

export const deleteSelectUserList = (data) =>
    request({
        url: 'users/deleteSelectUserList',
        method: 'post',
        data
    })

export const addUserInBlack = (params) =>
    request({
        url: 'users/addUserInBlack',
        method: 'get',
        params
    })

export const removeUserInBlack = (params) =>
    request({
        url: 'users/removeUserInBlack',
        method: 'get',
        params
    })

export const getBlackUser = (data) =>
    request({
        url: 'users/getBlackUser',
        method: 'post',
        data
    })

export const searchBlackUser = (data,params) =>
    request({
        url: 'users/searchBlackUser',
        method: 'post',
        data,
        params
    })