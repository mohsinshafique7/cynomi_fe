// src/App.js
import { useState, useEffect } from "react"
import ReactEcharts from "echarts-for-react"
import { Table } from "antd"
interface ChartOptions {
  title: {
    text: string
    subtext: string
  }
  tooltip: {
    trigger: string
    axisPointer: {
      type: string
    }
  }
  xAxis: {
    type: string
    data: string[]
  }
  yAxis: {
    type: string
  }
  series: {
    data: number[]
    type: string
  }[]
}

function Charts({ name, data }: any | undefined) {
  const tooltip = {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
    formatter: (params: any) => {
      return params[0].value + " Hours"
    },
  }
  const [option, setOptions] = useState<ChartOptions | null>(null)
  useEffect(() => {
    if (data) {
      let seriesValues = data.map((item: any) => item.sleepHours)
      const maxValue = Math.max(...seriesValues)
      const formatedValue = data.map((item: any) => {
        if (item.sleepHours === maxValue) {
          return {
            value: item.sleepHours,
            itemStyle: {
              color: "#a90000",
            },
          }
        }
        return item.sleepHours
      })

      setOptions({
        title: {
          text: name,
          subtext:
            "This chart shows aggregated sleep hours Of Last Seven Days.",
        },
        tooltip: tooltip,
        xAxis: {
          type: "category",
          data: data.map((item: any) => item.date),
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: formatedValue,
            type: "bar",
          },
        ],
      })
    }
  }, [data])
  if (!data) {
    return (
      <div className="no-record-message">
        No Record Found For last Seven Days
      </div>
    )
  }
  if (option) {
    return (
      <div style={{ height: "500px", width: "100%", padding: "20px" }}>
        <ReactEcharts style={{ height: "100%" }} option={option} />
      </div>
    )
  }
  return <></>
}
export default Charts
