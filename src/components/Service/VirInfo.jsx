import React, { useState, useEffect } from 'react';
import {
    withRouter,
} from 'react-router-dom'
import apiService from '../../api/apiService';
import FadeTransitions from '../Common/FadeTransitions'
import { List } from 'antd-mobile';
const Item = List.Item;

const VirInfo = props => {
    const [infoList, setInfoList] = useState([]);
    useEffect(() => {
        const serialNo = props.location.pathname.split('/virInfo/')[1];
        fetch(serialNo);
    }, [ props.location.pathname ]);

    const fetch = async serialNo => {
        const result = await apiService.fetchVirCardInfo({serialNo});
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

export default withRouter(VirInfo);