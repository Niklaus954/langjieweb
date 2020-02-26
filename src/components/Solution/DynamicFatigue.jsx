import React, { Component, useEffect, useState } from 'react';
import apiSolution from '../../api/apiSolution';
import ParagraphStyles from '../Common/ParagraphStyles'
import Common from '../Common/Common'
const DynamicFatigue = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        const fetch = async() => {
            const result = await apiSolution.fetchActionTool()
            if(result.code === 200) setData(result.data)
        }
        fetch()
    },[])
    return(
        <div>
            <div>{ParagraphStyles.RenderTitle(data)}</div>
            <div>
                {ParagraphStyles.ContentStyles(ParagraphStyles.CommonContentRender(data))}
            </div>
        </div>
    )
}

export default DynamicFatigue;