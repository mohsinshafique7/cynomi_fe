import { Button, Form, Input, Select } from "antd"
import "./App.css"
import AppLayout from "./components/AppLayout"
import moment from "moment"
import dayjs from "dayjs"
import ErrorBoundary from "./components/ErrorBoundry"
type RecorData = {
  account: { name: string; gender: "male" | "female" | "other" }
  sleepData: { sleepHours: number; date: string }
}

function App() {
  const [form] = Form.useForm()
  const formatInputDate = (value: string): string => {
    // Format the input date string to YYYY-MM-DD using moment.js
    return moment(value, "YYYY-MM-DD", true).format("YYYY-MM-DD")
  }
  const onFinish = (value: any) => {
    console.log(value)
  }
  const handleDateChange = (
    rule: any,
    value: string,
    callback: (error?: string) => void
  ) => {
    if (!value) {
      callback("Please enter a date")
      return
    }

    if (!moment(value, "YYYY-MM-DD", true).isValid()) {
      callback("Please enter a valid date in YYYY-MM-DD format")
      return
    }

    if (moment(value).isAfter(moment(), "day")) {
      callback("Please enter a date not in the future")
      return
    }

    callback()
  }
  return (
    <>
      <ErrorBoundary>
        <AppLayout />
      </ErrorBoundary>
    </>
  )
}

export default App
