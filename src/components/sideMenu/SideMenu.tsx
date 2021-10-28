import React from 'react'
import { Menu } from 'antd'
import { GlobalOutlined } from '@ant-design/icons'
import styles from './SideMenu.module.css'
import { sideMenuList } from './mockup'

export const SideMenu: React.FC = () => {
  return (
    <Menu mode='vertical' className={styles['side-menu']}>
      {sideMenuList.map((m, index) => (
        <Menu.SubMenu
          key={`side-menu-${index + Math.random()}`}
          title={
            <span>
              <GlobalOutlined />
              {m.title}
            </span>
          }
        >
          {m.subMenu.map((sm, smIndex) => (
            <Menu.SubMenu
              key={`sub-menu-${smIndex + Math.random()}`}
              title={
                <span>
                  <GlobalOutlined />
                  {sm.title}
                </span>
              }
            >
              {sm.subMenu.map((sms, smsIndex) => (
                <Menu.Item key={`sub-sub-menu-${smsIndex + Math.random()}`}>{sms}</Menu.Item>
              ))}
            </Menu.SubMenu>
          ))}
        </Menu.SubMenu>
      ))}
    </Menu>
  )
}
