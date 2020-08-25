import React, { Component } from 'react'
import moment from 'moment'
import XLSX from 'xlsx'
import {
  Card, 
  Button, 
  Table,
  Tag
} from 'antd'
import {getArticles} from '../../requests'
 
const ButtonGroup=Button.Group

const titleDisplayMap={
  id: 'id',
  title: '标题',
  author: '作者',
  createAt: '创建时间',
  amount: '阅读量'
} 
export default class ArticleList extends Component {
  constructor(){
    super()
    this.state={
      dataSource: [],
      columns: [],
      total:0,
      isLoading:false,
      offset: 0,
      limited:10
    }
  }
  createColumns=(columnKeys)=>{
    const columns= columnKeys.map(item=>{
      if(item==='amount'){
        return{
          title: titleDisplayMap [item],
          key: item,
          render: (record)=>{
            const {amount}=record
            /* //这里是根据一个数字的大小做一个条件渲染
            //同理，可以做职位级别不同的渲染
            //总经理：‘001’，经理： ‘002’，主管：‘003’
            const titleMap={
              '001': 'red',
              '002': '#09f',
              '003': 'green'
            }
            return <Tag color={titleMap[titleKey]}>{record.title}</Tag> */
            return <Tag color={amount>230 ? 'red' : 'green'}>{record.amount}</Tag>
          }
        }
      
      }
      if(item=== 'createAt'){
        return{
          title: titleDisplayMap [item],
          key: item,
          render: (record)=>{
            const {createAt}=record
            return moment(createAt).format('YYYY年MM月DD日 hh:mm:ss')
          }
        }
      }
      return{
        title: titleDisplayMap [item],
        dataIndex: item,
        key: item,
      }
    })
    columns.push({
      title: '操作',
      key: 'action',
      render: ()=>{
        return (
        <ButtonGroup>
          <Button size="small" type="primary">编辑</Button>
          <Button size="small" type="danger">删除</Button>
        </ButtonGroup>
        )
      }
    })
    return columns
  }

  getData=()=>{
    this.setState({
      isLoading: true
    })
    getArticles(this.state,this.state.linited)
    .then(resp=>{
      const columnKeys=Object.keys(resp.list[0])
      const columns=this.createColumns(columnKeys)
      this.setState({
        total: resp.total,
        dataSource:resp.list,
        columns,
      })
    })
    .catch(err=>{
      //处理错误
    })
    .finally(()=>{
      this.setState({
        isLoading:false
      })
    })
  }

  onPageChange=(page,pageSize)=>{
    this.setState({
      offset:pageSize=(page-1),
      limited:pageSize
    },()=>{
      this.getData()
    })
  }

  onShowSizeChange=(current,size)=>{
    //这里出去和产品聊的时候必须问清楚，究竟是回到首页还是留到当前页
    this.setState({
      offset:0,
      limited:size
    },()=>{
      this.getData()
    })
  }

  toExcel=()=>{
    //在实际项目中，实际上这个功能是前端发送一个AJAX请求到后端，然后后端返回一个文件下载的地址
    //组合数据
    const data=[Object.keys(this.state.dataSource[0])]
    for (let i=0;i<this.state.dataSource.length;i++){
      data.push([
        this.state.dataSource[i].id,
        this.state.dataSource[i].title,
        this.state.dataSource[i].author,
        this.state.dataSource[i].amount,
        moment(this.state.dataSource[i].createAt).format('YYYY年MM月DD日 hh:mm:ss')
      ])
    }
    const ws=XLSX.utils.aoa_to_sheet(data);
    const wb=XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws, 'SheetJS');
    XLSX.writeFile(wb, `articles-${this.state.offset/(this.state.limited+1)}-${moment().format('YYYYMMDDHHmmss')}.xlsx`)
  }

  componentDidMount(){
    this.getData()
  }
    render() {
        return (
            <Card 
            title="文章列表" 
            bordered={false}
            extra={<Button onClick={this.toExcel}>导出excel</Button>} 
            >
                <Table
                rowKey={record=>record.id}
                dataSource={this.state.dataSource}
                columns={this.state.columns}
                loading={this.state.isLoading}
                 pagination={{
                   current:this.state.offset/(this.state.limited+1),
                    total: this.state.total,
                    hideOnSinglePage:true,
                    showQuickJumper:true,
                    showSizeChanger:true,
                    onChange:this.onPageChange,
                    onShowSizeChange:this.onShowSizeChange,
                    pageSizeOptions: ['10','15','20','30']
                }}
                />
            </Card>
        )
    }
}
