import React, { Component } from 'react'
import logo from './logo.png'
import { Layout, Menu,Icon } from 'antd';
import {withRouter} from 'react-router-dom'


import './frame.less'

const { Header, Content, Sider } = Layout;


@withRouter
class Frame extends Component {
  onMenuClick=({key})=>{
    this.props.history.push(key)
  }
    render() {
        return (
  <Layout style={{minHeight: '100%'}}>
    <Header className="header qf-header" >
      <div className="qf-logo" >
      <img src={logo} alt="QFADMIN"/>
      </div>
      </Header>
      <Layout >
        <Sider width={200} style={{background: '#fff'}}>
      <Menu  
      mode="inline" 
      selectedKeys={[this.props.location.pathname]}
      onClick={this.onMenuClick}
      style={{height: '100%',borderRight: 0}}
      >
        {
            this.props.menus.map(item=>{
                return (
                <Menu.Item key={item.pathname}>
                  <Icon type={item.icon} />
                  {item.title}
                  </Menu.Item>
                )
            })
        }
      </Menu>
      </Sider>
    <Layout style={{ padding: '16px' }}>
      <Content
      style={{
          background: '#fff',
          margin: 0,
      }}
      >
          {this.props.children}
      </Content>
    </Layout>
    </Layout>
    </Layout>
        )
    }
}

export default Frame