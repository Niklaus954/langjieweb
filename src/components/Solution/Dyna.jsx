import React, { useEffect, useState } from 'react';
import apiSolution from '../../api/apiSolution';
import ParagraphStyles from '../Common/ParagraphStyles';
import Common from '../Common/Common';
import FadeTransitions from '../Common/FadeTransitions'
import CONFIG from "../../config";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { withRouter } from 'react-router-dom';
import Divider from '@material-ui/core/Divider'


const Dyna = ({history}) => {
    const isPc = useMediaQuery(CONFIG.minDeviceWidth)
    const [data, setData] = useState([])
    useEffect(() => {
        const fetch = async() => {
            const result = await apiSolution.fetchDyna()
            if(result.code === 200) setData(result.data)
        }
        fetch()
    },[])


    const Render = () => {
        const orderArr = []
        const resArr = []
        if(data.length === 0) return
        data.forEach((items, index) => {
            if(data[0]['link'].indexOf(items['id'].toString()) != -1){
                const content = items['content']['介绍'][0].split('。')[0]
                const transArr = Common.transToViewAll(items['content'])
                transArr.forEach((ite, ind) => {
                    if(ite['type'] === 'picture') {
                        orderArr.push({
                            value: ite.value,
                            id: items['id'],
                            content
                        })
                    }
                })
            }
        })
        

        orderArr.sort().forEach((items, index) => {
            resArr.push(<div id={index} key={index} style={{padding: "20px", }} onClick={() => {history.push({pathname: `/dynaProInfo/${items[`id`]}`})}}>
                <div style={{ display:'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <div style={{backgroundImage: `url(${CONFIG.url(`/img/gallery/${items['value']}`)})`, width: isPc ? 180 : "60%", height: 180,  backgroundSize:'contain', backgroundRepeat: "no-repeat", backgroundPosition:"center", cursor:"pointer" }}></div>
                    <div style={{textAlign: "center", color: "#3498db", cursor:'pointer',fontSize: 18, fontWeight: 600}}><p>{items['value'].split('.')[0]}</p></div>
                </div>
                <p style={{fontSize: isPc ? 15 : 14, textIndent: isPc ? 30 : 28, lineHeight: 1.4, fontWeight: 400, color: '#333'}}>{items.content}</p>
                <Divider style={{display: isPc ? "none" : "block"}} variant="middle"/>
            </div>)
        })
        return resArr
        
    }

    const RenderIntroduce = () => {
        if(data.length === 0) return
        const introduce = Common.transToViewAll(data[0]['content'])
        return introduce[0].valueArr[0]
    }
    return(
       <div>
           <FadeTransitions>
             <div>
                <div style={{display: isPc ? "block" : "none"}}>{ParagraphStyles.RenderTitle(data)}</div>
                <div><p style={{fontSize: isPc ? 15 : 14, textIndent: isPc ? 30 : 28, lineHeight: 1.4, fontWeight: 400, color: '#333'}}>{RenderIntroduce()}</p></div>
                {/* <div style={{display: isPc ? 'block' : 'none', marginTop: 50}}><div style={{height: 40, margin: '0 40px', display: 'flex', justifyContent:'center', alignItems: 'center', background: '#eee'}}><h3>{title()}</h3></div></div> */}
                <div style={{display: "flex", justifyContent: "space-around", flexDirection: isPc ? "row" : "column", flexWrap: isPc ? 'nowrap' : 'wrap' , alignItems:"center", paddingTop: isPc ? 100 : 0 }}>{Render()}</div>
             </div>
           </FadeTransitions>
       </div>
    )
}

export default withRouter(Dyna);