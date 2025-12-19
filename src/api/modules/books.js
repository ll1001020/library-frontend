import request from "@/api/request.js";

export const getBooksList = (params) =>
  request({
    url: "books/getBooksList",
    method: "post",
    params
  });

export const searchBook = (params) =>
  request({
    url: "books/searchBook",
    method:"post",
    params
  })
