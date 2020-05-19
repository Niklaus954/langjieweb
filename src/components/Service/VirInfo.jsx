import React, { useState, useEffect } from 'react';
import {
    withRouter,
} from 'react-router-dom'
import apiService from '../../api/apiService';
import FadeTransitions from '../Common/FadeTransitions'
import { List, Tabs } from 'antd-mobile';
import { Paper } from '@material-ui/core';
import PropTypes from 'prop-types'
const Item = List.Item;

const tabs = [
    {title: "生产信息", sub: "1"},
    {title: "销售信息", sub: "2"},
    {title: "注册历史", sub: "3"},
    {title: "保修单", sub: "4"}
]


function TabsComponent(props) {
    let { infoList } = props
    return(
        <div style={{width: "100%"}}>
            <div style={{display: 'flex', justifyContent: 'center', padding: 10}}><img src="http://iph.href.lu/240x160" alt=""/></div>
            <Tabs tabs={tabs}
            initialPage={0}
            tabBarPosition="top"
            renderTab={tab => <span>{tab.title}</span>}
            >
                {tabs.map((tab, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', }}>{tab.title}</div>
                ))}
            </Tabs>
        </div>
    )
}

TabsComponent.prototype = {
    infoList: PropTypes.array,
}

const VirInfo = props => {
    const [infoList, setInfoList] = useState([]);
    useEffect(() => {
        const serialNo = props.location.pathname.split('/virInfo/')[1];
        fetch(serialNo);
    }, [ props.location.pathname ]);

    const fetch = async serialNo => {
        const result = await apiService.fetchVirCardInfo({serialNo});
        setInfoList(result.data);
    }

    return (
        <FadeTransitions>
            <TabsComponent infoList={infoList}/>
            {/* <div style={{ width: '96%', height: '100%', display: 'flex', borderRight: '1px solid #eee', margin: "auto" }}>
                <div style={{ flex: 1, overflow: 'auto' }} id="grid">
                    <div style={{margin: 5}}>
                        <Paper elevation={3}>
                            <List renderHeader={() => '明细'}>
                                {
                                    infoList.map((items, index) => <Item key={items.column_name + index} extra={items.val} wrap={true}>{items.column_comment}</Item>)
                                }
                            </List>
                        </Paper>
                    </div>
                </div>
            </div> */}
        </FadeTransitions>
    )
}

export default withRouter(VirInfo);