import { useMutation, useQuery } from "@tanstack/react-query"
import { AxiosError, isAxiosError } from "axios"
import { PostData, ResponseType } from "../types"
import { FormInstance } from "antd"
import AxiosInstance from "../axiosConfig"
import { NotificationInstance } from "antd/es/notification/interface"
export const usePostAccountData = (
  form: FormInstance,
  notificationApi: NotificationInstance
) => {
  return useMutation<PostData, AxiosError<any, any>, any, any>({
    mutationFn: async (data) => {
      try {
        const response = await AxiosInstance.post(`/accounts`, data)
        return response.data
      } catch (error: any) {
        throw new Error("Failed to execute mutation: " + error.message)
      }
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        const { message, error: errorMessage } = error?.response?.data
        notificationApi.open({
          message: message || "An error occurred",
          description: errorMessage || "Unknown error",
        })
      } else {
        console.error("An error occurred:", error)
      }
    },
    onSuccess: (data) => {
      form.resetFields()
      notificationApi.open({
        message: "Record Saved",
        description: "Record Saved",
      })
      console.log("Record Saved")
    },
  })
}

export const useGetAllAccounts = ({ perPage, currentPage }: any) => {
  return useQuery<ResponseType>({
    queryKey: ["historyQuery", perPage, currentPage],
    queryFn: async () => {
      const response = await AxiosInstance.get(
        `/accounts?perPage=${perPage}&currentPage=${currentPage}`
      )
      let formattedRows: any = response.data.rows.map((item: any) => ({
        key: item.id,
        name: item.name,
        gender: item.gender,
        noOfEntries: item.noOfEntries,
      }))
      return { rows: formattedRows, count: response.data.count }
    },
  })
}
export const useGetLastSevenDaysData = (selectedRowKeys: string[]) => {
  return useQuery<any>({
    queryKey: [`chartsQuery-${selectedRowKeys[0]}`],
    enabled: selectedRowKeys.length > 0,
    queryFn: async () => {
      const response = await AxiosInstance.get(
        `/sleep-records/last-seven/+${selectedRowKeys[0]}`
      )
      let formattedRows: any = response.data.rows
        .map((item: any) => ({
          date: item.date,
          sleepHours: item.sleepHours,
        }))
        .sort((a: any, b: any) => {
          const dateA = new Date(a.date)
          const dateB = new Date(b.date)
          return dateA.getTime() - dateB.getTime()
        })
      return formattedRows
    },
  })
}
