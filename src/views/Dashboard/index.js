import React, { Component ,createRef} from 'react'
import {
    Card,
    Row,
    Col
}from 'antd'

import echarts from 'echarts'

import {getArticleAmount} from '../../requests'

import './dashboard.less'

export default class Dashboard extends Component {
    constructor(){
        super()
        this.articleAmount=createRef()
    }
    initArticleChart=()=>{
        this.articleChart=echarts.init(this.articleAmount.current)
        getArticleAmount()
        .then(resp=>{
            const option = {
                xAxis: {
                    type: 'category',
                    data: resp.amount.map(item=>item.month)
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: resp.amount.map(item=>item.value),
                    type: 'bar'
                }]
            };        
            this.articleChart.setOption(option)
        })
    }
    componentDidMount(){
        this.initArticleChart()
    }
    render() {
        return (
            <>
                <Card 
            title="概览" 
            bordered={false}
            >
                <Row gutter={16}>
                    <Col className="gutter-row" span={6}>
                    <div className="qf-gutter-box" style={{backgroundColor: '#2986F6'}}>col-6</div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                    <div className="qf-gutter-box" style={{backgroundColor: '#AB47BC'}}>col-6</div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                    <div className="qf-gutter-box" style={{backgroundColor: '#FF7043'}}>col-6</div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                    <div className="qf-gutter-box" style={{backgroundColor: '#43A047'}}>col-6</div>
                    </Col>
                </Row>
                </Card>
                <Card 
                   title="最近浏览量" 
                   bordered={false}
            >
                <div ref={this.articleAmount} style={{height: '400px'}}/>
            </Card>
            </>
        )
    }
}
