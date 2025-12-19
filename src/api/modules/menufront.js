import request from "@/api/request.js";

export const getMenuList = (params) =>
  request({
    url: "menu/getMenuList",
    method: "get",
    params,
  });
