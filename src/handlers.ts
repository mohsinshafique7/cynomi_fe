import { http, HttpResponse } from "msw"

let users = [{ id: 1, name: "Tina" }]

export const handlers = [
  //GET request handler
  http.get("http://localhost:3000/api/users", (resolver) => {
    return HttpResponse.json(users)
  }),
  //POST request handler
  http.post("http://localhost:3000/api/users", async ({ request }) => {
    const requestBody: any = await request.json()

    console.log(requestBody)
    return HttpResponse.json(
      {
        content: requestBody.content,
        name: requestBody.name,
      },
      { status: 201 }
    )
  }),

  // PUT request handler
  http.put(
    "http://localhost:3000/api/users/:userID",
    async ({ request, params }) => {
      const { userID } = params // Extracting the user ID from the request URL
      const updatedUserData: any = await request.json()
      users = users.map((user: any) => {
        if (user.id === userID) {
          return {
            ...user,
            ...updatedUserData,
          }
        }
        return user
      })

      return HttpResponse.json(updatedUserData, { status: 200 })
    }
  ),
]
