
import React, { useEffect, useState } from 'react';
import Divider from '@material-ui/core/Divider';
import apiAboutLangjie from '../../api/apiAboutLangjie';
import CONFIG from '../../config';
import useMediaQuery from '@material-ui/core/useMediaQuery'
import FadeTransitions from "../Common/FadeTransitions";
import InfiniteScroller from 'react-infinite-scroller';
import { Link } from 'react-router-dom'
import { hasHistory} from 'react-router'
import { List } from 'antd-mobile';
import ParagraphStyles from '../Common/ParagraphStyles';
import { ButtonGroup, Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom'
const Item = List.Item;
const Brief = Item.Brief;


// const WxPublicPlat = () => {
//     const [data, setData] = useState([])
//     const [page, setPage] = useState(1)
//     useEffect(() => {
//         const Fetch = async () => {
//             const result = await apiAboutLangjie.fetchRecommendReading({
//                 page: page,
//                 pageSize: 3
//             })
//             if(result.code === 200) setData(result.data)
//             setPage(page + 1)
//         }
//         Fetch()
//     },[])
//     return(
//         <div>
//             <ParagraphStyles.ItemListStyles data={data} fetch={apiAboutLangjie}/>
//         </div>
//     )
// }

const WxPublicPlat = ({history}) => {
    const isPc = useMediaQuery(CONFIG.minDeviceWidth);
    const [data, setData] = useState([]);
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(1)

    useEffect(() => {
        const fetch = async() => {
            const result = await apiAboutLangjie.fetchRecommendReading({
                page: page,
                pageSize: 20
            })
            console.log(result)
            if(result.code === 200) setData(result.data)
        }
        fetch()
    },[])

    //pc端
    const PcView = () => {
        const resArr = []
        data.forEach((item, index) => {
            resArr.push(<div key={index}>
                <div className="title">
                    <Link style={{color: "#3f51b5"}} to={{pathname: "/recommendReadingDetails", state: {name:111}}}><h3>{item.title}</h3></Link>
                </div>
                <div className="content">
                    <p>{item.content['段落1']}</p>
                </div>
                <Divider/>
            </div>)
        })
        // resArr.push(<ButtonGroup color="primary" aria-label="outlined primary button group">
        //     <Button>上一页</Button>
        //     <Button>下一页</Button>
        // </ButtonGroup>)
        return resArr
    }

    const DirectSuggestReading = (e) => {
        window.sessionStorage.setItem("content", e)
        history.push({
            pathname: `/recommendReadingDetails`,
            state: '123'
        })
    }

    const MobileView = () => {
        const resArr = []
        data.forEach((item, index) => {
            resArr.push(<div key={index}>
                <List className="my-list">
                    <Item
                        arrow="horizontal"
                        multipleLine
                        onClick={() => { DirectSuggestReading(item)}}
                        wrap={true}
                    >
                       {item.title}<Brief>{item.content['段落1']}</Brief>
                    </Item>
                </List>
            </div>)
        })
        return resArr
    }

    //
    const nextPage = (e) => {
        console.log(e)
        setPage(e)
    }
    const prevPage = (e) => {
        console.log(e)
        //setPage(e)
    }
    return(
        <FadeTransitions>
            <div>
                { isPc ? <div>
                    <div style={{height: 800, overflow: 'auto'}}>{PcView()}</div>
                    {/*<div style={{margin: "20px 40px", display: 'flex', justifyContent: 'flex-end'}}><ButtonGroup color="primary" aria-label="outlined primary button group">*/}
                        {/*/!*<Button disabled={ page == 1 ? true : false} onClick={ prevPage(page - 1)}>上一页</Button>*!/*/}
                        {/*/!*<Button disabled={true}>{page}</Button>*!/*/}
                        {/*/!*<Button onClick={() => nextPage(page + 1)}>下一页</Button>*!/*/}
                    {/*</ButtonGroup></div>*/}
                </div> : MobileView() }
            </div>
        </FadeTransitions>
    )
}


export default withRouter(WxPublicPlat);