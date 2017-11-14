const getters = {
  sidebar: state => state.app.sidebar,
  defaultImg: state => state.app.defaultImg,
  pagination: state => state.app.pagination,
  token: state => state.user.token,
  name: state => state.user.name,
  roles: state => state.user.roles,
  avatar: state => state.user.avatar,
  addRouters: state => state.permission.addRouters
};
export default getters
