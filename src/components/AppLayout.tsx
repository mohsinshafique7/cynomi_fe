import React, { useState } from "react"
import { FormOutlined, DatabaseOutlined } from "@ant-design/icons"
import type { MenuProps } from "antd"
import { Route, Routes, Link } from "react-router-dom"
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
  // getItem("Option 1", "1", ),
  // getItem("Option 2", "2", <DesktopOutlined />),
]

const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        style={{ background: "#3b4799" }}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          style={{ background: "#3b4799", marginTop: "4rem" }}
          defaultSelectedKeys={["1"]}
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
              padding: 24,
              minHeight: 360,
              background: "#fff",
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
