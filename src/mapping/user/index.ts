const user = () => import("@/views/user/index.vue");

export default {
  path: "/user",
  name: "User",
  component: user,
  children: []
};
