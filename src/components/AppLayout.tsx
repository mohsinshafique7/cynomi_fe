import React, { useEffect, useState } from "react"
import { FormOutlined, DatabaseOutlined } from "@ant-design/icons"
import type { MenuProps } from "antd"
import { Route, Routes, Link, useLocation } from "react-router-dom"
import { Layout, Menu } from "antd"
import FormPage from "../Pages/FormPage"
import SleepRecordPage from "../Pages/SleepRecordPage"

const { Header, Content, Footer, Sider } = Layout

type MenuItem = Required<MenuProps>["items"][number]

const items: MenuItem[] = [
  {
    key: "1",
    icon: <FormOutlined style={{ fontSize: "20px" }} />,
    label: (
      <Link style={{ fontSize: "1rem", fontWeight: 500 }} to="/">
        Form
      </Link>
    ),
  },
  {
    key: "2",
    icon: <DatabaseOutlined style={{ fontSize: "20px" }} />,
    label: (
      <Link style={{ fontSize: "1rem", fontWeight: 500 }} to="/history">
        Sleep Record
      </Link>
    ),
  },
]

const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [activeMenue, setActiveMenue] = useState<string[]>([])
  const location = useLocation()
  const currentUrl = location.pathname
  useEffect(() => {
    console.log("triggered", currentUrl)
    if (currentUrl === "/history") {
      setActiveMenue(["2"])
    } else {
      setActiveMenue(["1"])
    }
  }, [location, currentUrl])

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        style={{ background: "#3b4799" }}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          selectedKeys={activeMenue}
          style={{ background: "#3b4799", marginTop: "4rem" }}
          // defaultSelectedKeys={activeMenue}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout style={{}}>
        <Header
          style={{
            backgroundColor: "#3b4799",
            color: "#fff",

            textAlign: "center",
          }}
        >
          <h1>Sleep Tracking App</h1>
        </Header>
        <Content style={{ margin: "0 5px" }}>
          <div
            style={{
              padding: "5px",
              minHeight: 360,

              // borderRadius: borderRadiusLG,
            }}
          >
            <Routes>
              <Route path="/" element={<FormPage />} />
              <Route
                path="/history"
                element={
                  <>
                    <SleepRecordPage />
                  </>
                }
              />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default AppLayout
