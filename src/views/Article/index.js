import React, { Component } from 'react'
import moment from 'moment'
import XLSX from 'xlsx'
import {
  Card, 
  Button, 
  Table,
  Tag,
  Modal,
  Typography,
  message,
  Tooltip
} from 'antd'
import {getArticles,deleteArticleById} from '../../requests'
 
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
      limited:10,
      deleteArticleTitle:'',
      isShowArticleModal:false,
      deleteArticleConfirmLoading: false,
      deleteArticleID: null
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
            return (
            <Tooltip title={amount>230 ? '超过230' : '没超过230'}>
              <Tag color={amount>230 ? 'red' : 'green'}>{record.amount}</Tag>
              </Tooltip>
            )
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
      render: (record)=>{
        return (
        <ButtonGroup>
          <Button size="small" type="primary" onClick={this.toEdit.bind(this,record.id)}>编辑</Button>
          <Button size="small" type="danger" onClick={this.showDeleteArticleModal.bind(this,record)}>删除</Button>
        </ButtonGroup>
        )
      }
    })
    return columns
  }

  toEdit=(id)=>{
    this.props.history.push(`/admin/article/edit/${id}`)
  }

  showDeleteArticleModal=(record)=>{
   /*  Modal.confirm({
      title: '此操作不可逆，请谨慎！！！',
      content: <Typography>确定要删除<span style={{color: '#f00'}}>{record.title}</span>吗？</Typography>,
      okText: '别墨迹，赶紧删！',
      cancelText: '我点错了',
      onOk(){
        deleteArtivle(record.id)
        .then(resp=>{

        })
      }
    }) */

    this.setState({
      isShowArticleModal:true,
      deleteArticleTitle:record.title,
      deleteArticleID:record.id
    })
  }

  deleteArticle=()=>{
    this.setState({
      deleteArticleConfirmLoading:true
    })
    deleteArticleById(this.state.deleteArticleID)
    .then(resp=>{
      message.success(resp.msg)
      //这里沟通的时候有坑，究竟是留在当前页还是返回首页
      //这里做返回首页
      this.setState({
        offset: 0
      },()=>{
        this.getData()
      })
    })
    .finally(()=>{
      this.setState({
        deleteArticleConfirmLoading:false,
        isShowArticleModal:false
      })
    })
  }

  hideDeleteModal=()=>{
    this.setState({
      isShowArticleModal:false,
      deleteArticleTitle:'',
      deleteArticleConfirmLoading: false
    })
  }

  getData=()=>{
    this.setState({
      isLoading: true
    })
    getArticles(this.state.offset,this.state.limited)
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
    XLSX.writeFile(wb, `articles-${this.state.offset / (this.state.limited+1)}-${moment().format('YYYYMMDDHHmmss')}.xlsx`)
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
                   current:this.state.offset / this.state.limited+1,
                    total: this.state.total,
                    hideOnSinglePage:true,
                    showQuickJumper:true,
                    showSizeChanger:true,
                    onChange:this.onPageChange,
                    onShowSizeChange:this.onShowSizeChange,
                    pageSizeOptions: ['10','15','20','30']
                }}
                />
                <Modal
                  title='此操作不可逆，请谨慎！！！'
                  visible={this.state.isShowArticleModal}
                  onCancel={this.hideDeleteModal}
                  confirmLoading={this.state.deleteArticleConfirmLoading}
                  onOk={this.deleteArticle}
                >
                 <Typography>
                   确定要删除<span style={{color: '#f00'}}>{this.state.deleteArticleTitle}</span>吗？</Typography> 
                </Modal>  
            </Card>
        )
    }
}
