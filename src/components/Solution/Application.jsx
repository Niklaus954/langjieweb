import React, { Component, useEffect, useState } from 'react';
import apiSolution from '../../api/apiSolution';
import ParagraphStyles from '../Common/ParagraphStyles'
import Common from '../Common/Common';
import FadeTransitions from '../Common/FadeTransitions'

const Application = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        apiSolution.fetchApplication().then(result => {
            if(result.code === 200) setData(result.data)
        })
    },[])

    return(
        <FadeTransitions>
            <div>
                <div>{ParagraphStyles.RenderTitle(data)}</div>
                <div>{ParagraphStyles.ContentStyles(ParagraphStyles.CommonContentRender(data))}</div>
            </div>
        </FadeTransitions>
    )
}

export default Application;