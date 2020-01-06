import React, { useState, useEffect } from 'react';
import {
    withRouter,
} from 'react-router-dom'
import apiService from '../../api/apiService';
import FadeTransitions from '../Common/FadeTransitions'
import { List, Carousel } from 'antd-mobile';
import CONFIG from '../../config'
import ParagraphStyles from "../Common/ParagraphStyles";
const Item = List.Item;

const RepairInfo = props => {
    const [infoList, setInfoList] = useState([]);
    const [album, setAlbum] = useState([]);
    useEffect(() => {
        const repair_contractno = props.location.pathname.split('/repairInfo/')[1];
        fetch(repair_contractno);
    }, [ props.location.pathname ]);

    const delCol = [ 'id', 'related_contract_salary', 'related_contract_owncost','album' , 'sql_stamp', 'update_time', 'update_person', 'insert_time', 'insert_person', 'complete', 'outer_cost', 'own_cost', 'again_check_person', 'pri_check_person' ];

    const fetch = async repair_contractno => {
        const result = await apiService.fetchRepairInfo({repair_contractno});
        let renderList = result.data.res_arr instanceof Array ? result.data.res_arr : [];
        const resAlbum = renderList.filter(item => item.column_name === 'album')
        renderList = renderList.filter(items => delCol.indexOf(items.column_name) === -1);
        setInfoList(renderList);
        setAlbum(resAlbum)
    }

    return (
        <FadeTransitions>
            <div style={{width: '100%'}}>
                <div>{ParagraphStyles.RenderServiceCarousel(album)}</div>
                <div style={{ width: '93%', display: 'flex', borderRight: '1px solid #eee', margin: "auto" }}>
                    <div style={{ flex: 1, overflow: 'auto' }} id="grid">
                        <List renderHeader={() => '明细'}>
                            {
                                infoList.map((items, index) => <Item key={items.column_name + index} extra={items.val} wrap={true}>{items.column_comment}</Item>)
                            }
                        </List>
                    </div>
                </div>
            </div>
        </FadeTransitions>
    )
}

export default withRouter(RepairInfo);