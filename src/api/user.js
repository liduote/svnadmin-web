import qs from 'qs'
import axios from '@/libs/api.request'
import { LOGIN, ADMIN_USERS, CHPASSWD } from './path'
import { getToken } from '@/libs/util'

export const login = ({ userName, password }) => {
  const data = {
    username: userName,
    password: password
  }
  return axios.request({
    url: LOGIN,
    data: qs.stringify(data),
    method: 'post'
  }).then(res => res.data)
}

export const getUserInfo = (token) => {
  return axios.request({
    url: 'get_info',
    params: {
      token
    },
    method: 'get'
  })
}

export const getUserList = (params) => {
  return axios.request({
    url: ADMIN_USERS,
    params: params,
    headers: {
      'Authorization': 'Bearer ' + getToken()
    }
  }).then(res => res.data)
}

export const createUser = (user) => {
  return axios.request({
    url: ADMIN_USERS,
    data: qs.stringify(user),
    headers: {
      'Authorization': 'Bearer ' + getToken()
    },
    method: 'post'
  }).then(res => res.data)
}

export const updateUsers = (users) => {
  return axios.request({
    url: ADMIN_USERS,
    data: users,
    headers: {
      'Authorization': 'Bearer ' + getToken()
    },
    method: 'put'
  }).then(res => res.data)
}

export const deleteUsers = (users) => {
  return axios.request({
    url: ADMIN_USERS,
    data: users,
    headers: {
      'Authorization': 'Bearer ' + getToken()
    },
    method: 'delete'
  }).then(res => res.data)
}

export const chpasswd = (params) => {
  return axios.request({
    url: CHPASSWD,
    data: qs.stringify(params),
    headers: {
      'Authorization': 'Bearer ' + getToken()
    },
    method: 'post'
  }).then(res => res.data)
}

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}

export const getUnreadCount = () => {
  return axios.request({
    url: 'message/count',
    method: 'get'
  })
}

export const getMessage = () => {
  return axios.request({
    url: 'message/init',
    method: 'get'
  })
}

export const getContentByMsgId = msg_id => {
  return axios.request({
    url: 'message/content',
    method: 'get',
    params: {
      msg_id
    }
  })
}

export const hasRead = msg_id => {
  return axios.request({
    url: 'message/has_read',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const removeReaded = msg_id => {
  return axios.request({
    url: 'message/remove_readed',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const restoreTrash = msg_id => {
  return axios.request({
    url: 'message/restore',
    method: 'post',
    data: {
      msg_id
    }
  })
}
