import React from 'react';
import { Tabs, Tab, useMediaQuery, Typography, TableRow, TableCell, TableContainer, TableHead, Table, TableBody, IconButton, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useState } from 'react';
import CONFIG from '../../config';
import { GetApp as GetAppIcon } from '@material-ui/icons'


function AbTabs (props) {
    const isPc = useMediaQuery(CONFIG.minDeviceWidth)
    const { children } = props;
    
    const [value, setValue] = useState(0);
    const useStyles = makeStyles((theme) => ({
        root: {},
        root1: {
            minHeight: 320,
            margin: '20px 0'
        },
        tabs: {},
        MuitabRoot: {
            minWidth: 60,
            fontSize: 16,
            borderBottom: "#ccc solid 2px"
        },
        MuitabSelected: {
            color: '#f50057'
        },
        MuitabContainer: {
            borderBottom: "#ccc solid 1px"
        },
        typography: {
            lineHeight: 2,
            fontSize: 16,
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
                    <Typography key={index+'li'} className={classes.typography} >{item}</Typography>
                ))}</div>
            )}
            </div>
        )
    }

    return(
        <div className={classes.root}>
            {isPc ? <div className={classes.root1}>
            <Typography variant="h6">产品详细信息</Typography>
            <Tabs
            orientation="horizontal"
            variant="scrollable"
            value={value}
            onChange={handleOnChange}
            aria-label="vertical tabs example"
            className={classes.tabs}
            >
                {children.map((child, index) => (
                    <Tab key={index+'tab'} classes={{root: classes.MuitabRoot, selected: classes.MuitabSelected, }} wrapped={true} key={index} label={(<span>{child.key}</span>)}></Tab>
                ))}
            </Tabs>
            <div style={{margin: 10}}>{children.map((child, index) => (
                <TabPanel key={index} index={index}>{child.content}</TabPanel>
            ))}</div>
            </div> : 
                <div style={{fontSize: isPc ? 16 : 14, textIndent: isPc ? 32 : 28, fontWeight: 400, lineHeight: 1.4, color: "#333"}}></div>}
        </div>
    )
}

const AbSourceDownload = (props) => {
    const { children } = props
    if(children.length === 0) return;
    let content = children[0].content['软件下载说明']
    content = typeof content === "object" ? content : JSON.parse(content)
    console.log(content)
    return(
        <div>
            <Typography variant="h6">相关下载</Typography>
            <div style={{background: '#a0aaac', margin: 10}}>
                {/* <span>工具下载</span> / <span>驱动下载</span> / <span>资料下载</span> */}
                {Object.keys(content.downLoad).map((item, index) => (
                    <Button key={index}>{item}</Button>
                ))}
            </div>
            <div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                
                                <TableCell>名称</TableCell>
                                <TableCell>说明</TableCell>
                                <TableCell>下载</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>Action-Kit</TableCell>
                                <TableCell>开发工具</TableCell>
                                <TableCell><IconButton color="primary" size="small"><GetAppIcon/></IconButton></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default {
    AbTabs,
    AbSourceDownload,
}