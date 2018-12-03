import axios from 'axios'
import config from '../../../config/index'

const validateToken = async ({ commit, dispatch }, data) => {
  let params = {
    method: 'get',
    baseURL: config.url,
    url: '/users',
    responseType: 'json',
    headers: { 'apikey': data.token }
  }
  let response = await axios(params)
    .then(function (response) {
      if (response.status === 200 && response.data.results.length > 0) {
        let user = response.data.results[0]
        commit('SET_USER_DATA', { user: { id: user.id } })
      }
      return response
    })
    .catch(function (error) {
      return error.response
    })
  return response
}

const setToken = ({ commit, dispatch }, data) => {
  commit('SET_TOKEN', data.token)
}

export default {
  validateToken,
  setToken
}
