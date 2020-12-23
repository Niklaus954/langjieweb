import React, { useState } from 'react';
import ItemList from '../Common/ItemList';
import apiService from '../../api/apiService';
import CONFIG from '../../config';
import {
    withRouter
} from 'react-router-dom'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import FadeTransitions from '../Common/FadeTransitions'
import { Typography, TableContainer, Table, TableRow, TableCell, TableBody, TableHead, IconButton, Button, GridListTile, GridListTileBar, GridList } from '@material-ui/core';
import {GetApp as GetAppIcon} from '@material-ui/icons'
import moment from 'moment';


function RenderPanel (param) {

    const { info } = param
    let tableCellTitle = ''
    const dependencyArr = []
    const dependencyInfo = []
    const galleryInfo = []
    const galleryArr = []
    
    if (info.type === '安装盘') {
        tableCellTitle = '定制'
        info.installDiskInfo.dependencies.map((item, index) => {
            dependencyArr.push(
                <TableRow key={index} style={{height: 40}}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.version}</TableCell>
                    <TableCell><IconButton onClick={() => {handleDownLoadDependency(info, item)}}><GetAppIcon color='primary'/></IconButton></TableCell>
                </TableRow>
            )
        })
        dependencyInfo.push(
            <Table size='small' key='dependencyTable'>
                <TableHead><TableRow><TableCell colSpan={3}><Typography variant='body1'>补丁表</Typography></TableCell></TableRow></TableHead>
                <TableBody>{dependencyArr}</TableBody>
            </Table>
        )
        
    } else if (info.type === '图库') {
        tableCellTitle = '附言'
        info.galleryInfo.GallerySubs.map((item, index) => {
            if (item.album.split('.')[item.album.split('.').length - 1] === 'mp4') {
                item.suffixName = '.mp4';
                item.type = '视频'
                galleryArr.push(<GridListTile key={index}>
                    <video controls width="100%" height="160px" src={CONFIG.url(`/img/gallery/${item.album}`)}></video>
                    <GridListTileBar
                    title={item.album.split('.')[0]}
                    subtitle={item.description}
                    />
                </GridListTile>)
            } else {
                galleryArr.push(<GridListTile key={index}>
                    <div style={{backgroundImage: `url(${CONFIG.url(`/img/gallery/list_${item.album}`)})`, width: '100%', height: 160,  backgroundSize:'contain', backgroundRepeat: "no-repeat", backgroundPosition:"center", cursor:"pointer" }} onClick={() => window.open(CONFIG.url(`/img/gallery/${item.album}`))}></div>
                    <GridListTileBar
                    title={item.album.split('.')[0]}
                    subtitle={item.description}
                    actionIcon={<IconButton onClick={() => downLoadPic(info,item)}><GetAppIcon/></IconButton>}
                    />
                </GridListTile>)
            }
        })
        galleryInfo.push(
            <GridList key="gallery" cellHeight={200}>
                {galleryArr}
            </GridList>)
    } else {
        tableCellTitle = '附言'
    }
    const TransRowCell = []
    for(let key in info) {
        if (key === 'type') {
            TransRowCell.push(<TableRow key={key}>
                    <TableCell style={{background:'#eee'}}>类型</TableCell>
                    <TableCell>{info[key]}</TableCell>
                </TableRow>
            )
        } else if (key === 'fileName') {
            TransRowCell.push(
                <TableRow key={key}>
                    <TableCell style={{background:'#eee'}}>文件名</TableCell>
                    <TableCell>{info[key]}</TableCell>
                </TableRow>
            )
        } else if (key === 'remark') {
            TransRowCell.push(
                <TableRow key={key}>
                    <TableCell style={{background:'#eee'}}>{tableCellTitle}</TableCell>
                    <TableCell>{info[key]}</TableCell>
                </TableRow>
            )
        } else if (key === 'uploadPerson') {
            TransRowCell.push(
                <TableRow key={key}>
                    <TableCell style={{background:'#eee'}}>上传人</TableCell>
                    <TableCell>{info[key]}</TableCell>
                </TableRow>
            )
        } else if (key === 'uploadTime') {
            TransRowCell.push(
                <TableRow key={key}>
                    <TableCell style={{background:'#eee'}}>更新时间</TableCell>
                    <TableCell>{moment(info[key]).format('YYYY-MM-DD')}</TableCell>
                </TableRow>
            )
        } else if (key === 'docSize') {
            TransRowCell.push(
                <TableRow key={key}>
                    <TableCell style={{background:'#eee'}}>文档大小</TableCell>
                    <TableCell>{parseFloat(info[key]/1024/1024).toFixed(2)}MB</TableCell>
                </TableRow>
            )
        }
    }

    const downLoadPic = async (v1, v2) => {
        const param = { fileId: v1._id, picId: v2.id}
        const res = await apiService.downloadByCloudDiskId(param)
        if (res.code === 200) {
            window.open('https://www.langjie.com/open/burnDisk/download/'+res.data)
        } else {

        }
    }

    const downLoadSource = async (e) => {

        const res = await apiService.downloadByCloudDiskId({ fileId: e._id })
        if (res.code === 200) {
            window.open('https://www.langjie.com/open/burnDisk/download/'+res.data)
        } else {

        }
    }

    const handleDownLoadDependency = async(v1, v2) => {
        const param = {fileId: v2.id, installDiskId: v1.installDiskId, type: v2.type}
        const res = await apiService.downloadDependency(param)
        if (res.code === 200) {
            window.open('https://www.langjie.com/open/burnDisk/download/'+res.data)
        }
       
    }

    return (
        <div style={{overflowY: 'auto', width: "66%", margin: "0 auto"}}>
            <TableContainer style={{width: '97%', margin: 10}}>
                <Table>
                    <TableHead><TableRow><TableCell colSpan={2}><Typography variant='body1'>详情</Typography></TableCell></TableRow></TableHead>
                    <TableBody>{TransRowCell}</TableBody>
                </Table>
            </TableContainer>
            <div style={{margin: 20, float: 'right', display: info.type === '图库' ?  'none' : 'block' }}><Button variant="contained" startIcon={<GetAppIcon/>} color='primary' onClick={() => {downLoadSource(info)}}>下载</Button></div>
            <TableContainer style={{width: '97%', margin: 10}}>{dependencyInfo}</TableContainer>
            <TableContainer style={{overflow: 'hidden'}}>{galleryInfo}</TableContainer>
        </div>
    )
}

const CloudDisk = props => {

    const [info, setInfo] = useState({})
    const isPc = useMediaQuery(CONFIG.minDeviceWidth);
    const backSelectedItem = async item => {
        if (isPc) {
            const result = await apiService.fetchCloudDiskInfo({fileId: item._id})
            if (result.code === 200) {
                setInfo(result.data)
            }
        } else {
            props.history.push({
                pathname: '/cloudDiskInfo/' + item._id, 
            });
        }
    }
    

    const renderList = items => {
        const updateTime = items.updateTime === null ? '' : moment(items.updateTime).format('YYYY-MM-DD')
        return (
            <div style={{ flex: 1, padding: 4, marginLeft: 4 }}>
                <p>文件名: {items.fileName}</p>
                <p>更新日期: {updateTime}</p>
                <p>{items.remark}</p>
            </div>
        )
    }
    
    

    

    return (
        <FadeTransitions>
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row', borderRight: '1px solid #eee' }}>
                <div style={{display: 'flex', flexDirection:'column',  width: isPc ? 400 : '100%', background: "#f5f5f5"}}>
                    <div style={{ overflow: 'auto' }}>
                        <ItemList
                            isPc={isPc}
                            fetchList={apiService.fetchCloudDiskList}
                            renderAlbum={true}
                            renderList={renderList}
                            serviceType="CloudDisk"
                            backSelectedItem={backSelectedItem}
                        ></ItemList>
                    </div>
                </div>
                {isPc && <RenderPanel info={info} />}
                
            </div>
        </FadeTransitions>
    )
}

export default withRouter(CloudDisk);