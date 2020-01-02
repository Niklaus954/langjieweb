import React, { Component, useEffect, useState } from 'react';
import apiSolution from '../../api/apiSolution';
import ParagraphStyles from '../Common/ParagraphStyles'
import Common from '../Common/Common';
import FadeTransitions from '../Common/FadeTransitions'

const ActionPlat = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        apiSolution.fetchActionPlat().then(result => {
            if(result.code === 200) setData(result.data)
        })
    },[])
    const Render = () => {
        if(data.length === 0) return
        const content = data[0].content;
        const title = data[0].name;
        const resArr = []
        resArr.push(<div key={title}><h3>{title}</h3></div>)
        for(let key in content){
            Common.transToView(content[key]).valueArr.forEach((item, index) => {
                resArr.push(<div key={index}>{item}</div>)
            })
        }
        return resArr
    }
    return(
        <FadeTransitions>
            <div>
                {ParagraphStyles.ContentStyles(Render())}
            </div>
        </FadeTransitions>
    )
}

export default ActionPlat;