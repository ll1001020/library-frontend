import request from "@/api/request.js";

// 提交用户信息和书籍编号，申请借阅书籍
export const applyBorrow = (data,params) =>
    request({
        url: 'borrow-records-request/applyBorrow',
        method: 'post',
        data,
        params
    })

// 获取所有借阅申请记录
export const getBorrowRequest = (data) =>
    request({
        url: 'borrow-records-request/getBorrowRequest',
        method: 'post',
        data
    })

// 搜素指定借阅申请记录
export const searchRequest = (data,params) =>
    request({
        url: 'borrow-records-request/searchRequest',
        method: 'post',
        data,
        params
    })

// 批准选中的借阅申请记录
export const permitRequest = (data,params) =>
    request({
        url: 'borrow-records-request/permitRequest',
        method: 'post',
        data,
        params
    })

// 打回选中的借阅申请记录
export const permitRequestReject = (data,params) =>
    request({
        url: 'borrow-records-request/permitRequestReject',
        method: 'post',
        data,
        params
    })

// 批量删除选中的借阅申请记录
export const deleteSelectRequest = (data)=>
    request({
        url: 'borrow-records-request/deleteSelectRequest',
        method: 'post',
        data
    }) 

