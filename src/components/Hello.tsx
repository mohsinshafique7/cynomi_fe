import { Form, Input, Select, notification } from "antd"
import moment from "moment"
import React from "react"
import dayjs from "dayjs"
type RecorData = {
  account: { name: string; gender: "male" | "female" | "other" }
  sleepData: { sleepHours: number; date: string }
}
function Hello(props: any) {
  const { useForm } = Form
  const [form] = useForm()
  const [api, contextHolder] = notification.useNotification()
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

  const formatInputDate = (value: string): string => {
    // Format the input date string to YYYY-MM-DD using moment.js
    return moment(value, "YYYY-MM-DD", true).format("YYYY-MM-DD")
  }
  return (
    <Form
      form={form}
      style={{ maxWidth: 600 }}
      onFinish={(val) => {
        const { name, date, gender, sleepHours } = val
        const formatedDate = ""
        // dayjs(date).format("YYYY-MM-DD")
        const data: RecorData = {
          account: { name, gender },
          sleepData: { date: formatedDate, sleepHours: Number(sleepHours) },
        }
        console.log(data)
        // mutateAsync(data)
      }}
    >
      {contextHolder}
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please enter your full name!" }]}
      >
        <Input placeholder="Full Name" />
      </Form.Item>
    </Form>
  )
}

export default Hello
