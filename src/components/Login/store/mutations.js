const SET_USER_DATA = (state, data) => {
  state.user = data.user
}

const SET_TOKEN = (state, token) => {
  state.token = token
}

export default {
  SET_USER_DATA,
  SET_TOKEN
}
