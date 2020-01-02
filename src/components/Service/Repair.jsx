import React, { useState } from 'react';
import ItemList from '../Common/ItemList';
import apiService from '../../api/apiService';
import CONFIG from '../../config';
import {
    withRouter,
} from 'react-router-dom'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import FadeTransitions from '../Common/FadeTransitions'
import { List } from 'antd-mobile';
const Item = List.Item;

const Repair = props => {
    const [infoList, setInfoList] = useState([]);
    const isPc = useMediaQuery(CONFIG.minDeviceWidth);

    const delCol = [ 'id', 'related_contract_salary', 'related_contract_owncost', 'album', 'sql_stamp', 'update_time', 'update_person', 'insert_time', 'insert_person', 'complete', 'outer_cost', 'own_cost', 'again_check_person', 'pri_check_person' ];

    const backSelectedItem = async item => {
        if (isPc) {
            const result = await apiService.fetchRepairInfo(item);
            const renderList = result.data.res_arr.filter(items => delCol.indexOf(items.column_name) === -1);
            setInfoList(renderList);
        } else {
            props.history.push({
                pathname: '/repairInfo/' + item.repair_contractno, 
            });
        }
    }

    const renderList = items => {
        return (
            <div style={{ flex: 1, padding: 4, marginLeft: 4 }}>
                <p>维修单号：{items.repair_contractno}</p>
                <p>维修物品：{items.goods}</p>
                <p>问题描述：{items.problems}</p>
            </div>
        )
    }

    return (
        <FadeTransitions>
            <div style={{ width: '100%', height: '100%', display: 'flex', borderRight: '1px solid #eee' }}>
                <div style={{ width: isPc ? 400 : '100%', overflow: 'auto' }}>
                    <ItemList
                        isPc={isPc}
                        fetchList={apiService.fetchRepair}
                        renderAlbum={true}
                        renderList={renderList}
                        backSelectedItem={backSelectedItem}
                    ></ItemList>
                </div>
                { isPc && <div style={{ flex: 1, overflow: 'auto' }} id="grid">
                    <List renderHeader={() => '明细'}>
                        {
                            infoList.map((items, index) => <Item key={items.column_name + index} extra={items.val} wrap={true}>{items.column_comment}</Item>)
                        }
                    </List>
                </div> }
            </div>
        </FadeTransitions>
    )
}

export default withRouter(Repair);