const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,

  // 框架外
  // userId: state => state.user.userId,
  // userClient: state => state.user.userClient,
  
}
export default getters
