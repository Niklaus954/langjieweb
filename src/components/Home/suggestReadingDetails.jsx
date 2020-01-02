import React, { useEffect, useState} from 'react';
import Common from '../Common/Common'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import CONFIG from '../../config';
import apiAboutLangjie from '../../api/apiAboutLangjie';
import FadeTransitions from '../Common/FadeTransitions'

const SuggestReadingDetails = state => {
    const isPc = useMediaQuery(CONFIG.minDeviceWidth)
    const contentId = state.location.search.split('=')[state.location.search.split('=').length - 1]
    const [data, setData] = useState([])
    useEffect(() => {
        const fetch = async() => {
            const result = await apiAboutLangjie.fetchRecommendReadingById({
                contentId: contentId
            })
            if(result.code === 200) setData(result.data)
        }
        fetch()
    },[])
    const RenderSuggestReadingContent = () => {
        const resArr = []
        if(data.length === 0) return
        const content = data[0].content
        const transArr = Common.transToViewAll(content)
        transArr.forEach((item, index) => {
            if(item.type == 'text'){
                item.valueArr.map((ite, ind) => {
                    resArr.push(<div key={index+''+ind} style={{fontSize: isPc ? 16 : 14, textIndent: isPc ? 32 : 28, fontWeight: 400, lineHeight: 1.4, color: "#333",}}><div><p>{ite}</p></div></div>)
                })
            }else if(item.type == 'picture'){
                const imgArr = []
                item.valueArr.map((ite, ind) => {
                    imgArr.push(
                        <div key={index+''+ind} style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems:'center'}}>
                            {/*<img src={CONFIG.url(`/img/gallery/${ite}`)} alt="" width={300} height="160vw"/>*/}
                            <div style={{backgroundImage: `url(${CONFIG.url(`/img/gallery/${ite}`)})`,width: isPc ? 450 : 300, height: isPc ? 350 : 220, backgroundSize:'contain', backgroundRepeat: "no-repeat", backgroundPosition:"center", cursor:"pointer"}} onClick={() => {window.open( CONFIG.url(`/img/gallery/${ite}`))}}></div>
                            {isPc ? <div></div>: <div>(点击图片查看原图)</div>}
                            <div><p>{ite.slice(0, ite.indexOf('.'))}</p></div>
                        </div>
                    )
                })
                resArr.push(<div key={index} style={{display:'flex', flexDirection: isPc ? (imgArr.length > 1 ? "row" : "column") : "column",justifyContent:'space-around',alignItems:'center'}}>{imgArr}</div>)
            }else if(item.type == 'video') {
                item.valueArr.map((ite, ind) => {
                    resArr.push(
                        <div key={index+''+ind}>
                            <video src={CONFIG.url(`/img/gallery/${ite}`)} controls={true} width="100%"></video>
                        </div>
                    )
                })
            }
        })
        return  resArr
    }

    const renderTitle = () => {
        if(data.length === 0) return
        const title = data[0].name
        return(
            <div><h3>{title}</h3></div>
        )
    }
    return(
        <FadeTransitions>
            <div style={{margin: isPc ? "20px 40px" : "20px", overflow:'auto'}}>
                <div>{renderTitle()}</div>
                <div>{RenderSuggestReadingContent()}</div>
            </div>
        </FadeTransitions>
    )
}


export default SuggestReadingDetails