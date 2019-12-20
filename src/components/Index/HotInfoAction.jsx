import React, {useEffect, useState} from 'react';
import CONFIG from '../../config';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
const HotInfoAction = () => {
    const isPc = useMediaQuery(CONFIG.minDeviceWidth);
    
    //PC端
    if(isPc) {
        return (
            <div style={{maxWidth: CONFIG.indexPageMaxWidth, margin: "auto"}}>
                <div style={{display: "flex", flexDirection: "row", margin: "20px 40px 0 40px", height: 160}}>
                    <div style={{width: "35%", paddingRight: 50}}>
                        <h3>安可迅平台</h3>
                        <Divider/>
                        <h2>Action工具助您轻松开发</h2>
                        <div></div>
                    </div>
                    <div>
                        <div style={{height: "50%"}}>
                            <p>配合Action工具箱，让您快速开发出属于自己的应用程序</p>
                        </div>
                        <Button color="primary" variant="outlined" href="">获取Action</Button>
                    </div>
                </div>
            </div>
        )
    }else{
        //移动端
        return(
            <div style={{margin: 40}}>
                <h2>安可迅平台</h2>
                <Divider/>
                <h3>Action工具助您轻松开发</h3>
                <p>配合Action工具箱，让您快速开发出属于自己的应用程序</p>
                <Button color="primary" variant="outlined" href="">获取Action</Button>
            </div>
        )

    }  
}

export default HotInfoAction