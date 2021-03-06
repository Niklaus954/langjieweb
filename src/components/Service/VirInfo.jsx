import React, { useState, useEffect } from 'react';
import {
    withRouter,
} from 'react-router-dom'
import apiService from '../../api/apiService';
import FadeTransitions from '../Common/FadeTransitions'
import { List, Tabs as MobileTabs, Toast } from 'antd-mobile';
import { Card, CardContent, IconButton, Typography } from '@material-ui/core';
import { GetApp as GetAppIcon } from '@material-ui/icons'
import PropTypes from 'prop-types';
const Item = List.Item;

const transTab = {
    "productInfo": "生产信息",
    "hardInfo": "硬件信息",
    "contractInfo": "销售信息",
    "regHistoryList": "注册历史",
    "warrantyInfo": "保修单",
    "download": "下载"
}

function RegCard(props) {
    const { children } = props
    const validDate = children.validDate == 0 ? '永久注册' : children.validDate;
    return(
        <div style={{margin: 10}}>
            <Card variant="outlined"><CardContent>
                <Typography>注册日期：{children.regDate}</Typography>
                <Typography>公司：{children.company}</Typography>
                <Typography>注册人：{children.name}</Typography>
                <Typography>注册产品：{children.product}</Typography>
                <Typography>有效期：{validDate}</Typography>
                <Typography>注册码：{children.regCode}</Typography>
                <Typography>授权操作码：{children.authOperKey}</Typography>
            </CardContent></Card>
        </div>
    )
}

//tab滑动组件
function TabPanel(props) {
    const { value, info, param, index, children, infoListKey, ...other } = props;
    const toViewContract = (contract_no) => {
        //指向合同详情
        param.history.push({
            pathname: '/contractInfo/' + contract_no, 
        });
    }
    
    return (
        <div p={3}>{infoListKey === "regHistoryList" ? 
        children.map((item, index) => {
            return(<RegCard key={index}>{item}</RegCard>)
        }) : children.map((item, index) => {
            if(item.column_name === 'contract_no') {
                return(<Item key={index} extra={(<span style={{color: "#3f51b5"}} onClick={() => toViewContract(item.val)}>{item.val}</span>)} wrap={true}>{item.column_comment}</Item>)
            }else{
                return(<Item key={index} extra={item.val} wrap={true}>{item.column_comment}</Item>)
            }
        })}</div>
      );
}

function TabsComponent(props) {
    let { infoList, param } = props
    const [value, setValue] = useState(0);
    const tabs = Object.keys(infoList).filter(item => Object.keys(transTab).includes(item) && infoList[item].length >= 0)
    return(
        <div style={{width: "100%", height: "100%"}}>
            <MobileTabs
            tabs={tabs}
            initialPage={0}
            renderTab={tab => <span>{transTab[tab]}</span>}
            >
                {tabs.map((items, index) => (
                    <TabPanel key={index+'tabPanel'} value={value} index={index} param={param} infoListKey={items}>{infoList[items]}</TabPanel>
                ))}
            </MobileTabs>
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
        const checkSnAccess = await apiService.checkSnAccess({sn: serialNo})
        const isShowDownLoad = checkSnAccess.code === 200 ? true : false
        if (isShowDownLoad) {
            Object.assign(result.data, {
                download: [{column_name: 'download', column_comment: '软件安装包', val: <IconButton onClick={() => Toast.info('仅支持在PC端下载')}><GetAppIcon color='primary'/></IconButton>}]
            })
        }
        setInfoList(result.data);
    }

    return (
        <FadeTransitions>
            <TabsComponent infoList={infoList} param={props}/>
        </FadeTransitions>
    )
}

export default withRouter(VirInfo);