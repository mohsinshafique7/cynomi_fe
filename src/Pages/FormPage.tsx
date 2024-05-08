import React from "react"
import { Button, Form, Input, Select, notification } from "antd"
import dayjs from "dayjs"
import { postTodo } from "../Request"
import { useMutation } from "@tanstack/react-query"
import moment from "moment"
import EntryForm from "../components/EntryForm"
import SleepRecordPage from "./SleepRecordPage"
type RecorData = {
  account: { name: string; gender: "male" | "female" | "other" }
  sleepData: { sleepHours: number; date: string }
}

const FormPage: React.FC = () => {
  const [form] = Form.useForm()
  const { useNotification } = notification
  const [api, contextHolder] = useNotification()
  const { mutateAsync } = useMutation({
    mutationFn: postTodo,
    onError: (err: any, variable, context) => {
      // Check if the error message contains server response data
      if (err) {
        console.log("err", err.response)
        const { message, error } = err?.response?.data
        // console.log(errors.join("\n"))
        api.open({
          message: message,
          description: error,
          // icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        })
        // openNotification()
        // Handle the server error accordingly
      } else {
        console.error("An error occurred:", err)
        // Handle other types of errors
      }
    },
    onSuccess: (data) => {
      form.resetFields()
      api.open({
        message: "Record Saved",
        description: "Record Saved",
        // icon: <SmileOutlined style={{ color: "#108ee9" }} />,
      })
      console.log("Record SAved")
    },
  })
  const onFinish = (values: any) => {
    const { name, date, gender, sleepHours } = values
    const res = {
      name,
      gender,
      sleepRecord: {
        sleepHours,
        date,
      },
    }

    mutateAsync(res)
  }

  return (
    <div>
      {contextHolder}

      <div className="form-container">
        <EntryForm onFinish={onFinish} form={form} />
      </div>
    </div>
  )
}

export default FormPage
