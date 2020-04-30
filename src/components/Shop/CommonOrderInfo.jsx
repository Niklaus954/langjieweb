import React, { useEffect, useState } from 'react';

const CommonOrderInfo = props => {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(props.data);
    });

    return data.map(items => {
        return (
            <div key={items.id} style={{display: 'flex' ,padding: 10, marginBottom: 12, border: '1px solid #eee', borderRadius: 8}}>
                <div style={{width: 100, height: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: `url(${items.goods.ctrlInfo.img})`, backgroundSize: '100% 100%'}}></div>
                <div style={{flex: 1, marginLeft: 6, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                    <div>
                        <div style={{marginBottom: 4}}>{items.goods.ctrlInfo.chinese_name}</div>
                        <div style={{fontSize: 12, color: '#999'}}>主机风格：{items.goods.series}，主机结构：{ items.goods.structure }，最大量程：{ items.goods.load_range }，尺寸大小：{ items.goods.size }</div>
                        <div style={{marginTop: 5, color: 'rgb(255, 80, 0)'}}>
                            <span>￥{Number(items.goods.price)}</span>
                            <span style={{color: '#999', marginLeft: 12}}>x{items.num}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    });
}

export default CommonOrderInfo;