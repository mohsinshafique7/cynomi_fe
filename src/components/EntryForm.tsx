import { Button, Form, Input, Select, notification } from "antd"
import moment from "moment"
import { usePostAccountData } from "../utils/Request"
import { PostData } from "../types"

const EntryForm: React.FC = () => {
  const { useNotification } = notification
  const [form] = Form.useForm()
  const [api, contextHolder] = useNotification()
  const { mutateAsync } = usePostAccountData(form, api)
  async function onFinish(values: any) {
    const { name, date, gender, sleepHours } = values
    const res: PostData = {
      name,
      gender,
      sleepRecord: {
        sleepHours,
        date,
      },
    }
    try {
      await mutateAsync(res)
    } catch {
      console.log("Error")
    }
  }

  const handleDateChange = (rule: any, value: string) => {
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
  const formItemLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 14,
    },
  }
  return (
    <div>
      {contextHolder}
      <div className="table-page">
        <h1 className="table-page-heading">Daily Hourly Sleep Entry Form</h1>
      </div>
      <Form
        name={"record-entry-form"}
        {...formItemLayout}
        layout={"vertical"}
        requiredMark={false}
        form={form}
        style={{ margin: "auto" }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your full name!" }]}
        >
          <Input placeholder="Full Name" />
        </Form.Item>
        <Form.Item
          label="Gender"
          name="gender"
          rules={[{ required: true, message: "Please select gender!" }]}
        >
          <Select>
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
    </div>
  )
}

export default EntryForm
