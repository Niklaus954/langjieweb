import React, { Component, useEffect, useState } from 'react';
import apiSolution from '../../api/apiSolution';
import ParagraphStyles from '../Common/ParagraphStyles';
import Common from '../Common/Common';
import FadeTransitions from '../Common/FadeTransitions';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CONFIG from '../../config'

const VirProInfo = props => {
    console.log(props)
    const isPc = useMediaQuery(CONFIG.minDeviceWidth)
    const [data, setData] = useState([])
    const virProName = props.location.pathname.split('/')[props.location.pathname.split('/').length - 1]
    useEffect(() => {
        const fetch = async() => {
            const result = await apiSolution.fetchVirInfo({
                virProId: virType(virProName)
            })
            if(result.code == 200) setData(result.data)
        }
        fetch()
    }, [])

    const virType = (virProName) => {
        if(virProName == '威程801') {
            return ({virProId: 28})
        }else if(virProName == '威程802'){
            return ({virProId: 32})
        }else if (virProName == '威程881') {
            return ({virProId: 33})
        }else if (virProName == '威程884') {
            return ({virProId: 34})
        }
    }
    const Render = () => {
        if(data.length == 0) return
        const content = data[0].content;
        const resArr = []
        try {
            resArr.push(<div style={{backgroundImage: `url(${CONFIG.url(`/img/gallery/${virProName}.png`)})`, width:  "100%", height: 200,  backgroundSize:'contain', backgroundRepeat: "no-repeat", backgroundPosition:"center", cursor:"pointer" }} onLoad={() => {console.log(111)}}></div>)
        }catch (e) {
            resArr.push(<div style={{backgroundImage: `url(${CONFIG.url(`/img/gallery/${virProName}.jpg`)})`, width:  "100%", height: 200,  backgroundSize:'contain', backgroundRepeat: "no-repeat", backgroundPosition:"center", cursor:"pointer" }} onLoad={() => {console.log(222)}}></div>)
        }
        for(let key in content) {
            const arr = []
            resArr.push(<div key={key}><h3>{key}</h3></div>)
            content[key].forEach((item, index) => {
                arr.push(<div key={index} style={{fontSize: isPc ? 16 : 14, textIndent: isPc ? 32 : 28, fontWeight: 400, lineHeight: 1.4, color: "#333"}}>
                    <div><p>{item}</p></div>
                </div>)
            })
            resArr.push(arr)
        }
        return resArr
    }
    return(
        <FadeTransitions>
            <div style={{margin: isPc ? "20px 40px" : "20px", overflow:'auto'}}>
                <div>{Render()}</div>
            </div>
        </FadeTransitions>
    )
}

export default VirProInfo;