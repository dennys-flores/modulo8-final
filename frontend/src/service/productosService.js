import axios from 'axios'

export const productosService = {
  lista,
  insertar,
  modificar,
  eliminar
}

function lista() {
  return axios.get('http://localhost:5000/Productos')
    .then((response) => Promise.resolve(response.data))
    .catch((error) => Promise.reject(error.response))
}

function insertar(body) {
  return axios.post(`http://localhost:5000/Productos`, body)
    .then((response) => Promise.resolve(response.data))
    .catch((error) => Promise.reject(error.response))
}

function modificar(body) {
  return axios.put(`http://localhost:5000/Productos/${body.id}`, body)
    .then((response) => Promise.resolve(response.data))
    .catch((error) => Promise.reject(error.response))
}

function eliminar(body) {
  return axios.delete(`http://localhost:5000/Productos/${body.id}`, {})
    .then((response) => Promise.resolve(response.data))
    .catch((error) => Promise.reject(error.response))
}
