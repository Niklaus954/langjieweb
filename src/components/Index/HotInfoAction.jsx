import React, {useEffect, useState} from 'react';
import {
    Link,
} from 'react-router-dom'
import CONFIG from '../../config';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
const HotInfoAction = () => {
    const isPc = useMediaQuery(CONFIG.minDeviceWidth);
    const [data, setData] = useState([])
    useEffect(() => {
        setTimeout(() => {
            setData([{
                tag: "安可迅平台",
                title: "Action工具助您轻松开发",
                content: "配合Action工具箱，让您快速开发出属于自己的应用程序。"
            }])
        },500)
    },[])
    //PC端
    if(isPc) {
        return (
            <div style={{maxWidth: CONFIG.indexPageMaxWidth, margin: "auto"}}>
                {
                    data.map((val, index) => (
                        <div key={index} style={{display: "flex", flexDirection: "row", margin: "20px 40px 20px 40px"}}>
                            <div style={{width: "31%", paddingRight: 50}}>
                                <h3>{val.tag}</h3>
                                <Divider/>
                                <h2>{val.title}</h2>
                                <div></div>
                            </div>
                            <div style={{width: "69%"}}>
                                <div>
                                <p style={{lineHeight: 1.4, fontSize: 16, fontWeight: 400, color: "#333"}}>{val.content}</p>
                                </div>
                                <Link to={'/solution/actionPlat'}>
                                    <Button color="primary" variant="outlined">获取Action</Button>
                                </Link>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }else{
        //移动端
        return(
            data.map((val, index) => (
                <div key={index} style={{margin: 40}}>
                    <h2>{val.tag}</h2>
                    <Divider/>
                    <h3>{val.title}</h3>
                    <p style={{lineHight: 1.4, fontSize: 14, fontWeight: 400, color: "#333"}}>{val.content}</p>
                    <Link to={'/solution/actionPlat'}>
                        <Button color="primary" variant="outlined">获取Action</Button>
                    </Link>
                </div>
            ))
        )

    }  
}

export default HotInfoAction