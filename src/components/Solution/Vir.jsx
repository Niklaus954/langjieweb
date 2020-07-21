import React, { Component, useEffect, useState } from 'react';
import apiSolution from '../../api/apiSolution';
import ParagraphStyles from '../Common/ParagraphStyles';
import Common from '../Common/Common';
import FadeTransitions from '../Common/FadeTransitions'
import CONFIG from "../../config";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { withRouter } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import '../../public/css/ImgDisplayStyle.css';
    


const Vir = ({history}) => {
    const isPc = useMediaQuery(CONFIG.minDeviceWidth)
    const [data, setData] = useState([])
    useEffect(() => {
        const fetch = async() => {
            const result = await apiSolution.fetchVir()
            if(result.code === 200) setData(result.data)
        }
        fetch()
    },[])


    const RenderImg = () => {
        const orderArr = []
        const resArr = []
        if(data.length === 0) return
        data.forEach((item, index) => {
            if(data[0]['link'].indexOf(item['id'].toString()) !== -1){
                const des = item['content']['介绍'][0].split('。')[0]
                const transArr = Common.transToViewAll(item['content'])
                transArr.forEach((ite, ind) => {
                    if(ite['type'] === 'picture') {
                        orderArr.push({
                            value: ite.valueArr[0],
                            id: item['id'],
                            content: des
                        })
                    }
                })
            }
        })

        orderArr.sort().forEach((items, index) => {
            resArr.push( 
                isPc ?
                <div key={index} style={{height: 314, padding: "20px 0"}}>
                    <div className="box" onClick={() => {history.push({pathname: `/virProInfo/${items[`id`]}`})}}>
                        <div>
                            <div className="imgBox">
                                <img src={CONFIG.url(`/img/gallery/${items['value']}`)} alt="" />
                            </div>
                            <h2 className="source">{items['value'].split('.')[0]}</h2>
                            <span className="detail">{items.content}</span>
                        </div>
                    </div>
                </div> :
                <div id={index} key={index} style={{padding: "20px", }} onClick={() => {history.push({pathname: `/virProInfo/${items[`id`]}`})}} >
                    <div style={{ display:'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <div style={{backgroundImage: `url(${CONFIG.url(`/img/gallery/${items['value']}`)})`, width:  "60%", height: 180,  backgroundSize:'contain', backgroundRepeat: "no-repeat", backgroundPosition:"center", cursor:"pointer" }} ></div>
                        <div style={{textAlign: "center", color: "#3498db", cursor:'pointer',fontSize: 18, fontWeight: 600}}><p>{items['value'].split('.')[0]}</p></div>
                    </div>
                    <p style={{fontSize:  14, textIndent:  28, lineHeight: 1.4, fontWeight: 400, color: '#333'}}>{items.content}</p>
                    <Divider style={{display: "block"}} variant="middle"/>
                </div>
            ) 
        })
        
        return resArr
        
    }

    const RenderIntroduce = () => {
        if(data.length === 0) return
        const introduce = Common.transToViewAll(data[0]['content'])
        return introduce[0].valueArr[0]
    }
    return(
        <FadeTransitions>
        <div style={{height: "97%"}}>
           <div style={{display: isPc ? "block" : "none"}}>{ParagraphStyles.RenderTitle(data)}</div>
           <div><p style={{fontSize: isPc ? 15 : 14, textIndent: isPc ? 30 : 28, lineHeight: 1.4, fontWeight: 400, color: '#333'}}>{RenderIntroduce()}</p></div>
           <div style={{height: 100}}></div>
           <div style={{ display: isPc ? "flex" :  "block"}}><div id={isPc ? "imgCon": "imgConM"}>{RenderImg()}</div></div>
        </div>
      </FadeTransitions>
    )
}

export default withRouter(Vir);