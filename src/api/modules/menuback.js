import request from "@/api/request.js";

export const getMenuBackList = (params) =>
  request({
    url: "menu-back/getMenuBackList",
    method: "get",
    params,
  });

export const getMenuBack = (data) =>
  request({
    url: "menu-back/getMenuBack",
    method: 'post',
    data
  })

export const searchMenuBack = (data,params) =>
  request({
    url: 'menu-back/searchMenuBack',
    method: 'post',
    data,
    params
  })

export const addMenuBack = (data) =>
  request({
    url: 'menu-back/addMenuBack',
    method: 'post',
    data
  })

export const deleteSelectMenuBack = (params) =>
  request({
    url: 'menu-back/deleteSelectMenuBack',
    method: 'get',
    params
  })

export const editSelectMenuBack = (data) =>
  request({
    url: 'menu-back/editSelectMenuBack',
    method: 'post',
    data
  })