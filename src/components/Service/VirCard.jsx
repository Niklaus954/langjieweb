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
import {Tabs, Tab, Box, Typography, Card, CardContent, Popover, Link, Paper} from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles } from '@material-ui/core/styles';
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

//弹出合同
function ContractPopover(props){
    const labelObj = {
        contract_no: {
            name: '合同编号',
        },
        cus_abb: {
            name: '购方',
        },
        purchase: {
            name: '购方采购',
        },
        contract_state: {
            name: '合同状态',
        },
        sale_person: {
            name: '销售员',
        },
        sign_time: {
            name: '签订日期',
        },
        total_amount: {
            name: '总金额',
        },
        payable: {
            name: '应付金额',
        },
        paid: {
            name: '已付金额',
        },
        install: {
            name: '需要安装',
        },
        isDirectSale: {
            name: '是否直销',
        },
        delivery_state: {
            name: '发货状态',
        },
        delivery_time: {
            name: '发货时间',
        },
        take_person: {
            name: '收货确认人',
        },
        take_time: {
            name: '收货确认时间',
        },
        isFreeze: {
            name: '是否冻结',
        },
        freeze_reason: {
            name: '冻结原因',
        },
        freeze_start_time: {
            name: '冻结开始时间',
        },
        freeze_time: {
            name: '冻结截止日期',
        },
        close_reason: {
            name: '关闭原因',
        },
        close_time: {
            name: '关闭日期',
        },
        other: {
            name: '其他约定',
        },
    };
    const { children } = props
    const [anchorEl, setAnchorEl] = useState(null)
    const [comment, setComment] = useState([])
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
        const resAlbum = result.data.comment.filter(item => item.column_name === 'album')
        if(!resAlbum[0].val){
            resAlbum[0].val = '/controller_system.png'
        }
        setAlbum(resAlbum)
        if(result.code === 200) {
            for (let i = 0; i < result.data.comment.length; i++) {
                const key = result.data.comment[i].column_name;
                if (labelObj[key]) labelObj[key].val = result.data.comment[i].val;
                if(key === 'isFreeze' && result.data.comment[i].val == 0) {
                    delete labelObj.freeze_reason;
                    delete labelObj.freeze_start_time;
                    delete labelObj.freeze_time;
                }
                if(key === 'contract_state' && result.data.comment[i].val !== '关闭') {
                    delete labelObj.close_reason;
                    delete labelObj.close_time;
                }
                if (key === 'install' || key === 'isFreeze' || key === 'isDirectSale') {
                    if(labelObj[key].val==0){
                        labelObj[key].val = '否';
                    }else{
                        labelObj[key].val = '是';
                    }
                }else if(key==='take_time'){
                    if(labelObj[key].val==='0000-00-00'||labelObj[key].val==null) labelObj[key].val = '';
                }
            };
            const renderList = [];
            for (const key in labelObj) {
                renderList.push({
                    column_name: key,
                    column_comment: labelObj[key].name,
                    val: labelObj[key].val,
                });
            }
            setComment(renderList)
        }
        
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
                    {comment.map((item, index) => (
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
        }) : children.map((item, index) => {
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
                        tabs={Object.keys(infoList).filter(item => infoList[item].length > 0)}
                        page={tabPage}
                        renderTab={tab => <span>{transTab[tab]}</span>}
                        onTabClick={e => setTabPage(Object.keys(infoList).filter(item => infoList[item].length > 0).indexOf(e))}
                        
                        >
                            {Object.keys(infoList).filter(item => infoList[item].length > 0).map((items, index) => (
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