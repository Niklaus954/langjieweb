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
    return  resArr
}

const RenderTitle = (data) => {
    if(data.length === 0) return
    const name = data[0].name
    return(<h3>{name}</h3>)
}

//客户服务走马灯图片展示

const RenderServiceCarousel = (album) => {
    let albumArr = []
    let type
    if(album.length === 0) return;
    const val = window.location.hash.indexOf('contract')
    const typeArr = ['contract'];
    const settings = {
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: false,
        speed: 500,
        autoplay: true,
        arrows: false
    }
    try {
        if(album[0].val == ""){
            if(val === -1){
                albumArr = ['/no_img.png']
            }else {
                albumArr = ['/controller_system.png']
            }
        }else {
            albumArr = album[0].val.split(',');
        }
        type = album[0].val.indexOf(typeArr[0]);
    }catch (e) {
        if(val === -1){
            albumArr = ['/no_img.png']
        }else {
            albumArr = ['/controller_system.png']
        }
    }
    // return(
    //     <div>
    //         <div>
    //             <Carousel
    //                 autoplay={true}
    //                 dots={type === -1 ? true : false }
    //                 infinite={true}
    //             >
    //                 {albumArr.map((item, index) => (
    //                     <div key={index} style={{margin: 20}}><div style={{backgroundImage: `url(${CONFIG.url(`/img${item}`)})`, backgroundPosition: "center", backgroundSize: type === -1 ? "cover" : "contain", backgroundRepeat: "no-repeat", height:  200, width: "80%", margin: "auto", cursor: "pointer"}} onClick={() =>{window.open(CONFIG.url(`/img${item}`))}}></div></div>
    //                 ))}
    //             </Carousel>
    //         </div>
    //         {/*<div><p style={{textAlign: "center"}}>（点击图片查看原图）</p></div>*/}
    //     </div>
    // )

    return(
        <div style={{paddingBottom: 20}}>
            <Slider {...settings}>
                {albumArr.map((item, index) => (
                    <div key={index}><div style={{backgroundImage: `url(${CONFIG.url(`/img${item}`)})`, backgroundPosition: "center", backgroundSize: type === -1 ? "cover" : "contain", backgroundRepeat: "no-repeat", height:  200, width: "80%", margin: "auto", cursor: "pointer"}} onClick={() =>{window.open(CONFIG.url(`/img${item}`))}}></div></div>
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