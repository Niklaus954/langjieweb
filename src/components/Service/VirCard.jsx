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
const Item = List.Item;

const VirCard = props => {
    const [infoList, setInfoList] = useState([]);
    const isPc = useMediaQuery(CONFIG.minDeviceWidth);

    const backSelectedItem = async item => {
        if (isPc) {
            const result = await apiService.fetchVirCardInfo(item);
            setInfoList(result.data);
        } else {
            props.history.push({
                pathname: '/virInfo/' + item.serialNo, 
            });
        }
        
    }

    const renderList = items => {
        const validTime = items.validTime == 0 ? '永久注册' : items.validTime;
        return (
            <div style={{ flex: 1, padding: 4, marginLeft: 4 }}>
                <p>序列号：{items.serialNo}</p>
                <p>型号：{items.model}</p>
                <p>有效期：{validTime}</p>
            </div>
        )
    }

    return (
        <FadeTransitions>
            <div style={{ width: '96%', height: '100%', display: 'flex', margin: "auto" }}>
                <div style={{ width: isPc ? 400 : '100%', overflow: 'auto' }}>
                    <ItemList
                        isPc={isPc}
                        fetchList={apiService.fetchVirCard}
                        renderAlbum={true}
                        renderList={renderList}
                        backSelectedItem={backSelectedItem}
                    ></ItemList>
                </div>
                { isPc && <div style={{ flex: 1, overflow: 'auto' }} id="grid">
                    <div style={{margin: 5}}>
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

export default withRouter(VirCard);