import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import './index.css'
import App from './App'
// 性能监控
import reportWebVitals from './reportWebVitals'
// antd样式
import 'antd/dist/antd.css'
// 国际化配置 antd组件显示中文
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
// 日期组件显示中文
import moment from 'moment'
import 'moment/locale/zh-cn'
import './i18n/configs'

moment.locale('zh-cn')

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider locale={zhCN}>
        <App />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log)
