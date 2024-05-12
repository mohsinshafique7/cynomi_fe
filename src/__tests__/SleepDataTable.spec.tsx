// A Custom Wrapper for All render methods
import { fireEvent, render, screen } from "../test.utils"
import { act } from "react"
import { useGetAllAccounts, useGetLastSevenDaysData } from "../Hooks/Request"
import SleepDataTable from "../components/SleepDataTable"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

jest.mock("../Hooks/Request", () => ({
  useGetAllAccounts: jest.fn(),
  useGetLastSevenDaysData: jest.fn(),
}))
jest.mock("../components/Charts", () => () => (
  <div data-testid="charts">Charts</div>
))
describe("Test Accounts", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  it("Loading component should be displayed", async () => {
    ;(useGetAllAccounts as jest.Mock).mockReturnValue({
      isLoading: true,
      isError: false,
      data: null,
    })
    ;(useGetLastSevenDaysData as jest.Mock).mockReturnValue({
      isoading: false,
      isError: false,
      data: null,
    })

    render(<SleepDataTable />)
    expect(screen.getByTestId("loading")).toBeInTheDocument()
    expect(screen.queryByText(/"History Table"/i)).not.toBeInTheDocument()
    expect(screen.queryByTestId("charts")).not.toBeInTheDocument()
  })
  it("renders error component when account data fetch fails", () => {
    ;(useGetAllAccounts as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: true,
      data: null,
    })
    ;(useGetLastSevenDaysData as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      data: null,
    })

    render(<SleepDataTable />)

    expect(screen.getByText(/Error Occurred/i)).toBeInTheDocument()
    expect(screen.getByText(/Refresh Page/i)).toBeInTheDocument()
    expect(screen.queryByTestId("charts")).not.toBeInTheDocument()
  })
  it("renders account data but not charts on successful data fetch", async () => {
    ;(useGetAllAccounts as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        rows: [
          { key: "1", name: "John", gender: "Male", noOfEntries: 5 },
          { key: "2", name: "Alice", gender: "Female", noOfEntries: 3 },
        ],
        count: 2,
      },
    })
    ;(useGetLastSevenDaysData as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      data: null,
    })

    render(<SleepDataTable />)

    expect(screen.getByText("John")).toBeInTheDocument()
    expect(screen.getByText("Male")).toBeInTheDocument()
    expect(screen.getByText("5")).toBeInTheDocument()
    expect(screen.queryByTestId("charts")).not.toBeInTheDocument()
  })

  it("On Click Show Charts Component", async () => {
    ;(useGetAllAccounts as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        rows: [
          { key: "1", name: "John", gender: "Male", noOfEntries: 5 },
          { key: "2", name: "Alice", gender: "Female", noOfEntries: 3 },
        ],
        count: 2,
      },
    })
    ;(useGetLastSevenDaysData as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      data: [{ data: "any Data" }],
    })

    render(<SleepDataTable />)
    expect(screen.getByText("John")).toBeInTheDocument()
    expect(screen.getByText("Male")).toBeInTheDocument()
    expect(screen.getByText("5")).toBeInTheDocument()
    expect(screen.queryByTestId("charts")).not.toBeInTheDocument()
    act(() => {
      fireEvent.click(screen.getByText("John"))
    })

    expect(screen.queryByTestId("charts")).toBeInTheDocument()

    act(() => {
      fireEvent.click(screen.getByText("John"))
    })

    expect(screen.queryByTestId("charts")).not.toBeInTheDocument()
  })
})
