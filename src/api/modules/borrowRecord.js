import request from "@/api/request.js";

// 获取所有借阅记录
export const getBorrowRecord = (data) =>
    request({
        url: 'borrow-records/getBorrowRecord',
        method: 'post',
        data
    })

// 搜索借阅记录
export const searchRecord = (data,params) =>
    request({
        url: 'borrow-records/searchRecord',
        method: 'post',
        data,
        params
    })

// 登记选中记录归还
export const borrowReturn = (data,params) =>
    request({
        url: 'borrow-records/borrowReturn',
        method: 'post',
        data,
        params
    })

// 为选中记录进行续借
export const borrowRenew = (data,params) =>
    request({
        url: 'borrow-records/borrowRenew',
        method: 'post',
        data,
        params
    })

// 批量删除选中的借阅记录
export const deleteSelectBorrowList = (data) =>
    request({
        url: 'borrow-records/deleteSelectBorrowList',
        method: 'post',
        data
    })