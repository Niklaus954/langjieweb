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
import { Typography, Card, CardContent, Popover, Link, IconButton } from '@material-ui/core';
import { GetApp as GetAppIcon } from '@material-ui/icons'
import ParagraphStyles from '../Common/ParagraphStyles';

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

//弹出合同
function ContractPopover(props){
    const { children } = props
    const [anchorEl, setAnchorEl] = useState(null)
    const [infoList, setInfoList] = useState([])
    const [album, setAlbum] = useState([])
    const handleClose = () => {
        setAnchorEl(null)
    }
    const toViewContract = (contract_no, event) => {
        fetch({contract_no})
        setAnchorEl(event.currentTarget)
    }
    const fetch = async (param) => {
        const result = await apiService.getContractInfo(param)
        const albumData = [{ column_name: 'album', column_comment: '图片', val: '/controller_system.png' }];
            const album = result.data.data.album;
            if (album) {
                albumData[0].val = album;
            }
            setAlbum(albumData)
            const renderList = [];
            result.data.label.forEach(items => {
                renderList.push({
                    column_name: items.key,
                    column_comment: items.name,
                    val: items.val,
                });
            });
            setInfoList(renderList);
        
    }
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return(
        <div>
            <Link component="button" aria-describedby={id} onClick={(event) => toViewContract(children, event)}>{children}</Link>
            <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorReference="anchorPosition"
            anchorPosition={{top: 300, left: 600}}
            >
                <div style={{width: 500, height: 600}}>
                    <div style={{padding: '10px 0', textAlign: 'center', background: '#ccc', fontSize: 18}}><span>合同详情</span></div>
                    <div style={{overflow: 'auto', height: "92%"}}><div>{ParagraphStyles.RenderServiceCarousel(album)}</div>
                    {infoList.map((item, index) => (
                    <Item key={index+ item.column_name} extra={item.val} wrap={true}>{item.column_comment}</Item>
                ))}</div></div>
            </Popover>
        </div>
    )
}


//tab滑动组件
function TabPanel(props) {
    const { children, infoListKey } = props;

    

    return (
        <div >{infoListKey === "regHistoryList" ? 
        children.map((item, index) => {
            return(<RegCard key={index}>{item}</RegCard>)
        }) :
        children.map((item, index) => {
            if(item.column_name === 'contract_no') {
                return(<Item key={index} extra={(<ContractPopover>{item.val}</ContractPopover>)} wrap={true}>{item.column_comment}</Item>)
            }else{
                return(<Item key={index} extra={item.val} wrap={true}>{item.column_comment}</Item>)
            }
        })}</div>
    );
}
  


const VirCard = props => {
    const [infoList, setInfoList] = useState([]);
    const [album, setAlbum] = useState([])
    const isPc = useMediaQuery(CONFIG.minDeviceWidth);
    const [tabPage,setTabPage] = useState(0)
    const backSelectedItem = async item => {
        if (isPc) {
            const result = await apiService.fetchVirCardInfo(item)
            const checkSnAccess = await apiService.checkSnAccess({sn: item.serialNo})
            const isShowDownLoad = checkSnAccess.code === 200 ? true : false
            if (isShowDownLoad) {
                Object.assign(result.data, {
                    download:  [{column_name: 'download', column_comment: '软件安装包', val: <IconButton onClick={() => downloadInstallDiskBySn(item.serialNo)}><GetAppIcon color='primary'/></IconButton>}]
                })
            }
            setInfoList(result.data)
            setTabPage(0)
        } else {
            props.history.push({
                pathname: '/virInfo/' + item.serialNo, 
            });
        }
    }

    const downloadInstallDiskBySn = async e => {
        const res = await apiService.downloadInstallDiskBySn({sn: e})
        if (res.code === 200) {
            window.open('https://www.langjie.com/open/burnDisk/download/'+res.data)
        } else {

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

    const tabs = Object.keys(infoList).filter(item => Object.keys(transTab).includes(item) && infoList[item].length >= 0)

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

export default withRouter(VirCard);