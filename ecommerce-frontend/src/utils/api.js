import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

console.log('API_URL:', API_URL)

const api = axios.create({
  baseURL: API_URL,
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Products
export const getProducts = (params) => api.get('/products', { params })
export const getProduct = (id) => api.get(`/products/${id}`)
export const createProduct = (data) => api.post('/products', data)
export const updateProduct = (id, data) => api.put(`/products/${id}`, data)
export const deleteProduct = (id) => api.delete(`/products/${id}`)
export const getCategories = () => api.get('/products/categories')

// Users
export const registerUser = (data) => api.post('/users/register', data)
export const loginUser = (data) => api.post('/users/login', data)
export const getUserProfile = () => api.get('/users/profile')

// Orders
export const createOrder = (data) => api.post('/orders', data)
export const getMyOrders = () => api.get('/orders/my-orders')
export const getAllOrders = () => api.get('/orders')

export default api