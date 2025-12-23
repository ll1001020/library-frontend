import request from "@/api/request.js";

// 不带分页获取所有数据
export const getMenuList = (params) =>
  request({
    url: "menu/getMenuList",
    method: "get",
    params,
  });

