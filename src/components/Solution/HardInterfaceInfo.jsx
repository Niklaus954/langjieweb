import React, {useState, useEffect} from 'react';
import { Typography, 
    Table, TableContainer, TableCell, TableBody, TableHead, TableRow, 
    Tabs, Tab,
    useMediaQuery } from '@material-ui/core';
import CONFIG from '../../config';
import apiSolution from '../../api/apiSolution'
import { withStyles, makeStyles, } from '@material-ui/core/styles';
/**
 * 硬件接口说明弹窗
 */

//硬件接口说明弹窗子图片组件

function HardInfoChildImgComponent(props) {
    const { children, label } = props
    return(
        <React.Fragment>
            <Typography variant="subtitle2" style={{display: label === undefined ? "none": "block", fontWeight: "bold", marginLeft: 10}}>{label}：</Typography>
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
            <div style={{marginLeft: 10}}>
                <Typography variant="subtitle2" style={{fontWeight: "bold"}}>{label}：</Typography>
                <div style={{marginLeft: 30}}>{typeof children === "string" ? 
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
            style={{background: "#fff"}}
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
            //height: 224,
        },
        tabs: {
            borderRight: `1px solid ${theme.palette.divider}`,
            //width: 60
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
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="on"
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

const HardInterfaceInfo = state => {


//const { children, variant, history } = props;
    const isPc = useMediaQuery(CONFIG.minDeviceWidth)
    const [hardInfo, setHardInfo] = useState([]);
    const labelCategory = {
        basicInfo: ['英文名称','中文名称','符号图'],
        wiringInstructions: ['接线详图','接线表格'],
        TypicalLinks: ['典型连接']
    };
    const keyObj = {
        "instructions": "说明"
    }
    const hardId = state.location.pathname.split('/')[state.location.pathname.split('/').length - 1]

    useEffect(() => {
        const fetch = async() => {
            const result = await apiSolution.fetchHardInterfaceInfo(hardId)
            if(result.code === 200) {
                let instruction = result.data[0]['content'][keyObj.instructions]
                instruction = typeof instruction === "string" ? JSON.parse(instruction) : instruction
                setHardInfo(instruction)
            }
        }
        fetch()
    }, [hardId, keyObj.instructions])
    
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
                    index === 0 ? <Typography key={index} variant="body2">{child}</Typography> :
                    <Typography key={index} variant="body2">（{child}）</Typography> : 
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
                    <div key={index} style={{ margin: "20px auto"}}><TableContainer>
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
                <div style={{margin: "20px 0"}}><span style={{fontSize: 16}}>【典型连接】</span></div>
                <div>{parseTypicalLinksJpack(children[0])}</div>
            </div>
        )
    }
    return(
        <div style={{margin: "auto", width: "98%", background: "#fff"}}>
            <div style={{margin: "auto"}}>
                <BasicInfoComponent>{factoryJpackParse(hardInfo).jpackBasicInfoArr}</BasicInfoComponent>
                <WiringInstructionsComponent>{factoryJpackParse(hardInfo).jpackWiringInstructionsArr}</WiringInstructionsComponent>
                <TypicalLinksComponent>{factoryJpackParse(hardInfo).jpackTypicalLinksArr}</TypicalLinksComponent>
            </div>
        </div>
    )

}

export default HardInterfaceInfo