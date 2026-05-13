import type { RouteRecordRaw } from "vue-router";

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 加载所有的routes
  const allRoutes: RouteRecordRaw[] = []
  const  routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    const route = routeFiles(key)
    allRoutes.push(route.default)
  })

  // 根据菜单获取需要添加的 routes
  // _recurseGetRoute的设计目的不是为了让路由变得完整，而是为了从完整路由表中筛选出当前用户有权限的那一部分路由。虽然allRoutes已经是一个完整的RouteRecordRaw[]，从"路由格式是否正确"的角度看，它完全可以被router.addRoute()注册；但是从"当前用户是否有权限访问这些路由"的角度看，它太完整了，所以不能直接注册
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) { routes.push(route) }
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }
  _recurseGetRoute(userMenus)
  return routes
}