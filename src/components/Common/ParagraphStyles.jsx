import React, { useEffect, useState } from 'react';
import CONFIG from '../../config'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Carousel } from 'antd-mobile'
import Common from "./Common";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
                        <div style={{backgroundImage: `url(${CONFIG.url(`/img/gallery/${ite}`)})`, width: isPc ? (item.valueArr.length > 1 ? 300 : 450)  : 300, height: isPc ? (item.valueArr.length > 1 ? 220 : 300) : 220, backgroundSize:'contain', backgroundRepeat: "no-repeat", backgroundPosition:"center", cursor:"pointer" }} onClick={() => {window.open(CONFIG.url(`/img/gallery/${ite}`))}}></div>
                        {/*{isPc ? <div></div>: <div><p>(点击图片查看原图)</p></div>}*/}
                        <div style={{textIndent: 0}}><p>{ite.slice(0, ite.indexOf('.'))}</p></div>
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
    return resArr
}

const RenderTitle = (data) => {
    const keyWord = "安可迅"
    if(data.length === 0) return
    const name = data[0].name
    if(name.indexOf('®') !== -1) {
        return(
            <h3 style={{display: 'flex'}}><div>{name.split('®')[0]}</div><div><sup>®</sup></div><div>{name.split('®')[name.split('®').length - 1]}</div></h3>
        )
    }else{
        //console.log(name)
        if(name.indexOf(keyWord) !== -1){
            return(<h3 style={{display: 'flex'}}><div>{keyWord}</div><div>{name.split(keyWord)[name.split(keyWord).length - 1]}</div></h3>)
        }else{
            return(<h3>{name}</h3>)
        }
    }
}

//客户服务走马灯图片展示

const RenderServiceCarousel = (album) => {
    let albumArr = []
    if(album.length === 0) return;
    const settings = {
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: false,
        speed: 500,
        autoplay: false,
        arrows: false
    }
    albumArr = album[0].val.split(',');

    return(
        <div style={{paddingBottom: 10}}>
            <Slider {...settings}>
                {albumArr.map((item, index) => (
                    <div key={index}><div style={{backgroundImage: `url(${CONFIG.url(`/img${item}`)})`, backgroundPosition: "center", backgroundSize: "contain", backgroundRepeat: "no-repeat", height:  200, width: "80%", margin: "auto", cursor: "pointer"}} onClick={() =>{window.open(CONFIG.url(`/img${item}`))}}></div></div>
                ))}
            </Slider>
        </div>
    )
}



export default {
    ContentStyles: ContentStyles,
    CommonContentRender: CommonContentRender,
    RenderTitle: RenderTitle,
    RenderServiceCarousel: RenderServiceCarousel
}