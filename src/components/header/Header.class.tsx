import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { withTranslation, WithTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Button, Dropdown, Input, Layout, Menu, Typography } from 'antd'
import { GlobalOutlined } from '@ant-design/icons'
import logo from '../../assets/logo.svg'
import styles from './Header.module.css'
import { RootState } from '../../redux/store'
import {
  changeLanguageActionCreator,
  addLanguageActionCreator,
  Language,
  LanguageProps,
} from '../../redux/language/languageActions'

const mapStateToProps = (state: RootState) => {
  return {
    language: state.language.language,
    languageList: state.language.languageList,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    changeLanguage: (code: Language) => {
      const action = changeLanguageActionCreator(code)
      dispatch(action)
    },
    addLanguage: (payload: LanguageProps) => {
      const action = addLanguageActionCreator(payload)
      dispatch(action)
    },
  }
}

type PropsType = RouteComponentProps & // 定义react-router路由props类型
  WithTranslation & // 定义i18n props类型
  ReturnType<typeof mapStateToProps> & // 映射的是redux state的类型
  ReturnType<typeof mapDispatchToProps> // 映射的是redux dispatch的类型

class HeaderComponent extends React.Component<PropsType> {
  menuClickHandle = e => {
    if (e.key === 'new') {
      this.props.addLanguage({ name: '新语言', code: 'new' + Math.random() })
    } else {
      this.props.changeLanguage(e.key)
    }
  }
  render() {
    const { history, t } = this.props
    return (
      <div className={styles['App-header']}>
        <div className={styles['top-header']}>
          <div className={styles.inner}>
            <Typography.Text>{t('header.slogan')}</Typography.Text>
            <Dropdown.Button
              overlay={
                <Menu onClick={this.menuClickHandle}>
                  {this.props.languageList.map(l => (
                    <Menu.Item key={l.code}>{l.name}</Menu.Item>
                  ))}
                  <Menu.Item key={'new'}>{t('header.add_new_language')}</Menu.Item>
                </Menu>
              }
              style={{ marginLeft: 15 }}
              icon={<GlobalOutlined />}
            >
              {this.props.language === 'zh' ? '中文' : '英文'}
            </Dropdown.Button>
            <Button.Group className={styles['button-group']}>
              <Button onClick={() => history.push('/register')}>{t('header.register')}</Button>
              <Button onClick={() => history.push('/signIn')}>{t('header.signin')}</Button>
            </Button.Group>
          </div>
        </div>
        <Layout.Header className={styles['main-header']}>
          <span onClick={() => history.push('/')}>
            <img className={styles['App-logo']} src={logo} alt='logo' />
            <Typography.Title level={3} className={styles.title}>
              {t('header.title')}
            </Typography.Title>
          </span>
          <Input.Search
            placeholder='请输入旅游目的地、注意或者关键字'
            className={styles['search-input']}
            onSearch={keywords => history.push('/search/' + keywords)}
          />
        </Layout.Header>
        <Menu mode={'horizontal'} className={styles['main-menu']}>
          <Menu.Item key={1}>{t('header.home_page')}</Menu.Item>
          <Menu.Item key={2}>{t('header.weekend')}</Menu.Item>
          <Menu.Item key={3}>{t('header.group')}</Menu.Item>
          <Menu.Item key='4'>{t('header.backpack')}</Menu.Item>
          <Menu.Item key='5'>{t('header.private')}</Menu.Item>
          <Menu.Item key='6'>{t('header.cruise')}</Menu.Item>
          <Menu.Item key='7'>{t('header.hotel')}</Menu.Item>
          <Menu.Item key='8'>{t('header.local')}</Menu.Item>
          <Menu.Item key='9'>{t('header.theme')}</Menu.Item>
          <Menu.Item key='10'>{t('header.custom')}</Menu.Item>
          <Menu.Item key='11'>{t('header.study')}</Menu.Item>
          <Menu.Item key='12'>{t('header.visa')}</Menu.Item>
          <Menu.Item key='13'>{t('header.enterprise')}</Menu.Item>
          <Menu.Item key='14'>{t('header.high_end')}</Menu.Item>
          <Menu.Item key='15'>{t('header.outdoor')}</Menu.Item>
          <Menu.Item key='16'>{t('header.insurance')}</Menu.Item>
        </Menu>
      </div>
    )
  }
}

export const Header = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(HeaderComponent)))
