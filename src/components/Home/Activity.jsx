import React, { useEffect, useState }  from 'react';
import apiAboutLangjie from'../../api/apiAboutLangjie';
import FadeTransitions from '../Common/FadeTransitions';
import { Link, withRouter } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import InfiniteScroller from 'react-infinite-scroller';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CONFIG from '../../config'
import { List } from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;
const PcViewDataArr = []
const MobileViewDataArr = []

const Activity = ({history}) => {
    const isPc = useMediaQuery(CONFIG.minDeviceWidth);
    const [data, SetData] = useState([])
    var [page, setPage] = useState(1)
    const [hasMore, SetHasMore] = useState(true)
    useEffect(() => {
        Fetch()
    }, [])

    const Fetch = async () => {
        const result = await apiAboutLangjie.fetchRecentActivity({
            page: page,
            pageSize: 20
        })
        if(result.code === 200) SetData(result.data)
    }

    //Pc-View
    const PcView = () => {
        console.log(data)
        const resArr = []
        data.forEach((item, index) => {
            resArr.push(<div key={index}>
                <div className="title">
                    <Link style={{color: "#3f51b5"}} to="/activity/details"><h3>{item.title}</h3></Link>
                </div>
                <div className="content">
                    <p>{item.content['段落1']}</p>
                </div>
                <Divider/>
            </div>)
        })
        return resArr
    }

    //Mobile-View
    const RenderMobileView = () => {
        if(data.length === 0) return;
        const resArr = []
        data.forEach((item, index) => {
            resArr.push(<div key={index}>
                <List className="my-list">
                    <Item
                        arrow="horizontal"
                        multipleLine
                        onClick={() => {history.push('/activity/details?')}}
                        wrap={true}
                    >
                        {item.title}<Brief>{item.content['段落1']}</Brief>
                    </Item>
                </List>
            </div>)
        })
        return resArr
    }

    const  loadContent = () => {
        SetHasMore(false)
        page++
        setPage(page)
        Fetch()
    }
    return(
        <FadeTransitions>
            <div>
                {isPc ?  <div style={{height: 800, overflow: "auto" }}>
                    <InfiniteScroller
                        initialLoad={false}
                        isReverse={false}
                        pageStart={page}
                        loadMore={loadContent}
                        hasMore={ hasMore }
                       // loader={<div className="loader" key={0}>Loading...</div>}
                        useWindow={false}
                        threshold={1}
                    >
                        <div>{PcView()}</div>
                        </InfiniteScroller>
                </div> : RenderMobileView()}
            </div>
        </FadeTransitions>
    )
}


export default withRouter(Activity);