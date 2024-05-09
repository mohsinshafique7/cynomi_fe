import React, { useState, useEffect } from "react"
import { Spin, Table } from "antd"
import type { TableProps } from "antd"
import Charts from "./Charts"
import ErrorComponent from "./ErrorComponent"
import { useGetAllAccounts, useGetLastSevenDaysData } from "../Hooks/Request"
import { RowType, Pagination, ResponseType } from "../types"

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
/**
 * We are retrieving all the accounts detail by using @Hook useGetAllAccounts
 * On Selection of row we are setting account Id to  @state selectedRowKeys
 * @state selectedRowKeys is dependency on @Hook useGetLastSevenDaysData (if length>0)
 * @state selectedRowKeys is a dependency on @useEffect Hook which is setting data from  @Hook useGetLastSevenDaysData to @state setLastSevenDaysRecord
 * And when data is completely loaded @component <Charts/> will appear
 * Again on de-selecting row is setting @state selectedRowKeys to [] and @state setLastSevenDaysRecord to null
 *
 */
const SleepDataTable: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])

  const [page, setPage] = useState<Pagination>({
    perPage: 10,
    currentPage: 1,
  })
  const {
    data: accountData,
    isLoading: accountIdLoading,
    isError: accountIsError,
  } = useGetAllAccounts(page)
  const {
    data: chartData,
    isLoading: chartIsLoading,
    isError: chartIsError,
  } = useGetLastSevenDaysData(selectedRowKeys)
  const [lastSevenDaysRecord, setLastSevenDaysRecord] = useState<
    ResponseType | undefined
  >()

  useEffect(() => {
    if (
      // When request is completed successfully we set the last seven days data
      chartIsLoading === false &&
      chartData !== undefined &&
      selectedRowKeys.length > 0
    ) {
      setLastSevenDaysRecord(chartData)
    }
  }, [selectedRowKeys, chartData, chartIsLoading])

  /**
   * @param record Of Selected Row based on this we trigger
   *  the get request of last seven days
   */
  function handleRowClick(record: RowType) {
    if (selectedRowKeys.includes(record.key)) {
      setSelectedRowKeys([])
      setLastSevenDaysRecord(undefined)
    } else {
      setSelectedRowKeys([record.key])
    }
  }
  /**
   *
   * @param record Record of Table row
   * set class of selected row based on selectedRowKeys State
   */
  const rowClassName = (record: RowType) => {
    return selectedRowKeys.includes(record.key)
      ? "selected-row table-row"
      : "table-row"
  }
  if (!accountIdLoading && accountIsError) {
    return <ErrorComponent />
  }
  if (accountIdLoading) {
    return (
      <div>
        <Spin fullscreen size="large" />
      </div>
    )
  }
  return (
    <>
      <div className="table-page">
        <h1 className="table-page-heading">History Table</h1>
      </div>

      {accountData && (
        <>
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
            chartIsError === false &&
            lastSevenDaysRecord && (
              <Charts
                name={
                  accountData.rows.find(
                    (row: any) => row.key === selectedRowKeys[0]
                  )?.name
                }
                data={lastSevenDaysRecord}
              />
            )}
        </>
      )}
    </>
  )
}

export default SleepDataTable
