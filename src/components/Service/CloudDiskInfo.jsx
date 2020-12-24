import React, { useState, useEffect } from 'react';
import {
    withRouter,
} from 'react-router-dom'
import apiService from '../../api/apiService';
import FadeTransitions from '../Common/FadeTransitions'
import { List, Toast } from 'antd-mobile';
import { IconButton } from '@material-ui/core';
import { GetApp as GetAppIcon } from '@material-ui/icons'
import { GridListTile, GridListTileBar, GridList, Button } from '@material-ui/core'
import moment from 'moment'
import CONFIG from '../../config';
const Item = List.Item;

const CloudDiskInfo = props => {
    const [info, setInfo] = useState([])
    useEffect(() => {
        const id = props.location.pathname.split('/cloudDiskInfo/')[1];
        fetch(id)
    }, [props.location.pathname])
    const fetch = async id => {
        const result = await apiService.fetchCloudDiskInfo({fileId: id})
        if (result.code === 200) {
            setInfo(result.data)
        }
    }
    
    const RenderItem = () => {
        const itemArr = []
        let TransRowCell = ['type','fileName','remark','size','uploadPerson','uploadTime']
        if (!Object.prototype.hasOwnProperty.call(info, 'remark')) {
            info.remark = ''
        }
        for (let key in info) {
            if (key === 'type') {
                itemArr[TransRowCell.indexOf(key)] = (<Item key={key} extra={info[key]} wrap={true}>类型</Item>)
            } else if (key === 'fileName') {
                itemArr[TransRowCell.indexOf(key)] = (<Item multipleLine={true} key={key} extra={info[key]} wrap={true}>文件名</Item>)
            } else if (key === 'remark') {
                if (info['type'] === '安装盘') {
                    itemArr[TransRowCell.indexOf(key)] = (<Item key={key} extra={info[key]} wrap={true}>定制</Item>)
                } else {
                    TransRowCell.splice(TransRowCell.indexOf(key), 1)
                    itemArr[TransRowCell.length] = (<Item key={key} extra={info[key]} wrap={true}>附言</Item>)
                }     
            } else if (key === 'uploadTime') {
                itemArr[TransRowCell.indexOf(key)] = (<Item key={key} extra={moment(info[key]).format('YYYY-MM-DD')} wrap={true}>更新时间</Item>)
            } else if (key === 'uploadPerson') {
                itemArr[TransRowCell.indexOf(key)] = (<Item key={key} extra={info[key]} wrap={true}>上传人</Item>)
            } else if (key === 'size') {
                if (info["type"] !== '安装盘') {
                    let size = info[key]/1024 //parseFloat().toFixed(2)
                    if (Number(size) > 1024) {
                        size = parseFloat(size/1024).toFixed(2) + 'MB'
                    } else {
                        size = parseFloat(size).toFixed(2) + 'KB'
                    }
                    itemArr[TransRowCell.indexOf(key)] = (<Item key={key} extra={<span>{size}</span>} wrap={true}>尺寸</Item>)
                    
                }
                
            }
        }
        return <List key='detail' renderHeader={() => '详情'}>{itemArr}</List>
    }

    const RenderOtherItem = () => {
        if (info['type'] === '安装盘') {
            const dependencies = []
            info.installDiskInfo.dependencies.map((item, index) => {
                dependencies.push(<Item key={index} extra={item.version} wrap={true}>{item.name}</Item>)
            })
            //return <List renderHeader={() => '补丁表'}>{dependencies}</List>
            return <div>
                <List renderHeader={() => '补丁表'}>{dependencies}</List>
                <div style={{height: 100, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Button style={{width: '50%'}} variant="contained" color="primary">下载</Button>
                    <p style={{fontSize: 10}}>注：仅支持在PC端下载</p>
                </div>
            </div>
        } else if (info['type'] === '文档' || info['type'] === '软件') {
            return <div style={{height: 100, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Button style={{width: '50%'}} variant="contained" color="primary">下载</Button>
            <p style={{fontSize: 10}}>注：仅支持在PC端下载</p>
        </div>
        } else if (info['type'] === '图库') {
            const galleryArr = []
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
                        actionIcon={<IconButton onClick={() => Toast.info('仅支持在PC端下载')}><GetAppIcon/></IconButton>}
                        />
                    </GridListTile>)
                }
            })
            return <GridList key="gallery" cellHeight={200}>{galleryArr}</GridList>
        }
    }

    return (
        <FadeTransitions>
            <div style={{width: '100%'}}>
                <div>{RenderItem()}</div>
                <div>{RenderOtherItem()}</div>
            </div>
        </FadeTransitions>
    )
}

export default withRouter(CloudDiskInfo);