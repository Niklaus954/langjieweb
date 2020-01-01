import React, { useEffect, useState} from 'react';
import Common from '../Common/Common'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import CONFIG from '../../config';
import apiAboutLangjie from '../../api/apiAboutLangjie';
import FadeTransitions from '../Common/FadeTransitions'

const ActivityDetails = state => {
    const isPc = useMediaQuery(CONFIG.minDeviceWidth)
    const activityId = state.location.search.split('=')[state.location.search.split('=').length - 1]
    const [data, setData] = useState([])
    useEffect(() => {
        const fetch = async() => {
            const result = await apiAboutLangjie.fetchRecentActivityById({
                activityId: activityId
            })
            if(result.code === 200) setData(result.data)
        }
        fetch()
    },[])
    const RenderActivityContent = () => {
        const resArr = []
        if(data.length === 0) return
        const content = data[0].content
        const transArr = Common.transToViewAll(content)
        transArr.forEach((item, index) => {
            if(item.type == 'text'){
                item.valueArr.map((ite, ind) => {
                    resArr.push(<div key={index+''+ind} style={{fontSize: isPc ? 16 : 14, textIndent: isPc ? 32 : 28, fontWeight: 400, lineHeight: 1.4, color: "#333"}}><p>{ite}</p></div>)
                })
            }else if(item.type == 'picture'){
                const imgArr = []
                item.valueArr.map((ite, ind) => {
                    imgArr.push(
                        <div key={index+''+ind} style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems:'center'}}>
                            <img src={CONFIG.url(`/img/gallery/${ite}`)} alt="" width={300} height="160vw"/>
                            {/*<div style={{backgroundImage: `url(${CONFIG.url(`/img/gallery/${ite}`)})`, width: 160, height: 120, backgroundSize:'contain', backgroundRepeat: "no-repeat", backgroundPosition:"center"}}></div>*/}
                            <div><p>{ite}</p></div>
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

    const RenderActivityTitle = () => {
        if(data.length === 0) return
        const title = data[0].name
        return(
            <div><h3>{title}</h3></div>
        )
    }
    return(
        <FadeTransitions>
            <div style={{margin: isPc ? "20px 40px" : "20px", overflow:'auto'}}>
                <div>{RenderActivityTitle()}</div>
                <div>{RenderActivityContent()}</div>
            </div>
        </FadeTransitions>
    )
}


export default ActivityDetails