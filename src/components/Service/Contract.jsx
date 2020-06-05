import React, { useState } from 'react';
import ItemList from '../Common/ItemList';
import apiService from '../../api/apiService';
import CONFIG from '../../config';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import FadeTransitions from '../Common/FadeTransitions'
import { List } from 'antd-mobile';
import { Paper } from '@material-ui/core'
import {
    withRouter,
} from 'react-router-dom'
import ParagraphStyles from "../Common/ParagraphStyles";
const Item = List.Item;

const Contract = props => {
    const [infoList, setInfoList] = useState([]);
    const [album, setAlbum] = useState([]);
    const isPc = useMediaQuery(CONFIG.minDeviceWidth);

    const backSelectedItem = async item => {
        if (isPc) {
            const result = await apiService.getContractInfo(item);
            const albumData = [{ column_name: 'album', column_comment: '图片', val: '/controller_system.png' }];
            const album = result.data.data.album;
            if (album) {
                albumData[0].val = album;
            }
            setAlbum(albumData)
            const renderList = [];
            result.data.label.forEach(items => {
                renderList.push({
                    column_name: items.key,
                    column_comment: items.name,
                    val: items.val,
                });
            });
            setInfoList(renderList);
        } else {
            props.history.push({
                pathname: '/contractInfo/' + item.contract_no, 
            });
        }
    }

    const renderList = items => {
        return (
            <div style={{ flex: 1, padding: 4, marginLeft: 4 }}>
                <p>合同编号：{items.contract_no}</p>
                <p>签订日期：{items.sign_time}</p>
            </div>
        )
    }

    return (
        <FadeTransitions>
            <div style={{ width: '100%', height: '100%', display: 'flex' }}>
            <div style={{display: 'flex', flexDirection:'column',  width: isPc ? 400 : '100%', background: "#f5f5f5"}}>
                    {/* <SearchBarComponent searchFetch={apiService.fetchContract} serviceType="Contract"/> */}
                    <div style={{ overflow: 'auto' }}>
                        <ItemList
                            isPc={isPc}
                            fetchList={apiService.fetchContract}
                            renderAlbum={false}
                            renderList={renderList}
                            backSelectedItem={backSelectedItem}
                            serviceType="Contract"
                        ></ItemList>
                    </div>
                </div>
                { isPc && <div style={{ flex: 1, overflow: 'auto' }} id="grid">
                    <div>{ParagraphStyles.RenderServiceCarousel(album)}</div>
                    <div style={{margin: 20}}>
                        <Paper elevation={3}>
                            <List renderHeader={() => '明细'}>
                                {
                                    infoList.map((items, index) => <Item key={items.column_name + index} extra={items.val} wrap={true}>{items.column_comment}</Item>)
                                }
                            </List>
                        </Paper>
                    </div>
                </div> }
            </div>
        </FadeTransitions>
    )
}

export default withRouter(Contract);