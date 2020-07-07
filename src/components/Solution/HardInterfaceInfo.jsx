import React, {useState} from 'react';
import SwipeableViews from 'react-swipeable-views'
import { Typography, withStyles, Table, TableContainer, TableCell, TableBody, TableHead, TableRow, Tab, AppBar, Tabs } from '@material-ui/core';
import CONFIG from '../../config';
import apiSolution from '../../api/apiSolution'
import { useEffect } from 'react';


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

//text
function RenderText(props){
    const { name, children } = props
    if(typeof children === 'string') {
        return(
            <div style={{margin: "10px 0", display: "flex", alignItems: "center"}}>
                <Typography variant="subtitle1">{name}：</Typography>
                <Typography variant="body2" gutterBottom>{children}</Typography>
            </div>
        )
    }else{
        return(
            <div style={{margin: "10px 0"}}>
                <div><Typography variant="subtitle1">{name}：</Typography></div>
                <div>{children['name'].map((ele, index) => (
                    <Typography style={{textIndent: 28}} variant="body2" key={ele+index}>{index+1+"、"+ele}</Typography>
                ))}</div>
            </div>
        )
    }
}

//tabs
function RenderTabs(props){
    const { children } = props
    const [tab, setTab] = useState(0)
    const handleChange = (e, v) => {
        console.log(v)
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
                variant="scrollable"
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
                    <div style={{margin: "20px 10px"}} key={index+"tabPanel"}><TabPanel value={tab} index={index}>{item}</TabPanel></div>
                ))}
            </SwipeableViews>
        </div>
    )
}

//picture
function RenderPicture(props){
    const { name, children } = props
    return(
        <div key={children['name'].toString()+ name} style={{display: 'flex', alignItems: 'center', margin: 0}}>
            <div style={{textAlign: 'end'}}><Typography variant="subtitle1">{name}：</Typography></div>
            { children['name'] instanceof Array === true ? 
                children['name'].map((item, index) => (
                    <div key={index+item}><img style={{cursor: 'pointer'}} src={CONFIG.url(`/img/gallery/${item}`)} alt="" width={children.width > 250 ? 250 : children.width} onClick={() => window.open(CONFIG.url(`/img/gallery/${item}`))}></img></div>
                )) :
                <div>
                    <div><img style={{cursor: 'pointer'}} src={CONFIG.url(`/img/gallery/${children['name']}`)} alt="" width={children.width > 250 ? 250 : children.width} onClick={() => window.open(CONFIG.url(`/img/gallery/${children['name']}`))}></img></div>
                    <div style={{textAlign:'center'}}><Typography variant="caption">{children['title']}</Typography></div>
                </div>
            } 
        </div>
    )
}

//table
function RenderTable(props){
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
        <div>
            <Typography variant="subtitle1">{name}：</Typography>
            <div>
                <TableContainer>
                    <Table size="small">
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

const HardInterfaceInfo = state => {
    const hardInfoId = state.location.pathname.split('/')[state.location.pathname.split('/').length - 1]
    const [hardInfo, setHardInfo] = useState([])
    const res = []
    useEffect(() => {
        const fetch = async () => {
            const result = await apiSolution.fetchHardInterfaceInfo(hardInfoId)
            if(result.code === 200) {
                let val = result.data[0]['content']['说明'] 
                val = typeof val === "object" ? val : JSON.parse(val)
                setHardInfo(val)
            }
        }
        fetch()
    }, [hardInfoId])
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
        <div style={{margin: "auto", width: "98%", background: "#fff"}}>
            <div style={{maxWidth: 600, margin: 'auto'}}>{JpackParse(hardInfo)}</div>
        </div>
    )
}

export default HardInterfaceInfo 