import { useHistory } from 'react-router-dom'
import { Form, Input, Button, Checkbox, message } from 'antd'
import axios from 'axios'
import styles from './RegisterForm.module.css'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
}

export const RegisterForm = () => {
  const history = useHistory()
  const onFinish = async (values: any) => {
    console.log('Success:', values)
    try {
      // koa 服务
      // await axios.post('http://localhost:5000/auth/register', {
      //   username: values.username,
      //   password: values.password,
      //   confirmPassword: values.confirm,
      // })
      // 本地json
      await axios.get('/register.json', {
        params: {
          username: values.username,
          password: values.password,
          confirmPassword: values.confirm,
        },
      })
      history.push('/signIn')
    } catch (error: any) {
      message.error(error.message)
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Form
      {...layout}
      name='basic'
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className={styles['register-form']}
    >
      <Form.Item label='Username' name='username' rules={[{ required: true, message: 'Please input your username!' }]}>
        <Input />
      </Form.Item>

      <Form.Item label='Password' name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
        <Input.Password />
      </Form.Item>

      <Form.Item
        label='Confirm Password'
        name='confirm'
        hasFeedback
        rules={[
          { required: true, message: 'Please input your confirm password!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject('密码确认不一致！')
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name='remember' valuePropName='checked'>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}