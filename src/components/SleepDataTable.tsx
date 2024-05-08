import React, { useState, useEffect } from "react"
import { Space, Table } from "antd"
import type { TableProps } from "antd"
import { useQuery } from "@tanstack/react-query"
import { getAllAccounts, getLastSevenDaysData } from "../Request"
import Charts from "./Charts"
interface RowType {
  key: string
  name: string
  gender: "male" | "female" | "other"
  noOfEntries: number
  sleepRecord: {
    sleepHours: number
    date: Date
  }[]
  sleepData: {
    key: string
    sleepHours: number
    date: string
  }[]
}
interface ResponseType {
  count: number
  rows: RowType[]
}

const columns: TableProps<RowType>["columns"] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "No. Of Entries",
    dataIndex: "noOfEntries",
    key: "noOfEntries",
  },
]

const SleepDataTable: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])

  const [page, setPage] = useState<{
    perPage: number
    currentPage: number
  }>({
    perPage: 3,
    currentPage: 1,
  })
  const {
    data: accountData,
    isLoading: accountIdLoading,
    isError: accountIsError,
  } = useQuery<ResponseType>({
    queryKey: ["historyQuery", page.perPage, page.currentPage],
    queryFn: async () => {
      const response = await getAllAccounts(page)
      let formattedRows: any = response.data.rows.map((item: any) => ({
        key: item.id,
        name: item.name,
        gender: item.gender,
        noOfEntries: item.noOfEntries,
      }))
      return { rows: formattedRows, count: response.data.count }
    },
  })
  const {
    data: chartData,
    isLoading: chartIsLoading,
    isError: chartIsError,
  } = useQuery<ResponseType>({
    queryKey: [`chartsQuery-${selectedRowKeys[0]}`],
    enabled: selectedRowKeys.length > 0,
    queryFn: async () => {
      const response = await getLastSevenDaysData(selectedRowKeys[0])
      let formattedRows: any = response.data.rows.map((item: any) => ({
        date: item.date,
        sleepHours: item.sleepHours,
      }))
      return formattedRows
    },
  })

  function handleRowClick(record: RowType) {
    if (selectedRowKeys.includes(record.key)) {
      setSelectedRowKeys([])
    } else {
      setSelectedRowKeys([record.key])
    }
  }
  const rowClassName = (record: RowType) => {
    return selectedRowKeys.includes(record.key)
      ? "selected-row table-row"
      : "table-row"
  }
  if (!accountIdLoading && accountIsError) {
    return <h1>Error Occured....</h1>
  }
  if (accountIdLoading) {
    return <h1 data-testid="loading-text">Loading....</h1>
  }
  return (
    <>
      {accountData && (
        <>
          {JSON.stringify(selectedRowKeys)}
          <Table
            dataSource={accountData.rows}
            columns={columns}
            rowClassName={rowClassName}
            onRow={(record) => ({
              onClick: () => handleRowClick(record),
            })}
            pagination={{
              total: accountData.count,
              current: page.currentPage,
              pageSize: page.perPage,
              showTotal: (total) => `Total ${total} items`,
              onChange(page, pageSize) {
                setPage({ perPage: pageSize, currentPage: page })
                setSelectedRowKeys([])
              },
            }}
          />
          {selectedRowKeys.length > 0 &&
            chartIsLoading === false &&
            chartIsError === false && <Charts data={chartData} />}
        </>
      )}
    </>
  )
}

export default SleepDataTable
