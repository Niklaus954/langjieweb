import React, { useState, useEffect } from 'react';
import ItemList from '../Common/ItemList';
import apiService from '../../api/apiService';
import CONFIG from '../../config';
import {
    withRouter,
} from 'react-router-dom'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import FadeTransitions from '../Common/FadeTransitions'
import { List, ListView } from 'antd-mobile';
import { Paper, InputBase, Divider, makeStyles, TableBody, Table, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

const columns = [
    {id: 'album', label: '', align: 'left', minWidth: 100},
    {id: 'serial_number', label: '序列号', align: 'left', minWidth: 100},
    {id: 'serial_type', label: '型号', align: 'left', minWidth: 100},
    {id: 'validity', label: '有效期', align: 'left', minWidth: 100}
]

const toggleOptions = []

const useStyles = makeStyles(theme => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
    },
    container: {
        maxHeight: 540,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}))

const Item = List.Item;

const VirCard = props => {
    const [infoList, setInfoList] = useState([]);
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(10)
    const [data, setData] = useState([])
    const isPc = useMediaQuery(CONFIG.minDeviceWidth);
    const classes = useStyles();
    useEffect(() => {
        const fetch = async() => {
            const result = await apiService.fetchVirCard({
                page: page,
                pageSize: pageSize,
                keywords: ''
            })
            if(result.code === 200) setData(result.data)
        }
        fetch()
    },[page, pageSize])
    
    const SearchBar = () => {
        return(
            <div>
                <Paper component="form" className={classes.root} style={{width: isPc ? 500 : 300}}>
                    <IconButton className={classes.iconButton} aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <InputBase
                        className={classes.input}
                        placeholder="请输入产品序列号、型号"
                        inputProps={{ 'aria-label': '请输入产品序列号、型号' }}
                    />
                    <IconButton type="submit" className={classes.iconButton} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                    {/* <Divider className={classes.divider} orientation="vertical" />
                    <IconButton color="primary" className={classes.iconButton} aria-label="directions">
                        <DirectionsIcon />
                    </IconButton> */}
                </Paper>
            </div>
        )
    }

    //mobile
    const renderMobileList = () => {
        if(data.length === 0) return
        const resArr = []
        data.map((item, index) => {
            const validTime = item.validTime === 0 ? '永久注册' : item.validTime;
            resArr.push(<div key={index} onClick={() => {props.history.push({pathname: '/virInfo/' + item.serialNo })}}>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div><img src={item.album} alt=""/></div>
                    <div>
                    <p>序列号: {item.serialNo}</p>
                    <p>型号: {item.model}</p>
                    <p>有效日期: {validTime}</p>
                    </div>
                </div>
                <Divider variant='middle'/>
            </div>)
        })
        return resArr
    }

    const renderPcList = () => {
        const handleOnMouseEnter = (index) => {
            window.document.getElementById(index).style.background = '#eee'
        }
        const handleOnMouseLeave = (index) => {
            window.document.getElementById(index).style.background = 'none'
        }
        if(data.length === 0) return
        const resArr = []
        data.forEach((item, index) => {
            const validTime = item.validTime === 0 ? '永久注册' : item.validTime;
            resArr.push(<div key={index} id={index} style={{display: 'flex', flexDirection: 'row'}} onMouseEnter={() => {handleOnMouseEnter(index)}} onMouseLeave={() => {handleOnMouseLeave(index)}} onClick={() => {props.history.push({pathname: '/virInfo/' + item.serialNo })}}>
                <div><img src={item.album} alt=""/></div>
                <div>
                    <p>序列号：{item.serialNo}</p>
                    <p>型号：{item.model}</p>
                    <p>有效日期：{validTime}</p>
                </div>
            </div>)
        })
        return resArr
    }


    return (
        <FadeTransitions>
            <div>{isPc ? 
                <div>
                    <div>
                        <div className="top_img" style={{display:'flex', justifyContent: 'center'}}>{isPc ? <img src="http://iph.href.lu/800x150" alt=""/> : <img src="http://iph.href.lu/300x80" alt=""/>}</div>
                        <div className="search" style={{display:'flex', justifyContent: 'center', margin: '20px 0'}}><SearchBar/></div>
                    </div>
                    <div style={{height: 500, overflow: 'auto', width: '70%', margin: '10px auto 10px auto'}}>{renderPcList()}</div>
                </div> : 
                <div style={{ display: 'flex', justifyContent: 'center',flexDirection: 'column' }}>
                    <div style={{background: '#fff', position: 'fixed', top: 44, width: '100%', paddingTop: '10px'}}>
                        <div className="top_img" style={{display:'flex', justifyContent: 'center'}}>{isPc ? <img src="http://iph.href.lu/800x150" alt=""/> : <img src="http://iph.href.lu/300x80" alt=""/>}</div>
                        <div className="search" style={{display:'flex', justifyContent: 'center', margin: '20px 0'}}><SearchBar/></div>
                    </div>
                <div style={{paddingTop: '160px'}}>{renderMobileList()}</div>
            </div>}</div>
        </FadeTransitions>
    )
}

export default withRouter(VirCard);