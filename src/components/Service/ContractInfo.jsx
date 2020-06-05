import React, { useState, useEffect } from 'react';
import {
    withRouter,
} from 'react-router-dom'
import apiService from '../../api/apiService';
import FadeTransitions from '../Common/FadeTransitions'
import { List } from 'antd-mobile';
import ParagraphStyles from "../Common/ParagraphStyles";
import { Paper } from "@material-ui/core"
const Item = List.Item;

const ContractInfo = props => {
    const [infoList, setInfoList] = useState([]);
    const [album, setAlbum] = useState([])
    useEffect(() => {
        const contract_no = props.location.pathname.split('/contractInfo/')[1];
        fetch(contract_no);
    }, [ props.location.pathname ]);

    const fetch = async contract_no => {
        const result = await apiService.getContractInfo({contract_no});
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
    }

    return (
        <FadeTransitions>
            <div style={{ width: '96%', height: '100%', display: 'flex', borderRight: '1px solid #eee', margin: "auto" }}>
                <div style={{ flex: 1, overflow: 'auto' }} id="grid">
                    <div>{ParagraphStyles.RenderServiceCarousel(album)}</div>
                    <div style={{ margin: 5}}>
                        <Paper elevation={3}>
                            <List renderHeader={() => '明细'}>
                                {
                                    infoList.map((items, index) => <Item key={items.column_name + index} extra={items.val} wrap={true}>{items.column_comment}</Item>)
                                }
                            </List>
                        </Paper>
                    </div>
                </div>
            </div>
        </FadeTransitions>
    )
}

export default withRouter(ContractInfo);