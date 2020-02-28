import React, { useEffect, useState } from 'react';
import apiSolution from '../../api/apiSolution';
import ParagraphStyles from '../Common/ParagraphStyles'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CONFIG from '../../config';
import FadeTransitions from '../Common/FadeTransitions'

const DynaTest = () => {
    const isPc = useMediaQuery(CONFIG.minDeviceWidth)
    const [data, setData] = useState([])
    useEffect(() => {
        const fetch = async() => {
            const result = await apiSolution.fetchDynaTest()
            if(result.code === 200) setData(result.data)
        }
        fetch()
    },[])

    return(
        <FadeTransitions>
            <div>
                <div style={{display: isPc ? 'block' : 'none'}}>{ParagraphStyles.RenderTitle(data)}</div>
                <div>{ParagraphStyles.ContentStyles(ParagraphStyles.CommonContentRender(data))}</div>
            </div>
        </FadeTransitions>
    )
}

export default DynaTest;