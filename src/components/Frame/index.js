import React, { Component } from 'react'
import logo from './logo.png'
import { Layout, Menu,Icon, Dropdown,Avatar,Badge } from 'antd';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {getNotificationList} from '../../actions/notifications'

import './frame.less'

const { Header, Content, Sider } = Layout;


const mapState=state=>{
  return{
    notificationsCount:state.notifications.list.filter(item=>item.hasRead===false).length
  }
}
@connect(mapState, {getNotificationList})
@withRouter
class Frame extends Component {
  componentDidMount(){
    this.props.getNotificationList()
  }
  onMenuClick=({key})=>{
    this.props.history.push(key)
  }
  onDropdownMenuClick=({key})=>{
    this.props.history.push(key)
  }
  renderDropdowm=()=>(
  <Menu onClick={this.onDropdownMenuClick}>
    <Menu.Item
    key="/admin/notifications"
    >
      <Badge dot={Boolean(this.props.notificationsCount)}>
        通知中心
      </Badge>
    </Menu.Item>
    <Menu.Item
    key="/admin/settings"
    >
        个人设置
    </Menu.Item>
    <Menu.Item
    key="/login"
    >
        退出登录
    </Menu.Item>
  </Menu>
  )
    render() {
      const selectedKeyArr=this.props.location.pathname.split('/')
      selectedKeyArr.length=3
        return (
  <Layout style={{minHeight: '100%'}}>
    <Header className="header qf-header" >
      <div className="qf-logo" >
      <img src={logo} alt="QFADMIN"/>
      </div>
      <div>
        <Dropdown overlay={this.renderDropdowm()} >
          <div style={{display:'flex',alignItems: 'center'}}>
          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />  
          <span>欢迎您！李应文</span>
          <Badge count={this.props.notificationsCount} offset={[-10,-10]}>  
          <Icon type="down" />
          </Badge>
          </div> 
        </Dropdown>
      </div>
      </Header>
      <Layout >
        <Sider width={200} style={{background: '#fff'}}>
      <Menu  
      mode="inline" 
      selectedKeys={[selectedKeyArr.join('/')]}
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
