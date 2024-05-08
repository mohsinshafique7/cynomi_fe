import { render, screen } from "@testing-library/react"
import UserList from "../components/User"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { http, HttpResponse } from "msw"
import { setupServer } from "msw/node"
const server = setupServer(
  http.get("https://jsonplaceholder.typicode.com/users", () => {
    return HttpResponse.json([
      {
        id: 1,
        name: "Mohsin Mirza",
        username: "Bret",
        email: "Sincere@april.biz",
        address: {
          street: "Kulas Light",
          suite: "Apt. 556",
          city: "Gwenborough",
          zipcode: "92998-3874",
          geo: {
            lat: "-37.3159",
            lng: "81.1496",
          },
        },
        phone: "1-770-736-8031 x56442",
        website: "hildegard.org",
        company: {
          name: "Romaguera-Crona",
          catchPhrase: "Multi-layered client-server neural-net",
          bs: "harness real-time e-markets",
        },
      },
    ])
  })
)
describe("asd", () => {
  beforeAll(() => {
    // Start the interception.
    server.listen()
  })

  afterEach(() => {
    // Remove any handlers you may have added
    // in individual tests (runtime handlers).
    server.resetHandlers()
  })

  afterAll(() => {
    // Disable request interception and clean up.
    server.close()
  })
  test("renders user list", async () => {
    const queryClient = new QueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <UserList />
      </QueryClientProvider>
    )

    expect(screen.getByText("Loading...")).toBeInTheDocument()

    // Wait for the loading state to resolve
    await screen.findByText("User List")

    // expect(screen.getByText("User 1")).toBeInTheDocument()
    // expect(screen.getByText("User 2")).toBeInTheDocument()
    // expect(screen.getByText("User 3")).toBeInTheDocument()
  })
})
