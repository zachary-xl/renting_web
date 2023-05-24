let menu = [
  {
    id: 1,
    title: "系统管理",
    name: "System",
    path: "system",
    icon: "",
    pid: 0
  },
  {
    id: 2,
    title: "用户管理",
    name: "User",
    path: "system/user",
    icon: "",
    pid: 1
  },
  {
    id: 3,
    title: "菜单管理",
    name: "Menu",
    path: "system/menu",
    icon: "",
    pid: 1
  },
  {
    id: 4,
    title: "生活",
    name: "Life",
    path: "life",
    icon: "",
    pid: 0
  }
];

function formatTree(list) {
  const result = [];
  const itemMap = {};
  for (const item of list) {
    const id = item.id;
    const pid = item.pid;
    if (!itemMap[id]) {
      itemMap[id] = {
        children: []
      };
    }
    itemMap[id] = {
      ...item,
      children: itemMap[id]["children"]
    };
    const treeItem = itemMap[id];
    if (pid === 0) {
      result.push(treeItem);
    } else {
      if (!itemMap[pid]) {
        itemMap[pid] = {
          children: []
        };
      }
      itemMap[pid].children.push(treeItem);
    }
  }
  return result;
}

function routerWithStructures(arr) {
  let result = [];
  for (let item of arr) {
    let children = [];
    if (item.children.length > 0) {
      children = routerWithStructures(item.children);
    }
    result.push({
      id: item.id,
      pid: item.pid,
      meta: {
        title: item.title,
        icon: item.icon
      },
      children,
      component: () => import(`@/views/${item.path}/index.vue`)
    });
  }
  return result;
}

console.log(routerWithStructures(formatTree(menu)));

export function filterAsyncRoutes(routes, roles) {
  routes.map(route => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      res.push(tmp);
    }
  });

  return res;
}

function hasPermission(role, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.includes(role);
  } else {
    return true;
  }
}
