import { useQuery } from "@tanstack/react-query"
import React from "react"

const fetchUsers = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users")
  if (!response.ok) {
    throw new Error("Failed to fetch users")
  }
  return response.json()
}

const UserList = () => {
  const { data, isLoading, isError } = useQuery<any>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  })

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error fetching users</div>

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {data.map((user: any) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}
export default UserList
