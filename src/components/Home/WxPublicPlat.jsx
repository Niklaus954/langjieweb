
import React, { useEffect, useState } from 'react';
import Divider from '@material-ui/core/Divider';
import apiAboutLangjie from '../../api/apiAboutLangjie';
import CONFIG from '../../config';
import useMediaQuery from '@material-ui/core/useMediaQuery'
import FadeTransitions from "../Common/FadeTransitions";
import { Link } from 'react-router-dom'
import { hasHistory} from 'react-router'
import { List, Toast, Button as MoButton } from 'antd-mobile';
import { ButtonGroup, Button, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
const Item = List.Item;
const Brief = Item.Brief;


const WxPublicPlat = ({history}) => {
    const isPc = useMediaQuery(CONFIG.minDeviceWidth);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1)
    const [newsList, setNewsList] = useState('')

    useEffect(() => {
        //fetch()
        fetchWxNewsList()
    },[])
    const fetch = async() => {
        const result = await apiAboutLangjie.fetchRecommendReading({
            page: page,
            pageSize: 20
        })
        if(result.code === 200) setData(result.data)
    }

    const fetchWxNewsList = () => {
        Axios.get('/wechat/mediaMessageList').then(result => {
            console.log(result.data)
            setNewsList(result.data)
        })
    }

    //pc端
    const PcView = () => {
        if(data.length === 0) return
        const resArr = []
        data.forEach((item, index) => {
            resArr.push(<div key={index}>
                <div className="title">
                    <Link to={{pathname: `/readingContent/${item.id}`}}><Typography variant="h6">{item.title}</Typography></Link>
                </div>
                <div className="content" style={{textIndent: 32}}>
                    <Typography variant="subtitle1">{item.content[Object.keys(item.content)[0]].indexOf('picture') === -1 ?
                    item.content[Object.keys(item.content)[0]] : 
                    item.content[Object.keys(item.content)[1]]}...</Typography>
                </div>
                <Divider/>
            </div>)
        })
        return resArr
    }

    const DirectSuggestReadingContent = (e) => {
        history.push({
            pathname: `/readingContent/${e.id}`,
        })
    }

    const MobilePagination = () => {
        const prevPage = (page) => {
            setPage(page)
            Fetch(page)
        }
        const nextPage = (page) => {
            setPage(page)
            Fetch(page)
        }
        return(
            <div style={{display: "flex", justifyContent: "space-between", margin: "20px 40px"}}>
                <MoButton disabled={ page <= 1 ? true : false} type="default" inline size="small" onClick={() => {prevPage(page-1)}}>上一页</MoButton>
                <MoButton disabled={true} type="default" inline size="small">{page}</MoButton>
                <MoButton type="default" inline size="small" onClick={() => {nextPage(page + 1)}}>下一页</MoButton>
            </div>
        )
    }

    const MobileView = () => {
        if(data.length === 0) return
        const resArr = []
        data.forEach((item, index) => {
            resArr.push(<div key={index}>
                <List className="my-list">
                    <Item
                        arrow="horizontal"
                        multipleLine
                        onClick={() => { DirectSuggestReadingContent(item)}}
                        wrap={true}
                    >
                       {item.title}<Brief>{item.content[Object.keys(item.content)[0]]}</Brief>
                    </Item>
                </List>
            </div>)
        })
        return resArr
    }
    const Fetch = async(page) => {
        const result = await apiAboutLangjie.fetchRecommendReading({
            page: page,
            pageSize: 20
        })
        if(result.code === 200) setData(result.data)
        if(result.data.length === 0) Toast.info('暂无更多文章！！！', 2)
    }
    const PcPagination = () => {
        const prevPage = (page) => {
            setPage(page)
            Fetch(page)
        }
        const nextPage = (page) => {
            setPage(page)
            Fetch(page)
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

    const onLoadIframe = () => {
        var iframe = document.getElementById('iframe');
        var win = iframe.contentWindow;
        var doc = win.document;
        var name = win.name
    }

    return(
        <FadeTransitions>
            {/* <div>
                {isPc ?
                    <div><div >{PcView()}</div><PcPagination/></div> :
                    <div><div>{MobileView()}</div><MobilePagination/>
                </div>}
            </div> */}
            <div>
            <iframe id="iframe" src="http://mp.weixin.qq.com/mp/homepage?__biz=MzAwMjE3NDY2MA==&hid=8&sn=ae59c0e58b89fb06965e55b48097a5a0&scene=18#wechat_redirect"
                frameBorder={0}
                width="100%" 
                height="98%"
                onLoad={() => onLoadIframe()}
                ></iframe>
            </div>
        </FadeTransitions>
    )
}


export default withRouter(WxPublicPlat);