import React, { useState, useEffect } from 'react';
import {
    withRouter,
} from 'react-router-dom'
import apiService from '../../api/apiService';
import FadeTransitions from '../Common/FadeTransitions'
import { List } from 'antd-mobile';
import { Paper } from '@material-ui/core'
const Item = List.Item;

const VirInfo = props => {
    const [infoList, setInfoList] = useState([]);
    useEffect(() => {
        const serialNo = props.location.pathname.split('/virInfo/')[1];
        fetch(serialNo);
    }, [ props.location.pathname ]);

    const fetch = async serialNo => {
        const result = await apiService.fetchVirCardInfo({serialNo});
        setInfoList(result.data);
    }

    return (
        <FadeTransitions>
            <div style={{ width: '96%', height: '100%', display: 'flex', borderRight: '1px solid #eee', margin: "auto" }}>
                <div style={{ flex: 1, overflow: 'auto' }} id="grid">
                    <div style={{margin: 5}}>
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

export default withRouter(VirInfo);