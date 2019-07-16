import React from 'react'
import TopMenuBar from './Common/TopMenuBar'
import CarouselArea from './Index/CarouselArea.jsx'
import FetchHotInfoList from '../containers/FetchHotInfoList'
import About from './Index/About.jsx'

const Index = () => {
    return (
        <div>
            <TopMenuBar />
            <CarouselArea />
            <div style={{width: '100%', height: 20}}></div>
            <FetchHotInfoList />
            <div style={{width: '100%', height: 20}}></div>
            <About />
        </div>
    )
}

export default Index