// A Custom Wrapper for All render methods
import Charts from "../components/Charts"
import { render, screen } from "../test.utils"

// Mocking ApcheCharts as we dont need to test apache charts
jest.mock("echarts-for-react", () => () => (
  <div data-testid="charts">Charts</div>
))
const mockData = [
  { date: "2024-05-01", sleepHours: 7 },
  { date: "2024-05-02", sleepHours: 8 },
  { date: "2024-05-03", sleepHours: 6 },
  { date: "2024-05-04", sleepHours: 7 },
  { date: "2024-05-05", sleepHours: 8 },
  { date: "2024-05-06", sleepHours: 7 },
  { date: "2024-05-07", sleepHours: 6 },
]

describe("Charts component", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  it("renders no record message when no data is provided", () => {
    render(<Charts name={""} data={undefined} />)

    expect(
      screen.getByText(/No Record Found For last Seven Days/i)
    ).toBeInTheDocument()
  })

  it("renders chart when data is provided", () => {
    render(<Charts name="Example" data={mockData} />)
    expect(screen.queryByTestId("charts")).toBeInTheDocument()
  })
})
