import React, { useState, useEffect} from 'react';
import { Tabs, 
    Tab, 
    useMediaQuery, 
    Typography, 
    TableRow, TableCell, TableContainer, Table, TableHead, TableBody, 
    Popover, 
    ButtonGroup, Button, 
    IconButton, 
    Divider} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CONFIG from '../../config';
import apiSolution from '../../api/apiSolution';
import Slider from 'react-slick';


function AbTabs (props) {
    const isPc = useMediaQuery(CONFIG.minDeviceWidth)
    const { children, resourceDownload } = props;
    const resourceArr = []
    const filterWords = ['名称','尺寸（L*W）','尺寸（L*W/L*W*H）', '尺寸（L*W*H）','硬件接口','通讯接口']
    const filterChildren = children.filter(child => !filterWords.includes(child.key))
    resourceDownload.map(val => {
        resourceArr.push({
            usage: val.usage,
            softPackage: val.versonArr[0].softPackage,
            softVersionNo: val.versonArr[0].softVersionNo,
            softName: val.softName
        })
        
    })
    filterChildren.push({
        key: "相关下载",
        content: {
            valueArr: resourceArr
        }
    })
    
    
    const [value, setValue] = useState(0);
    const useStyles = makeStyles((theme) => ({
        root: {
            width: "100%",
        },
        root1: {
            margin: '20px 0'
        },
        tabs: {},
        MuitabRoot: {
            minWidth: 60,
            fontSize: 16,
            borderBottom: "#ccc solid 2px",
        },
        MuitabSelected: {
            color: '#f50057'
        },
        MuitabContainer: {
           // borderBottom: "#ccc solid 1px"
        },
        typography: {
            lineHeight: 2,
            fontSize: isPc ? 16 : 14,
            textIndent: 32, 
            fontWeight: 400, 
            color: "#333"
        }
        
    }))

    const classes = useStyles();

    const handleOnChange = (e, v) => {
        setValue(v)
    }

    const TabPanel = (props) => {
        const { children, index } = props
        return(
            <div
            role="tabpanel"
            hidden={value !== index}
            >
            {value === index && (
                <div>{children.valueArr.map((item, index) => (
                    typeof item === "object" ? 
                    <div key={index}>
                        <div style={{display: "flex", fontSize: isPc ? 16 : 14, color: "#333", borderBottom: "#ddd 0.5px solid", alignItems: "center"}}>
                            <div onClick={() => {window.open(CONFIG.url(`/open/soft/${item.softName}/${item.softVersionNo}`))}} style={{margin: 14, width: isPc ? "20%" : "40%", color: "#0679e6", cursor: "pointer"}}>{item.softPackage}</div>
                            <div style={{margin: 14}}>{item.usage}</div>
                        </div>
                    </div> :
                    <Typography key={index+'li'} className={classes.typography} >{item}</Typography>
                ))}</div>
            )}
            </div>
        )
    }


    return(
        <div className={classes.root}>
            <Tabs
            orientation="horizontal"
            variant="scrollable"
            scrollButtons={isPc ? "auto" : "on"}
            value={value}
            onChange={handleOnChange}
            aria-label="scrollable auto tabs example"
            className={classes.tabs}
            >
                {filterChildren.map((child, index) => (
                    <Tab key={index+'tab'} classes={{root: classes.MuitabRoot, selected: classes.MuitabSelected, }} wrapped={true} label={(<span>{child.key}</span>)}></Tab>
                ))}
            </Tabs>
            <div style={{margin: 10}}>{filterChildren.map((child, index) => (
                <TabPanel key={index} index={index}>{child.content}</TabPanel>
            ))}</div>
        </div>
    )
}




/**
 * 硬件接口说明弹窗
 */

//硬件接口说明弹窗子图片组件

function HardInfoChildImgComponent(props) {
    const { children, label } = props
    return(
        <React.Fragment>
            <Typography variant="subtitle2" style={{display: label === undefined ? "none": "block", fontWeight: "bold", marginLeft: 30}}>{label}：</Typography>
            <div style={{
                backgroundImage: "url('"+CONFIG.url("/img/gallery/"+children.name+"")+"')",
                backgroundRepeat: "no-repeat", 
                backgroundSize: "contain", 
                width: children.width, 
                height: children.height, 
                backgroundPosition: "center", 
                cursor: "pointer", 
                margin: "auto"}}
                onClick={() => window.open(`${CONFIG.url(`/img/gallery/${children.name}`)}`)}
                ></div>
                
                <div style={{textAlign: "center", lineHeight: 2}}>
                    <span>{children.title}</span></div>
        </React.Fragment>
    )
}

//硬件接口说明弹窗子文字组件
function HardInfoChildTxtComponent(props) {
    const { children, label } = props
    
    return(
        <div>
            <div style={{marginLeft: 30}}>
                <Typography variant="subtitle2" style={{fontWeight: "bold"}}>{label}：</Typography>
                <div style={{marginLeft: 70}}>{typeof children === "string" ? 
                <Typography variant="subtitle2">{children}</Typography> :
                children.name.map((ele, index) => (
                    <Typography variant="subtitle2" key={ele+index}>{index+1+"、"+ele}</Typography>
                ))}</div>
            </div>
        </div>
    )
}
//硬件接口说明弹窗子tabs组件
function HardInfoChildTabsComponent(props) {
    const { children } = props
    const tabsArr = []
    const [value, setValue] = React.useState(0);

    const TabPanel = (tabProp) => {
        const { children, index, value } = tabProp;
        return(
            <div
            style={{background: "#fff", width: "90%"}}
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            >
                {value === index && Object.keys(children).map((item, index) => (
                    children[item]['class'] === "picture" ?
                    <HardInfoChildImgComponent key={index} label={item}>{children[item]}</HardInfoChildImgComponent> :
                    <HardInfoChildTxtComponent key={index} label={item}>{children[item]}</HardInfoChildTxtComponent>
                ))}
            </div>
        )
    }

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            backgroundColor: "#f7f7f7",
            display: 'flex',
            //height: 224,
        },
        tabs: {
            borderRight: `1px solid ${theme.palette.divider}`,
            width: 180
        },
    }));
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const classes = useStyles()
    if(children instanceof Array) {
        children.map(child => {
            tabsArr.push(Object.values(child)[0]['title'])
        })
        return(
        <div style={{margin: "12px 0"}}>
            <div className={classes.root}>
                <Tabs 
                value={value} 
                onChange={handleChange}
                variant="scrollable" 
                aria-label="ant example"
                orientation="vertical"
                className={classes.tabs}
                >
                {tabsArr.map((tab, index) => (
                    <Tab key={index} label={tab} />
                ))}
                </Tabs>
                {children.map((child, index) => (
                    <TabPanel key={index} index={index} value={value}>{child}</TabPanel>
                ))}
            </div>
        </div>
    )
    }else{        
        return(
            <div>{Object.keys(children).map((item, index) => (
                children[item]['class'] === "picture" ?
                    <HardInfoChildImgComponent key={index} label={item}>{children[item]}</HardInfoChildImgComponent> :
                    <HardInfoChildTxtComponent key={index} label={item}>{children[item]}</HardInfoChildTxtComponent>
            ))}</div>
        )
    }
    
    
}

function HardInfoPopover(props){
    const { children, variant, history } = props;
    const isPc = useMediaQuery(CONFIG.minDeviceWidth);
    const [hardInfo, setHardInfo] = useState([]);
    const [ hardInterfaceName, setHardInterfaceName ] = useState("");
    const [ anchorEl, setAnchorEl ] = useState(null);
    const labelCategory = {
        basicInfo: ['英文名称','中文名称','符号图'],
        wiringInstructions: ['接线详图','接线表格'],
        TypicalLinks: ['典型连接']
    };
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
                note = typeof note === "string" ? JSON.parse(note) : note;
                setHardInfo(note)
            }
            fetchHardInfo(info)
            setAnchorEl(e.currentTarget);
            setHardInterfaceName(info+'说明文档')
        }else{
            history.history.push('/hardInfo/'+info)
        }
        
    }

    
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    
    const factoryJpackParse = function (Jpack){
        const resJpack = {
            jpackBasicInfoArr: [],
            jpackTypicalLinksArr: [],
            jpackWiringInstructionsArr: []
        }
        for (const key in Jpack) {
            if(labelCategory.basicInfo.includes(key)) {
                resJpack.jpackBasicInfoArr.push(Jpack[key])
            }else if(labelCategory.TypicalLinks.includes(key)) {
                resJpack.jpackTypicalLinksArr.push(Jpack[key])
            }else if(labelCategory.wiringInstructions.includes(key)) {
                resJpack.jpackWiringInstructionsArr.push(Jpack[key])
            }
        }
        return resJpack
    }

    //basicInfo 组件
    const BasicInfoComponent = (props) => {
        const { children } = props
        return(
            <div>
                <div style={{marginTop: "20px"}}><span style={{fontSize: 16}}>【基本信息】</span></div>
                <div style={{display: "flex", alignItems: "center", margin: "0 32px"}}>{children.map((child, index) => (
                    typeof child === "string" ?
                    index === 0 ? <Typography key={index}>{child}</Typography> :
                    <Typography key={index}>（{child}）</Typography> : 
                    <div key={index} style={{paddingLeft: 40}}>
                        <HardInfoChildImgComponent>{child}</HardInfoChildImgComponent>
                    </div>
                ))}</div>
            </div>
        )
    }

    //接线详情组件
    const WiringInstructionsComponent = (props) => {
        const { children } = props;

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
            <div>
                <div><span style={{fontSize: 16}}>【接线说明】</span></div>
                <div>{children.map((child, index) => (
                    child.class === "picture" ?
                    <div key={index}>
                        <HardInfoChildImgComponent >{child}</HardInfoChildImgComponent>
                    </div> :
                    <div key={index} style={{width: "86%", margin: "20px auto", maxWidth: 600}}><TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                {child.name[0].map((title, index) => (
                                    <StyledTableCell key={index+title} align="center"><div>{title}</div></StyledTableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {child.name.splice(1,child.name.length - 1).map((rows, rowIndex) => (
                                <StyledTableRow key={rows}>{rows.map((row, index) =>(
                                    <StyledTableCell key={row+index} align="center">{row}</StyledTableCell>
                                ))}</StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer></div>
                ))}</div>
            </div>
        )
    }

    //典型连接
    const TypicalLinksComponent = (props) => {
        const { children } = props;
        if(children.length === 0) return null

        const parseTypicalLinksJpack = (children) => {
            const resArr = []
            for(let key in children) {
                if(children[key] instanceof Array) {
                    const tabsArr = []
                    children[key].map((child, index) => {
                        tabsArr.push(<HardInfoChildTabsComponent key={key+index}>{child}</HardInfoChildTabsComponent>)
                    })
                    resArr.push(tabsArr) 
                }else {
                    if(children[key]["class"] === "picture") {
                        resArr.push(<HardInfoChildImgComponent key={key} label={key}>{children[key]}</HardInfoChildImgComponent>)
                    }else{
                        resArr.push(<HardInfoChildTxtComponent key={key} label={key}>{children[key]}</HardInfoChildTxtComponent>)
                    }
                }
            }
            return resArr
        }
        
        
        return(
            <div>
                <div style={{marginTop: 20}}><span style={{fontSize: 16}}>【典型连接】</span></div>
                <div>{parseTypicalLinksJpack(children[0])}</div>
            </div>
        )
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
           // onClose={handleClose}
            anchorReference="anchorPosition"
            anchorPosition={{top: 0, left: 0}}
            >
                <div>
                    <div style={{width: "97vw", height: "95vh", margin: 'auto', overflow: "auto"}}>
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <Typography variant="h6" style={{margin: "0 20px"}}>{hardInterfaceName}</Typography>
                            <IconButton aria-label="close" onClick={() => {setAnchorEl(null)}}><CloseIcon fontSize="default" /></IconButton>
                        </div>
                        <Divider orientation="horizontal" />
                        <div style={{display: "flex"}}>
                            <div style={{width: "50%", borderRight: "#ddd 1px solid", margin: "0 20px"}}>
                                <BasicInfoComponent>{factoryJpackParse(hardInfo).jpackBasicInfoArr}</BasicInfoComponent>
                                <WiringInstructionsComponent>{factoryJpackParse(hardInfo).jpackWiringInstructionsArr}</WiringInstructionsComponent>
                            </div>
                            <div style={{width: "50%", margin: "0 20px"}}>
                                <TypicalLinksComponent>{factoryJpackParse(hardInfo).jpackTypicalLinksArr}</TypicalLinksComponent>
                            </div>
                        </div>
                    </div>
                </div>
            </Popover>
        </div>
    )
}



//产品标题
function ProductTitle(props){
    const { children } = props
    return(
        <div>
            <Typography variant="h6">{children.value}</Typography>
        </div>
    )
}

//产品展示轮播
function ProductCarousel(props) {
    const _this = window
    let { children, proIntroduce, history, hardInfo } = props;
    const [variant, setVariant] = useState("contained");
    const isPc = useMediaQuery(CONFIG.minDeviceWidth);
    const imgArr = children.valueArr
    proIntroduce = proIntroduce[0].split('。')[0];

    const settings = {
        dots: false,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        autoplay: isPc ? false : true,
        arrows: false,
        beforeChange: (oldindex, newIndex) => {
            newIndex === 0 ? setVariant('contained') : setVariant("outlined")
        },
        touchMove: false,
        fade: true,

    }
    return(
        <div>
            <Slider ref={slider => (_this.slider = slider)} {...settings}>
                <div>
                    <div className="car1" style={{ display: "flex", justifyContent: "space-around", flexDirection: isPc ? "row" : "column", alignItems: "center"}}>
                        <div style={{display: "flex", alignItems: "center"}}><Typography variant="subtitle1" style={{textIndent: 30}}>{proIntroduce}</Typography></div>
                        <div style={{
                            backgroundImage: `url(${CONFIG.url(`/img/gallery/${imgArr[0]}`)})`, 
                            backgroundRepeat: "no-repeat", 
                            backgroundSize: "contain", 
                            width: 300, 
                            maxWidth: 300, 
                            height: 200, 
                            backgroundPosition: "center", 
                            cursor: "pointer", 
                            margin: "auto"}}
                            onClick={() => window.open(`${CONFIG.url(`/img/gallery/${imgArr[0]}`)}`)}
                        ></div>
                    </div>
                </div>
                <div>
                    <div className="car2" style={{display: "flex", justifyContent: "space-around", flexDirection: isPc ? "row" : "column", alignItems: "center"}}>
                        <div style={{
                            backgroundImage: `url(${CONFIG.url(`/img/gallery/${imgArr[1]}`)})`, 
                            backgroundRepeat: "no-repeat", 
                            backgroundSize: "contain", 
                            width: 300, 
                            maxWidth: 300, 
                            height: 200, 
                            backgroundPosition: "center", 
                            cursor: "pointer", 
                            margin: "auto"}}
                        onClick={() => window.open(`${CONFIG.url(`/img/gallery/${imgArr[1]}`)}`)}
                        ></div>
                        <HardInfoPopover variant={variant} history={history}>{hardInfo}</HardInfoPopover>
                    </div>
                </div>
            </Slider>
            <div style={{display: isPc ? "flex" : "none", justifyContent: "flex-end"}}>
                <ButtonGroup color="primary" size="small">
                    <Button variant={variant === "contained" ? "contained" : "outlined"} onClick={() => {setVariant('contained');_this.slider.slickGoTo(0)}}>正面图</Button>
                    <Button variant={variant === "outlined" ? "contained" : "outlined" } onClick={() => {setVariant('outlined'); _this.slider.slickGoTo(1)}}>背面图</Button>
                </ButtonGroup>
            </div>
        </div>
    )
}

export {
    AbTabs,
    ProductTitle,
    ProductCarousel
}