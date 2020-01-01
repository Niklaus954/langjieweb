import React, { useEffect, useState } from 'react';
import CONFIG from '../../config'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import InfiniteScroller from 'react-infinite-scroller';

const ContentStyles = (props) => {
    const isPc = useMediaQuery(CONFIG.minDeviceWidth)
    return(
        <div>
            <div style={{fontSize: isPc ? 16 : 14, textIndent: isPc ? 32 : 28, fontWeight: 400, lineHeight: 1.4, color: "#333"}}>{props}</div>
        </div>
    )
}

class ItemListStyles extends React.Component{
    constructor(){
        super()
        this.state = {
            scroll: {
                page: 1,
                hasMore: true
            }
        }

    }

    componentWillMount(){

    }


    Fetch = () => {


    }

    loadContent = () => {
        console.log(111)
    }

    render(){
        const { page, hasMore } = this.state.scroll
        const result = this.props.data
        return(
            <div style={{height: 800, overflow: "auto"}}>
                <InfiniteScroller
                    pageStart={page}
                    loadMore={this.loadContent}
                    hasMore={ hasMore }
                    loader={<div className="loader" key={0}>Loading...</div>}
                    useWindow={false}
                >
                    {
                        result.map((item, index) => {
                            return(
                                <div key={index} style={{height: 400}}>{item.title}</div>
                            )
                        })
                    }
                    <div>222</div>
                </InfiniteScroller>
            </div>
        )
    }
}



export default {
   ContentStyles: ContentStyles,
    ItemListStyles: ItemListStyles,
}