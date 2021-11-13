import React from 'react'
import { Button, Empty, Typography } from 'antd'
import { CheckCircleOutlined } from '@ant-design/icons'
import styles from './CheckoutCart.module.css'

interface orderProps {
  loading: boolean
  order: any
  onCheckout: () => void
}

const { Text } = Typography

export const CheckoutCart: React.FC<orderProps> = ({ loading, order, onCheckout }) => {
  return (
    <div className={styles['checkout-cart-container']}>
      {order ? (
        <>
          <div className={styles['checkout-cart-price']}>
            <h1>总计</h1>
            {order.orderItems.map(item => (
              <div key={item.id} className={styles['checkout-cart-item']}>
                <div>{item.touristRoute.title}</div>
                <div>
                  <Text style={{ fontSize: 20, fontWeight: 400 }} delete>
                    ¥ {item.originPrice}
                  </Text>
                  <Text type='danger' style={{ fontSize: 20, fontWeight: 400 }}>
                    {' '}
                    ¥ {(item.originPrice * (item.discountPresent ? item.discountPresent : 1)).toFixed(2)}
                  </Text>
                </div>
              </div>
            ))}
          </div>
          <div className={styles['checkout-cart-btn']}>
            <Button type='primary' danger loading={loading} onClick={() => onCheckout()}>
              <CheckCircleOutlined />
              支付
            </Button>
          </div>
        </>
      ) : (
        <Empty />
      )}
    </div>
  )
}
