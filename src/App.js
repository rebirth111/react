import React from 'react'
import {
    Button,
    Spin,
    Pagination,
    Badge
}from 'antd'
function App() {
        return (
            <div>
                <Button loading type="primary" >测试按钮</Button>
                <Spin>
                    <div>We were walking through the hallway of a hotel just before a 
                        workshop discussing what to do about it. We asked each other: 
                        “What would it look like if we built the router using the patterns 
                        we teach in our workshops?”</div>
                </Spin>
                <Pagination 
                showQuickJumper 
                showSizeChanger
                defaultCurrent={2} 
                total={500} 
                />
                <Badge count={100} >
                    <span>Loren</span>
                </Badge>
            </div>
        )
    }

export default App
