import request from "@/api/request.js";

export const getBookCategoryTree = (params) =>
  request({
    url: "book-category/getBookCategoryTree",
    method: "get",
    params
  });

 
