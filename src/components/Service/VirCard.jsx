import React, { useState } from 'react';
import ItemList from '../Common/ItemList';
import apiService from '../../api/apiService';
import CONFIG from '../../config';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import FadeTransitions from '../Common/FadeTransitions'

const VirCard = () => {
    const [infoSrc, setinfoSrc] = useState('');
    const isPc = useMediaQuery(CONFIG.minDeviceWidth);

    const backSelectedItem = async item => {
        
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
            <div style={{ width: '100%', height: '100%', display: 'flex' }}>
                <div style={{ width: isPc ? 400 : '100%', overflow: 'auto' }}>
                    <ItemList
                        fetchList={apiService.fetchVirCard}
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

export default VirCard;