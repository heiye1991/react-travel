import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Row, Col } from 'antd'
import { MainLayout } from '../../layouts/mainLayout'
import { PaymentForm, CheckoutCart } from '../../components'
import { useSelector } from '../../redux/hooks'
import { placeOrder } from '../../redux/order/slice'

export const PlaceOrderPage: React.FC = () => {
  const jwt = useSelector(state => state.user.token) as string
  const loading = useSelector(state => state.order.loading)
  const currentOrder = useSelector(state => state.order.currentOrder)
  const dispatch = useDispatch()
  const history = useHistory()

  return (
    <MainLayout>
      <Row>
        <Col span={12}>
          <PaymentForm />
        </Col>
        <Col span={12}>
          <CheckoutCart
            loading={loading}
            order={currentOrder}
            onCheckout={() => {
              dispatch(placeOrder({ jwt, orderId: currentOrder.id }))
              history.push('/')
            }}
          />
        </Col>
      </Row>
    </MainLayout>
  )
}
