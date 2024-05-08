import axios from "axios"
export const postTodo = async (data: any) => {
  const response = await axios.post(
    "http://localhost:5000/api/accounts",
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
  return response
}
// perPage: 3,
// currentPage: 1,
export const getAllAccounts = async (props: any) => {
  const response = await axios.get(
    `http://localhost:5000/api/accounts?perPage=${props.perPage}&currentPage=${props.currentPage}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
  return response
}
export const getLastSevenDaysData = async (id: string) => {
  const response = await axios.get(
    `http://localhost:5000/api/sleep-records/last-seven/+${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
  return response
}
