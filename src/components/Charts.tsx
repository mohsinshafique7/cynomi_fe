// src/App.js
import { useState, useEffect } from "react"
import ReactEcharts from "echarts-for-react"
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
    // formatter: (params: any) => string
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

function Charts({ data }: any | undefined) {
  const [option, setOptions] = useState<ChartOptions | null>(null)
  useEffect(() => {
    if (data) {
      setOptions({
        title: {
          text: data?.title,
          subtext: "Gender: " + data.subText,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        xAxis: {
          type: "category",
          data: data.map((item: any) => item.date),
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: data.map((item: any) => item.sleepHours),
            type: "bar",
          },
        ],
      })
    }
  }, [data])
  if (data.length === 0) {
    return <>No Record For last Seven Days</>
  }

  return (
    <>
      {JSON.stringify(data)}
      <ReactEcharts option={option} />
    </>
  )
  // return <>{JSON.stringify(data)}</>
}
export default Charts
