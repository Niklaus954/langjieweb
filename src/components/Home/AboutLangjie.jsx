import React, { useEffect, useState } from 'react';
import apiAboutLangjie from '../../api/apiAboutLangjie';
import  ParagraphStyles from '../Common/ParagraphStyles';
import CONFIG from '../../config';
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Common from '../Common/Common';
import FadeTransitions from '../Common/FadeTransitions'

const AboutLangjie = () => {
    const isPc = useMediaQuery(CONFIG.minDeviceWidth)
    const [data, setData] = useState([])
    useEffect(() =>{
        const fetch = async () => {
            const result = await apiAboutLangjie.fetchBasicInfo()
            if(result.code == 200) setData(result.data)
        }
        fetch()
    },[])

    const renderParagraph = () => {
        if(data.length === 0) return
        const obj = data[0].content
        let resArr = [];
        const transArr = Common.transToViewAll(obj);
        transArr.forEach((items, index) => {
            if (items.type === 'text') {
                items.valueArr.forEach((it, ind) => {
                    resArr.push(<p key={index + '-' + ind}>{it}</p>);
                });
            }
        });
        return resArr
    }
    return(
        <FadeTransitions>
            <div style={{ margin: isPc ? 40 : 20 }}>
                <div><h3>公司简介</h3></div>
                <div>
                    {ParagraphStyles.ContentStyles(renderParagraph())}
                </div>
            </div>
        </FadeTransitions>
    )
}


export default AboutLangjie;