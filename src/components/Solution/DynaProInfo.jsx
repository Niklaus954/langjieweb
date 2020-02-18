import React, { Component, useEffect, useState } from 'react';
import apiSolution from '../../api/apiSolution';
import ParagraphStyles from '../Common/ParagraphStyles';
import Common from '../Common/Common';
import FadeTransitions from '../Common/FadeTransitions'

const VirSeries = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        const fetch = async() => {
            const result = await apiSolution.fetchDynaSeries()
            if(result.code == 200) setData(result.data)
        }
        fetch()
    }, [])

    return(
        <div>威程系列展示</div>
    )
}

export default VirSeries;