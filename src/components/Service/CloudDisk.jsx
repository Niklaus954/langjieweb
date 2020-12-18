import React, { useState, useEffect } from 'react';
import ItemList from '../Common/ItemList';
import apiService from '../../api/apiService';
import CONFIG from '../../config';
import {
    withRouter
} from 'react-router-dom'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import FadeTransitions from '../Common/FadeTransitions'
import { List, Tabs as MobileTabs } from 'antd-mobile';
import AppBar from '@material-ui/core/AppBar';
import { Typography, Card, CardContent, Popover, Link } from '@material-ui/core';
import ParagraphStyles from '../Common/ParagraphStyles';

const Item = List.Item;
const transTab = {
    "productInfo": "生产信息",
    "hardInfo": "硬件信息",
    "contractInfo": "销售信息",
    "regHistoryList": "注册历史",
    "warrantyInfo": "保修单"
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

setTimeout(async () => {
    // console.log(await apiService.fetchCloudDiskList());
    // console.log(await apiService.fetchCloudDiskInfo({ fileId: '5fd9aeab1ae309340483e254' }));
    // console.log(await apiService.downloadByCloudDiskId({ fileId: '5fd9aeab1ae309340483e254' }));
    // console.log(await apiService.downloadDependency({ fileId: 6719, installDiskId: '5fcdbf26e99eeb41dcec535d', type: 'soft' }));
    // console.log(await apiService.downloadInstallDiskBySn({ sn: 2139999 }));
    // console.log(await apiService.checkSnAccess({ sn: 2139999 }));
}, 1000);

//tab滑动组件
function TabPanel(props) {
    const { children, infoListKey } = props;
    return (
        <div >{infoListKey === "regHistoryList" ? 
        children.map((item, index) => {
            return(<RegCard key={index}>{item}</RegCard>)
        }) : children.map((item, index) => {
            return(<Item key={index} extra={item.val} wrap={true}>{item.column_comment}</Item>)
        })}</div>
    );
}

const CloudDisk = props => {
    const [infoList, setInfoList] = useState([]);
    const [album, setAlbum] = useState([])
    const isPc = useMediaQuery(CONFIG.minDeviceWidth);
    const [tabPage,setTabPage] = useState(0)
    const backSelectedItem = async item => {
        if (isPc) {
            const result = await apiService.fetchVirCardInfo(item)
            setInfoList(result.data)
            setTabPage(0)
        } else {
            props.history.push({
                pathname: '/virInfo/' + item.serialNo, 
            });
        }
    }

    const renderList = items => {
        const validTime = items.validTime === 0 ? '永久注册' : items.validTime;
        return (
            <div style={{ flex: 1, padding: 4, marginLeft: 4 }}>
                <p>序列号: {items.serialNo}</p>
                <p>型号: {items.model}</p>
                <p>有效日期: {validTime}</p>
            </div>
        )
    }

    const tabs = Object.keys(infoList).filter(item => Object.keys(transTab).includes(item) && infoList[item].length > 0)

    return (
        <FadeTransitions>
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row', borderRight: '1px solid #eee' }}>
                <div style={{display: 'flex', flexDirection:'column',  width: isPc ? 400 : '100%', background: "#f5f5f5"}}>
                    <div style={{ overflow: 'auto' }}>
                        <ItemList
                            isPc={isPc}
                            fetchList={apiService.fetchVirCard}
                            renderAlbum={true}
                            renderList={renderList}
                            backSelectedItem={backSelectedItem}
                            serviceType="VirCard"
                        ></ItemList>
                    </div>
                </div>
                {isPc && 
                    <div style={{overflowY: 'auto', width: "60%", margin: "0 auto"}}>
                    <div style={{height: "100%"}}>
                        <MobileTabs
                        tabs={tabs}
                        page={tabPage}
                        renderTab={tab => <span style={{cursor: 'pointer'}}>{transTab[tab]}</span>}
                        onTabClick={e => setTabPage(tabs.indexOf(e))}
                        tabBarBackgroundColor="#eee"
                        >
                            {tabs.map((items, index) => (
                                <TabPanel key={index+'tabPanel'} param={props} infoListKey={items}>{infoList[items]}</TabPanel>
                            ))}
                        </MobileTabs>
                    </div>
                </div>}
            </div>
        </FadeTransitions>
    )
}

export default withRouter(CloudDisk);