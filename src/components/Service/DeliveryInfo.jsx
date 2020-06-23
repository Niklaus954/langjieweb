import React, {useState, useEffect} from 'react';
import apiService from '../../api/apiService';
import { Steps } from 'antd-mobile';
const Step = Steps.Step;

const Delivery = props => {
    const [infoList, setInfoList] = useState([])
    useEffect(() => {
        const express_no = props.location.pathname.split('/')[props.location.pathname.split('/').length-1]
        fetch(express_no)
    },[props.location.pathname])
    const fetch = async express_no => {
        const result = await apiService.getExpressInfo(express_no)
        if(result.code === 200) {
            setInfoList(result.data.result.list)
        }
    }
    
    return(
        <div style={{margin: 20}}>
            <div>
                <Steps size="small">
                {infoList.map((item, index) => (
                    <Step key={index} title={item.status} description={item.time}/>
                ))}
                </Steps>
            </div>
        </div>
    )
}

export default Delivery