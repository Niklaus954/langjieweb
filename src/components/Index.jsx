import React, { useEffect } from 'react'
import {
    withRouter,
} from 'react-router-dom'
import CarouselArea from './Index/CarouselArea.jsx'
import FetchHotInfoList from '../containers/FetchHotInfoList'
import Common from './Common/Common'

const Index = props => {

    useEffect(() => {
        // 隐藏侧边栏
        Common.jumpToIndex(props);
    }, [ props ]);

    return (
        <div style={{margin: 'auto', width: '100%'}}>
            <div style={{width: '100%', margin: 'auto'}}>
                <div>
                    <CarouselArea />
                </div>
                <div style={{width: '100%', height: 20}}></div>
                <div>
                    <FetchHotInfoList />
                </div>
                <div style={{width: '100%', height: 20}}></div>
            </div>
        </div>
    )
}

export default withRouter(Index)