import React, { useEffect, useState } from 'react';
import CONFIG from '../../config'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Common from "./Common";

const ContentStyles = (props) => {
    const isPc = useMediaQuery(CONFIG.minDeviceWidth)
    return(
        <div>
            <div style={{fontSize: isPc ? 16 : 14, textIndent: isPc ? 32 : 28, fontWeight: 400, lineHeight: 1.4, color: "#333"}}>{props}</div>
        </div>
    )
}

const CommonContentRender = (data) => {
    const isPc = useMediaQuery(CONFIG.minDeviceWidth)
    if(data.length === 0) return
    const content = data[0].content
    const transArr = Common.transToViewAll(content)
    const resArr = []
    transArr.forEach((item, index) => {
        if(item.type == 'text'){
            item.valueArr.map((ite, ind) => {
                resArr.push(<div key={index+'1'+ind} ><p>{ite}</p></div>)
            })
        }else if(item.type == 'picture'){
            const imgArr = []
            item.valueArr.map((ite, ind) => {
                imgArr.push(
                    <div key={index+'2'+ind} style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems:'center'}}>
                        {/*<img src={CONFIG.url(`/img/gallery/${ite}`)} alt="" width={300} height="160vw"/>*/}
                        <div style={{backgroundImage: `url(${CONFIG.url(`/img/gallery/${ite}`)})`, width: isPc ? 450 : 300, height: isPc ? 350 : 220, backgroundSize:'contain', backgroundRepeat: "no-repeat", backgroundPosition:"center", cursor:"pointer" }} onClick={() => {window.open(CONFIG.url(`/img/gallery/${ite}`))}}></div>
                        {isPc ? '': <p>(点击图片查看原图)</p>}
                        <div><p>{ite.slice(0, ite.indexOf('.'))}</p></div>
                    </div>
                )
            })
            resArr.push(<div key={index} style={{display:'flex', flexDirection: isPc ? (imgArr.length > 1 ? "row" : "column") : "column",justifyContent:'space-around',alignItems:'center'}}>{imgArr}</div>)
        }else if(item.type == 'video') {
            item.valueArr.map((ite, ind) => {
                resArr.push(
                    <div key={index+'3'+ind} style={{display: "flex", justifyContent: "center"}}>
                        <video src={CONFIG.url(`/img/gallery/${ite}`)} controls={true} width={isPc ? 500 : 300} ></video>
                    </div>
                )
            })
        }
    })
    return  resArr
}

const RenderTitle = (data) => {
    if(data.length === 0) return
    const name = data[0].name
    return(<h3>{name}</h3>)
}



export default {
    ContentStyles: ContentStyles,
    CommonContentRender: CommonContentRender,
    RenderTitle: RenderTitle
}