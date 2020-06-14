import qs from 'qs'
import axios from '@/libs/api.request'
import { PROJECT, PROJECT_DETAIL } from './path'

export const createProject = (data) => {
  return axios.request({
    url: PROJECT,
    data: qs.stringify(data),
    method: 'POST'
  }).then(res => res.data)
}

export const getProjectList = (searchValue) => {
  return axios.request({
    url: PROJECT,
    method: 'GET',
    params: {
      searchValue: searchValue
    }
  }).then(res => res.data)
}

export const getProjectById = (projectId) => {
  return axios.request({
    url: PROJECT_DETAIL.replace('{projectId}', projectId),
    method: 'GET'
  }).then(res => res.data)
}

export const updateProject = (data) => {
  return axios.request({
    url: PROJECT,
    data: qs.stringify(data),
    method: 'PUT'
  }).then(res => res.data)
}

export const delProject = (projectId) => {
  return axios.request({
    url: PROJECT_DETAIL.replace('{projectId}', projectId),
    method: 'DELETE'
  }).then(res => res.data)
}

export const saveProjectAuth = (project) => {
  return axios.request({
    url: PROJECT_DETAIL.replace('{projectId}', project.id) + '/auth',
    data: qs.stringify(project),
    method: 'POST'
  }).then(res => res.data)
}
