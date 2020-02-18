import React, { Component, useEffect, useState } from 'react';
import apiSolution from '../../api/apiSolution';
import ParagraphStyles from '../Common/ParagraphStyles';
import Common from '../Common/Common';
import FadeTransitions from '../Common/FadeTransitions'
import CONFIG from "../../config";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { withRouter } from 'react-router-dom';
import {  Histiry } from 'react-router'

const Vir = ({history,}) => {
    console.log()
    const isPc = useMediaQuery(CONFIG.minDeviceWidth)
    const [data, setData] = useState([])
    useEffect(() => {
        const fetch = async() => {
            const result = await apiSolution.fetchVir()
            console.log(result)
            if(result.code === 200) setData(result.data)
        }
        fetch()
    },[])

    const Render = () => {
        const resArr = []
        if(data.length === 0) return
        const content = data[0].content
        const transObj = Common.transToViewAll(content)
        transObj.forEach((item, index) => {
            if(item.type == 'picture') {
                item.valueArr.map((ite, ind) => {
                    resArr.push(<div key={ind} style={{width: "100%"}} parentState={{state: 123}} onClick={() => {history.push({pathname: `/virProInfo/${ite.split('.')[0]}`, state: "111"})}}>
                        <div style={{backgroundImage: `url(${CONFIG.url(`/img/gallery/${ite}`)})`, width: isPc ? 200 : "100%", height: 200,  backgroundSize:'contain', backgroundRepeat: "no-repeat", backgroundPosition:"center", cursor:"pointer" }}></div>
                        <div style={{textAlign: "center", color: "#3498db", cursor:'pointer',fontSize: 18, fontWeight: 600}}><p>{ite.split('.')[0]}</p></div>
                    </div>)
                })
            }
        })
        return resArr
    }
    return(
       <div >
           <FadeTransitions>
             <div>
                 <div style={{display: isPc ? "block" : "none"}}>{ParagraphStyles.RenderTitle(data)}</div>
                 <div style={{display: "flex", justifyContent: "space-around", flexDirection: isPc ? "row" : "column", alignItems:"center", paddingTop: isPc ? 100 : 0 }}>{Render()}</div>
             </div>
           </FadeTransitions>
       </div>
    )
}

export default withRouter(Vir);