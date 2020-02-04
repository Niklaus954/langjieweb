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

    let delCol = [ 'id', 'snLackNum', 'isdel', 'album', 'madeInApp', 'update_time', 'update_person', 'insert_time', 'insert_person', 'complete'];

    const backSelectedItem = async item => {
        if (isPc) {
            const result = await apiService.getContractInfo(item);
            const resAlbum = result.data.comment.filter(item => item.column_name === 'album')
            setAlbum(resAlbum)
            result.data.comment.forEach((items, index) => {
                if (items.column_name === 'install') {
                    items.val = items.val == 0 ? '否' : '是';
                } else if (items.column_name === 'isFreeze') {
                    if (items.val == 0) {
                        delCol.push('freeze_reason');
                        delCol.push('freeze_start_time');
                        delCol.push('freeze_time');
                    }
                    items.val = items.val == 0 ? '否' : '是';
                } else if (items.column_name === 'contract_state') {
                    if (items.val != '关闭') {
                        delCol.push('close_reason');
                        delCol.push('close_time');
                    }
                }
            });
            delCol = [ ...new Set(delCol) ];
            const renderList = result.data.comment.filter(items => delCol.indexOf(items.column_name) === -1);
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
                <div style={{ width: isPc ? 400 : '100%', overflow: 'auto' }}>
                    <ItemList
                        isPc={isPc}
                        fetchList={apiService.fetchContract}
                        renderAlbum={false}
                        renderList={renderList}
                        backSelectedItem={backSelectedItem}
                    ></ItemList>
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