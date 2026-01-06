import request from '@/api/request.js'

export const getBookCopy = (data) =>
    request({
        url:'book-copies/getBookCopy',
        method:'post',
        data
    }) 

export const searchBookCopy = (data,params) =>
    request({
        url: 'book-copies/searchBookCopy',
        method: 'post',
        data,
        params
    })

export const deleteSelectCopy = (params) =>
    request({
        url: 'book-copies/deleteSelectCopy',
        method: 'get',
        params
    })

export const deleteSelectCopyList = (data) =>
  request({
    url: "book-copies/deleteSelectCopyList",
    method:"post",
    data
  })

export const editSelectCopy = (data) =>
    request({
        url: "book-copies/editSelectCopy",
        method: "post",
        data
    })

export const addCopy = (data) =>
    request({
        url: "book-copies/addCopy",
        method: "post",
        data
    })

export const addBatchCopy = (data) =>
    request({
        url: "book-copies/addBatchCopy",
        method: "post",
        data
    })

// 获取选中书籍副本的数据
export const getBookCopyById = (params) =>
  request({
    url: 'book-copies/getBookCopyById',
    method: 'get',
    params
  })