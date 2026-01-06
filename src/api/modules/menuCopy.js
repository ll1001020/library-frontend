import request from '@/api/request'

export const getMenuCopyList = ()=>
  request({
    url: 'menu-copy/getMenuCopyList',
    method: 'get'
  })


// 获取所有前端菜单并获取分页数据
export const getMenuCopy = (params) =>
  request({
    url: 'menu-copy/getMenuCopy',
    method: 'get',
    params
  })

// 搜索前台菜单副本
export const searchMenuCopy = (data,params)=>
  request({
    url: 'menu-copy/searchMenuCopy',
    method: 'post',
    data,
    params
  })

// 添加前台菜单副本数据
export const addMenuCopy = (data)=>
  request({
    url: 'menu-copy/addMenuCopy',
    method: 'post',
    data
  })

// 修改选中的前台菜单副本数据
export const editSelectMenuCopy = (data)=>
  request({
    url: 'menu-copy/editSelectMenuCopy',
    method: 'post',
    data
  })

// 删除当前选中的前台菜单副本
export const deleteSelectMenuCopy = (params) =>
  request({
    url: 'menu-copy/deleteSelectMenuCopy',
    method: 'get',
    params
  })

// 更新前台菜单为前台副本菜单，同步数据
export const updateFrontMenu = () =>
  request({
    url: 'menu-copy/updateFrontMenu',
    method: 'get'
  })
