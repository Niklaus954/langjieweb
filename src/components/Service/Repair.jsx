import React, { useState } from 'react';
import ItemList from '../Common/ItemList';
import apiService from '../../api/apiService';
import CONFIG from '../../config';
import {
    withRouter,
} from 'react-router-dom'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import FadeTransitions from '../Common/FadeTransitions'
import { List, Steps } from 'antd-mobile';
import { Paper, Stepper, Step, StepLabel, Typography, Box, Link, Button, Popover } from '@material-ui/core'
import ParagraphStyles from "../Common/ParagraphStyles";

const Item = List.Item;


function AppendPopover(props){
    const { children } = props
    const [anchorEl, setAnchorEl] = useState(null);
    const [expressInfo, setExpressInfo] = useState([])
    
    const handleClose = () => {
        setAnchorEl(null)
    }

    const toViewContent = (v, e) => {
        fetch(v)
        setAnchorEl(e.currentTarget)
    }

    const fetch = async (params) => {
        const result = await apiService.getExpressInfo(params)
        setExpressInfo(result.data.result.list)
        
    }
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return(
        <div style={{paddingRight: 20}}>
            <Typography variant="body2" component="a" aria-describedby={id} style={{cursor: "pointer"}} color="primary" onClick={(event) => toViewContent(children, event)}>{children}</Typography>
            <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorReference="anchorPosition"
            anchorPosition={{top: 300, left: 600}}
            >
                <div style={{width: 500, height: 600}}>
                    <div style={{height: "100%"}}>
                        <div style={{padding: '10px 0', textAlign: 'center', background: '#ccc', fontSize: 18}}><span>快递信息</span></div>
                        <div style={{overflow: 'auto', height: "92%"}}>
                            <Stepper orientation="vertical" activeStep={-1}>
                                {expressInfo.map((item, index) => (
                                    <Step key={index+ "exp"}>
                                        <StepLabel>{item['status']}：{item['time']}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </div>
                    </div>
                </div>
            </Popover>
        </div>
    )
}

const RepairStatus = props => {
    const { status, children, repairNo } = props
    let step = 0
    if(status === "关闭") {
        step = 1
    }else if(status === "已收件"){
        step = children.length
    }else{
        for(let i = 0; i < children.length; i++) {
            if(children[i].column_comment === status) {
                step = i+1;
            }
            
        }
    }

    const confirmTakeExpress = async params => {
        const result = await apiService.repairTakeConfirm(params)
        console.log(result)
        if(result.code === 200) {
            
            const b = document.getElementById("receiveExpress")
            const btn = document.getElementById("btn")
            b.removeChild(btn)
            b.innerHTML = "<span>已收件</span>"
        }
    }


    return(
        <div>
            <Stepper activeStep={-1} orientation="vertical">
                {children.slice(0, step).reverse().map((child, index) => {
                    console.log(child)
                    const optional = child.subColumnArr.map((item, ind) => (
                        item.val === "" ||  item.val === null ? null : 
                        <Box key={index + ind} style={{display: "flex"}}>
                            <Typography variant="body2" >{item.column_comment}：</Typography>
                            {
                                item.column_name === "express" ?        
                                <Box style={{display: "flex"}}>
                                    <AppendPopover>{item.val}</AppendPopover>
                                    <Button id="btn" variant="outlined" color="primary" size="small" onClick={() => confirmTakeExpress(repairNo)}>确认收件</Button>
                                </Box> :
                                <Typography variant="body2">{item.val}</Typography>
                            }
                        </Box> 
                        
                    ))
                    return(
                        <Step key={index} completed={false} >
                            <StepLabel 
                            optional={optional}
                            >
                                <span style={{fontSize: 16, fontWeight: 600}}>{child.column_comment}</span>
                                <span style={{paddingLeft: 15}}>{child.val}</span>
                            </StepLabel>
                        </Step>
                    )
                })}
            </Stepper>
        </div>
    )
}


const Repair = props => {
    const [infoList, setInfoList] = useState([]);
    const [album, setAlbum] = useState([])
    const [status, setStatus] = useState([])
    const [repairNo, setRepairNo] = useState([])
    const isPc = useMediaQuery(CONFIG.minDeviceWidth);

    const repairState = [
        {
            column_name: "receive_time",
            column_comment: "已登记",
            val:"",
            subColumnArr: [
                {
                    column_name: "cust_name",
                    column_comment: "送修单位"
                }
            ]
        },{
            column_name: "stage0",
            column_comment: "送修检验中",
            val: "",
            subColumnArr: [
                {
                    column_name: "problems",
                    column_comment: "客户反映故障",
                    val: "",
                },{
                    column_name: "conclusion",
                    column_comment: "检验发现",
                    val: "",
                },{
                    column_name: "treatement",
                    column_comment: "处理方法",
                    val: "",
                }
            ]
        },{
            column_name: "stage1",
            column_comment: "维修中",
            val: "",
            subColumnArr: [
                
            ],
        },{
            column_name: "stage2",
            column_comment: "维修检验中",
            val: "",
            subColumnArr: [
                {
                    column_name: "repair_conclusion",
                    column_comment: "维修操作",
                    val: "",
                }
            ]
        },{
            column_name: "stage3",
            column_comment: "待发件",
            val: "",
            subColumnArr: [
                {
                    column_name: "again_conclusion",
                    column_comment: "维修检验结果",
                    val: "",
                }
            ]
        },{
            column_name: "stage4",
            column_comment: "已发件",
            val: "",
            subColumnArr: [
                {
                    column_name: "express",
                    column_comment: "发件快递单号",
                    val: "",
                },{
                    column_name: "deliver_time",
                    column_comment: "发件时间",
                    val: "",
                }
            ]
        },{
            column_name: "stage5",
            column_comment: "已收件",
            val: "",
            subColumnArr: [
                {
                    column_name: "take_person",
                    column_comment: "签收人",
                    val: "",
                },{
                    column_name: "take_time",
                    column_comment: "客户收件时间",
                    val: "",
                }
            ]
        }
    ]

    const delCol = [ 'id', 'related_contract_salary', 'related_contract_owncost', 'album', 'sql_stamp', 'update_time', 'update_person', 'insert_time', 'insert_person', 'complete', 'outer_cost', 'own_cost', 'again_check_person', 'pri_check_person' ];

    const backSelectedItem = async item => {
        if (isPc) {
            const result = await apiService.fetchRepairInfo(item);
            repairState.forEach(items=> {
                // items.val = result.data.data[items.column_name]
                if(items.column_name === "receive_time") {
                    items.val = result.data.data[items.column_name]
                }else{
                    if(result.data.data[items.column_name]) {
                        items.val = ((Date.parse(result.data.data[items.column_name]) - Date.parse(result.data.data['receive_time']))/1000/60/60).toFixed(2) +' h'
                    }else{
                        items.val = result.data.data[items.column_name]
                    }
                }
                if(items.subColumnArr) {
                    items.subColumnArr.forEach(item => {
                        item.val = result.data.data[item.column_name]
                    })
                }
            })
            let resAlbum = result.data.data['album']
            if(resAlbum === null || resAlbum === ''){
                resAlbum = '/no_img.png'
            }
            setRepairNo(result.data.data['repair_contractno'])
            setInfoList(repairState);
            setAlbum(resAlbum)
            setStatus(result.data.status)
        } else {
            props.history.push({
                pathname: '/repairInfo/' + item.repair_contractno, 
            });
        }
    }

    const renderList = items => {
        return (
            <div style={{ flex: 1, padding: 4, marginLeft: 4 }}>
                <p>序列号：{items.serial_no}</p>
                <p>当前状态：{items.deliver_state}</p>
                <p>送修单位：{items.cust_name}</p>
            </div>
        )
    }

    return (
        <FadeTransitions>
            <div style={{ width: '100%', height: '100%', display: 'flex', borderRight: '1px solid #eee' }}>
            <div style={{display: 'flex', flexDirection:'column',  width: isPc ? 400 : '100%', background: "#f5f5f5"}}>
                    {/* <SearchBarComponent searchFetch={apiService.fetchRepair} serviceType="Repair"/> */}
                    <div style={{ overflow: 'auto' }}>
                        <ItemList
                            isPc={isPc}
                            fetchList={apiService.fetchRepair}
                            renderAlbum={true}
                            renderList={renderList}
                            backSelectedItem={backSelectedItem}
                            serviceType="Repair"
                        ></ItemList>
                    </div>
                </div>
                { isPc &&  <div style={{ flex: 1, overflow: 'auto' }} id="grid">
                    <div style={{width: "80%", margin: 'auto', paddingBottom: 20}}>{ParagraphStyles.RenderServiceCarousel(album)}</div>
                    <RepairStatus status={status} repairNo={repairNo}>{infoList}</RepairStatus>
                </div>}
            </div>
        </FadeTransitions>
    )
}

export default withRouter(Repair);