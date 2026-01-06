import request from "@/api/request.js";

export const getAllBooksList = (params) =>
  request({
    url: "books/getAllBooksList",
    method: "get",
    params
  });

export const getBooksList = (params) =>
  request({
    url: "books/getBooksList",
    method: "post",
    params
  });

export const searchBook = (data,params) =>
  request({
    url: "books/searchBook",
    method:"post",
    data,
    params
  });

export const deleteSelectBook = (params) =>
  request({
    url: "books/deleteSelectBook",
    method:"get",
    params
  })

export const deleteSelectBookList = (data) =>
  request({
    url: "books/deleteSelectBookList",
    method:"post",
    data
  })

export const editSelectBook = (data) =>
  request({
    url:'books/editSelectBook',
    method:"post",
    data
  })

export const addBook = (data) =>
  request({
    url: 'books/addBook',
    method: 'post',
    data
  })

export const addBatchBook = (data) =>
  request({
    url: 'books/addBatchBook',
    method: 'post',
    data
  })

export const findBookByCategoryId = (params) =>
  request({
    url:'books/findBookByCategoryId',
    method:'get',
    params
  })

  // 获取本月最新的书籍
export const getNewBookList = ()=>
  request({
    url: 'books/getNewBookList',
    method: 'get'
  })
