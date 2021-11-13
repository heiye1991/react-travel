import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styles from './App.module.css'
import { HomePage, SignInPage, RegisterPage, DetailPage, SearchPage, ShoppingCartPage, PlaceOrderPage } from './pages'
import { useSelector } from './redux/hooks'
import { getShoppingCart } from './redux/shoppingCart/slice'

const PrivateRoute = ({ component, isAuthenticated, ...rest }) => {
  const routeComponent = props => {
    return isAuthenticated ? React.createElement(component, props) : <Redirect to={{ pathname: '/signIn' }} />
  }
  return <Route render={routeComponent} {...rest} />
}

function App() {
  const jwt = useSelector(state => state.user.token)
  const dispatch = useDispatch()
  useEffect(() => {
    if (jwt) {
      dispatch(getShoppingCart(jwt))
    }
  }, [jwt, dispatch])
  return (
    <div className={styles.App}>
      <Router>
        <Switch>
          {/* exact 当路由一样的时候才会加载。使用 Switch组件解决页面叠加的问题，每次路由只匹配一条路径而且是优先级最高的路径来渲染。404页面放在最后面。 */}
          <Route exact path='/' component={HomePage} />
          <Route path='/signIn' component={SignInPage} />
          <Route path='/register' component={RegisterPage} />
          <Route path='/detail/:touristRouteId' component={DetailPage} />
          <Route path='/search/:keywords?' component={SearchPage} />
          <PrivateRoute path='/shoppingCart' isAuthenticated={jwt !== null} component={ShoppingCartPage} />
          <PrivateRoute path='/placeOrder' isAuthenticated={jwt !== null} component={PlaceOrderPage} />
          <Route render={() => <h1>404 not found</h1>} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
