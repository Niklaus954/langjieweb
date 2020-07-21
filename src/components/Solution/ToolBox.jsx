import React, { Component, useEffect, useState } from 'react';
import apiSolution from '../../api/apiSolution';
import ParagraphStyles from '../Common/ParagraphStyles';
import Common from '../Common/Common';
import FadeTransitions from '../Common/FadeTransitions';
import CONFIG from '../../config';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';
import CloudDownload from '@material-ui/icons/CloudDownload';
import Divider from '@material-ui/core/Divider'


const ToolBox = () => {
    const isPc = useMediaQuery(CONFIG.minDeviceWidth)
    const [data, setData] = useState([])
    useEffect(() => {
        const fetch = async() => {
            const result = await apiSolution.fetchActionTool()
            if(result.code === 200) setData(result.data)
        }
        fetch()
    },[])

    const render = () => {
        if(data.length === 0) return
        const resObj = {}, resArr = [], imgItemArr = [], textItemArr = []
        const content = data[0].content
        for(let key in content) {
            try {
                if(typeof content[key] === 'string') {
                    const it = JSON.parse(content[key])
                    imgItemArr.push(<div key={key} style={{width: '50%', display: 'flex', justifyContent: 'center', margin: "20px 0", alignSelf: "flex-start"}}>
                        <div style={{width: "70%", display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                            <div style={{backgroundImage: `url(${CONFIG.url(`/img/gallery/${it.name}`)})`, width: 70, height: 70,  backgroundSize:'contain', backgroundRepeat: "no-repeat", backgroundPosition:"center"}}></div>
                            <h3>{key}</h3>
                            <div style={{fontSize: 12}}><span>{it.digest}</span></div>
                        </div>
                    </div>)
                }else{
                    textItemArr.push(Common.transToView(content[key]).value)
                }
            } catch (error) {
               console.log(error)
            }
        }
        

        const download = <div key="kit">
            <div style={{display: 'flex', justifyContent: 'space-around', height: 240, alignItems: 'center', flexDirection: isPc ? "row" : "column"}}>
                <div style={{backgroundImage: `url(${CONFIG.url(`/img/gallery/toolBox.png`)})`, width:"100%", height: "100%", maxWidth: 400,  backgroundSize:'contain', backgroundRepeat: "no-repeat", backgroundPosition:"center"}}></div>
                <div style={{display:'flex', justifyContent:'space-around', flexDirection:'column', height: "70%", alignItems: 'center'}}>
                    <h2>安可迅工具箱</h2>
                    <div className="download"><Button startIcon={<CloudDownload/>} color="primary" variant="contained">免费下载</Button></div>
                </div>
            </div>
        </div>

        resArr.push(download)
        resArr.push(<div key="textItem" style={{padding: "0 20px"}}><p style={{fontSize: isPc ? 16 : 14, textIndent: isPc ? 32 : 28, fontWeight: 400, lineHeight: 1.4, color: "#333"}}>{textItemArr}</p></div>)
        resArr.push(<div key="imgItem">
            <div style={{color: "#6495ed", textAlign: 'center', paddingBottom:"18px", fontSize: 16}}><span>工具种类</span></div>
            <div><Divider light={true} variant="fullWidth"/></div>
            <div style={{display: 'flex', flexWrap: "wrap"}}>{imgItemArr}</div>
        </div>)

        return resArr
    }

    return(
        <FadeTransitions>
            <div>
                <div>{ParagraphStyles.RenderTitle(data)}</div>
                <div>{render()}</div>
            </div>
        </FadeTransitions>
    )
}

export default ToolBox;