import React from 'react'
import { Button } from 'antd'
import { CheckCircleOutlined, DeleteOutlined } from '@ant-design/icons'
import styles from './PaymentCart.module.css'

interface PayProps {
  loading: boolean
  originPrice: number
  price: number
  onCheckout: () => void
  onShoppingCartClear: () => void
}

export const PaymentCart: React.FC<PayProps> = ({ originPrice, price, onCheckout, onShoppingCartClear }) => {
  return (
    <div className={styles['payment-cart-container']}>
      <div className={styles['payment-cart-price']}>
        <h1>总计</h1>
        <div className={styles['payment-cart-item']}>原价 ¥ {originPrice}</div>
        <div className={styles['payment-cart-item']}>现价 ¥ {price}</div>
      </div>
      <div className={styles['payment-cart-btn']}>
        <Button type='primary' danger onClick={() => onCheckout()}>
          <CheckCircleOutlined />
          下单支付
        </Button>
        <Button onClick={() => onShoppingCartClear()}>
          <DeleteOutlined />
          清空
        </Button>
      </div>
    </div>
  )
}
