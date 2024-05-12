import nock from "nock"
import { useGetAllAccounts, useGetLastSevenDaysData } from "../Hooks/Request"
import { renderHook, waitFor } from "@testing-library/react"
import AxiosInstance from "../axiosConfig"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
const queryClient = new QueryClient()

// Wrap your hook with QueryClientProvider
const wrapper = ({ children }: { children?: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)
//Mocking Axios used in Our Custom Hook
jest.mock("../axiosConfig")
describe("Testing Get Request Hooks", () => {
  afterEach(() => {
    nock.cleanAll()
  })
  it("useGetAllAccounts fetches data correctly", async () => {
    // Define mock response data
    const responseData = {
      rows: [
        { id: 1, name: "John", gender: "male", noOfEntries: 5 },
        { id: 2, name: "Jane", gender: "female", noOfEntries: 3 },
      ],
      count: 2,
    }
    const axios: jest.Mock = AxiosInstance

    axios.get.mockResolvedValueOnce({
      data: responseData,
    })
    // Mock the API request using Nock
    nock("http://localhost:5000/api")
      .get(`/accounts`)
      .query({ perPage: 10, currentPage: 1 })
      .reply(200, responseData)

    const perPage: number = 10
    const currentPage: number = 1

    const { result } = renderHook(
      () => useGetAllAccounts({ perPage, currentPage }),
      { wrapper }
    )

    await waitFor(() => {
      expect(result.current.data).toEqual({
        rows: [
          { key: 1, name: "John", gender: "male", noOfEntries: 5 },
          { key: 2, name: "Jane", gender: "female", noOfEntries: 3 },
        ],
        count: 2,
      })
    })
  })
  it("useGetLastSevenDaysData fetches data correctly", async () => {
    const selectedRowKeys = ["exampleKey"]
    const responseData = {
      rows: [
        { date: "2024-05-01", sleepHours: 7 },
        { date: "2024-05-02", sleepHours: 6 },
      ],
    }
    const axios: jest.Mock = AxiosInstance

    axios.get.mockResolvedValueOnce({
      data: responseData,
    })
    nock("http://localhost:5000/api")
      .get(`/sleep-records/last-seven/+${selectedRowKeys[0]}`)
      .reply(200, responseData)
    const { result } = renderHook(
      () => useGetLastSevenDaysData(selectedRowKeys),
      { wrapper }
    )

    await waitFor(() => {
      console.log(result.current.data)

      expect(result.current.data).toEqual([
        { date: "2024-05-01", sleepHours: 7 },
        { date: "2024-05-02", sleepHours: 6 },
      ])
    })
  })
})
