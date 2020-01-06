import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import CarouselArea from './Index/CarouselArea.jsx'
import HotInfoAction from './Index/HotInfoAction.jsx';
import SuggestReading from './Index/SuggestReading.jsx';
import Common from './Common/Common';
import FadeTransitions from "./Common/FadeTransitions";

const Index = props => {
    useEffect(() => {
        // 隐藏侧边栏
        Common.jumpToIndex(props);
    }, [ props ]);

    return (
        <FadeTransitions>
            <div style={{margin: 'auto', width: '100%'}}>
                <div style={{width: '100%', margin: 'auto'}}>
                    <div >
                        <CarouselArea />
                    </div>
                    <div style={{width: '100%'}}>
                        <HotInfoAction/>
                    </div>
                    <div style={{width: "100%", background: "#fff"}}>
                        <SuggestReading />
                    </div>
                </div>
            </div>
        </FadeTransitions>
    )
}

export default withRouter(Index)