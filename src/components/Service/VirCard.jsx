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
            const source = [
                { column_name: 'serialNo', column_comment: '序列号', val: '' },
                { column_name: 'model', column_comment: '型号', val: '' },
                { column_name: 'validTime', column_comment: '有效期', val: '' },
                { column_name: 'latestRegNo', column_comment: '注册码', val: '' },
                { column_name: 'regAuth', column_comment: '授权码', val: '' },
                { column_name: 'regAppName0', column_comment: '自费app', val: '' },
                { column_name: 'appValidTime0', column_comment: '有效期', val: '' },
                { column_name: 'appRegCode0', column_comment: '注册码', val: '' },
                { column_name: 'appRegAuth0', column_comment: '授权码', val: '' },
                { column_name: 'fwVer', column_comment: '固件版本', val: '' },
                { column_name: 'regVer', column_comment: '注册版本', val: '' },
                // { column_name: 'dealer', column_comment: '中间商', val: '' },
                { column_name: 'oemUser', column_comment: '指定配套用户', val: '' },
                { column_name: 'authType', column_comment: '授权类型', val: '' },
                { column_name: 'VBGN', column_comment: '名义起始期', val: '' },
                { column_name: 'VEND', column_comment: '名义有效期', val: '' },
                { column_name: 'machineNo', column_comment: '机器码', val: '' },
                { column_name: 'chnlNum', column_comment: '通道数', val: '' },
                { column_name: 'caliCoeff', column_comment: '标定系数', val: '' },
                { column_name: 'ad2Mode', column_comment: 'AD采集模式', val: '' },
                { column_name: 'pulseMode', column_comment: 'PM脉冲模式', val: '' },
                { column_name: 'vibFreq', column_comment: 'DA伺服颤振频率', val: '' },
                { column_name: 'vibAmp', column_comment: 'DA伺服颤振幅值', val: '' },
                { column_name: 'SPWM_AC_AMP', column_comment: 'SPWM交流幅值', val: '' },
                { column_name: 'SSI_MODE', column_comment: 'SSI模式', val: '' },
                { column_name: 'HOURS', column_comment: '已用小时数', val: '' },
                { column_name: 'remark', column_comment: '附注', val: '' },
            ];
            source.forEach((items, index) => {
                items.val = result.data[items.column_name];
            });
            setInfoList(source);
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