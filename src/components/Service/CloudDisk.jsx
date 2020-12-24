import React, { useState } from 'react';
import ItemList from '../Common/ItemList';
import apiService from '../../api/apiService';
import CONFIG from '../../config';
import {
    withRouter
} from 'react-router-dom'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import FadeTransitions from '../Common/FadeTransitions'
import { Typography, CircularProgress, TableContainer, Table, TableRow, TableCell, TableBody, TableHead, IconButton, Button, GridListTile, GridListTileBar, GridList } from '@material-ui/core';
import {GetApp as GetAppIcon} from '@material-ui/icons'
import moment from 'moment';


function RenderPanel (param) {

    const { info } = param
    let tableCellTitle = ''
    const dependencyArr = []
    const dependencyInfo = []
    const galleryInfo = []
    const galleryArr = []
    let TransRowCell = []
    const [btnInfo, setBtnInfo] = useState({
        node: <GetAppIcon/>,
        msg: '下载',
        disabled: false
    })
    if (!Object.prototype.hasOwnProperty.call(info, 'remark')) {
        info.remark = ''
    }
    if (info.type === '安装盘') {
        TransRowCell = ['type','fileName','remark','size','uploadPerson','uploadTime']
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
        TransRowCell = ['type','fileName','size','uploadPerson','uploadTime','remark']
        tableCellTitle = '附言'
        info.galleryInfo.GallerySubs.map((item, index) => {
            if (item.album.split('.')[item.album.split('.').length - 1] === 'mp4') {
                // item.suffixName = '.mp4';
                // item.type = '视频'
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
        TransRowCell = ['type','fileName','size','uploadPerson','uploadTime','remark']
        tableCellTitle = '附言'
    }
    for(let key in info) {
        if (key === 'type') {
            TransRowCell[TransRowCell.indexOf(key)] = (<TableRow key={key}>
                    <TableCell style={{background:'#eee'}}>类型</TableCell>
                    <TableCell>{info[key]}</TableCell>
                </TableRow>
            )
        } else if (key === 'fileName') {
            TransRowCell[TransRowCell.indexOf(key)] = (
                <TableRow key={key}>
                    <TableCell style={{background:'#eee'}}>文件名</TableCell>
                    <TableCell>{info[key]}</TableCell>
                </TableRow>
            )
        } else if (key === 'uploadPerson') {
            TransRowCell[TransRowCell.indexOf(key)] = (
                <TableRow key={key}>
                    <TableCell style={{background:'#eee'}}>上传人</TableCell>
                    <TableCell>{info[key]}</TableCell>
                </TableRow>
            )
        } else if (key === 'uploadTime') {
            TransRowCell[TransRowCell.indexOf(key)] = (
                <TableRow key={key}>
                    <TableCell style={{background:'#eee'}}>更新时间</TableCell>
                    <TableCell>{moment(info[key]).format('YYYY-MM-DD')}</TableCell>
                </TableRow>
            )
        } else if (key === 'size') {
            if (info['type'] !== '安装盘') {
                let size = info[key]/1024 //parseFloat().toFixed(2)
                if (Number(size) > 1024) {
                    size = parseFloat(size/1024).toFixed(2) + 'MB'
                } else {
                    size = parseFloat(size).toFixed(2) + 'KB'
                }
                TransRowCell[TransRowCell.indexOf(key)] = (
                    <TableRow key={key}>
                        <TableCell style={{background:'#eee'}}>尺寸</TableCell>
                        <TableCell>{size}</TableCell>
                    </TableRow>
                )
            } else {
                TransRowCell.splice(TransRowCell.indexOf(key), 1)
            }
        } else if (key === 'remark') {
            //视频
            TransRowCell[TransRowCell.indexOf(key)] = (
                <TableRow key={key}>
                    <TableCell style={{background:'#eee'}}>{tableCellTitle}</TableCell>
                    <TableCell>{info[key]}</TableCell>
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
        setBtnInfo({
            node: <CircularProgress color="secondary" size={20} />,
            msg: '下载中...',
            disabled: true
        })
        const res = await apiService.downloadByCloudDiskId({ fileId: e._id })
        if (res.code === 200) {
            setBtnInfo({
                node: <GetAppIcon/>,
                msg: '下载',
                disabled: false
            })
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
            <div style={{margin: 20, float: 'right', display: info.type === '图库' ?  'none' : 'block' }}><Button disabled={btnInfo.disabled} variant="contained" startIcon={btnInfo.node} color='primary' onClick={() => {downLoadSource(info)}}>{btnInfo.msg}</Button></div>
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
                {Object.keys(info).length !==0 ? isPc &&  <RenderPanel info={info} /> : isPc &&  <div style={{textAlign: 'center', width: '60%'}}>暂无数据</div>} 
            </div>
        </FadeTransitions>
    )
}

export default withRouter(CloudDisk);