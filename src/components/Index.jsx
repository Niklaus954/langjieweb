import React from 'react'
import CarouselArea from './Index/CarouselArea.jsx'
import FetchHotInfoList from '../containers/FetchHotInfoList'
import About from './Index/About.jsx'
import CONFIG from '../config'

const Index = () => {
    return (
        <div style={{width: '100%', margin: 'auto', maxWidth: CONFIG.indexPageMaxWidth}}>
            <div>
                <CarouselArea />
            </div>
            <div style={{width: '100%', height: 20}}></div>
            <div>
                <FetchHotInfoList />
            </div>
            <div style={{width: '100%', height: 20}}></div>
            <About />
        </div>
    )
}

export default Index