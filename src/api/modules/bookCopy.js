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