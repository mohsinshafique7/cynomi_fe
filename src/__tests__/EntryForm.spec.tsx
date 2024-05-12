// A Custom Wrapper for All render methods
import { fireEvent, render, screen, waitFor } from "../test.utils"
import EntryForm from "../components/EntryForm"
import { act } from "react"
import moment from "moment"
import { usePostAccountData } from "../Hooks/Request"
enum FormElementLabel {
  Name = "Name",
  Gender = "Gender",
  Date = "Date",
  SleepHours = "Sleep Hours",
  Submit = "Submit",
}
jest.mock("../Hooks/Request", () => ({
  usePostAccountData: jest.fn(),
}))
describe("Post Form", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  it("All text and labels should be displayed", () => {
    ;(usePostAccountData as jest.Mock).mockReturnValue({
      mutateAsync: jest.fn(),
    })
    render(<EntryForm />)
    const nameInput = screen.getByLabelText(FormElementLabel.Name)
    const genderSelect = screen.getByLabelText(FormElementLabel.Gender)
    const dateInput = screen.getByLabelText(FormElementLabel.Date)
    const sleepHoursInput = screen.getByLabelText(FormElementLabel.SleepHours)
    const submitButton = screen.getByText(FormElementLabel.Submit)

    expect(nameInput).toBeInTheDocument()
    expect(genderSelect).toBeInTheDocument()
    expect(dateInput).toBeInTheDocument()
    expect(sleepHoursInput).toBeInTheDocument()
    expect(sleepHoursInput).toHaveAttribute("type", "number")
    expect(submitButton).toBeInTheDocument()
  })
  it("If not filled errors should be displayed", async () => {
    ;(usePostAccountData as jest.Mock).mockReturnValue({
      mutateAsync: jest.fn(),
    })
    const { getByText } = render(<EntryForm />)
    act(() => {
      fireEvent.click(getByText(FormElementLabel.Submit))
    })
    let nameError
    let genderError
    let dateError
    let sleepError
    await waitFor(() => {
      nameError = getByText("Please enter your full name!")
      genderError = getByText("Please select gender!")
      dateError = getByText("Please enter a date!")
      sleepError = getByText("Please enter sleep hours!")
    })
    expect(nameError).toBeInTheDocument()
    expect(genderError).toBeInTheDocument()
    expect(dateError).toBeInTheDocument()
    expect(sleepError).toBeInTheDocument()
    await waitFor(() => {
      expect(usePostAccountData().mutateAsync).not.toBeCalled()
    })
  })
  it("Test Date Formate validations", async () => {
    ;(usePostAccountData as jest.Mock).mockReturnValue({
      mutateAsync: jest.fn(),
    })
    const { debug, getByText, getByLabelText } = render(<EntryForm />)
    act(() => {
      fireEvent.change(getByLabelText(FormElementLabel.Date), {
        target: { value: "04-05-2004" },
      })

      fireEvent.click(getByText(FormElementLabel.Submit))
    })
    let dateError
    await waitFor(() => {
      dateError = getByText("Please enter a valid date in YYYY-MM-DD format!")
    })
    expect(dateError).toBeInTheDocument()
    await waitFor(() => {
      expect(usePostAccountData().mutateAsync).not.toBeCalled()
    })
  })
  it("Test Date future date validation", async () => {
    ;(usePostAccountData as jest.Mock).mockReturnValue({
      mutateAsync: jest.fn(),
    })
    render(<EntryForm />)
    const futureDate = moment().add(2, "days").format("YYYY-MM-DD")
    act(() => {
      fireEvent.change(screen.getByLabelText(FormElementLabel.Date), {
        target: { value: futureDate },
      })

      fireEvent.click(screen.getByText(FormElementLabel.Submit))
    })
    let dateError
    await waitFor(() => {
      dateError = screen.getByText("Please enter a date not in the future!")
    })
    expect(dateError).toBeInTheDocument()
    await waitFor(() => {
      expect(usePostAccountData().mutateAsync).not.toBeCalled()
    })
  })
  it("Sleep time must be between 1 and 24", async () => {
    ;(usePostAccountData as jest.Mock).mockReturnValue({
      mutateAsync: jest.fn(),
    })
    render(<EntryForm />)

    act(() => {
      fireEvent.change(screen.getByLabelText(FormElementLabel.SleepHours), {
        target: { value: 0.1 },
      })

      fireEvent.click(screen.getByText(FormElementLabel.Submit))
    })
    let sleepError
    await waitFor(() => {
      sleepError = screen.getByText("Sleep Hours must be between 1 and 24!")
    })
    expect(sleepError).toBeInTheDocument()

    act(() => {
      fireEvent.change(screen.getByLabelText(FormElementLabel.SleepHours), {
        target: { value: 30 },
      })

      fireEvent.click(screen.getByText(FormElementLabel.Submit))
    })
    await waitFor(() => {
      sleepError = screen.getByText("Sleep Hours must be between 1 and 24!")
    })
    expect(sleepError).toBeInTheDocument()
    await waitFor(() => {
      expect(usePostAccountData().mutateAsync).not.toBeCalled()
    })
  })
})
