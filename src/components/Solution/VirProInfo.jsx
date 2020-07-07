import React, { useEffect, useState } from 'react';
import apiSolution from '../../api/apiSolution';
import FadeTransitions from '../Common/FadeTransitions';
import { useMediaQuery, Button, ButtonGroup, Chip, Typography, Paper, Popover, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, withStyles, AppBar, Tabs, Tab } from '@material-ui/core';
import { Carousel } from 'antd-mobile'
import CONFIG from '../../config';
import Common from '../Common/Common';
import SwipeableViews from 'react-swipeable-views';


function TabPanel (props) {
    const { value, index, children } = props
    return(
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        >
        {value === index && Object.keys(children).map((item, index) => {
            if(children[item]['class'] === 'picture'){
                return (<div key={index+'tabPicture'}><RenderPicture name={item}>{children[item]}</RenderPicture></div>)
            }else{
                return(<div key={index+'text'}><RenderText name={item}>{children[item]}</RenderText></div>)
            }
        })}
    </div>
    )
}

/**
 * tabs组件
 */

function RenderTabs(props){
    const { children } = props
    const [tab, setTab] = useState(0)
    const handleChange = (e, v) => {
        setTab(v)
    }
    return(
        <div key="tabs">
            <AppBar position="static" color="default">
                <Tabs
                value={tab}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant={children.length >= 5 ? "scrollable" : "fullWidth"}
                scrollButtons="on"

                >
                    {children.map((tab, index) => (
                        <Tab key={index+'tab'} label={Object.values(tab)[0]['title']}/>
                    ))}
                </Tabs>
            </AppBar>
            <SwipeableViews
            index={tab}
            >
                {children.map((item, index) => (
                    <div style={{margin: "20px 10px", minHeight:240}} key={index+"tabPanel"}><TabPanel value={tab} index={index}>{item}</TabPanel></div>
                ))}
            </SwipeableViews>
        </div>
    )
}

/**
 * Table组件
 */

function RenderTable(props) {
    const { name, children} = props
    if(children['name'].length === 0) return
    const tableData = children['name']
    const StyledTableCell = withStyles((theme) => ({
        head: {
          backgroundColor: "#3f51b5",
          color: "#fff",
        },
        body: {
          fontSize: 12,
        },
      }))(TableCell);
    
      const StyledTableRow = withStyles((theme) => ({
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
          },
        },
      }))(TableRow);
    return(
        <div key="table" style={{display: 'flex', margin: 10}} >
           <div style={{width: "25%",textAlign: 'end'}}><Typography variant="subtitle2">{name}：</Typography></div>
            <div>
                <TableContainer>
                    <Table style={{minWidth: 400}} size="small">
                        <TableHead>
                            <TableRow>
                                {tableData[0].map((title, index) => (
                                    <StyledTableCell key={index+title} align="center"><div>{title}</div></StyledTableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData.splice(1,tableData.length - 1).map((rows, rowIndex) => (
                                <StyledTableRow key={rows}>{rows.map((row, index) =>(
                                    <StyledTableCell key={row+index} align="center">{row}</StyledTableCell>
                                ))}</StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

/**
 * picture组件
 */

function RenderPicture(props){
    const { name, children } = props
    return(
        <div key={children['name'].toString()+ name} style={{display: 'flex', alignItems: 'center', margin: 10}}>
            <div style={{width: "25%",textAlign: 'end'}}><Typography variant="subtitle2">{name}：</Typography></div>
            { children['name'] instanceof Array === true ? 
                children['name'].map((item, index) => (
                    <div key={index+item}><img style={{cursor: 'pointer'}} src={CONFIG.url(`/img/gallery/${item}`)} alt="" width={children.width} onClick={() => window.open(CONFIG.url(`/img/gallery/${item}`))}></img></div>
                )) :
                <div>
                    <div><img style={{cursor: 'pointer'}} src={CONFIG.url(`/img/gallery/${children['name']}`)} alt="" width={children.width} onClick={() => window.open(CONFIG.url(`/img/gallery/${children['name']}`))}></img></div>
                    <div style={{textAlign:'center'}}><Typography variant="caption">{children['title']}</Typography></div>
                </div>
            } 
        </div>
    )
}

 /**
  *  text组件
  */
 function RenderText(props){
     const { name, children } = props
    if(typeof children === 'string') {
        return(
            <div key={children+name} style={{display: 'flex', margin: 10}}>
                <div style={{width: "25%",textAlign: 'end'}}><Typography variant="subtitle2">{name}：</Typography></div>
                <div><Typography variant="subtitle2">{children}</Typography></div>
            </div>
        )
    }else{
        return(
            <div key={children['name'].toString()+name} style={{display: 'flex', margin: 10}}>
                <div style={{width: "25%",textAlign: 'end'}}><Typography variant="subtitle2">{name}：</Typography></div>
                <div style={{width: '75%'}} >{children['name'].map((ele, index) => (
                    <Typography variant="subtitle2" key={ele+index}>{index+1+"、"+ele}</Typography>
                ))}</div>
            </div>
        )
    }
}

function HardInfoPopover(props){
    const isPc = useMediaQuery(CONFIG.minDeviceWidth)
    const [hardInfo, setHardInfo] = useState([])
    const [ anchorEl, setAnchorEl ] = useState(null)
    const res = []
    const { children, variant, history } = props
    const StyledTableCell = withStyles((theme) => ({
        head: {
          backgroundColor: "#0679e6",
          color: "#fff",
        },
        body: {
          fontSize: 12,
        },
      }))(TableCell);
    
      const StyledTableRow = withStyles((theme) => ({
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
          },
        },
      }))(TableRow);


    const handleClick = (info, e) => {
        if(isPc) {
            const fetchHardInfo = async params => {
                const result = await apiSolution.fetchHardInterfaceInfo(params)
                let note = result.data[0].content['说明']
                note = typeof note === "object" ? note : JSON.parse(note)
                setHardInfo(note)
            }
            fetchHardInfo(info)
            setAnchorEl(e.currentTarget);
        }else{
            history.history.push('/hardInfo/'+info)
        }
        
    }
    
      const handleClose = () => {
        setAnchorEl(null);
      };
    
      const open = Boolean(anchorEl);
      const id = open ? 'simple-popover' : undefined;

    //解析json
    function JpackParse(Jpack, params){
        if(Jpack instanceof Array) {
            Jpack.map((pack, index) => {
                if(pack instanceof Array) {
                    res.push(<RenderTabs key={index+"pack"}>{pack}</RenderTabs>)
                }else{
                    JpackParse(pack)
                }
            })
        }else{
            for (const key in Jpack) {
                if(key !== 'class') {
                    if (Jpack.hasOwnProperty(key)) {
                        const element = Jpack[key];
                        if(element instanceof Object) {
                            if(element['class'] === 'picture') {
                                res.push(<RenderPicture key={key} name={key}>{element}</RenderPicture>)
                            }else if(element['class'] === 'table') {
                                res.push(<RenderTable key={key} name={key}>{element}</RenderTable>)
                            }else if(element['class'] === 'text'){
                                res.push(<RenderText key={key} name={key}>{element}</RenderText>)
                            }else{
                                JpackParse(element, key)
                            }
                        }else{
                            res.push(<RenderText key={key} name={key}>{element}</RenderText>)
                        }
                    }
                }
            }
        }
        return res
    }
    return(
        <div style={{display: variant === "outlined" ? "block" : "none", minWidth: 280}}>
            <TableContainer style={{display: children.length !== 0 ? "block" : "none"}}>
                <Table size="small">
                    <TableBody>
                        {children.map((child,index) => (
                            <StyledTableRow key={index}>{child.split('：').map((item, ind) => (
                            <StyledTableCell key={index + ind}>{ind === 0 ? <span>{item}</span> : <span style={{color: '#0679e6', cursor: "pointer"}} onClick={(e) => handleClick(item, e)}>{item}</span>}</StyledTableCell>
                            ))}</StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorReference="anchorPosition"
            anchorPosition={{top: 300, left: 300}}
            >
                <div>
                    <Paper elevation={3} style={{width: 650, margin: 'auto'}}>
                        <div style={{padding: "20px", height: 550, overflow: 'auto'}}>{JpackParse(hardInfo)}</div>
                    </Paper>
                </div>
            </Popover>
        </div>
    )
}

const VirProInfo = state => {
    const isPc = useMediaQuery(CONFIG.minDeviceWidth)
    const [data, setData] = useState([])
    const [hardInfo, setHardInfo] = useState([])
    const [variant, setVariant] = useState("contained")
    const virProType = state.location.pathname.split('/')[state.location.pathname.split('/').length - 1]
    useEffect(() => {
        const fetch = async() => {
            const result = await apiSolution.fetchVir()
            if(result.code === 200){
                result.data.forEach((item, index) => {
                    if(item['id'] == virProType) {
                        setData(item)
                        for (const key in item['content']) {
                            if(key === "硬件接口") {
                                setHardInfo(item.content[key])
                                
                            }
                        }
                    }
                })
            }
        }
        fetch()
        updateSideMenu()
    }, [virProType])

    // 恢复侧边栏的显示
    const updateSideMenu = () => {
        const pagePath = state.location.pathname;
        let menuId, rootId;
        CONFIG.singlePage.forEach(items => {
            if (pagePath.indexOf(items.pathname) !== -1) {
                menuId = items.menuId;
                rootId = items.rootId;
            }
        });
        const { updateSideMenuList, updateSelectedSideMenu, updateSelectedSideName } = state;
        try {
            const result = Common.getSelectMenuInfo(CONFIG.menu, menuId, rootId);
            updateSideMenuList(result.menuList);
            updateSelectedSideMenu(result.item.pathname);
            updateSelectedSideName(result.item.text);
        } catch (e) {
            
        }
    }

    const beforeChange = (from, to) => {
        to === 0 ? setVariant('contained') : setVariant('outlined')
    }

    const RenderContent = () => {
        if(data.length === 0) return
        const content = data.content;
        const resArr = []
        for(let key in content) {
            const arr = []
            const val = Common.transToView(content[key])
            if(val.type === 'picture') {
                resArr.push(<div key={key} style={{display: 'flex', justifyContent:'space-around', flexDirection: "column"}}>
                    <div>
                        <Carousel
                        autoplay={ isPc ? false : true }
                        infinite
                        selectedIndex={variant === "contained" ? 0 : 1}
                        dots={false}
                        beforeChange={(from, to) => beforeChange(from, to)}
                        >
                            {val.valueArr.map((img, index) => (
                                <div key={index} 
                                style={{
                                    display: "flex", 
                                    alignItems: "center", 
                                    flexDirection: isPc ?  "row" : "column", 
                                    justifyContent: variant === "contained" ? "center" : hardInfo.length === 0 ? "center" : "space-around"
                                }}>
                                    <div style={{textAlign: 'center'}}><img
                                        src={`${CONFIG.url(`/img/gallery/${img}`)}`}
                                        alt=""
                                        style={{ width: isPc ? "350px": "80%", maxWidth: "350px", verticalAlign: 'top' }}
                                        onClick={() => window.open(`${CONFIG.url(`/img/gallery/${img}`)}`)}
                                        /></div>
                                    <HardInfoPopover variant={variant} history={state}>{hardInfo}</HardInfoPopover>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                    <div style={{display: isPc ? "flex" : "none", alignSelf: "flex-end"}}>
                        <ButtonGroup color="primary" size="small">
                            <Button variant={variant === "contained" ? "contained" : "outlined"} onClick={() => setVariant('contained')}>正面图</Button>
                            <Button variant={variant === "outlined" ? "contained" : "outlined" } onClick={() => setVariant('outlined')}>背面图</Button>
                        </ButtonGroup>
                    </div>
                </div>)
            }else{
                resArr.push(<div key={key}><h3>{key}</h3></div>)
                val.valueArr.map((item, index) => {
                    arr.push(<div key={index} style={{fontSize: isPc ? 16 : 14, textIndent: isPc ? 32 : 28, fontWeight: 400, lineHeight: 1.4, color: "#333"}}>
                        <div><p>{item}</p></div>
                    </div>)
                })
                resArr.push(arr)
            }
        }
        return resArr
    }
    return(
        <FadeTransitions>
            <div style={{padding: isPc ? "20px 40px" : "20px", overflow:'auto', background: "#fff", width: "100%"}}>
                <div>{RenderContent()}</div>
            </div>
        </FadeTransitions>
    )
}

export default VirProInfo;