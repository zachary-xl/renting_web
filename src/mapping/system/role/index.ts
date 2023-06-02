const role = () => import("@/views/system/role/index.vue");
export default {
  path: "/system/role",
  name: "Role",
  component: role,
  children: []
};
