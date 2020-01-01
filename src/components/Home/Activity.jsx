
import React, { useEffect, useState }  from 'react';
import apiAboutLangjie from'../../api/apiAboutLangjie';
import FadeTransitions from '../Common/FadeTransitions';
import { Link, withRouter } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import { Button, ButtonGroup } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CONFIG from '../../config'
import { List } from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;

const Activity = ({history}) => {
    const isPc = useMediaQuery(CONFIG.minDeviceWidth);
    const [data, setData] = useState([])
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
        if(result.code === 200) setData(result.data)
    }

    //Pc-View
    const PcView = () => {
        const resArr = []
        data.forEach((item, index) => {
            resArr.push(<div key={index}>
                <div className="title">
                    <Link style={{color: "#3f51b5"}} to={`/activityDetails?activityId=${item.id}`}><h3>{item.title}</h3></Link>
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
                        onClick={() => {history.push(`/activityDetails?activityId=${item.id}`)}}
                        wrap={true}
                    >
                        {item.title}<Brief>{item.content['段落1']}</Brief>
                    </Item>
                </List>
            </div>)
        })
        return resArr
    }

    const fetch = async(page) => {
        const result = await apiAboutLangjie.fetchRecommendReading({
            page: page,
            pageSize: 20
        })
        if(result.code === 200) setData(result.data)
    }
    const Pagination = () => {
        const prevPage = (page) => {
            setPage(page)
            fetch(page)
        }
        const nextPage = (page) => {
            setPage(page)
            fetch(page)
        }
        return(
            <div>
                <div style={{margin: isPc ? "20px 40px" : "20px", display: 'flex', justifyContent: 'flex-end'}}><ButtonGroup color="primary" aria-label="outlined primary button group">
                    <Button disabled={page <= 1 ? true : false} onClick={() =>{prevPage(page-1)}}>上一页</Button>
                    <Button disabled={true} >{page}</Button>
                    <Button onClick={() => {nextPage(page+1)}}>下一页</Button>
                </ButtonGroup></div>
            </div>
        )
    }

    return(
        <FadeTransitions>
            <div>
                {isPc ?
                    <div>
                        <div>{PcView()}</div>
                        <div><Pagination/></div>
                    </div> : RenderMobileView()}
            </div>
        </FadeTransitions>
    )
}

export default withRouter(Activity);
