import React from 'react'
import CarouselArea from './Index/CarouselArea.jsx'
import FetchHotInfoList from '../containers/FetchHotInfoList'

const Index = () => {
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

export default Index