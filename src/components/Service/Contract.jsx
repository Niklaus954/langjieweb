import React, { useState } from 'react';
import ItemList from '../Common/ItemList';
import apiService from '../../api/apiService';
import CONFIG from '../../config';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import FadeTransitions from '../Common/FadeTransitions'
import { List, Tabs as MobileTabs, Steps  } from 'antd-mobile';
import { Paper, Card, CardContent, Typography, Link, Box, Popover, Stepper, Step, StepLabel, StepContent } from '@material-ui/core'
import { AssignmentOutlined as AssignmentIcon} from '@material-ui/icons'
import {
    withRouter,
} from 'react-router-dom'
import ParagraphStyles from "../Common/ParagraphStyles";
const Item = List.Item;

const tabs = [
    {"title": "合同信息", "sub": 1},
    {"title": "物品详情", "sub:": 2},
    {"title": "装箱单", "sub": 3}
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
        name: "其它序列号",
        link: false
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
    const Step = Steps.Step
    const steps = ["审核中", "待发货", "发货中", "已发货", "已收货"]

    return(
        <div>
            <Steps size="mini" direction="horizontal" current={steps.indexOf(props.children.delivery_state)}>{
                steps.map((s, i) => (
                    <Step key={i} title={(<span style={{fontSize: 14}}>{s}</span>)} />
                ))
            }</Steps>
        </div>
    )
}



// 
function AppendPopover(props){
    const { name, children } = props
    const availableProLabel = ["model","serialNo","batch","inputDate","chnlNum","caliCoeff","remark"];
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
            if(result.code === -1) return
            result.data['productInfo'] = result.data['productInfo'].filter( item => availableProLabel.includes(item.column_name))
            setInfoList([...result.data['productInfo'], ...result.data['hardInfo']])
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
            anchorPosition={{top: 300, left: 600}}
            >
                <div style={{width: 500, height: 600}}>
                    <div style={{height: "100%"}}>
                        <div style={{padding: '10px 0', textAlign: 'center', background: '#ccc', fontSize: 18}}>{name === "expressNo" ? <span>快递信息</span> : <span>出厂信息</span>}</div>
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
            children instanceof Array ?
            <div style={{display: "flex", flexWrap: "wrap"}}>{children.map((item, index) => (
                <Typography style={{width: 65}} key={index+'other'} variant="body2">{item}</Typography>
            )) }</div> :
            <Typography variant="body2">{children}</Typography>
            }
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
                            <div style={{margin: "10px 20px", width: "80%"}}>{labelArr.map((label, ind) =>(
                                <div key={index+ind} style={{display: "flex"}}>
                                    <Typography variant="subtitle2" style={{minWidth: 150}}>{packingItemLabel[label]['name']}：</Typography>
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



const Contract = props => {
    const [infoList, setInfoList] = useState([]);
    const [GoodsList, setGoodsList] = useState([]);
    const [PackingList, setPackingList] = useState([]);
    const [album, setAlbum] = useState([]);
    const [dataSource, setDataSource] = useState([])
    const isPc = useMediaQuery(CONFIG.minDeviceWidth);

    const backSelectedItem = async item => {
        if (isPc) {
            
            const result = await apiService.getContractInfo(item);
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
            setGoodsList(goodsList)
            setPackingList(packingList)
            setDataSource(result.data.data)
        } else {
            props.history.push({
                pathname: '/contractInfo/' + item.contract_no, 
            });
        }
    }

    const renderList = items => {
        return (
            <div style={{ flex: 1, padding: 4, marginLeft: 4 }}>
                <p>合同编号：{items.contract_no}</p>
                <p>签订日期：{items.sign_time}</p>
            </div>
        )
    }

    return (
        <FadeTransitions>
            <div style={{ width: '100%', height: '100%', display: 'flex' }}>
            <div style={{display: 'flex', flexDirection:'column',  width: isPc ? 400 : '100%', background: "#f5f5f5"}}>
                    <div style={{ overflow: 'auto' }}>
                        <ItemList
                            isPc={isPc}
                            fetchList={apiService.fetchContract}
                            renderAlbum={false}
                            renderList={renderList}
                            backSelectedItem={backSelectedItem}
                            serviceType="Contract"
                        ></ItemList>
                    </div>
                </div>
                { isPc && <div style={{ flex: 1, height: "100%", width:"70%", marginLeft: "10px" }} id="grid">
                    <div>{ParagraphStyles.RenderServiceCarousel(album)}</div>
                    <div><ComponentSteps>{dataSource}</ComponentSteps></div>
                    <div style={{ height: "70%", overflow: 'auto'}}>
                        <MobileTabs
                        tabs={tabs}
                        initialPage={0}
                        onChange={(tab, index) => {console.log()}}
                        onTabClick={(tab, index) => {}}
                        renderTab={tab => (<span style={{cursor: 'pointer'}}>{tab.title}</span>)}
                        tabBarBackgroundColor="#eee"
                        >
                            <TabPanel name="infoList">{infoList}</TabPanel>
                            <TabPanel name="goodsList">{GoodsList}</TabPanel>
                            <TabPanel name="packingList">{PackingList}</TabPanel>
                        </MobileTabs>
                    </div>
                </div> }
            </div>
        </FadeTransitions>
    )
}

export default withRouter(Contract);