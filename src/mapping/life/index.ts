const life = () => import("@/views/life/index.vue");

export default {
  path: "/life",
  name: "Life",
  component: life,
  children: []
};
