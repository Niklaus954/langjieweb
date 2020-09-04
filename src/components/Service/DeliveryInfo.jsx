import React, {useState, useEffect} from 'react';
import apiService from '../../api/apiService';
import { Steps, Toast } from 'antd-mobile';
import { CircularProgress, Box } from '@material-ui/core';
const Step = Steps.Step;

const Delivery = props => {
    const [infoList, setInfoList] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const express_no = props.location.pathname.split('/')[props.location.pathname.split('/').length-1]
        fetch(express_no)
    },[props.location.pathname])
    const fetch = async express_no => {
        const result = await apiService.getExpressInfo(express_no)
        if(result.code === 200) {
            setLoading(false)
            if(result.data.result.list.length === 0) {
                Toast.info("暂无快递信息");
            }else{
                setInfoList(result.data.result.list)
            }
            
        }
    }
    
    return(
        <div style={{margin: 20, width: "100%"}}>
            <div style={{height: "100%"}}>
                {loading ? <Box style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%", height: "100%"}}><CircularProgress/> </Box>:
                <Box><Steps size="small">
                {infoList.map((item, index) => (
                    <Step key={index} title={item.status} description={item.time}/>
                ))}
                </Steps></Box>}
            </div>
        </div>
    )
}

export default Delivery