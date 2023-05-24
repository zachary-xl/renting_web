import type { RouteRecordRaw } from "vue-router";

export function loadLocalRoutes() {
  // 加载所有的模板
  const modules = import.meta.glob("../mapping/**/*.ts", { eager: true });
  // 遍历所有的模板为路由对象
  const routes = [];
  for (const key in modules) {
    const route: RouteRecordRaw[] = modules[key].default;
    routes.push(route);
  }
  return routes;
}

function mapMenuToRoutes() {
  const localRoutes = loadLocalRoutes()
}

export function formatTree(list) {
  let result = [];
  let dataMap = {};
  for (const item of list) {
    let id = item.id,
      pid = item.pid;
    dataMap[id] = {
      ...item,
      children: dataMap[id]?.children || []
    };
    let tempItem = dataMap[id];
    if (pid === 0) {
      result.push(tempItem);
    } else {
      if (!dataMap[pid]) {
        dataMap[pid] = {
          children: []
        };
      }
      dataMap[pid]["children"].push(tempItem);
    }
  }
  return result;
}

export function filterAsyncRoutes(routes, roles) {
  routes.map(route => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
    }
  });
}

export function hasPermission(role, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.includes(role);
  } else {
    return true;
  }
}
