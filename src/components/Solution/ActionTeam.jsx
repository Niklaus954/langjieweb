import React, { Component, useEffect, useState } from 'react';
import apiSolution from '../../api/apiSolution';
import ParagraphStyles from '../Common/ParagraphStyles'
import Common from '../Common/Common'
import FadeTransitions from '../Common/FadeTransitions'


const ActionTeam = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        const fetch = async() => {
            const result = await apiSolution.fetchActionTeam()
            if(result.code === 200) setData(result.data)
        }
        fetch()
    },[])

    const renderContent = () => {
        const resArr = []
        if(data.length === 0) return
        const content = data[0].content
        for(let key in content) {
            Common.transToView(content[key]).valueArr.map((item, index) => {
                resArr.push(<div key={index}>{item}</div>)
            })
        }
        return resArr
    }
    const title = () => {
        if(data.length === 0) return
        const name = data[0].name
        return(<h3>{name}</h3>)
    }
    return(
        <FadeTransitions>
            <div>
                <div>{ParagraphStyles.RenderTitle(data)}</div>
                <div>{ParagraphStyles.ContentStyles(ParagraphStyles.CommonContentRender(data))}</div>
            </div>
        </FadeTransitions>
    )
}

export default ActionTeam;