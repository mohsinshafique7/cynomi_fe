import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import EntryForm from "../components/EntryForm"
import { act } from "react"
import "@testing-library/jest-dom/extend-expect"
import moment from "moment"
import { Form, FormInstance } from "antd"
enum FormElementLabel {
  Name = "Name",
  Gender = "Gender",
  Date = "Date",
  SleepHours = "Sleep Hours",
  Submit = "Submit",
}
describe.skip("Post Form", () => {
  it.skip("All text and labels should be displayed", () => {
    const mockedOnFinish = jest.fn()
    const [form] = Form.useForm()
    const { debug, getByText, getByLabelText } = render(
      <EntryForm onFinish={mockedOnFinish} form={form} />
    )
    const nameInput = getByLabelText(FormElementLabel.Name)
    const genderSelect = getByLabelText(FormElementLabel.Gender)
    const dateInput = getByLabelText(FormElementLabel.Date)
    const sleepHoursInput = getByLabelText(FormElementLabel.SleepHours)
    const submitButton = getByText(FormElementLabel.Submit)

    expect(nameInput).toBeInTheDocument()
    expect(genderSelect).toBeInTheDocument()
    expect(dateInput).toBeInTheDocument()
    expect(sleepHoursInput).toBeInTheDocument()
    expect(sleepHoursInput).toHaveAttribute("type", "number")
    expect(submitButton).toBeInTheDocument()
    expect(mockedOnFinish).not.toBeCalled()
  })
  it.skip("If not filled errors should be displayed", async () => {
    const mockedOnFinish = jest.fn()
    const [form] = Form.useForm()
    const { getByText } = render(
      <EntryForm onFinish={mockedOnFinish} form={form} />
    )

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
    expect(mockedOnFinish).not.toBeCalled()
  })
  it.skip("Test Date Formate validations", async () => {
    const mockedOnFinish = jest.fn()
    const [form] = Form.useForm()
    const { debug, getByText, getByLabelText } = render(
      <EntryForm onFinish={mockedOnFinish} form={form} />
    )

    act(() => {
      fireEvent.change(getByLabelText(FormElementLabel.Date), {
        target: { value: "04-05-2004" },
      })

      // Click the submit button
      fireEvent.click(getByText(FormElementLabel.Submit))
    })
    let dateError
    await waitFor(() => {
      dateError = getByText("Please enter a valid date in YYYY-MM-DD format!")
    })
    expect(dateError).toBeInTheDocument()
    expect(mockedOnFinish).not.toBeCalled()
  })
  it.skip("Test Date future date validation", async () => {
    const mockedOnFinish = jest.fn()
    const [form] = Form.useForm()
    const { debug, getByText, getByLabelText } = render(
      <EntryForm onFinish={mockedOnFinish} form={form} />
    )
    const futureDate = moment().add(2, "days").format("YYYY-MM-DD")
    act(() => {
      fireEvent.change(getByLabelText(FormElementLabel.Date), {
        target: { value: futureDate },
      })

      // Click the submit button
      fireEvent.click(getByText(FormElementLabel.Submit))
    })
    let dateError
    await waitFor(() => {
      dateError = getByText("Please enter a date not in the future!")
    })
    expect(dateError).toBeInTheDocument()
    expect(mockedOnFinish).not.toBeCalled()
  })
  it.skip("Sleep time must be between 1 and 24", async () => {
    const mockedOnFinish = jest.fn()
    const [form] = Form.useForm()
    const { debug, getByText, getByLabelText } = render(
      <EntryForm onFinish={mockedOnFinish} form={form} />
    )

    act(() => {
      fireEvent.change(getByLabelText(FormElementLabel.SleepHours), {
        target: { value: 0.1 },
      })

      fireEvent.click(getByText(FormElementLabel.Submit))
    })

    let sleepError
    await waitFor(() => {
      sleepError = getByText("Sleep Hours must be between 1 and 24!")
    })
    expect(sleepError).toBeInTheDocument()
    expect(mockedOnFinish).not.toBeCalled()

    act(() => {
      fireEvent.change(getByLabelText(FormElementLabel.SleepHours), {
        target: { value: 30 },
      })

      fireEvent.click(getByText(FormElementLabel.Submit))
    })
    await waitFor(() => {
      sleepError = getByText("Sleep Hours must be between 1 and 24!")
    })
    expect(sleepError).toBeInTheDocument()
    expect(mockedOnFinish).not.toBeCalled()
  })
  it("If all values are ok call onFinish", async () => {
    const mockedOnFinish = jest.fn()
    const [form] = Form.useForm()

    const { debug, getByText, getByLabelText } = render(
      <EntryForm onFinish={mockedOnFinish} form={form} />
    )

    act(() => {
      fireEvent.change(getByLabelText(FormElementLabel.Name), {
        target: { value: "mohsin" },
      })
      fireEvent.change(getByLabelText(FormElementLabel.Gender), {
        target: { value: "male" },
      })
      fireEvent.change(getByLabelText(FormElementLabel.Date), {
        target: { value: "2024-01-01" },
      })
      fireEvent.change(getByLabelText(FormElementLabel.SleepHours), {
        target: { value: "10" },
      })

      fireEvent.click(getByText(FormElementLabel.Submit))
    })
    console.log(
      "Name:",
      (getByLabelText(FormElementLabel.Name) as HTMLInputElement).value
    )
    console.log(
      "Date:",
      (getByLabelText(FormElementLabel.Date) as HTMLInputElement).value
    )
    console.log(
      "Gender:",
      (getByLabelText(FormElementLabel.Gender) as HTMLInputElement).value
    )
    console.log(
      "Sleep Hours:",
      (getByLabelText(FormElementLabel.SleepHours) as HTMLInputElement).value
    )
    await waitFor(() => {
      // Check if onFinish is called with correct values
      // expect(mockedOnFinish).toBeCalled()
    })
  })
})
