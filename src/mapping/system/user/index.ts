const user = () => import('@/views/system/user/index.vue')
export default {
  path: '/system/user',
  name: 'User',
  component: user,
  children: []
}
