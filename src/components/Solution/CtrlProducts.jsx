import React, { Component, useState, useEffect } from 'react';
import apiSolution from '../../api/apiSolution';
import ParagraphStyles from '../Common/ParagraphStyles'
import Common from '../Common/Common';
import FadeTransitions from '../Common/FadeTransitions'

const CtrlProducts = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        apiSolution.fetchCtrlProducts().then(result => {
            if(result.code === 200) setData(result.data)
        })
    },[])
    const Render = () => {
        if(data.length === 0) return
        const resArr = []
        const title = data[0].name;
        const content = data[0].content;
        resArr.push(<div key={title}><h3>{title}</h3></div>)
        for(let key in content){
            Common.transToView(content[key]).valueArr.forEach((item, index) => {
                resArr.push(<div key={index}>{item}</div>)
            })
        }
        return resArr
    }
    return(
        <div>
            {ParagraphStyles.ContentStyles(Render())}
        </div>
    )
}

export default CtrlProducts;