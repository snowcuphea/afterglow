import axios from 'axios'

const API_BASE_URL = "asd"

function createInstance() {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json"
    }
  })
  return instance
}

function createInstancePicture() {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
  return instance
}

export { createInstance, createInstancePicture }