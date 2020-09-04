import React, { useState, useEffect } from 'react';
import {
    withRouter,
} from 'react-router-dom'
import apiService from '../../api/apiService';
import FadeTransitions from '../Common/FadeTransitions'
import { List } from 'antd-mobile';
import { Paper, Stepper, Step, StepLabel, Typography, Box, Link, Button } from '@material-ui/core'
import ParagraphStyles from "../Common/ParagraphStyles";
const Item = List.Item;

const RepairStatus = props => {
    const { status, children, history, confirmTakeExpress } = props
    const repairNo = history.location.pathname.split('/')[history.location.pathname.split('/').length - 1]
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




    return(
        <div>
            <Stepper style={{padding: 12}} activeStep={-1} orientation="vertical">
                {children.slice(0, step).reverse().map((child, index) => {
                    const optional = child.subColumnArr.map((item, ind) => (
                        item.val === "" ||  item.val === null ? 
                        null : 
                        <Box key={index + ind} style={{display: "flex"}}>
                            <Typography variant="body2" >{item.column_comment}：</Typography>
                            {
                                item.column_name === "express" ?        
                                <Box style={{display: "flex", alignItems: "flex-start"}}>
                                    <Link
                                    component="button"
                                    variant="body2"
                                    onClick={() => {
                                        history.history.push('/deliveryInfo/'+item.val)
                                    }}
                                    >{item.val}</Link>
                                    {status === "已收件" ? null : <Typography style={{color:"#3f51b5", paddingLeft: 12}} variant="body2" onClick={() => confirmTakeExpress(repairNo)}>确认收件</Typography>}
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



const RepairInfo = props => {
    const [infoList, setInfoList] = useState([]);
    const [album, setAlbum] = useState([]);
    const [status, setStatus] = useState([]);
    const [repairNo, setRepairNo] = useState([])
    useEffect(() => {
        const repair_contractno = props.location.pathname.split('/repairInfo/')[1];
        fetch(repair_contractno);
    }, [ props.location.pathname ]);

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

    const fetch = async repair_contractno => {
        const result = await apiService.fetchRepairInfo({repair_contractno});
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
        setAlbum(resAlbum)
        setInfoList(repairState);
        setStatus(result.data.status)
    }

    const confirmTakeExpress = async params => {
        const result = await apiService.repairTakeConfirm(params)
        if(result.code === 200) {
            fetch(params)
        }
    }


    return (
        <FadeTransitions>
            <div style={{width: '100%'}}>
                <div>{ParagraphStyles.RenderServiceCarousel(album)}</div>
                <div style={{ width: '96%', display: 'flex', borderRight: '1px solid #eee', margin: "auto" }}>
                    <div style={{ flex: 1, overflow: 'auto' }} id="grid">
                        <div style={{margin: 5}}>
                            <Paper elevation={3}>
                                <RepairStatus status={status} history={props} confirmExpress={(v) => confirmTakeExpress(v) }>{infoList}</RepairStatus>
                            </Paper>
                        </div>
                    </div>
                </div>
            </div>
        </FadeTransitions>
    )
}

export default withRouter(RepairInfo);