import React, { useState, useEffect } from 'react';
import CONFIG from '../../config'
import apiAboutLangjie from '../../api/apiAboutLangjie'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import FadeTransitions from '../Common/FadeTransitions'

const ContactUs = () => {
    const isPc = useMediaQuery(CONFIG.minDeviceWidth);
    const [data, setdata] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const result = await apiAboutLangjie.fetchContactUs();
            if (result.code === 200) setdata(result.data);
        }
        fetch();
        // 渲染地图
        setTimeout(() => {
            const map = new window.BMap.Map("addrMapContainer");          // 创建地图实例  
            const point = new window.BMap.Point(120.185507,30.326888);  // 创建点坐标
            map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别
            map.enableScrollWheelZoom(true);
            map.addControl(new window.BMap.NavigationControl());
            const marker = new window.BMap.Marker(point);        // 创建标注    
            map.addOverlay(marker);                     // 将标注添加到地图中 
            marker.addEventListener("click", function() {    
                map.openInfoWindow(infoWindow, point);
            });
            const opts = {    
                width : 300,     // 信息窗口宽度
                height: 50,     // 信息窗口高度    
                title : '<div style="color: #3f51b5;font-weight: bold;font-size: 16px;">杭州朗杰测控技术开发有限公司</div>'  // 信息窗口标题   
            }    
            const infoWindow = new window.BMap.InfoWindow('<div style="font-size: 12px;margin-top: 6px;color: #333;">杭州市下城区新天地街406号星城发展大厦1幢602室</div>', opts);  // 创建信息窗口对象    
            map.openInfoWindow(infoWindow, point);      // 打开信息窗口
        }, 300);
    }, []);

    const renderData= () => {
        if (data.length === 0) return;
        const renderLabel = content => {
            const dataArr = [];
            for(let key in content) {
                let arr = [];
                if (typeof content[key] === 'object') {
                    arr = content[key].map((items, index) => <span style={{marginRight: 12}} key={index}>{items}</span>);
                } else {
                    arr = content[key];
                }
                dataArr.push(
                    <p key={key} style={{display: 'flex'}}>
                        <span style={{whiteSpace: 'nowrap'}}>{key + '：'}</span>
                        <span>{arr}</span>
                    </p>
                );
            }
            return dataArr;
        }
        const resArr = [];
        data.forEach((items, index) => {
            resArr.push(
                <div key={index} style={{marginBottom: 40}}>
                    <h3>{items.name}</h3>
                    <div>{renderLabel(items.content)}</div>
                </div>
            );
        });
        return resArr;
    }

    // 适配移动端排版样式
    const getMapStyle = isPc => {
        const style = {
            border: '1px solid #eee',
            borderRadius: 5,
            height: isPc ? 470 : 400,
        };
        if (isPc) {
            style.flex = 1;
            style.marginLeft = 20;
        }
        return style;
    }

    return (
        <FadeTransitions>
            <div style={{display: 'flex', flexDirection: isPc ? 'row' :'column'}}>
                <div>{ renderData() }</div>
                <div id={'addrMapContainer'} style={getMapStyle(isPc)}></div>
            </div>
        </FadeTransitions>
    );
}

export default ContactUs;