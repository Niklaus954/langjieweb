import React, { useEffect, useState } from 'react';
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, withStyles, AppBar, Tabs, Tab } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import CONFIG from "../../config";
import { withRouter } from 'react-router-dom'


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

const HardInterfaceInfo = props => {
    const { children } = props
    const res = []
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
        <div>
            <Paper elevation={3} style={{width: 750, margin: 'auto'}}>
                <div style={{padding: "20px", height: 700, overflow: 'auto'}}>{JpackParse(children)}</div>
            </Paper>
        </div>
    )
}

export default withRouter(HardInterfaceInfo)