import React, { useState } from 'react';
import ItemList from '../Common/ItemList';
import apiService from '../../api/apiService';
import CONFIG from '../../config';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import FadeTransitions from '../Common/FadeTransitions'

const Repair = () => {
    const [infoSrc, setinfoSrc] = useState('');
    const isPc = useMediaQuery(CONFIG.minDeviceWidth);

    const backSelectedItem = async item => {
        const { repair_contractno } = item;
        const ticketResult = await apiService.getTicket();
        const ticket = ticketResult.data;
        setinfoSrc(CONFIG.url('/open/pageRepair/' + repair_contractno + '?ticket=' + ticket));
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
            <div style={{ width: '100%', height: '100%', display: 'flex' }}>
                <div style={{ width: isPc ? 400 : '100%', overflow: 'auto' }}>
                    <ItemList
                        fetchList={apiService.fetchRepair}
                        renderAlbum={true}
                        renderList={renderList}
                        backSelectedItem={backSelectedItem}
                    ></ItemList>
                </div>
                { isPc && <div style={{ flex: 1 }} id="grid">
                    {/* 正在开发中。。。 */}
                    {/* <iframe
                        title={'repair'}
                        style={{border: 'none', width: '100%', height: '100%', overflow: 'auto'}}
                        src={infoSrc}>
                    </iframe> */}
                </div> }
            </div>
        </FadeTransitions>
    )
}

export default Repair;