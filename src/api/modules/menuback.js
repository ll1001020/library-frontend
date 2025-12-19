import request from "@/api/request.js";

export const getMenuBackList = (params) =>
  request({
    url: "menu-back/getMenuBackList",
    method: "get",
    params,
  });
