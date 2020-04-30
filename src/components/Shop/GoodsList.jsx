import React, { useState, useEffect } from 'react';
import {
    withRouter,
} from 'react-router-dom'
import CONFIG from '../../config'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import FadeTransitions from '../Common/FadeTransitions'
import apiShop from '../../api/apiShop'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';

const GoodsList = props => {
    const isPc = useMediaQuery(CONFIG.minDeviceWidth);
    const [data, setdata] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const result = await apiShop.fetchGoodsList();
            if (result.code === 200) {
                setdata(result.data);
            }
        }
        fetch();
    }, []);

    const renderList = () => {
        return data.map(items => {
            return (
                <GridListTile cols={2} key={items.id} onClick={() => props.history.push('/shop/goodsInfo/' + items.english_name)}>
                    <img src={items.img} alt={items.id} />
                    <GridListTileBar
                        title={items.chinese_name}
                        subtitle={<span>{items.english_name}</span>}
                    />
                </GridListTile>
            );
        });
    }

    return (
        <FadeTransitions>
            <div style={{display: 'flex', flexDirection: isPc ? 'row' :'column'}}>
                <GridList cellHeight={180}>
                    <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                        <ListSubheader component="div">控制器列表</ListSubheader>
                    </GridListTile>
                    {renderList()}
                </GridList>
            </div>
        </FadeTransitions>
    );
}

export default withRouter(GoodsList);