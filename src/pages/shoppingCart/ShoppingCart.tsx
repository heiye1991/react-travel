import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Row, Col } from 'antd'
import { MainLayout } from '../../layouts/mainLayout'
import styles from './ShoppingCart.module.css'
import { ProductList, PaymentCart } from '../../components'
import { useSelector } from '../../redux/hooks'
import { clearShoppingCart, checkout } from '../../redux/shoppingCart/slice'

export const ShoppingCartPage: React.FC = () => {
  const jwt = useSelector(state => state.user.token) as string
  const loading = useSelector(state => state.shoppingCart.loading)
  const shoppingCartItems = useSelector(state => state.shoppingCart.items)

  const dispatch = useDispatch()
  const history = useHistory()

  return (
    <MainLayout>
      <Row>
        {/* 购物车清单 */}
        <Col span={16}>
          <div className={styles['product-list-container']}>
            <ProductList data={shoppingCartItems.map(s => s.touristRoute)} />
          </div>
        </Col>
        {/* 支付卡组件 */}
        <Col span={8}>
          <div className={styles['payment-card-container']}>
            <PaymentCart
              loading={loading}
              originPrice={shoppingCartItems.map(s => s.originPrice).reduce((a, b) => a + b, 0)}
              price={
                +shoppingCartItems
                  .map(s => s.originPrice * (s.discountPresent ? s.discountPresent : 1))
                  .reduce((a, b) => a + b, 0)
                  .toFixed(2)
              }
              onCheckout={() => {
                if (!shoppingCartItems.length) {
                  return
                }
                dispatch(checkout(jwt))
                history.push('/placeOrder')
              }}
              onShoppingCartClear={() => {
                dispatch(clearShoppingCart({ jwt, itemIds: shoppingCartItems.map(s => s.id) }))
              }}
            />
          </div>
        </Col>
      </Row>
    </MainLayout>
  )
}
