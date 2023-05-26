import type { RouteRecordRaw } from "vue-router";
import router from "@/router";

export function loadLocalRoutes() {
  // 加载所有的模板
  const modules = import.meta.glob(`../mapping/**/*.ts`, { eager: true });
  // 遍历所有的模板为路由对象
  const routes: RouteRecordRaw[] = [];
  for (const key in modules) {
    const route: RouteRecordRaw = modules[key].default;
    routes.push(route);
  }
  return routes;
}

export function addRoutesWithMenu(menuList) {
  if (menuList.length) return;
  for (const item of menuList) {
    router.addRoute(item);
  }
}

export function mapPathToMenu(list) {
  const treeList = formatTree(list);
  const localRoutes = loadLocalRoutes();
  const menuList = _recurseGetRoute(treeList, localRoutes);
  addRoutesWithMenu(menuList);
  return menuList;

  // 映射菜单与树形菜单做对比
  function _recurseGetRoute(menus, localRoutes) {
    return menus.map(({ children, id, pid, title, icon, link, ...menu }) => {
      if (children?.length) {
        menu.children = _recurseGetRoute(children, localRoutes);
      }
      let findRoute: RouteRecordRaw = localRoutes.find(route => route.name === menu.name && route.path === menu.path);
      return {
        ...menu,
        meta: {
          title: title ?? "",
          icon: icon ?? "",
          link: link ?? ""
        },
        name: findRoute.name,
        path: findRoute.path,
        component: findRoute.component
      };
    });
  }
}

export function formatTree(list) {
  let result: RouteRecordRaw[] = [];
  let dataMap = {};
  for (const item of list) {
    let { id, pid } = item;
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
