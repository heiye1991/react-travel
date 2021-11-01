import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styles from './App.module.css'
import { HomePage, SignInPage, RegisterPage, DetailPage } from './pages'

function App() {
  return (
    <div className={styles.App}>
      <Router>
        <Switch>
          {/* exact 当路由一样的时候才会加载。使用 Switch组件解决页面叠加的问题，每次路由只匹配一条路径而且是优先级最高的路径来渲染。404页面放在最后面。 */}
          <Route exact path='/' component={HomePage} />
          <Route path='/signIn' component={SignInPage} />
          <Route path='/register' component={RegisterPage} />
          <Route path='/detail/:touristRouteId' component={DetailPage} />
          <Route render={() => <h1>404 not found</h1>} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
