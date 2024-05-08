import React, { useRef, useState } from "react"
import {
  Button,
  Form,
  FormInstance,
  Input,
  Select,
  TimePicker,
  Tour,
  TourProps,
} from "antd"
import dayjs from "dayjs"
import { postTodo } from "../Request"
import { useMutation } from "@tanstack/react-query"
import moment from "moment"

type EntryFormType = {
  onFinish: (values: any) => void
  form: FormInstance<any>
}
const EntryForm: React.FC<EntryFormType> = (props) => {
  const ref1 = useRef(null)
  const ref2 = useRef(null)
  const ref3 = useRef(null)

  const [open, setOpen] = useState<boolean>(false)
  const steps: TourProps["steps"] = [
    {
      title: "Upload File",
      description: "Put your files here.",
      cover: (
        <img
          alt="tour.png"
          src="https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png"
        />
      ),
      target: () => ref1.current,
    },
    {
      title: "Save",
      description: "Save your changes.",
      target: () => ref2.current,
    },
    {
      title: "Other Actions",
      description: "Click to see other actions.",
      target: () => ref3.current,
    },
  ]
  const { onFinish, form } = props

  const handleDateChange = (
    rule: any,
    value: string,
    callback: (error?: string) => void
  ) => {
    if (!value) {
      return Promise.reject("Please enter a date!")
    }

    if (!moment(value, "YYYY-MM-DD", true).isValid()) {
      return Promise.reject("Please enter a valid date in YYYY-MM-DD format!")
    }

    if (moment(value).isAfter(moment(), "day")) {
      return Promise.reject("Please enter a date not in the future!")
    }
    return Promise.resolve()
  }
  const handleSleepHourChange = (rule: any, value: string) => {
    if (!value) {
      return Promise.reject("Please enter sleep hours!")
    }
    if (Number(value) < 1 || Number(value) > 24) {
      return Promise.reject("Sleep Hours must be between 1 and 24!")
    }
    return Promise.resolve()
  }
  const formatInputDate = (value: string): string => {
    // Format the input date string to YYYY-MM-DD using moment.js
    return moment(value, "YYYY-MM-DD", true).format("YYYY-MM-DD")
  }
  const [formLayout, setFormLayout] = useState("horizontal")
  const formItemLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 14,
    },
  }
  const buttonItemLayout = {
    wrapperCol: {
      span: 14,
      offset: 4,
    },
  }
  return (
    <Form
      {...formItemLayout}
      layout={"vertical"}
      requiredMark={false}
      form={form}
      style={{ maxWidth: 600 }}
    >
      <Form.Item
        // style={{ display: "flex" }}
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please enter your full name!" }]}
      >
        <Input placeholder="Full Name" ref={ref1} />
      </Form.Item>
      <Form.Item
        label="Gender"
        name="gender"
        rules={[{ required: true, message: "Please select gender!" }]}
      >
        <Select ref={ref2}>
          <Select.Option value="male">Male</Select.Option>
          <Select.Option value="female">Female</Select.Option>
          <Select.Option value="other">other</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Date"
        name="date"
        rules={[{ validator: handleDateChange }]}
      >
        <Input
          ref={ref3}
          placeholder="Enter date (YYYY-MM-DD)"
          onBlur={(e) => (e.target.value = formatInputDate(e.target.value))}
        />
      </Form.Item>
      <Form.Item
        label="Sleep Hours"
        name="sleepHours"
        rules={[{ validator: handleSleepHourChange }]}
      >
        <Input placeholder="Sleep Hour(s)" type="number" />
      </Form.Item>
      <Form.Item>
        <Button
          className="form-submit"
          type="primary"
          htmlType="submit"
          onClick={async () => {
            try {
              const val = await form.validateFields()
              onFinish(val)
            } catch (err) {}
          }}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default EntryForm
