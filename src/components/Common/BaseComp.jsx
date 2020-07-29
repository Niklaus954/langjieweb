import React, { useState, useEffect} from 'react';
import { Tabs, Tab, useMediaQuery, Typography, TableRow, TableCell, TableContainer, Table, TableBody, Popover } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CONFIG from '../../config';
import apiSolution from '../../api/apiSolution'


function AbTabs (props) {
    const isPc = useMediaQuery(CONFIG.minDeviceWidth)
    const { children, resourceDownload } = props;
    const resourceArr = []
    const filterWords = ['名称','尺寸（L*W）','尺寸（L*W/L*W*H）','尺寸（L*W*H）','硬件接口','通讯接口']
    const filterChildren = children.filter(child => !filterWords.includes(child.key))
    resourceDownload.map(val => {
        resourceArr.push(val)
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
                        <div style={{display: "flex", fontSize: isPc ? 16 : 14, color: "#333", borderBottom: "#ddd 0.5px solid"}}>
                            <div onClick={() => {window.open(CONFIG.url(`/open/soft/SIGNAPP/${item[0].softVersionNo}`))}} style={{margin: 14, width: "18%", color: "#0679e6", cursor: "pointer"}}>{item[0].softPackage}</div>
                            <div style={{margin: 14}}>{item[0].softCreateDescription}</div>
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
            value={value}
            onChange={handleOnChange}
            aria-label="vertical tabs example"
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

function AbHardInterfacePopover(props) {
    const { children, variant, history } = props
    const isPc = useMediaQuery(CONFIG.minDeviceWidth)
    const [hardInfo, setHardInfo] = useState([])
    const [ anchorEl, setAnchorEl ] = useState(null)
    const keyObj = {
        instructions: "说明"
    }

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
                let note = result.data[0].content[keyObj.instructions]
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
    // function JpackParse(Jpack, params){
    //     if(Jpack instanceof Array) {
    //         Jpack.map((pack, index) => {
    //             if(pack instanceof Array) {
    //                 res.push(<RenderTabs key={index+"pack"}>{pack}</RenderTabs>)
    //             }else{
    //                 JpackParse(pack)
    //             }
    //         })
    //     }else{
    //         for (const key in Jpack) {
    //             if(key !== 'class') {
    //                 if (Jpack.hasOwnProperty(key)) {
    //                     const element = Jpack[key];
    //                     if(element instanceof Object) {
    //                         if(element['class'] === 'picture') {
    //                             res.push(<RenderPicture key={key} name={key}>{element}</RenderPicture>)
    //                         }else if(element['class'] === 'table') {
    //                             res.push(<RenderTable key={key} name={key}>{element}</RenderTable>)
    //                         }else if(element['class'] === 'text'){
    //                             res.push(<RenderText key={key} name={key}>{element}</RenderText>)
    //                         }else{
    //                             JpackParse(element, key)
    //                         }
    //                     }else{
    //                         res.push(<RenderText key={key} name={key}>{element}</RenderText>)
    //                     }
    //                 }
    //             }
    //         }
    //     }
    //     return res
    // }
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
                   111
                </div>
            </Popover>
        </div>
    )
}

export {
    AbTabs,
    AbHardInterfacePopover
}