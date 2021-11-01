import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Button, Dropdown, Input, Layout, Menu, Typography } from 'antd'
import { GlobalOutlined } from '@ant-design/icons'
import logo from '../../assets/logo.svg'
import styles from './Header.module.css'

class HeaderComponent extends React.Component<RouteComponentProps> {
  render() {
    const { history } = this.props
    return (
      <div className={styles['App-header']}>
        <div className={styles['top-header']}>
          <div className={styles.inner}>
            <Typography.Text>让旅游更幸福</Typography.Text>
            <Dropdown.Button
              overlay={
                <Menu>
                  <Menu.Item key='zhCN'>中文</Menu.Item>
                  <Menu.Item key='English'>English</Menu.Item>
                </Menu>
              }
              style={{ marginLeft: 15 }}
              icon={<GlobalOutlined />}
            >
              语言
            </Dropdown.Button>
            <Button.Group className={styles['button-group']}>
              <Button onClick={() => history.push('/register')}>注册</Button>
              <Button onClick={() => history.push('/signIn')}>登录</Button>
            </Button.Group>
          </div>
        </div>
        <Layout.Header className={styles['main-header']}>
          <span onClick={() => history.push('/')}>
            <img className={styles['App-logo']} src={logo} alt='logo' />
            <Typography.Title level={3} className={styles.title}>
              React 旅游网
            </Typography.Title>
          </span>
          <Input.Search placeholder='请输入旅游目的地、注意或者关键字' className={styles['search-input']} />
        </Layout.Header>
        <Menu mode={'horizontal'} className={styles['main-menu']}>
          <Menu.Item key={1}>旅游首页</Menu.Item>
          <Menu.Item key={2}>周末游</Menu.Item>
          <Menu.Item key={3}>跟团游</Menu.Item>
          <Menu.Item key='4'> 自由行 </Menu.Item>
          <Menu.Item key='5'> 私家团 </Menu.Item>
          <Menu.Item key='6'> 邮轮 </Menu.Item>
          <Menu.Item key='7'> 酒店+景点 </Menu.Item>
          <Menu.Item key='8'> 当地玩乐 </Menu.Item>
          <Menu.Item key='9'> 主题游 </Menu.Item>
          <Menu.Item key='10'> 定制游 </Menu.Item>
          <Menu.Item key='11'> 游学 </Menu.Item>
          <Menu.Item key='12'> 签证 </Menu.Item>
          <Menu.Item key='13'> 企业游 </Menu.Item>
          <Menu.Item key='14'> 高端游 </Menu.Item>
          <Menu.Item key='15'> 爱玩户外 </Menu.Item>
          <Menu.Item key='16'> 保险 </Menu.Item>
        </Menu>
      </div>
    )
  }
}

export const Header = withRouter(HeaderComponent)