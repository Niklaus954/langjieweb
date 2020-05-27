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
import { Paper } from '@material-ui/core'
import ParagraphStyles from "../Common/ParagraphStyles";
const Item = List.Item;

const Repair = props => {
    const [infoList, setInfoList] = useState([]);
    const [album, setAlbum] = useState([])
    const isPc = useMediaQuery(CONFIG.minDeviceWidth);

    const delCol = [ 'id', 'related_contract_salary', 'related_contract_owncost', 'album', 'sql_stamp', 'update_time', 'update_person', 'insert_time', 'insert_person', 'complete', 'outer_cost', 'own_cost', 'again_check_person', 'pri_check_person' ];

    const backSelectedItem = async item => {
        if (isPc) {
            const result = await apiService.fetchRepairInfo(item);
            const resAlbum = result.data.res_arr.filter(item => item.column_name === 'album')
            const renderList = result.data.res_arr.filter(items => delCol.indexOf(items.column_name) === -1);
            setInfoList(renderList);
            if(!resAlbum[0].val){
                resAlbum[0].val = '/no_img.png'
            }
            setAlbum(resAlbum)
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
            <div style={{display: 'flex', flexDirection:'column',  width: isPc ? 400 : '100%', background: "#f5f5f5"}}>
                    {/* <SearchBarComponent searchFetch={apiService.fetchRepair} serviceType="Repair"/> */}
                    <div style={{ overflow: 'auto' }}>
                        <ItemList
                            isPc={isPc}
                            fetchList={apiService.fetchRepair}
                            renderAlbum={true}
                            renderList={renderList}
                            backSelectedItem={backSelectedItem}
                            serviceType="Repair"
                        ></ItemList>
                    </div>
                </div>
                { isPc &&  <div style={{ flex: 1, overflow: 'auto' }} id="grid">
                    <div style={{width: "80%", margin: 'auto'}}>{ParagraphStyles.RenderServiceCarousel(album)}</div>
                    <div style={{margin: 20}}>
                        <Paper elevation={3}>
                            <List renderHeader={() => '明细'}>
                                {
                                    infoList.map((items, index) => <Item key={items.column_name + index} extra={items.val} wrap={true}>{items.column_comment}</Item>)
                                }
                            </List>
                        </Paper>
                    </div>
                </div>}
            </div>
        </FadeTransitions>
    )
}

export default withRouter(Repair);