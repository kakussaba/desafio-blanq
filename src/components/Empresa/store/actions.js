import axios from 'axios/index'
import config from '../../../config'

const loadEmpresas = async ({ commit, dispatch }, data) => {
  let params = {
    method: 'get',
    baseURL: config.url,
    url: '/companies',
    responseType: 'json',
    headers: { 'apikey': data.token },
    params: data.params
  }
  let response = await axios(params)
    .then(function (response) {
      if (response.status === 200 && response.data.results.length > 0) {
        return response.data
      }
      return {}
    })
    .catch(function (error) {
      console.error(error)
      return {
        error: 'Erro ao consultar dados'
      }
    })
  return response
}
const saveCompany = async ({ commit, dispatch }, data) => {
  let params = {
    method: 'post',
    baseURL: config.url,
    url: '/companies',
    responseType: 'json',
    headers: { 'apikey': data.token },
    data: data.empresa
  }
  let response = await axios(params)
    .then(function (response) {
      if (response.status === 200) {
        return response
      }
      return response
    })
    .catch(function (error) {
      console.log(error)
      return {
        error: 'Erro ao inserir dados'
      }
    })
  return response
}
const getEmpresaById = async ({ commit, dispatch }, data) => {
  let params = {
    method: 'get',
    baseURL: config.url,
    url: '/companies/' + data.id,
    responseType: 'json',
    headers: { 'apikey': data.token }
  }
  let response = await axios(params)
    .then(function (response) {
      if (response.status === 200) {
        return response
      }
    })
    .catch(function (error) {
      console.log(error)
      return {
        error: 'Erro ao consultar dados'
      }
    })
  return response
}
const updateEmpresa = async ({ commit, dispatch }, data) => {
  let params = {
    method: 'put',
    baseURL: config.url,
    url: '/companies/' + data.empresa.id,
    responseType: 'json',
    headers: { 'apikey': data.token },
    data: data.empresa
  }
  let response = await axios(params)
    .then(function (response) {
      if (response.status === 200) {
        return response
      }
      return response
    })
    .catch(function (error) {
      console.log(error)
      return {
        error: 'Erro ao inserir dados'
      }
    })
  return response
}

export default {
  loadEmpresas,
  saveCompany,
  getEmpresaById,
  updateEmpresa
}
