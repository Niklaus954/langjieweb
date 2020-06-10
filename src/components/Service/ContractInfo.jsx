import React, { useState, useEffect } from 'react';
import {
    withRouter,
} from 'react-router-dom'
import apiService from '../../api/apiService';
import FadeTransitions from '../Common/FadeTransitions'
import { List, Tabs as MobileTabs } from 'antd-mobile';
import ParagraphStyles from "../Common/ParagraphStyles";
import { Paper, Box, Typography, Card, CardContent, Popover, Stepper, StepLabel, Step } from "@material-ui/core"
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


function AppendPopover(props){
    const { name, children } = props
    const [anchorEl, setAnchorEl] = useState(null);
    const [infoList, setInfoList] = useState([]);
    const [expressInfo, setExpressInfo] = useState([])
    
    const handleClose = () => {
        setAnchorEl(null)
    }

    const toViewContent = (v, e) => {
        fetch(v)
        setAnchorEl(e.currentTarget)
    }

    const fetch = async (params) => {
        if(name === 'expressNo') {
            const result = await apiService.getExpressInfo(params)
            setExpressInfo(result.data.result.list)
        }else{
            const result = await apiService.fetchVirCardInfo({serialNo: params})
            setInfoList([...result.data['hardInfo'],...result.data['productInfo']])
        }
        
    }
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return(
        <div>
            <Typography variant="body2" component="a" aria-describedby={id} style={{cursor: "pointer"}} color="primary" onClick={(event) => toViewContent(children, event)}>{children}</Typography>
            <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorReference="anchorPosition"
            anchorPosition={{top: 150, left: 30}}
            >
                <div style={{ height: 300, width: 240}}>
                    <div>
                        <div style={{padding: '5px 0', textAlign: 'center', background: '#ccc', fontSize: 14}}>{name === "expressNo" ? <span>快递信息</span> : <span>产品详情</span>}</div>
                        <div style={{overflow: 'auto', height: "92%"}}>
                            {name === "expressNo" ? 
                                <Stepper orientation="vertical" activeStep={-1}>
                                    {expressInfo.map((item, index) => (
                                        <Step key={index+ "exp"}>
                                            <StepLabel>{item['status']}：{item['time']}</StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>
                                :
                                infoList.map((item, index) => (
                                    <Item key={index} extra={item.val} wrap={true}>{item.column_comment}</Item>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </Popover>
        </div>
    )
}


function TypographyValue(props){
    let { children, isLink, name } = props
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
                <Box key={index} style={{marginRight: 15}}><AppendPopover name={name}>{item}</AppendPopover></Box>
            ))}</div> :
            <AppendPopover name={name}>{children}</AppendPopover> :
            <Typography variant="body2">{children}</Typography>}
        </div>
    )
}

function TabPanel(props){
    const { name, children } = props
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
                                    <TypographyValue isLink={packingItemLabel[label]['link']} name={label}>{item[label]}</TypographyValue>
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
    }

    return (
        <FadeTransitions>
            <div style={{ width: '96%', height: '100%', display: 'flex', borderRight: '1px solid #eee', margin: "auto" }}>
                <div style={{ flex: 1, overflow: 'auto' }} id="grid">
                    <div>{ParagraphStyles.RenderServiceCarousel(album)}</div>
                    <div>
                        <MobileTabs
                        tabs={tabs}
                        initialPage={0}
                        renderTab={tab => (<span>{tab.title}</span>)}
                        >
                            <TabPanel name="infoList">{infoList}</TabPanel>
                            <TabPanel name="goodsList">{GoodsList}</TabPanel>
                            <TabPanel name="packingList">{PackingList}</TabPanel>
                        </MobileTabs>
                    </div>
                </div>
            </div>
        </FadeTransitions>
    )
}

export default withRouter(ContractInfo);