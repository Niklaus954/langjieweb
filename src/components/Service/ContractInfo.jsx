import React, { useState, useEffect } from 'react';
import {
    withRouter,
} from 'react-router-dom'
import apiService from '../../api/apiService';
import FadeTransitions from '../Common/FadeTransitions'
import { List, Tabs as MobileTabs, Steps } from 'antd-mobile';
import ParagraphStyles from "../Common/ParagraphStyles";
import { Paper, Box, Typography, Card, CardContent, Button } from "@material-ui/core"
import $ from 'jquery'
const Item = List.Item;

const tabs = [
    { title: "合同信息", sub: "1" },
    { title: "物品信息", sub: "2" },
    { title: "装箱单", sub: "3" },
]

const goodsItemLable = {
    goods_name: {
        name: "名称"
    },
    goods_spec:{
        name: "规格型号"
    },
    goods_num: {
        name: "数量"
    },
    goods_price: {
        name: "单价"
    },
    rem: {
        name: "备注"
    }
}

const packingItemLabel = {
    num: {
        name: "控制器序列号总数量",
        link: false
    },
    sn: {
        name: "控制器序列号",
        link: true
    },
    otherNum: {
        name: "其它序列号总数量",
        link: false
    },
    otherSn: {
        name: "其它控制器序列号",
        link: true
    },
    sendType: {
        name: "发货类型",
        link: false
    },
    expressNo: {
        name: "快递单号",
        link: true
    },
    
}

//步骤条
function ComponentSteps(props){
    const { contractNo } = props
    const Step = Steps.Step
    const steps = ["审核中", "待发货", "发货中", "已发货", "已收货"]
    if(props.children.delivery_state === '已发货') {
        steps[steps.length - 1] = <Button size="small" color="primary" variant="outlined" onClick={() => {confirmExpress(contractNo)}} >确认收件</Button>
    }
    const confirmExpress = async params => {
        const lastStep = '<div class="am-steps-item am-steps-item-process" style="width: 20%" >'+
        '<div class="am-steps-item-tail">::after</div>'+
        '<div class="am-steps-item-icon">'+
            '<span class="am-steps-icon">4</span>'+
        '</div>'+
        '<div class="am-steps-item-content">'+
            '<div class="am-steps-item-title">'+
                '<span style="font-size: 14px;">已收货</span>'+
            '</div>'+
        '</div>'+
    '</div>'
    const replaceNode = '<div class="am-steps-item am-steps-item-finish am-steps-item-custom" style="width: 20%">'+
        '<div class="am-steps-item-tail">::after</div>'+
            '<div class="am-steps-item-icon">'+
                '<span class="am-steps-icon">'+
                    '<svg class="am-icon am-icon-check-circle-o am-icon-xs">'+
                        '<use xlink:href="#check-circle-o">'+
                            '<svg id="check-circle-o" viewBox="0 0 48 48">'+
                                '<g fill-rule="evenodd">'+
                                    '<path d="M24 48c13.255 0 24-10.745 24-24S37.255 0 24 0 0 10.745 0 24s10.745 24 24 24zm0-3c11.598 0 21-9.402 21-21S35.598 3 24 3 3 12.402 3 24s9.402 21 21 21z"></path>'+
                                    '<path d="M12.2 23.2L10 25.3l10 9.9L37.2 15 35 13 19.8 30.8z"></path>'+
                                '</g>'+
                            '</svg>'+
                        '</use>'+
                    '</svg>'+
                '</span>'+
            '</div>'+
            '<div class="am-steps-item-content">'+
                '<div class="am-steps-item-title">'+
                    '<span style="font-size: 14px;">已发货</span>'+
                '</div>'+
            '</div>'+
        '</div>'

        const result = await apiService.contractTakeConfirm(params)
        if(result.code === 200) {
            $(".am-steps-item").eq(-1).replaceWith(lastStep)
            $(".am-steps-item").eq(-2).replaceWith(replaceNode)
        }
    }

    return(
        <div>
            <Steps direction="horizontal" size="small" current={steps.indexOf(props.children.delivery_state)}>{
                steps.map((s, i) => (
                    <Step style={{width: "20%"}} key={i} title={<span style={{fontSize: 14}}>{s}</span>} />
                ))
            }</Steps>
        </div>
    )
}


function AppendPopover(props){
    const { name, children, history } = props
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

    if(name === "expressNo") {
        return(
            <div>
                <Typography 
                variant="body2" 
                component="a" 
                aria-describedby={id} 
                style={{cursor: "pointer"}} 
                color="primary" 
                onClick={(event) => history.history.push('/deliveryInfo/'+children)}>{children}</Typography>
            </div>
        )
    }else{
        return(
            <Typography
            variant="body2"
            component="a"
            aria-describedby={id} 
            style={{cursor: "pointer"}} 
            color="primary" 
            onClick={(event) => history.history.push({pathname: '/virInfo/' + children, })}
            >
                {children}
            </Typography>
        )
    }
}


function TypographyValue(props){
    let { children, isLink, name, history } = props
    if(name === "sn" && children) {
        children = children.split(',')
    }
    if(name === "otherSn" && children) {
        children = children.split(',')
    }
    return(
        <div>
            {isLink ?
            children instanceof Array ? 
            <div style={{display: "flex", flexWrap: "wrap"}}>{children.map((item, index) => (
                <Box key={index} style={{marginRight: 15}}><AppendPopover name={name} history={history}>{item}</AppendPopover></Box>
            ))}</div> :
            <AppendPopover name={name} history={history}>{children}</AppendPopover> :
            <Typography variant="body2">{children}</Typography>}
        </div>
    )
}

function TabPanel(props){
    const { name, children, history } = props
    if(name === 'infoList') {
        return(
            <div>{ children.map((item, index) => (
                <Item key={index} extra={item.val} wrap={true}>{item.column_comment}</Item>
            ))}</div>
        ) 
    }else if(name === 'goodsList'){
        const labelArr = Object.keys(goodsItemLable)
        return(
            <div >{children.map((child, index) => (
                <Card style={{margin: 10}} key={index} variant="outlined"><CardContent>{labelArr.map((label, ind) => (
                    <Typography variant="subtitle1" key={index+ind}>{goodsItemLable[label]['name']}：{child[label]}</Typography>
                ))}</CardContent></Card>
            ))}</div>
        )
    }else if(name === "packingList"){
        let controllerNum = 0, otherControllerNum = 0, packNum = 0;
        const labelArr = Object.keys(packingItemLabel)
            packNum = children.length;
            children.map((child, index) => {
            controllerNum += child['num'];
            otherControllerNum += child['otherNum']
        })
        return(
            <div style={{margin: 15}}>
                <Paper elevation={3}><div style={{padding: 20, background: "#eee"}}>
                    <div style={{display: "flex"}}>
                        {/* <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "25%", borderRight: "#eee 1px solid"}}>
                            <AssignmentIcon color="primary" fontSize="large"/>
                        </div> */}
                        <div><Typography variant="subtitle1">控制器序列号总数量：{controllerNum}</Typography>
                        <Typography variant="subtitle1">其它序列号总数量：{otherControllerNum}</Typography>
                        <Typography variant="subtitle1">装箱单数量：{packNum}</Typography></div>
                    </div>
                </div>
                <div>
                    {children.map((item, index) => (
                        <div key={index} style={{display: "flex", borderBottom: "#eee 1px solid"}}>
                            <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "20%", borderRight: "#eee 1px solid"}}><Typography>#{index+1}</Typography></div>
                            <div style={{margin: "10px 5px"}}>{labelArr.map((label, ind) =>(
                                <div key={index+ind} style={{display: "flex"}}>
                                    <Typography variant="subtitle2" style={{minWidth: 150,}}>{packingItemLabel[label]['name']}：</Typography>
                                    <TypographyValue isLink={packingItemLabel[label]['link']} name={label} history={history}>{item[label]}</TypographyValue>
                                </div>
                            ))}</div>
                        </div>
                    ))}
                </div></Paper>
            </div>
        )
    }
}

const ContractInfo = props => {
    const [infoList, setInfoList] = useState([]);
    const [album, setAlbum] = useState([]);
    const [GoodsList, setGoodsList] = useState([])
    const [PackingList, setPackingList] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [contractNo, setContractNo] = useState([])
    useEffect(() => {
        const contract_no = props.location.pathname.split('/contractInfo/')[1];
        fetch(contract_no);
    }, [ props.location.pathname ]);

    const fetch = async contract_no => {
        const result = await apiService.getContractInfo({contract_no});
        const albumData = [{ column_name: 'album', column_comment: '图片', val: '/controller_system.png' }];
        const album = result.data.data.album;
        const { goodsList, packingList } = result.data.data
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
        setGoodsList(goodsList);
        setPackingList(packingList);
        setDataSource(result.data.data)
        setContractNo(contract_no)
    }

    return (
        <FadeTransitions>
            <div style={{ width: '96%', height: '100%', display: 'flex', borderRight: '1px solid #eee', margin: "auto" }}>
                <div style={{ flex: 1, overflow: 'auto' }} id="grid">
                    <div>{ParagraphStyles.RenderServiceCarousel(album)}</div>
                    <div style={{width: "90%"}}><ComponentSteps contractNo={contractNo}>{dataSource}</ComponentSteps></div>
                    <div>
                        <MobileTabs
                        tabs={tabs}
                        initialPage={0}
                        renderTab={tab => (<span>{tab.title}</span>)}
                        >
                            <TabPanel name="infoList">{infoList}</TabPanel>
                            <TabPanel name="goodsList">{GoodsList}</TabPanel>
                            <TabPanel history={props} name="packingList">{PackingList}</TabPanel>
                        </MobileTabs>
                    </div>
                </div>
            </div>
        </FadeTransitions>
    )
}

export default withRouter(ContractInfo);