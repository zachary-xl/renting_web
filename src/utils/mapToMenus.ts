import type { RouteRecordRaw, RouteRecordName } from "vue-router";
import router from "@/router";

export function loadLocalRoutes() {
  // 加载所有的模板
  const modules = import.meta.glob(`../mapping/**/*.ts`, { eager: true });
  // 遍历所有的模板为路由对象
  const routes: RouteRecordRaw[] = [];
  for (const key in modules) {
    let module = modules[key] as any;
    if (modules.hasOwnProperty(key) && module) {
      const route = module!.default as RouteRecordRaw;
      routes.push(route);
    }
  }
  return routes;
}

// TOD 添加路由
export function addRoutesWithMenu(menuList, routeName: RouteRecordName = "Layout") {
  if (!menuList.length) return;
  for (const item of menuList) {
    if (!router.hasRoute(item.path) && !item.meta?.link) {
      router.addRoute(routeName, item);
    }
  }
}

// TOD 清空路由
export function removeRoutesWithMenu(menuList) {
  menuList.map(menu => {
    router.removeRoute(menu.name);
    if (router.options.routes) {
      router.options.routes.slice(router.options.routes.indexOf(menu), 1);
    }
  });
}

// TOD 映射菜单与树形菜单做对比
export function mapPathToMenu(menus, local) {
  return menus.map(({ children, id, pid, title, icon, link, ...menu }) => {
    if (children?.length) {
      menu.children = mapPathToMenu(children, local);
    }
    let findRoute: RouteRecordRaw = local.find(route => route.name === menu.name && route.path === menu.path);
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

// TOD 展开菜单转树结构
export function formatTree(list) {
  let result: RouteRecordRaw[] = [];
  let dataMap = {};
  for (const item of list) {
    let { id, pid } = item;
    dataMap[id] = {
      ...item,
      children: dataMap[id]?.children || []
    };
    let curItem = dataMap[id];
    if (pid === 0) {
      result.push(curItem);
    } else {
      if (!dataMap[pid]) {
        dataMap[pid] = {
          children: []
        };
      }
      dataMap[pid]["children"].push(curItem);
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
