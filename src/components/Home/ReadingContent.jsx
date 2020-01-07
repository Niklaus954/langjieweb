import React, { useEffect, useState} from 'react';
import Common from '../Common/Common'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import CONFIG from '../../config';
import apiAboutLangjie from '../../api/apiAboutLangjie';
import FadeTransitions from '../Common/FadeTransitions'
import ParagraphStyles from "../Common/ParagraphStyles";

const ReadingContent = state => {
    const isPc = useMediaQuery(CONFIG.minDeviceWidth)
    const contentId = state.location.pathname.split('/')[state.location.pathname.split('/').length - 1]
   // const contentId = state.location.search.split('/')[state.location.search.split('/').length - 1]
    const [data, setData] = useState([])
    useEffect(() => {
        const fetch = async() => {
            const result = await apiAboutLangjie.fetchRecommendReadingById({
                contentId: contentId
            })
            if(result.code === 200) setData(result.data)
        }
        fetch()
    },[])
    return(
        <FadeTransitions>
            <div style={{margin: isPc ? "20px 40px" : "20px", overflow:'auto'}}>
                <div>{ParagraphStyles.RenderTitle(data)}</div>
                <div>{ParagraphStyles.ContentStyles(ParagraphStyles.CommonContentRender(data))}</div>
            </div>
        </FadeTransitions>
    )
}


export default ReadingContent