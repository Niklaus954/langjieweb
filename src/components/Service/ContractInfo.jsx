import React, { useState, useEffect } from 'react';
import {
    withRouter,
} from 'react-router-dom'
import apiService from '../../api/apiService';
import FadeTransitions from '../Common/FadeTransitions'
import { List } from 'antd-mobile';
const Item = List.Item;

const ContractInfo = props => {
    const [infoList, setInfoList] = useState([]);
    useEffect(() => {
        const contract_no = props.location.pathname.split('/contractInfo/')[1];
        fetch(contract_no);
    }, [ props.location.pathname ]);

    let delCol = [ 'id', 'snLackNum', 'isdel', 'album', 'madeInApp', 'update_time', 'update_person', 'insert_time', 'insert_person', 'complete'];

    const fetch = async contract_no => {
        const result = await apiService.getContractInfo({contract_no});
        let renderList = result.data.comment instanceof Array ? result.data.comment : [];
        renderList.forEach((items, index) => {
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
        renderList = renderList.filter(items => delCol.indexOf(items.column_name) === -1);
        setInfoList(renderList);
    }

    return (
        <FadeTransitions>
            <div style={{ width: '100%', height: '100%', display: 'flex', borderRight: '1px solid #eee' }}>
                <div style={{ flex: 1, overflow: 'auto' }} id="grid">
                    <List renderHeader={() => '明细'}>
                        {
                            infoList.map((items, index) => <Item key={items.column_name + index} extra={items.val} wrap={true}>{items.column_comment}</Item>)
                        }
                    </List>
                </div>
            </div>
        </FadeTransitions>
    )
}

export default withRouter(ContractInfo);