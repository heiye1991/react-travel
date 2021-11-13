import React from 'react'
import Cards from 'react-credit-cards'
import 'react-credit-cards/es/styles-compiled.css'
import { Input } from 'antd'
import styles from './PaymentForm.module.css'

export class PaymentForm extends React.Component {
  state = {
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  }

  handleInputFocus = e => {
    this.setState({ focus: e.target.name })
  }

  handleInputChange = e => {
    const { name, value } = e.target

    this.setState({ [name]: value })
  }

  render() {
    return (
      <div className={styles['place-order-constainer']}>
        <Cards
          cvc={this.state.cvc}
          expiry={this.state.expiry}
          focused={this.state.focus}
          name={this.state.name}
          number={this.state.number}
        />
        <Input
          style={{ width: 400, margin: '30px auto', display: 'block' }}
          type='tel'
          name='number'
          placeholder='Card Number'
          maxLength={16}
          onChange={this.handleInputChange}
          onFocus={this.handleInputFocus}
        />
      </div>
    )
  }
}
