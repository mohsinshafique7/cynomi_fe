import axios from "axios"

// console.log(__dirname + "/.env.dev")
const instance = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
})
axios.interceptors.request.use(
  (request) => {
    console.log(request)
    // Edit request config
    return request
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response) => {
    console.log(response)
    // Edit response config
    return response
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

export default instance
